import base64
import json
import os
import urllib.request

API_KEY = "d802cbead2414e81856f1b9a97e12e6c.iFRw4UukDOBjwLXI"
API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions"
MODEL = "glm-4.6v-flash"  # 免费版

def encode_image(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

def ocr_image(image_path, output_path):
    b64 = encode_image(image_path)

    payload = {
        "model": MODEL,
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{b64}"
                        }
                    },
                    {
                        "type": "text",
                        "text": """请仔细识别这张图片中的所有文字内容，要求：
1. 逐字逐句识别，不要遗漏任何内容
2. 保持原文的层级结构（大标题、小标题、正文、列表）
3. 表格数据用Markdown表格格式输出
4. 图表中的数据、标注、坐标轴信息都要提取
5. 如果有图表或图片的区域，描述其内容和含义
6. 输出格式为Markdown，尽可能完整"""
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
        with urllib.request.urlopen(req, timeout=120) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            content = result["choices"][0]["message"]["content"]

            with open(output_path, "w", encoding="utf-8") as f:
                f.write(content)

            usage = result.get("usage", {})
            print(f"✅ 识别完成!")
            print(f"   Input tokens: {usage.get('prompt_tokens', 'N/A')}")
            print(f"   Output tokens: {usage.get('completion_tokens', 'N/A')}")
            print(f"   Total tokens: {usage.get('total_tokens', 'N/A')}")
            print(f"   输出长度: {len(content)} 字符")
            print(f"   结果保存至: {output_path}")
            return content
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        print(f"❌ HTTP Error {e.code}: {error_body}")
        return None
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

if __name__ == "__main__":
    img = os.path.join(os.path.dirname(__file__), "original.jpg")
    out = os.path.join(os.path.dirname(__file__), "ocr_result.md")
    ocr_image(img, out)
