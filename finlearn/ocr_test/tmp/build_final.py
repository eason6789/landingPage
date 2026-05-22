"""Build final combined OCR result and demo HTML"""
import os, json

BASE = os.path.dirname(__file__)

# Combine all sections into one Markdown file
parts = []
# Section 1: from ocr_full_result.md (which had just section 1)
try:
    with open(os.path.join(BASE, 'ocr_full_result.md'), 'r') as f:
        content = f.read().strip()
        if content:
            parts.append(content)
            print(f'Section 1: {len(content)} chars')
except:
    print('Section 1 missing, trying result_glm_glm-4.6v.md')
    with open(os.path.join(BASE, 'result_glm_glm-4.6v.md'), 'r') as f:
        content = f.read().strip()
        parts.append(content)
        print(f'Section 1 (alt): {len(content)} chars')

# Section 2: prefer GLM
sec2_path = os.path.join(BASE, 'section_2_ocr.md')
if not os.path.exists(sec2_path):
    sec2_path = os.path.join(BASE, 'section_2_qwen.md')
with open(sec2_path, 'r') as f:
    content = f.read().strip()
    parts.append(content)
    print(f'Section 2 ({os.path.basename(sec2_path)}): {len(content)} chars')

# Section 3: Qwen
with open(os.path.join(BASE, 'section_3_qwen.md'), 'r') as f:
    content = f.read().strip()
    parts.append(content)
    print(f'Section 3: {len(content)} chars')

# Section 4: Qwen
with open(os.path.join(BASE, 'section_4_ocr.md'), 'r') as f:
    content = f.read().strip()
    parts.append(content)
    print(f'Section 4: {len(content)} chars')

combined = '\n\n---\n\n'.join(parts)
combined_path = os.path.join(BASE, 'ocr_final_combined.md')
with open(combined_path, 'w') as f:
    f.write(combined)
print(f'\nTotal: {len(combined)} chars -> {combined_path}')

# Also save as JSON for web embedding
with open(os.path.join(BASE, 'ocr_final_data.json'), 'w') as f:
    json.dump({'content': combined, 'chars': len(combined), 'source': '1-宏观经济学.png'}, f, ensure_ascii=False)
print('JSON saved')
