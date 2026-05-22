# 陀螺(Eason)的创想世界 - 设计规范文档 v2.0

---

## 一、整体概念

**主题**: 像素风复古游戏机美学 × 鹅黄色温暖底色  
**核心理念**: 像一台复古掌机的菜单界面 — 左侧是「玩家信息栏」固定不动，右侧是「游戏选择区」每次切一屏

---

## 二、色彩系统

| 角色 | 色值 | CSS变量 | 用途 |
|------|------|---------|------|
| 背景色 | `#FEF3C7` | `--bg` | 全局鹅黄色底色 |
| 深色背景 | `#F5E0A8` | `--bg-deep` | 卡片、区块底色 |
| 主文字 | `#78350F` | `--text` | 正文（深棕色高对比） |
| 副文字 | `#92400E` | `--text-secondary` | 辅助说明 |
| 强调色 | `#D97706` | `--accent` | CTA按钮、链接hover |
| 边框色 | `#FDE68A` | `--border` | 像素边框 |
| 卡面色 | `#FFFDF5` | `--card` | 项目卡片 |
| 像素阴影 | `#B45309` | `--pixel-shadow` | 像素风立体阴影 |
| 像素黑 | `#1C1917` | `--pixel-black` | 强对比元素 |
| 像素绿 | `#22C55E` | `--pixel-green` | 状态指示、NEW标签 |
| 像素蓝 | `#3B82F6` | `--pixel-blue` | 链接、技术标签 |
| HOT红 | `#DC2626` | `--hot-red` | HOT角标 |

---

## 三、字体系统

### Google Fonts 引入
```css
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=ZCOOL+QingKe+HuangYou&family=Silkscreen&family=DotGothic16&display=swap');
```

### 字体层级

| 用途 | 字体族 | 备选 |
|------|--------|------|
| **标题/LOGO** | `Press Start 2P`, `Silkscreen`, `ZCOOL QingKe HuangYou` | --font-pixel |
| **副标题/标签** | `Silkscreen`, `DotGothic16`, `ZCOOL QingKe HuangYou` | --font-pixel2 |
| **正文/描述** | `VT323`, `ZCOOL QingKe HuangYou` | --font-terminal |

### 大小规范

| 层级 | 桌面 | 移动 |
|------|------|------|
| 大标题 (.title-cn) | 24px | 20px |
| 英文副标题 (.title-en) | 13px | 11px |
| 项目中文名 (.cn-name) | 13px | 12px |
| 项目英文名 (.en-name) | 12px | 12px |
| 正文 | 18px | 16px |
| 标签 (.tag) | 7px | 7px |

---

## 四、布局结构

### 桌面端
```
┌──────────────────────────────────────────────────────────┐
│  ┌──────────┐  ┌─────────────────────────────────────┐   │
│  │  [头像]  │  │   Section 01: Web 工具               │   │
│  │  陀螺    │  │   ┌─────┐ ┌─────┐ ┌─────┐          │   │
│  │  (Eason) │  │   │ 🎵  │ │ 📊  │ │ 📸  │          │   │
│  │          │  │   └─────┘ └─────┘ └─────┘          │   │
│  │  联系方式 │  │                                     │   │
│  │  (6项)   │  │         (scroll-snap)               │   │
│  └──────────┘  └─────────────────────────────────────┘   │
│  ← 310px →    ← 剩余宽度 →                                │
└──────────────────────────────────────────────────────────┘
```

### 移动端
```
┌──────────────┐
│   封面页     │ ← 100dvh, 像素头像
├──────────────┤
│   Web工具    │ ← 100dvh, 3个项目卡片
├──────────────┤
│   演示       │ ← 100dvh, 3个项目卡片 + To be continue
├──────────────┤
│ 小程序&小游戏│ ← 100dvh, 两个子区域 + To be continue
├──────────────┤
│  开源Skills  │ ← 100dvh, 2个项目 + To be continue
├──────────────┤
│ GitHub联系   │ ← 100dvh, GitHub二维码
├──────────────┤
│  社交联系    │ ← 100dvh, 真人照片 + 社交链接
└──────────────┘
```

---

## 五、Section 规范

### Section 标题
- 无卡底背景（仅文字 + 像素装饰底线）
- 格式：`[SECTION XX]` 标签 → 中文大标题 → 英文副标题
- 装饰线：4px高，渐变色块组成

### Section 列表

| # | 中文标题 | 英文标题 | 项目数 | 状态 |
|---|---------|---------|--------|------|
| 01 | Web 工具 | WEB TOOLS | 4 | 满 |
| 02 | 演示 | DEMO | 2 | 有 To be continue |
| 03 | 小程序 & 小游戏 | MINI PROGRAMS & GAMES | 1+1 | 有 To be continue |
| 04 | 开源项目 | OPEN SOURCE PROJECTS | 2+0 | 有 To be continue |

---

## 六、项目卡片规范

### 结构
```
┌─────────────────────────────────┐
│  [HOT]              [GO ▶]     │
│  ┌──┐                          │
│  │图│  中文项目名               │
│  │标│  英文项目名               │
│  └──┘  (hover展开3条描述)      │
│        [标签] [标签]            │
└─────────────────────────────────┘
```

### 角标
- **HOT**: 红色刺儿形 (#DC2626)，右上角，闪烁动画
- **NEW**: 绿色刺儿形 (#22C55E)，右上角，闪烁动画

### 卡片样式
- 3px 实线黑色边框
- 4px 像素阴影 (--pixel-shadow)
- Hover: 阴影加深，位移 -2px

---

## 七、项目清单

### Section 01: Web 工具

| 图标 | 项目名 | 英文名 | URL | 标签 | 角标 |
|------|--------|--------|-----|------|------|
| 🎵 | AI 音乐生成器 | AI Music Generator | /music_gen/ | AI, 音乐 | HOT |
| 📊 | 金融知识学习平台 | Finc Study | /finlearn | 教育, 金融 | - |
| 📸 | AI 证件照生成 | ID Photo AI | /claw/photo/ | AI, 工具 | HOT |
| 📚 | AI 单词本 | Vocab Duo | /vocab-duo/ | AI, OCR, 学习 | NEW |

### Section 02: 演示

| 图标 | 项目名 | 英文名 | URL | 标签 | 角标 |
|------|--------|--------|-----|------|------|
| 🎮 | 行动代号 | CodeNames | /game.html | HTML5, AI | - |
| 📱 | 自动滚动 Feed 流 | Video Feed | /video-feed/ | Demo, Feed | - |

### Section 03: 小程序 & 小游戏

**小程序 Mini Program:**
| 项目名 | 英文名 | 二维码 | 标签 |
|--------|--------|--------|------|
| 计划事务清单 | WishList | qr-wishlist.png | 小程序, 效率 |

**小游戏 Mini Game:**
| 项目名 | 英文名 | 二维码 | 标签 |
|--------|--------|--------|------|
| 极速命中挑战 | Speed Reaction | qr-minigame.png | 小游戏, 竞技 |

### Section 04: 开源项目

**开源 Skills:**
| 项目名 | 英文名 | URL | 标签 |
|--------|--------|-----|------|
| 新西兰签证材料生成器 | NZ Visa 4CN | GitHub | Skill, AI, PDF |
| 闲鱼自动发货框架 | Xianyu Auto Send | GitHub | Skill, 自动化 |

**开源项目:**
| 项目名 | 英文名 | URL | 标签 |
|--------|--------|-----|------|
| (待添加) | - | - | To be continue |

---

## 八、联系方式规范

### 格式
```
[图标] [平台名] [@handle - 带下划线超链接]
```

### 联系方式清单

| 平台 | Handle | URL | 二维码 |
|------|--------|-----|--------|
| GitHub | @eason6789 | github.com/eason6789 | qr-github.jpg |
| 小红书 | @陀螺是大王 | 小红书主页 | qr-redbook.jpg |
| 视频号 | @陀螺就是我 | 微信视频号 | qr-videocall.jpg |
| 抖音 | @抽筋小陀螺 | 抖音主页 | qr-douyin.jpg |
| 微博 | @齐天大陀螺 | weibo.com | qr-weibo.png |
| Email | easonlv95@gmail.com | mailto | - |

### 交互
- 桌面端: hover 显示二维码（绝对定位在右侧弹出）
- 移动端: 二维码直接显示

---

## 九、滚动吸附

### 桌面端
- `.main-scroll` 容器: `scroll-snap-type: y mandatory`
- 每个 `.section`: `scroll-snap-align: start`
- 右侧导航点: IntersectionObserver 高亮当前区块

### 移动端
- `.main-scroll` 容器: `scroll-snap-type: y mandatory`
- 所有页面: `scroll-snap-align: start; scroll-snap-stop: always; min-height: 100dvh`
- 包含: 封面页 + 4个section + 2个联系页

---

## 十、部署信息

### 服务器
- **地址**: 119.29.178.222
- **域名**: tuteng3.site
- **SSL**: Let's Encrypt (HTTPS)
- **Web服务器**: Nginx

### 部署路径

| 应用 | 本地路径 | 服务器路径 | 访问URL |
|------|---------|-----------|---------|
| Landing Page | /Users/easonlv/code/web/landingPage/ | /root/project/portfolio-home/src/ | tuteng3.site |
| Vocab Duo | /Users/easonlv/code/web/vocab-duo/ | /var/www/vocab-duo/ | tuteng3.site/vocab-duo/ |

### Git仓库
- **Landing Page**: github.com/eason6789/landingPage
- **Vocab Duo**: github.com/eason6789/vocab-duo (private)

---

## 十一、技术栈

- **前端**: 纯 HTML + CSS + JS，无框架
- **字体**: Google Fonts CDN (5款字体)
- **兼容性**: Chrome/Firefox/Safari/移动端浏览器
- **无依赖**: 零 npm 包，零构建工具

---

## 十二、新增项目规范流程

### 前置条件
1. 项目需已部署到 tuteng3.site 或其子路径，确保可通过 URL 直接访问
2. 准备好项目名称（中英文）、一句话描述、标签（最多 3 个）

### 添加步骤
1. **确定归属 Section** — 根据项目类型归入对应 Section（Web 工具 / 演示 / 小程序&小游戏 / 开源项目）
2. **制作 SVG 图标** — 34×34 viewBox，使用 `--text`(#78350F)、`--accent`(#D97706)、`--pixel-green`(#22C55E) 色板中的颜色
3. **写入 HTML** — 复制 `.project-card` 模板，替换图标、中英文名、URL、标签、3 条 hover 描述
4. **角标判断** — 新上线项目加 `<span class="hot-badge new">NEW</span>`，热门项目加 `<span class="hot-badge">HOT</span>`，普通项目不加
5. **更新 Scroll Nav** — 若新增 Section，需同步添加 `.scroll-nav-dot` 导航点
6. **更新本规范文档** — 在项目清单对应 Section 下新增一行

### 角标规则
| 角标 | 触发条件 | CSS类 | 颜色 |
|------|---------|-------|------|
| HOT | 访问量大/热门的项目 | `hot-badge` | 红色 #DC2626 |
| NEW | 最近 2 周内上线的新项目 | `hot-badge new` | 绿色 #22C55E |
| 无 | 常规项目 | - | - |

### 卡片字段规范
- **中文名**: 2-6 字，简洁直白
- **英文名**: 对应英文，Title Case
- **hover 描述**: 3 条 `<li>`，每条 12-20 字，覆盖核心功能、技术栈、亮点
- **标签**: 每个项目 2-3 个 `.tag`，分类明确（如 AI / 工具 / 教育）

### 部署 Checklist
- [ ] `index.html` 修改后同步到 `/root/project/portfolio-home/src/index.html`
- [ ] 如有新图片/资源，同步上传至服务器
- [ ] nginx 如有新 location 块，测试并 reload
- [ ] `git commit` + `git push` 到 github.com/eason6789/landingPage
- [ ] 浏览器验证 https://tuteng3.site/ 正常访问

---

## 十三、待办事项

- [x] 像素头像生成（阿里百炼 Qwen-VL + wan2.6-t2i）
- [ ] 演示区可能增加更多项目
- [ ] 小程序/小游戏区域扩展
- [ ] 开源项目子区域添加实际项目

---

*最后更新: 2026-05-22*
