"""Build demo HTML with OCR result embedded"""
import json

with open('ocr_full_result.md', 'r') as f:
    content = f.read()

# Escape for embedding in JS template literal
escaped = content.replace('\\', '\\\\').replace('`', '\\`').replace('$', '\\$')

with open('demo.html', 'r') as f:
    html = f.read()

html = html.replace('__OCR_RESULT_PLACEHOLDER__', escaped)

with open('demo.html', 'w') as f:
    f.write(html)

print(f"✅ Demo HTML built: {len(html)} bytes, OCR content {len(content)} chars")
