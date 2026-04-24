# Hermes Agent + Kimi K2.6 多 Agent 军团实战

> 原文: [苍何 - 万字保姆级教程](https://mp.weixin.qq.com/s/x_Jtmk4-ThuNtZTGqJqncQ) | 作者: 苍何 | 发表于: 2026年4月21日

## 核心概念

**Hermes Agent** — 一个多 Agent 协作框架，代号「爱马仕」，支持多智能体军团协同工作。

**Kimi K2.6** — 专门针对代码和长任务场景优化的开源模型，核心优势：
- 超长上下文窗口
- 长任务链路稳定
- 多工具协同能力强

## 系统架构

### Agent 军团角色分工

| Agent | 职责 |
|-------|------|
| 总管 (Commander) | 接收需求、调度流程、协调各 Agent |
| 市场总监 | 市场调研 |
| 产品总监 | 输出 PRD |
| 架构总监 | 技术架构设计（有权打回产品设计） |
| 开发总监 | 代码实现，可调用本地 Claude Code |
| 测试总监 | 测试验收，输出测试报告 |

### 工作流程

```
需求输入 → 市场调研 → PRD → 架构设计 → 开发实现 → 测试验收
    ↑                                    │
    └────────────────────────────────────┘
              （有问题打回修改）
```

### 核心原理

Hermes 多 Agent 协作的本质：
- **角色隔离** — 每个 Agent 独立 profile，互不污染上下文
- **共享上下文** — 通过 Honcho 组件实现 Agent 间共享记忆
- **任务委派** — 通过 Gateway 统一收发消息

### 四个核心组件

| 组件 | 职责 | 类比 |
|------|------|------|
| Profiles | 多个独立 Agent 的组织方式 | 公司里的不同部门 |
| Gateway | Agent 对外收发消息的通道 | 公司的前台/客服 |
| Honcho | 多 Agent 共享长期记忆和上下文 | 公司的共享知识库 |
| tmux | 进程保活工具 | 让办公室的灯一直开着 |

## 安装步骤

### 1. 安装 Hermes Agent (WSL 2)

```bash
# 进入 WSL 2
wsl

# 一键安装
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

### 2. 配置默认 Profile

- 选「快速配置」，先配必需项（模型、API Key、消息方式）
- 推荐使用 **K2.6-code-preview** 模型

### 3. 创建多 Agent Profile

```bash
hermes profile create commander      # 总管
hermes profile create market-director  # 市场总监
hermes profile create product-director # 产品总监
hermes profile create architect-director # 架构总监
hermes profile create dev-director   # 开发总监
hermes profile create test-director  # 测试总监
```

每个 profile 需要单独配置：
- 模型和 API Key
- 角色职责和工作范围
- 可使用的技能和工具

### 4. 连接飞书

```bash
hermes gateway setup
# 选择飞书，扫描二维码授权
# 配置 systemd 系统服务
```

### 5. 配置 Agent 间通信

告诉总管 Agent 职责边界，让它自动调度下游 Agent 并创建相应 skill。

## K2.6 的关键作用

在多 Agent 协同这种极端复杂的场景下，底层模型的稳定性直接决定整个系统能否跑通：

- **任务目标识别准确** — 模糊需求自动拆解成清晰执行步骤
- **工具调用稳定** — 同时调用多种工具时几乎没有幻觉或误操作
- **长上下文不失忆** — 数十轮对话后仍能精准引用前面的结果

## 文件结构

| 路径 | 作用 |
|------|------|
| `config.yaml` | Agent 人设配置（模型、工具、行为参数） |
| `.env` | 敏感信息（API Keys、令牌等） |
| `profiles/` | 多个 Agent 的独立配置 |
| `skills/` | Agent 可调用的工具 |
| `memory/` | 记忆存储（每日/长期记忆） |
| `sessions/` | 会话历史 |
| `gateway/` | 消息平台连接（飞书/Slack/Discord） |

## 常见问题

| 问题 | 解决方式 |
|------|----------|
| `hermes: command not found` | `source ~/.bashrc` |
| Python 版本低 | 升级到 3.10+ |
| API Key 错误 | 检查 `.env` |
| 速率限制 | 降低请求频率 |
| OAuth token expired | 重新授权 |
| 上下文溢出 | 清理会话历史或换大模型 |

## 关键洞察

> 框架负责协调，模型负责执行。一个好的多 Agent 框架配上一个真正能打长任务的模型，才是这套方案的核心竞争力所在。

- 每个 Agent 独立上下文，互不干扰
- 通过共享 workspace + Gateway 通知实现任务交接
- 底层模型能力是系统能否跑通的隐形门槛

---
*收录于第二大脑知识库 | 2026-04-24*
