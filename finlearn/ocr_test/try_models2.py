"""Fix API formats and retry"""
import base64, json, os, urllib.request, urllib.error

BASE_DIR = os.path.dirname(__file__)
IMG_PATH = os.path.join(BASE_DIR, "section_1.jpg")

def encode_image(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

b64 = encode_image(IMG_PATH)
print(f"Image base64 length: {len(b64)} chars")

# ===== GLM - OpenAI compatible format =====
def try_glm(model):
    payload = {
        "model": model,
        "messages": [{
            "role": "user",
            "content": [
                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64}"}},
                {"type": "text", "text": "请逐字逐句识别图片中的所有文字，保持层级结构。表格用Markdown表格。不要添加额外说明。"}
            ]
        }],
        "max_tokens": 8192,
        "temperature": 0.1
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request("https://open.bigmodel.cn/api/paas/v4/chat/completions", data=data, method="POST")
    req.add_header("Authorization", f"Bearer d802cbead2414e81856f1b9a97e12e6c.iFRw4UukDOBjwLXI")
    req.add_header("Content-Type", "application/json")

    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            r = json.loads(resp.read().decode("utf-8"))
            return r
    except urllib.error.HTTPError as e:
        return {"error": e.code, "body": e.read().decode("utf-8")[:500]}

# ===== Qwen DashScope - native format =====
def try_qwen_dashscope(model):
    """DashScope native API format"""
    payload = {
        "model": model,
        "input": {
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"image": f"data:image/jpeg;base64,{b64}"},
                        {"text": "请逐字逐句识别图片中的所有文字，保持层级结构。表格用Markdown表格。不要添加额外说明。"}
                    ]
                }
            ]
        },
        "parameters": {
            "max_tokens": 8192,
            "temperature": 0.1
        }
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request("https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation", data=data, method="POST")
    req.add_header("Authorization", f"Bearer sk-027943ba67c448478bb2644fe5a460be")
    req.add_header("Content-Type", "application/json")

    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            r = json.loads(resp.read().decode("utf-8"))
            return r
    except urllib.error.HTTPError as e:
        return {"error": e.code, "body": e.read().decode("utf-8")[:500]}

# ===== Qwen OpenAI-compatible format =====
def try_qwen_openai(model):
    payload = {
        "model": model,
        "messages": [{
            "role": "user",
            "content": [
                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64}"}},
                {"type": "text", "text": "请逐字逐句识别图片中的所有文字，保持层级结构。表格用Markdown表格。不要添加额外说明。"}
            ]
        }],
        "max_tokens": 8192,
        "temperature": 0.1
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request("https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions", data=data, method="POST")
    req.add_header("Authorization", f"Bearer sk-027943ba67c448478bb2644fe5a460be")
    req.add_header("Content-Type", "application/json")

    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            r = json.loads(resp.read().decode("utf-8"))
            return r
    except urllib.error.HTTPError as e:
        return {"error": e.code, "body": e.read().decode("utf-8")[:500]}


# First try GLM models
print("\n=== 智谱 GLM ===")
for model in ["glm-4.6v", "glm-4v", "glm-4v-flash"]:
    print(f"  Trying {model}...")
    r = try_glm(model)
    if "error" in r:
        print(f"    ❌ {r['error']}: {r['body']}")
    else:
        content = r["choices"][0]["message"]["content"]
        usage = r.get("usage", {})
        print(f"    ✅ input={usage.get('prompt_tokens','?')}, output={usage.get('completion_tokens','?')}, chars={len(content)}")
        out = os.path.join(BASE_DIR, f"result_glm_{model}.md")
        with open(out, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"    -> {out}")
        break

# Then try Qwen DashScope native
print("\n=== 阿里百炼 DashScope ===")
for model in ["qwen-vl-max", "qwen-vl-plus", "qwen-vl-ocr"]:
    print(f"  Trying {model}...")
    r = try_qwen_dashscope(model)
    if "error" in r:
        print(f"    ❌ {r['error']}: {r['body'][:300]}")
    elif "output" in r:
        text = r["output"]["choices"][0]["message"]["content"]
        usage = r.get("usage", {})
        print(f"    ✅ input={usage.get('input_tokens','?')}, output={usage.get('output_tokens','?')}, chars={len(text)}")
        out = os.path.join(BASE_DIR, f"result_qwen_{model}.md")
        with open(out, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"    -> {out}")
        break
    else:
        print(f"    Unexpected: {json.dumps(r, ensure_ascii=False)[:300]}")

# Then try Qwen OpenAI-compatible
print("\n=== 阿里百炼 OpenAI兼容 ===")
for model in ["qwen-vl-max", "qwen-vl-plus"]:
    print(f"  Trying {model}...")
    r = try_qwen_openai(model)
    if "error" in r:
        print(f"    ❌ {r['error']}: {r['body'][:300]}")
    elif "choices" in r:
        content = r["choices"][0]["message"]["content"]
        usage = r.get("usage", {})
        print(f"    ✅ input={usage.get('prompt_tokens','?')}, output={usage.get('completion_tokens','?')}, chars={len(content)}")
        out = os.path.join(BASE_DIR, f"result_qwen_oai_{model}.md")
        with open(out, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"    -> {out}")
        break
    else:
        print(f"    Unexpected: {json.dumps(r, ensure_ascii=False)[:300]}")
