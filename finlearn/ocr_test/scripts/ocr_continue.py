"""OCR sections 3 & 4 with robust retry, try both GLM and Qwen"""
import base64, json, os, urllib.request, time

GLM_KEY = 'd802cbead2414e81856f1b9a97e12e6c.iFRw4UukDOBjwLXI'
QWEN_KEY = 'sk-027943ba67c448478bb2644fe5a460be'
BASE_DIR = os.path.dirname(__file__)

def ocr_glm(path, num):
    with open(path, 'rb') as f:
        b64 = base64.b64encode(f.read()).decode('utf-8')
    payload = {
        'model': 'glm-4.6v',
        'messages': [{'role': 'user', 'content': [
            {'type': 'image_url', 'image_url': {'url': f'data:image/jpeg;base64,{b64}'}},
            {'type': 'text', 'text': '请逐字逐句识别图片中的所有文字（中英文），保持层级结构（标题、正文、列表）。表格用Markdown表格格式。不要添加任何额外说明，直接输出识别结果。'}
        ]}],
        'max_tokens': 8192, 'temperature': 0.1
    }
    data = json.dumps(payload).encode('utf-8')
    for attempt in range(10):
        try:
            req = urllib.request.Request('https://open.bigmodel.cn/api/paas/v4/chat/completions', data=data, method='POST')
            req.add_header('Authorization', f'Bearer {GLM_KEY}')
            req.add_header('Content-Type', 'application/json')
            with urllib.request.urlopen(req, timeout=300) as resp:
                r = json.loads(resp.read().decode('utf-8'))
                content = r['choices'][0]['message']['content']
                usage = r.get('usage', {})
                return content, usage
        except Exception as e:
            err = str(e)[:80]
            wait = min(5 * (attempt + 1), 30)
            if attempt < 3:
                print(f'    重试{attempt+1}... ({err})')
            time.sleep(wait)
    return None, None

def ocr_qwen(path, num):
    with open(path, 'rb') as f:
        b64 = base64.b64encode(f.read()).decode('utf-8')
    payload = {
        'model': 'qwen-vl-max',
        'input': {
            'messages': [{
                'role': 'user',
                'content': [
                    {'image': f'data:image/jpeg;base64,{b64}'},
                    {'text': '请逐字逐句识别图片中的所有文字（中英文），保持层级结构。表格用Markdown表格。不要额外说明，直接输出识别结果。'}
                ]
            }]
        },
        'parameters': {'max_tokens': 8192, 'temperature': 0.1}
    }
    data = json.dumps(payload).encode('utf-8')
    for attempt in range(5):
        try:
            req = urllib.request.Request(
                'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation',
                data=data, method='POST'
            )
            req.add_header('Authorization', f'Bearer {QWEN_KEY}')
            req.add_header('Content-Type', 'application/json')
            with urllib.request.urlopen(req, timeout=300) as resp:
                r = json.loads(resp.read().decode('utf-8'))
                if 'output' in r and 'choices' in r['output']:
                    content = r['output']['choices'][0]['message']['content']
                    if isinstance(content, list):
                        content = '\n'.join([c.get('text', '') if isinstance(c, dict) else str(c) for c in content])
                    usage = r.get('usage', {})
                    return content, usage
        except Exception as e:
            time.sleep(5 * (attempt + 1))
    return None, None

def process(section_num):
    path = os.path.join(BASE_DIR, f'section_{section_num}.jpg')
    size_kb = os.path.getsize(path) / 1024
    print(f'\n🔍 第{section_num}段 ({size_kb:.0f}KB)')

    # Try GLM first
    print('  [GLM-4.6V]...')
    content, usage = ocr_glm(path, section_num)
    if content:
        out = os.path.join(BASE_DIR, f'section_{section_num}_ocr.md')
        with open(out, 'w') as f:
            f.write(content)
        print(f'  ✅ GLM 成功! input={usage.get("prompt_tokens","?")}, output={usage.get("completion_tokens","?")}, chars={len(content)}')
        return content

    # Fallback to Qwen
    print('  GLM失败, 尝试 [Qwen-VL-Max]...')
    content, usage = ocr_qwen(path, section_num)
    if content:
        out = os.path.join(BASE_DIR, f'section_{section_num}_qwen.md')
        with open(out, 'w') as f:
            f.write(content)
        print(f'  ✅ Qwen 成功! input={usage.get("input_tokens","?")}, output={usage.get("output_tokens","?")}, chars={len(content)}')
        return content

    print(f'  ❌ 全部失败')
    return None

if __name__ == '__main__':
    results = {}
    for i in [3, 4]:
        results[i] = process(i)
        if results[i]:
            time.sleep(2)

    # Combine all sections
    all_parts = []
    # Read section 1
    with open(os.path.join(BASE_DIR, 'ocr_full_result.md'), 'r') as f:
        all_parts.append(f.read())

    for i in [2, 3, 4]:
        # Try GLM result first, then Qwen
        for prefix in ['section_', 'section_']:
            suffix = ['_ocr.md', '_qwen.md']
            for s in suffix:
                p = os.path.join(BASE_DIR, f'{prefix}{i}{s}')
                if os.path.exists(p):
                    with open(p, 'r') as f:
                        all_parts.append(f.read())
                    break
            else:
                continue
            break

    combined = '\n\n---\n\n'.join(all_parts)
    out = os.path.join(BASE_DIR, 'ocr_full_result.md')
    with open(out, 'w') as f:
        f.write(combined)
    print(f'\n✅ 合并完成! {len(combined)} 字符 -> {out}')
