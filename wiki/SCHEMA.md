# 第二大脑知识库规范

## 目录结构

```
wiki/
├── SCHEMA.md          # 本规范文件
├── index.md          # 内容总览
├── log.md            # 操作日志
├── raw/              # 原始资料
│   ├── articles/     # 网页文章
│   ├── papers/       # 论文 PDF
│   ├── transcripts/  # 会议/访谈记录
│   └── assets/      # 图片/附件
├── entities/         # 实体页（人/工具/系统）
├── concepts/        # 概念页（方法论/主题）
├── comparisons/     # 对比分析
└── queries/         # 问答存档
```

## 页面规范

### 实体页 (entities/)
- 文件名：` kebab-case.md`
- 内容：人物/工具/系统的核心信息
- 标签：`#entity #人物` 等

### 概念页 (concepts/)
- 文件名：` kebab-case.md`
- 内容：方法论/主题/知识点
- 标签：`#concept #方法论` 等

## 标签体系

| 标签 | 用途 |
|------|------|
| #entity | 实体（人/工具/系统）|
| #concept | 概念/方法论 |
| #AI | AI 相关 |
| #coding | 编程相关 |
| #product | 产品相关 |
| #finance | 金融相关 |

## 交叉引用

使用 `[[pagename]]` 进行页面链接。
