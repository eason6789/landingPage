"""Try multiple models for OCR on section 1"""
import base64, json, os, urllib.request, urllib.error

BASE_DIR = os.path.dirname(__file__)
IMG_PATH = os.path.join(BASE_DIR, "section_1.jpg")

def encode_image(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

def call_glm(model, api_key):
    """Call GLM API"""
    b64 = encode_image(IMG_PATH)
    payload = {
        "model": model,
        "messages": [{
            "role": "user",
            "content": [
                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64}"}},
                {"type": "text", "text": "请仔细识别并输出这张图片中的所有文字内容，逐字逐句，保持层级结构（标题、正文、列表）。表格用Markdown表格格式。不要添加额外说明，直接输出识别内容。"}
            ]
        }],
        "max_tokens": 8192,
        "temperature": 0.1
    }

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request("https://open.bigmodel.cn/api/paas/v4/chat/completions", data=data, method="POST")
    req.add_header("Authorization", f"Bearer {api_key}")
    req.add_header("Content-Type", "application/json")

    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            r = json.loads(resp.read().decode("utf-8"))
            content = r["choices"][0]["message"]["content"]
            usage = r.get("usage", {})
            print(f"   [{model}] ✅ input={usage.get('prompt_tokens','?')}, output={usage.get('completion_tokens','?')}, chars={len(content)}")
            return content
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")[:300]
        print(f"   [{model}] ❌ HTTP {e.code}: {body}")
        return None
    except Exception as e:
        print(f"   [{model}] ❌ {e}")
        return None

def call_qwen(model, api_key):
    """Call DashScope (阿里百炼) API"""
    b64 = encode_image(IMG_PATH)
    payload = {
        "model": model,
        "input": {
            "messages": [{
                "role": "user",
                "content": [
                    {"image": f"data:image/jpeg;base64,{b64}"},
                    {"text": "请仔细识别并输出这张图片中的所有文字内容，逐字逐句，保持层级结构。表格用Markdown表格格式。不要添加额外说明。"}
                ]
            }]
        },
        "parameters": {
            "max_tokens": 8192,
            "temperature": 0.1
        }
    }

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request("https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions", data=data, method="POST")
    req.add_header("Authorization", f"Bearer {api_key}")
    req.add_header("Content-Type", "application/json")

    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            r = json.loads(resp.read().decode("utf-8"))
            content = r["choices"][0]["message"]["content"]
            usage = r.get("usage", {})
            print(f"   [{model}] ✅ input={usage.get('prompt_tokens','?')}, output={usage.get('completion_tokens','?')}, chars={len(content)}")
            return content
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")[:300]
        print(f"   [{model}] ❌ HTTP {e.code}: {body}")
        return None
    except Exception as e:
        print(f"   [{model}] ❌ {e}")
        return None

def main():
    GLM_KEY = "d802cbead2414e81856f1b9a97e12e6c.iFRw4UukDOBjwLXI"
    QWEN_KEY = "sk-027943ba67c448478bb2644fe5a460be"
    MINIMAX_KEY = "sk-cp-3_hcZcHpkU8X73ZGVGrb7LLEbal5k9-FZhVTH-8gkB3YT_zDRkZaW8zAafH0UgQhDlHSWxbzuNPjRPZo5ObUxpzNQmfvMEkx38t3JupA5AB8HJIBP9PZJbs"

    print("🔍 Testing models on section_1.jpg (1762KB)...\n")

    # Try GLM paid models
    print("--- 智谱 ---")
    for model in ["glm-4v", "glm-4.6v", "glm-4v-plus"]:
        content = call_glm(model, GLM_KEY)
        if content:
            out = os.path.join(BASE_DIR, f"result_{model}.md")
            with open(out, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"   -> saved to {out}\n")
            return content
        else:
            print()

    # Try Qwen
    print("--- 阿里百炼 ---")
    for model in ["qwen-vl-max", "qwen-vl-plus", "qwen-vl-ocr"]:
        content = call_qwen(model, QWEN_KEY)
        if content:
            out = os.path.join(BASE_DIR, f"result_{model}.md")
            with open(out, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"   -> saved to {out}\n")
            return content
        else:
            print()

    print("❌ All models failed")

if __name__ == "__main__":
    main()
