"""OCR all 4 sections using GLM-4.6V"""
import base64, json, os, urllib.request, urllib.error, time

API_KEY = "d802cbead2414e81856f1b9a97e12e6c.iFRw4UukDOBjwLXI"
API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions"
MODEL = "glm-4.6v"
BASE_DIR = os.path.dirname(__file__)

def encode_image(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

def ocr_section(section_path, section_num):
    b64 = encode_image(section_path)
    payload = {
        "model": MODEL,
        "messages": [{
            "role": "user",
            "content": [
                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64}"}},
                {"type": "text", "text": "请逐字逐句识别图片中的所有文字内容（包括中文和英文），保持原有层级结构（标题、小标题、正文、列表）。表格数据用Markdown表格格式。不要添加任何额外说明，直接输出识别结果。"}
            ]
        }],
        "max_tokens": 8192,
        "temperature": 0.1
    }

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(API_URL, data=data, method="POST")
    req.add_header("Authorization", f"Bearer {API_KEY}")
    req.add_header("Content-Type", "application/json")

    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=180) as resp:
                r = json.loads(resp.read().decode("utf-8"))
                content = r["choices"][0]["message"]["content"]
                usage = r.get("usage", {})
                print(f"  ✅ 第{section_num}段: input={usage.get('prompt_tokens','?')}, output={usage.get('completion_tokens','?')}, chars={len(content)}")
                return content
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8")[:300]
            print(f"  ⚠️ 第{section_num}段 HTTP {e.code}: {body}")
            if e.code == 429:
                print(f"     等待30秒重试...")
                time.sleep(30)
            else:
                return None
        except Exception as e:
            print(f"  ⚠️ 第{section_num}段 Error: {e}")
            time.sleep(10)

    return None

def main():
    results = []
    for i in range(1, 5):
        path = os.path.join(BASE_DIR, f"section_{i}.jpg")
        if not os.path.exists(path):
            print(f"❌ 文件不存在: {path}")
            continue
        print(f"🔍 识别第{i}/4段 ({os.path.getsize(path)/1024:.0f}KB)...")
        content = ocr_section(path, i)
        if content:
            results.append(content)
        time.sleep(2)  # brief pause between calls

    combined = "\n\n---\n\n".join(results)
    out_path = os.path.join(BASE_DIR, "ocr_full_result.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(combined)
    print(f"\n✅ 全部完成! {len(results)}/4段成功, 总长度: {len(combined)} 字符")
    print(f"   保存至: {out_path}")

if __name__ == "__main__":
    main()
