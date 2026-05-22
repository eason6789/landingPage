#!/usr/bin/env python3
"""
OCR Pipeline: PNG/PDF → split → GLM/Qwen OCR → combine
Usage: python3 ocr_process.py <input.png> <output_dir>
"""
import sys, os, time, json, base64, urllib.request
from PIL import Image

# Config
CHUNK_H = 7500
MAX_RETRIES = 5
GLM_KEY = "d802cbead2414e81856f1b9a97e12e6c.iFRw4UukDOBjwLXI"
QWEN_KEY = "sk-027943ba67c448478bb2644fe5a460be"

PROMPT = """请逐字识别这张图片中的所有文字内容，包括标题、正文、表格数据。
保持原始格式（Markdown），保留中英文对照。
对于表格，使用Markdown表格格式输出。
不要添加任何解释，只输出识别到的文字。"""

def call_glm(img_b64):
    """Call GLM-4.6V API"""
    data = {
        "model": "glm-4.6v",
        "messages": [{
            "role": "user",
            "content": [
                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{img_b64}"}},
                {"type": "text", "text": PROMPT}
            ]
        }]
    }
    req = urllib.request.Request(
        "https://open.bigmodel.cn/api/paas/v4/chat/completions",
        json.dumps(data).encode(),
        {"Authorization": f"Bearer {GLM_KEY}", "Content-Type": "application/json"}
    )
    resp = urllib.request.urlopen(req, timeout=120)
    return json.loads(resp.read())['choices'][0]['message']['content']

def call_qwen(img_b64):
    """Call Qwen-VL-Max API (DashScope native format)"""
    data = {
        "model": "qwen-vl-max",
        "messages": [{
            "role": "user",
            "content": [
                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{img_b64}"}},
                {"type": "text", "text": PROMPT}
            ]
        }]
    }
    req = urllib.request.Request(
        "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
        json.dumps(data).encode(),
        {"Authorization": f"Bearer {QWEN_KEY}", "Content-Type": "application/json"}
    )
    resp = urllib.request.urlopen(req, timeout=120)
    return json.loads(resp.read())['choices'][0]['message']['content']

def ocr_with_retry(img_path):
    """OCR image with GLM primary + Qwen fallback, with retries"""
    with open(img_path, 'rb') as f:
        img_b64 = base64.b64encode(f.read()).decode()

    delays = [2, 5, 10, 15, 20]
    for attempt in range(MAX_RETRIES):
        delay = delays[min(attempt, len(delays)-1)]
        try:
            print(f"    Attempt {attempt+1}: GLM...", end=' ', flush=True)
            result = call_glm(img_b64)
            print("OK")
            return result, 'glm'
        except Exception as e:
            print(f"FAIL ({e})")
            try:
                print(f"    Attempt {attempt+1}: Qwen fallback...", end=' ', flush=True)
                result = call_qwen(img_b64)
                print("OK")
                return result, 'qwen'
            except Exception as e2:
                print(f"FAIL ({e2})")
                if attempt < MAX_RETRIES - 1:
                    print(f"    Retrying in {delay}s...")
                    time.sleep(delay)

    # Last resort: resize to 70% and try once more
    print("    Resizing to 70%...")
    img = Image.open(img_path)
    img = img.resize((int(img.width*0.7), int(img.height*0.7)), Image.LANCZOS)
    tmp_path = img_path.replace('.jpg', '_small.jpg')
    img.save(tmp_path, quality=60)
    with open(tmp_path, 'rb') as f:
        img_b64 = base64.b64encode(f.read()).decode()
    try:
        return call_qwen(img_b64), 'qwen_small'
    except:
        return None, 'failed'

def process_image(input_path, output_dir):
    """Full pipeline: convert → split → OCR → combine"""
    name = os.path.splitext(os.path.basename(input_path))[0]
    work_dir = os.path.join(output_dir, name)
    os.makedirs(work_dir, exist_ok=True)

    # Step 1: Convert to JPEG if PNG
    print(f"\n{'='*60}")
    print(f"Processing: {input_path}")
    print(f"{'='*60}")

    img = Image.open(input_path)
    if img.mode in ('RGBA', 'LA', 'P'):
        img = img.convert('RGB')

    jpg_path = os.path.join(work_dir, f"{name}.jpg")
    img.save(jpg_path, quality=70)
    print(f"Step 1: Saved JPEG → {jpg_path} ({img.size[0]}x{img.size[1]})")

    # Step 2: Split into chunks
    w, h = img.size
    num_chunks = (h + CHUNK_H - 1) // CHUNK_H
    print(f"Step 2: Splitting into {num_chunks} chunks of {CHUNK_H}px")

    chunk_paths = []
    for i in range(num_chunks):
        y1 = i * CHUNK_H
        y2 = min(y1 + CHUNK_H, h)
        chunk = img.crop((0, y1, w, y2))
        chunk_path = os.path.join(work_dir, f"chunk_{i+1:02d}.jpg")
        chunk.save(chunk_path, quality=70)
        chunk_paths.append(chunk_path)
        print(f"  chunk_{i+1:02d}: {y1}-{y2} ({y2-y1}px)")

    # Step 3: OCR each chunk
    print(f"\nStep 3: OCR each chunk")
    results = []
    for i, path in enumerate(chunk_paths):
        print(f"  [{i+1}/{num_chunks}] {os.path.basename(path)}")
        text, model = ocr_with_retry(path)
        if text:
            results.append(f"<!-- chunk {i+1} ({model}) -->\n{text}")
            # Save individual result
            with open(os.path.join(work_dir, f"chunk_{i+1:02d}_{model}.md"), 'w') as f:
                f.write(text)
        else:
            results.append(f"<!-- chunk {i+1} FAILED -->")
            print(f"    ✗ FAILED after all retries")

    # Step 4: Combine
    combined = "\n\n".join(results)
    combined_path = os.path.join(work_dir, f"{name}_combined.md")
    with open(combined_path, 'w') as f:
        f.write(combined)

    print(f"\nStep 4: Combined output → {combined_path}")
    print(f"  Total chars: {len(combined):,}")
    print(f"  Chunks succeeded: {sum(1 for r in results if 'FAILED' not in r)}/{num_chunks}")
    print(f"{'='*60}\n")
    return combined_path

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python3 ocr_process.py <input.png> [output_dir]")
        sys.exit(1)

    input_path = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else '.'
    process_image(input_path, output_dir)
