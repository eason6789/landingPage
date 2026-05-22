import base64
import json
import os
import urllib.request
import subprocess

API_KEY = "d802cbead2414e81856f1b9a97e12e6c.iFRw4UukDOBjwLXI"
API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions"
MODEL = "glm-4.6v-flash"  # 免费版

BASE_DIR = os.path.dirname(__file__)
INPUT_IMG = os.path.join(BASE_DIR, "original.jpg")

def encode_image(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

def crop_image(in_path, out_path, y_start, height):
    """crop a horizontal slice from the image"""
    # sips -c <height> <width> <file> crops from center
    # sips -c <pixels> <file> --cropOffset <y> <x>
    # But sips cropOffset is from bottom-left... tricky.
    # Use Python Pillow instead or ImageMagick
    pass

def split_image(in_path, sections=4):
    """Split tall image into sections using sips"""
    # Get total height
    result = subprocess.run(
        ["sips", "-g", "pixelHeight", "-g", "pixelWidth", in_path],
        capture_output=True, text=True
    )
    lines = result.stdout.strip().split('\n')
    height = int(lines[0].split(':')[1].strip())
    width = int(lines[1].split(':')[1].strip())

    section_height = height // sections
    paths = []

    for i in range(sections):
        y_start = i * section_height
        y_end = height if i == sections - 1 else (i + 1) * section_height
        actual_height = y_end - y_start
        # Crop from top: first crop to remove top part, then resize
        out_path = os.path.join(BASE_DIR, f"section_{i+1}.jpg")

        if i == 0:
            # Just crop from bottom
            subprocess.run(
                ["sips", "-c", str(actual_height), str(width), in_path, "--out", out_path],
                capture_output=True
            )
        else:
            # First crop to remove top part, then remove bottom
            tmp = os.path.join(BASE_DIR, f"_tmp_{i}.jpg")
            # Crop from top: remove y_start pixels from top
            # sips -C <height> <width> crops without resizing
            # Actually sips crop is from center. Let me try a different approach.

            # Actually sips -c H W crops to HxW from center. Doesn't let us specify offset.
            # Better approach: use sips with pad or use Python with Pillow
            pass

    return None

def ocr_section(image_path, section_num):
    """OCR a single image section"""
    b64 = encode_image(image_path)

    payload = {
        "model": MODEL,
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{b64}"}
                    },
                    {
                        "type": "text",
                        "text": """请仔细识别这张图片中的所有文字内容，逐字逐句输出，保持层级结构。表格用Markdown表格格式。输出格式为Markdown。这是长图的第{}部分，请不要添加开头结尾说明，直接输出识别内容。""".format(section_num)
                    }
                ]
            }
        ],
        "max_tokens": 8192,
        "temperature": 0.1
    }

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(API_URL, data=data, method="POST")
    req.add_header("Authorization", f"Bearer {API_KEY}")
    req.add_header("Content-Type", "application/json")

    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            content = result["choices"][0]["message"]["content"]
            usage = result.get("usage", {})
            print(f"  第{section_num}部分: input={usage.get('prompt_tokens','?')}, output={usage.get('completion_tokens','?')}, chars={len(content)}")
            return content
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        print(f"❌ 第{section_num}部分 HTTP {e.code}: {error_body[:500]}")
        return None
    except Exception as e:
        print(f"❌ 第{section_num}部分 Error: {e}")
        return None

def main():
    print("📐 切分图片...")
    # Split image using Python
    import subprocess as sp

    # Check if Pillow is available
    try:
        from PIL import Image
        img = Image.open(INPUT_IMG)
        w, h = img.size
        print(f"   尺寸: {w}x{h}")

        sections = 4
        sec_h = h // sections
        results = []

        for i in range(sections):
            y1 = i * sec_h
            y2 = h if i == sections - 1 else (i + 1) * sec_h
            section = img.crop((0, y1, w, y2))
            sec_path = os.path.join(BASE_DIR, f"section_{i+1}.jpg")
            section.save(sec_path, "JPEG", quality=80)
            size_kb = os.path.getsize(sec_path) / 1024
            print(f"   第{i+1}段: y={y1}-{y2}, 文件={size_kb:.0f}KB")

            print(f"🔍 识别第{i+1}/{sections}段...")
            content = ocr_section(sec_path, i+1)
            if content:
                results.append(content)
            else:
                print(f"⚠️ 第{i+1}段识别失败")

        # Combine results
        combined = "\n\n---\n\n".join(results)
        out_path = os.path.join(BASE_DIR, "ocr_result.md")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(combined)
        print(f"\n✅ 全部完成! 合并结果: {out_path}")
        print(f"   总长度: {len(combined)} 字符")

    except ImportError:
        print("❌ 需要 Pillow 库: pip3 install Pillow")

if __name__ == "__main__":
    main()
