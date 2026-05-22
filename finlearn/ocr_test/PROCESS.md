# Finlearn OCR → 双语知识库 完整工作流程

## 概述

将金融学习截图（PNG/PDF）通过 GLM-4.6V + Qwen-VL-Max 大模型 OCR 提取文字，清洗后集成到 finlearn 静态站点，实现左右分栏（EN | CN）的双语知识展示。

## 项目架构

```
finlearn/
├── index.html          # 主页面结构（OCR进度条、模块卡片、模态框）
├── app.js              # 核心逻辑（MODULES、KNOWLEDGE_CONTENT、渲染函数）
├── styles.css          # 样式（双语列、OCR徽章、进度条）
└── ocr_test/
    ├── PROCESS.md      # 本文档
    ├── ocr_continue.py # OCR API调用脚本（含重试逻辑）
    ├── clean_ocr.py    # 内容清洗脚本
    ├── ocr_final_combined.md  # 清洗后的原始Markdown
    └── ocr_structured.json    # 结构化双语JSON数据
```

## 源材料位置

```
~/Desktop/金融学习/
├── 1. 宏观经济/       → 1-宏观经济学.png (1810×30125px长截图)
├── 2. 市场与产品/     → 2-金融市场与产品.png + 2-2股票.pdf(41页) + 2-3债券.pdf(19页) +
│                        2-4基金ETF.pdf(28页) + 2-5指数.pdf(17页) + 2-6货币.pdf(13页)
├── 3. 期权期货/       → 多个PNG + PDF
├── 4. 财报/           → 多个PNG
├── 5. 量化/           → 多个PNG
├── 6. IPO/            → 多个PNG
├── 7. 税务/           → 多个PNG
├── 8. 信托/           → 多个PNG
├── 9. 区块链/         → 多个PNG
├── 10. 富途/          → PNG（⚠️ 仅提取通用金融知识，必须忽略富途品牌/业务细节）
```

## Step 1：图片预处理

长截图或大尺寸PNG在送入OCR API前需要预处理。

### 1.1 PNG → JPEG 压缩

```bash
# 压缩为JPEG减小体积（70%质量）
sips -s format jpeg -s formatOptions 70 input.png --out section.jpg
```

### 1.2 拆分长截图

超过30000px高度的长截图需拆分为~7500px段落，避免超出API上下文限制。

```bash
python3 -c "
from PIL import Image
img = Image.open('section.jpg')
w, h = img.size
chunk_h = 7500
for i in range(0, h, chunk_h):
    chunk = img.crop((0, i, w, min(i+chunk_h, h)))
    chunk.save(f'section_{i//chunk_h+1}.jpg')
"
```

### 1.3 PDF 转图片

PDF文件先用 `pdf2image` 转为图片再OCR。

```bash
pip install pdf2image
python3 -c "
from pdf2image import convert_from_path
images = convert_from_path('input.pdf', dpi=200)
for i, img in enumerate(images):
    img.save(f'page_{i+1}.jpg', 'JPEG', quality=85)
"
```

## Step 2：OCR API 调用

### 2.1 API 配置

| 服务 | 端点 | API Key | 模型 | 说明 |
|------|------|---------|------|------|
| 智谱 GLM | `https://open.bigmodel.cn/api/paas/v4/chat/completions` | `d802cbead2414e81856f1b9a97e12e6c.iFRw4UukDOBjwLXI` | `glm-4.6v` | 主模型，付费，质量高 |
| 阿里 Qwen | DashScope原生格式 | `sk-027943ba67c448478bb2644fe5a460be` | `qwen-vl-max` | Fallback，免费额度 |

### 2.2 Prompt 模板

```
请逐字识别这张图片中的所有文字内容，包括标题、正文、表格数据。
保持原始格式（Markdown），保留中英文对照。
对于表格，使用Markdown表格格式输出。
不要添加任何解释，只输出识别到的文字。
```

### 2.3 重试策略

GLM API 连接不稳定（"Remote end closed connection"），需要多层重试：

```python
max_retries = 10
delays = [5, 10, 15, 20, 25, 30, 30, 30, 30, 30]  # 递增延迟

for attempt in range(max_retries):
    try:
        # GLM 调用
        response = call_glm(image)
        break
    except ConnectionError:
        # GLM 失败 → 切换 Qwen
        try:
            response = call_qwen(image)
            break
        except:
            # 都失败 → 降低图片分辨率50% 重试
            image = resize_image(image, 0.5)
            time.sleep(delays[attempt])
```

### 2.4 子章节组合

多个图片段落的OCR结果按顺序拼接：

```bash
cat section_1.md section_2.md section_3.md section_4.md section_5.md > ocr_raw_combined.md
```

## Step 3：内容清洗

### 3.1 必须移除的噪音

| 类别 | 示例 | 正则模式 |
|------|------|----------|
| 截图软件 | "这将允许 iShot..." | `iShot[^\n]*\n?` |
| 个人水印 | easonlv, Viktor, 3月17日修改 | `easonlv\s+Viktor\s*` |
| 富途品牌 | 富途牛牛App、Premium数据、精选宏观 | `富途[^\n]*\n?` |
| 考试信息 | 内部考试体系-大纲、入门考试 | `内部考试[^\n]*\n?` |
| UI噪音 | 状态栏时间、按钮文本、股票代码WLTH | 按具体情况添加 |
| 重复内容 | 多张图重复的表格 | 手动检查去重 |

### 3.2 清洗脚本模板 (clean_ocr.py)

```python
import re

def clean_text(text):
    noise_patterns = [
        r'easonlv\s+Viktor\s*',
        r'富途[^\n]*\n?',
        r'iShot[^\n]*\n?',
        r'内部考试[^\n]*\n?',
        r'为防止资料外泄[^\n]*\n?',
        r'\d{1,2}:\d{2}\s*(AM|PM)?',  # 时间戳
        # 根据每章实际情况添加
    ]
    for pattern in noise_patterns:
        text = re.sub(pattern, '', text, flags=re.IGNORECASE)
    
    # 清理多余空行
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()
```

### 3.3 中英分离

OCR输出通常是中英混合段落，需要手动或半自动分离：

1. 识别英文段落的起始/结束
2. 匹配对应的中文段落
3. 构建 `{ en: "...", cn: "..." }` 结构

⚠️ 这一步目前需要人工判断，因为中英对照关系不总是1:1的。

## Step 4：结构化输出

### 4.1 JSON 格式

```json
{
  "topics": [
    {
      "id": "1.1.1",
      "title": "Fundamentals of the Business Cycle",
      "title_cn": "经济周期基础知识",
      "en": "English content here...",
      "cn": "中文内容这里..."
    }
  ],
  "indicators": [
    {
      "id": "gdp",
      "title": "Gross Domestic Product (GDP)",
      "title_cn": "国内生产总值 (GDP)",
      "type": "Coincident Indicator",
      "type_cn": "同步指标",
      "en": "English content...",
      "cn": "中文内容..."
    }
  ]
}
```

### 4.2 Python写入JSON注意事项

⚠️ **中文引号问题**：中文内容中包含 `"`（U+201C/U+201D）和 `"`（U+0022），在 Python 字符串中会引发 SyntaxError。

**解决方案**：使用 heredoc 方式避免转义

```bash
python3 << 'PYEOF'
import json
data = {
    "en": "...",
    "cn": "...包含\"中文双引号\"的内容..."
}
with open('ocr_structured.json', 'w') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
PYEOF
```

## Step 5：前端集成

### 5.1 添加 MODULES 结构（app.js）

在 `MODULES` 数组中定义新的 section 和 item：

```javascript
{
  title: "新Section名称",
  items: [
    { title: "知识点中文标题", subtitle: "简短描述 | 关键特征 | 分类标签", tag: "core" },
    // tag可选: core(核心), expanded(进阶), practice(实战), trend(前沿)
  ]
}
```

### 5.2 添加 KNOWLEDGE_CONTENT 双语条目

Key 格式：`"{模块ID}-{item.title}"`（item.title 必须与 MODULES 中完全一致）

```javascript
"1-知识点中文标题": {
  bilingual: true,
  title: "English Title",
  title_cn: "中文标题",
  type: "Indicator Type",        // 可选，指标类型
  type_cn: "指标类型中文",
  en: "English markdown content with **bold**, lists, and tables...",
  cn: "中文Markdown内容，支持**加粗**、列表和表格..."
}
```

### 5.3 双语渲染机制

前端自动检测 `bilingual: true` 标记并渲染左右双栏：

```javascript
if (content && content.bilingual) {
  // 左栏 English | 右栏 中文
  bodyHtml += `<div class="bilingual-columns">
    <div class="bilingual-col bilingual-en">...</div>
    <div class="bilingual-col bilingual-cn">...</div>
  </div>`;
}
```

`renderBilingualMarkdown(md)` 函数支持以下 Markdown 元素：
- 标题 (##, ###, ####)
- 加粗 (**text**)
- 无序列表 (- item)
- Markdown表格 (| col | col |)
- 段落与换行

### 5.4 更新进度

进度由 `getModuleOCRCoverage()` 函数自动计算：

- 遍历 `MODULES` 中所有 items
- 检查 KNOWLEDGE_CONTENT 中是否存在对应的 `bilingual: true` 条目
- 计算覆盖率百分比

更新后进度会自动反映在：
1. 首页 OCR 进度条（全局统计）
2. 模块卡片上的 OCR 徽章（✓ OCR 15条 / ○ 待OCR）
3. 模块详情页顶部 OCR Banner
4. 知识条目旁的绿色小圆点（表示有双语内容）

## Step 6：Git 提交

```bash
cd /Users/easonlv/code/web/landingPage/finlearn
git add app.js styles.css index.html ocr_test/
git commit -m "feat: Module 1 OCR bilingual content + progress tracking

- Add 15 bilingual (EN/CN) knowledge entries from GLM-4.6V OCR
- Implement left-right column bilingual modal layout
- Add OCR progress badges on module cards and detail pages
- Add global OCR progress bar on home page
- Add bilingual dot indicators on knowledge items
- Update fallback text to '待补充/To be continued'
- Rename module 10: remove FUTU branding → 券商业务体系
- Write comprehensive PROCESS.md documentation

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

## Step 7：部署到远程服务器

### 服务器信息

```
SSH: root@119.29.178.222:22
密码: *7;Vf3@BkrzD,g+u
URL: http://tuteng3.site/finlearn
```

### ⚠️ 两个部署路径必须同时更新

1. `/var/www/html/finlearn/`
2. `/root/project/portfolio-home/src/finlearn/`

### 部署脚本

```python
import paramiko

host = "119.29.178.222"
user = "root"
password = "*7;Vf3@BkrzD,g+u"
remote_paths = [
    "/var/www/html/finlearn/",
    "/root/project/portfolio-home/src/finlearn/"
]
local_files = ["app.js", "styles.css", "index.html"]

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(host, 22, user, password)

sftp = ssh.open_sftp()
for path in remote_paths:
    for f in local_files:
        sftp.put(f"finlearn/{f}", f"{path}{f}")
        print(f"Uploaded {f} → {path}")
sftp.close()

# Reload nginx
ssh.exec_command("nginx -s reload")
ssh.close()
```

### 部署检查清单

- [ ] 确认 nginx 配置包含 `/finlearn` location block
- [ ] 两个远程路径均已更新
- [ ] `nginx -s reload` 或 `systemctl reload nginx`
- [ ] 浏览器硬刷新（Ctrl+Shift+R / Cmd+Shift+R）验证
- [ ] 检查 app.js Content-Length 确认是新文件
- [ ] 验证双语模块、OCR进度徽章、模态框均正常

### Nginx 配置参考

```nginx
location /finlearn {
    alias /var/www/html/finlearn;
    index index.html;
    try_files $uri $uri/ /finlearn/index.html;
}
```

## 新增模块操作清单

当你开始处理一个新的模块（如模块2-10），按以下步骤操作：

```
□ 1. 图片预处理
    □ PNG→JPEG 压缩
    □ 长截图拆分（~7500px段落）
    □ PDF→图片转换（如有）

□ 2. OCR 提取
    □ 运行 ocr_continue.py 逐段调用 API
    □ 合并各段输出 → ocr_raw_combined.md

□ 3. 内容清洗
    □ 更新 clean_ocr.py 的 noise_patterns（根据实际水印/噪音）
    □ 移除富途/个人水印/iShot/考试信息/UI噪音
    □ 去除重复内容

□ 4. 中英分离
    □ 识别中英对照段落
    □ 构建 topics/indicators JSON → ocr_structured.json

□ 5. 前端集成 (app.js)
    □ 更新 MODULES 中该模块的 sections/items 标题（全部改为中文）
    □ 添加 KNOWLEDGE_CONTENT 双语条目（格式见5.2节）
    □ 确保 key 格式为 "{模块ID}-{item.title}"

□ 6. 验证
    □ 本地 Python http.server 测试
    □ 检查OCR徽章/进度条是否正确更新
    □ 点击知识条目验证双语模态框

□ 7. 部署
    □ Git commit + push
    □ 上传到两个远程路径
    □ Nginx reload
    □ 浏览器硬刷新验证
```

## 已知问题与教训

1. **Python 中文字符串内嵌 ASCII 双引号**：使用 `python3 << 'PYEOF'` heredoc 避免转义问题
2. **GLM API 连接断开**：需要 5-10 次重试，递增延迟，Qwen 做 fallback
3. **两个远程路径**：`/var/www/html/finlearn/` 和 `/root/project/portfolio-home/src/finlearn/` 必须同时更新，否则旧缓存会覆盖新内容
4. **浏览器缓存**：部署后需硬刷新（Cmd+Shift+R），新用户不受影响
5. **sshpass 不可用**：用 Python paramiko 替代
6. **Markdown 表格渲染**：当前 renderBilingualMarkdown 使用正则处理，复杂表格可能需要手动调整
7. **OCR 中文引号**：GLM/Qwen 输出的中文引号（""）在JSON中正常，但写入 Python 字符串时需用 heredoc

## 当前进度 (2026-05-22)

| 模块 | 名称 | 状态 | OCR条目 | 总条目 | 进度 |
|------|------|------|---------|--------|------|
| 01 | 宏观经济基础 | ✅ 完成 | 15 | 15 | 100% |
| 02 | 金融市场与产品 | ⏳ 待处理 | 0 | 28 | 0% |
| 03 | 衍生品与期权期货 | ⏳ 待处理 | 0 | 22 | 0% |
| 04 | 财报与公司分析 | ⏳ 待处理 | 0 | 21 | 0% |
| 05 | 投资策略与量化 | ⏳ 待处理 | 0 | 18 | 0% |
| 06 | IPO与资本市场 | ⏳ 待处理 | 0 | 15 | 0% |
| 07 | 税务与股权 | ⏳ 待处理 | 0 | 16 | 0% |
| 08 | 信托与财富管理 | ⏳ 待处理 | 0 | 14 | 0% |
| 09 | 区块链与加密货币 | ⏳ 待处理 | 0 | 19 | 0% |
| 10 | 券商业务体系 | ⏳ 待处理 | 0 | 19 | 0% |
| **合计** | | **8.0%** | **15** | **187** | |

进度百分比同时显示在网站首页的 OCR 进度条中，实时可见。
