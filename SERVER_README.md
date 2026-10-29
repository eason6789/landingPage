# 服务器 & 后端 API 总览（tuteng3.site）

> 本文档是「个人主页」及其所有子项目在后端服务器上的**唯一权威映射**。
> 服务器上有什么进程、跑在哪个端口、Nginx 怎么路由、哪些 API 是通的，全部以这里为准。
> **最后核对日期：2026-10-21**

---

## 1. 服务器信息

| 项 | 值 |
|---|---|
| 公网 IP | `119.29.178.222` |
| 域名 | `tuteng3.site`（`www.tuteng3.site` 同解析） |
| SSH | `ssh root@119.29.178.222 -p 22` |
| 系统 | OpenCloudOS，Node v22 |
| Web 服务器 | Nginx 1.24（配置：`/etc/nginx/conf.d/tuteng3.site.conf`） |
| 主页根目录 | `/var/www/landingpage/` |

> 安全组只放行 22 / 80 / 443；MySQL 3306 **不对公网开放**，本地连库要走 SSH 隧道：
> `ssh -N -L 3306:127.0.0.1:3306 root@119.29.178.222`

---

## 2. 后端服务清单（进程 / 端口 / 状态）

| 服务 | 端口 | 进程管理 | 状态（2026-10-19） |
|---|---|---|---|
| vocab-duo API | 3000 | PM2 `vocab-duo-backend` | ✅ 在线 |
| xinghe-tumai（星河图脉） | 3001 | PM2 `xinghe-tumai` | ✅ 在线（本次修复） |
| wish-plan（计划事务清单） | 3002 | PM2 `wish-plan-backend` | ✅ 在线 |
| music_gen API | 5000 | systemd `site_total`（gunicorn） | ⚠️ 进程在，但**已下架**（外部 AI 音乐 API 未续费） |
| photo-service（id-photo / claw） | 8080 | systemd `photo-service`（Go） | ✅ 在线 |
| codenames-backend | 8082 | systemd `codenames-backend`（Go） | ✅ 在线 |
| pawnear（邻爪） | 8083 | systemd `pawnear.service`（Go） | ✅ 在线 |
| truth-or-dare（真心话） | 8084 | systemd `truth-or-dare.service`（Go） | ✅ 在线 |
| hivision（证件照抠图） | 8090 | systemd `hivision`（Python） | ✅ 在线（供 photo-service 内部调用） |
| php-fpm | — | systemd `php-fpm.service` | ✅ 在线（video-feed + hand-gesture 代理） |
| OpenClaw 网关 | 18789 / 18791 | 手动（无 systemd/PM2） | 运行中（agent 管理基础设施） |

**常用管理命令**

```bash
pm2 ls                                # 查看 PM2 服务
pm2 restart <name>                    # 重启某个 PM2 服务
systemctl restart photo-service pawnear.service codenames-backend php-fpm  # 重启 Go/PHP 服务
nginx -t && nginx -s reload           # 校验并重载 Nginx
```

---

## 3. Nginx 路由总览（80 与 443 两个 server 块相同）

| URL 路径 | 类型 | 目标 |
|---|---|---|
| `/` | 静态 | `/var/www/landingpage/`（个人主页） |
| `/video-feed/api.php` 等 4 个 `.php` | fastcgi | php-fpm → `/var/www/videos-feed/*.php` |
| `/video-feed/` | 静态 | `/var/www/videos-feed/` |
| `/vocab-duo/` | 静态(SPA) | `/var/www/vocab-duo/frontend/dist/` |
| `/vocab-duo/api/` | 代理 | `http://127.0.0.1:3000/api/` |
| `/vocab-duo/uploads/` | 静态 | `/var/www/vocab-duo/backend/uploads/` |
| `/music_gen/` | 静态(SPA) | `/var/www/music_gen/` |
| `/music/api/` | 代理 | `http://127.0.0.1:5000/api/` |
| `/finlearn/` | 静态 | `/var/www/finlearn/` |
| `/claw/management/` | 静态 | `/var/www/claw-mgmt/` |
| `/claw/photo/` | 静态 | `/var/www/id-photo/` |
| `/claw/api/` | 代理 | `http://127.0.0.1:8080/api/` |
| `/claw/api/data/results/` | 静态 | `/var/www/html/claw/api/data/results/` |
| `/api/` | 代理 | `http://127.0.0.1:8080`（Go 通用 API，无 rewrite） |
| `/api/generate-words` | 代理(exact) | `http://127.0.0.1:8082`（codenames，**本次新增**） |
| `/game.html` | 静态 | `/var/www/codenames-game/game.html` |
| `/hand-gesture/proxy.php` | fastcgi(exact) | php-fpm → `/var/www/hand-gesture/proxy.php`（**本次新增**） |
| `/hand-gesture/` | 静态 | `/var/www/hand-gesture/` |
| `/pawnear/` | 静态 | `/var/www/pawnear/`（index=login.html） |
| `/pawnear/api/` | 代理 | `http://127.0.0.1:8083/api/` |
| `/wish/api/` | 代理 | `http://127.0.0.1:3002/api/` |
| `/xinghe-tumai/api/` | 代理 | `http://127.0.0.1:3001/api/`（**本次新增**） |
| `/xinghe-tumai/` | 静态(SPA) | `/var/www/landingpage/xinghe-tumai/`（**本次新增**） |
| `/vibe-motion/` | 静态 | `/var/www/vibe-motion/` |
| `/truth-or-dare/` | 静态 | `/var/www/truth-or-dare/`（index=entry.html，多页 entry.html/home.html/admin.html） |
| `/truth-or-dare/api/` | 代理 | `http://127.0.0.1:8084/api/` |

> 优先级提示：`location =`（精确）> `location ^~`（前缀，命中后不再走正则）> 正则 > 普通前缀。
> `/api/generate-words` 用精确匹配，避免被 `/api/`（→8080）吞掉。

---

## 4. 各项目后端 API 明细

### 4.1 vocab-duo（AI 单词学习）· Node 3000 · PM2
- `GET /vocab-duo/api/health` → `{"success":true,...}` ✅
- `GET /vocab-duo/api/status` → 生产模式 + 数据库/百度 OCR 状态 ✅
- `POST /vocab-duo/api/logs/frontend`、`GET /vocab-duo/api/logs/backend|frontend`
- 数据库：`wordlearner`

### 4.2 music_gen（AI 音乐生成）· Gunicorn 5000 · systemd site_total
- `GET /music/api/health` → `{"service":"music-gen-api","status":"ok"}` ✅（进程健康）
- `POST /music/api/upload-audio`、`POST /music/api/generate`
- ⚠️ **已下架**：前端 `music_gen` 显示「已下架」，外部 AI 音乐生成 API 未续费，generate 会失败。

### 4.3 id-photo / claw（AI 证件照）· Go 8080 · systemd photo-service
- `POST /api/generate-photo` ✅（无文件上传时返回 `文件上传失败`，属正常）
- `GET /api/video-list` ✅
- 依赖：hivision（8090，抠图）、百度 OCR、阿里百炼 FaceChain

### 4.4 pawnear（邻爪）· Go 8083 · systemd pawnear.service
- `GET /pawnear/api/posts` ✅（返回宠物求助列表）
- `GET /pawnear/api/health` → `{"success":true,"service":"pawnear-backend","env":"prod"}` ✅
- 数据库：`pawnear`

### 4.5 wish-plan（计划事务清单 小程序）· Node 3002 · PM2
- `POST /wish/api/login`（微信 code → jscode2session）✅
- `GET /wish/api/plans/:userId`、`POST /wish/api/plans`（删旧插新）✅
- `POST /wish/api/user/update`、`POST /wish/api/form-id`
- 数据库：`wish_plan`
- 小程序 `app.js` 的 `apiBase` 必须是 `https://tuteng3.site/wish/api`（HTTPS + 微信白名单 `tuteng3.site`）

### 4.6 xinghe-tumai（星河图脉 算命）· Node 3001 · PM2
- `POST /xinghe-tumai/api/interpret` ✅（本次修复：补 Nginx 路由 + buildPrompt 容错）
- 调 DeepSeek `deepseek-chat`；密钥在 PM2 环境变量 `DEEPSEEK_API_KEY`

### 4.7 video-feed（视频流）· PHP-FPM
- `GET /video-feed/api.php?action=get_likes` / `get_counts`、`POST ...?action=like` ✅（本次修复：补 DB 环境变量）
- `GET /video-feed/check.php`、`POST /video-feed/verify.php`
- 数据库：`video_feed_db`（表 `video_likes`）

### 4.8 hand-gesture（手势塔罗占卜）· 静态 + PHP 代理
- `POST /hand-gesture/proxy.php` → DeepSeek 解读 ✅（本次修复：补 php-fpm 路由）
- 手部识别在浏览器端用 MediaPipe 完成，无需后端

### 4.9 codenames（谁是卧底/猜词游戏）· Go 8082 · systemd codenames-backend
- `POST /api/generate-words` ✅（本次修复：补 Nginx 路由 →8082）
- 前端 `/game.html`

### 4.10 纯静态项目（无后端）
- `landingPage`（主页）、`finlearn`、`claw-mgmt`、`vibe-motion`（WebGPU 动捕，浏览器本地跑）

### 4.11 truth-or-dare（真心话）· Go 8084 · systemd truth-or-dare.service
- 题库存 MySQL `truth_or_dare.sticks` 表，游戏端运行时 `GET /truth-or-dare/api/sticks?edition=couple`
- `GET /truth-or-dare/api/health` → `{"success":true,"service":"truth-or-dare","env":"prod"}` ✅
- `POST/PUT/DELETE /truth-or-dare/api/sticks` 增删改；管理页 `https://tuteng3.site/truth-or-dare/admin.html`（开放，无鉴权）
- 前端入口在主页 `games.html` 游戏栏；首次启动自动灌入 seed.json 的 40 张签

---

## 5. 数据库清单（MySQL）

| 数据库 | 用途 |
|---|---|
| `wordlearner` | vocab-duo |
| `wish_plan` | 计划事务清单 |
| `video_feed_db` | video-feed 点赞 |
| `pawnear` | 邻爪 |
| `truth_or_dare` | 真心话抽签 |
| `testdb` / `sys` 等 | 杂项/系统 |

> ⚠️ `wish_plan.video_likes` 是一张**遗留旧表**（旧结构，无 `video_key` 列），视频点赞实际用的是 `video_feed_db.video_likes`，别搞混。

---

## 6. 关键坑 / 注意事项

1. **端口不能乱占**：3000=vocab-duo、3001=xinghe-tumai、3002=wish-plan，三个 Node 服务端口是历史约定，新服务别复用。
2. **php-fpm 环境变量的 `!` 要加引号**：密码含 `!` 时必须写成 `env[DB_PASSWORD] = "密码"`（加引号），否则 `!` 会让 php-fpm 配置解析报 `syntax error`，导致 502。本次已修复。DB 密码见服务器 `memory/server_credentials`，勿写入本文件。
3. **PHP 项目的 DB 凭据走 `getenv()`**：在 `/etc/php-fpm.d/www.conf` 用 `env[DB_xxx] = ...` 注入，改完要 `systemctl restart php-fpm`（reload 不一定重读 env）。
4. **微信小程序要 HTTPS + 白名单**：生产环境 `apiBase` 用 `https://tuteng3.site/...`，并在微信后台把 `tuteng3.site` 加进 request 合法域名。
5. **Nginx 每次改动先 `nginx -t`**，通过再 `nginx -s reload`；配置只有 `/etc/nginx/conf.d/tuteng3.site.conf` 一个文件，别另建散落的 conf。
6. **静态资源在 COS**：图片/音频/视频走腾讯云 COS（`single-az-1251416377`），Nginx 只托管 HTML/CSS/JS。

---

## 7. 本次修复记录（2026-10-19）

| 问题 | 根因 | 修复 |
|---|---|---|
| 星河图脉「识别不了图 / API 爆」 | Nginx 缺 `/xinghe-tumai/` 与 `/xinghe-tumai/api/` 路由（DEPLOY.md 写了但没落地）；且 `buildPrompt` 遇畸形入参抛 TypeError | 补两条 Nginx 路由；`server.js` buildPrompt 容错（过滤无 `rune` 项、`spatialRelations` 判数组、`item.rune.meaning` 修正），已 commit+push |
| video-feed 点赞「DB connection failed」 | php-fpm 缺 `DB_NAME/DB_USER/DB_PASSWORD` 环境变量 | 在 `www.conf` 注入 `video_feed_db` 凭据（密码加引号），重启 php-fpm |
| hand-gesture 解读 405 | `proxy.php` 被当静态文件，没有 php-fpm 路由 | 补 `location = /hand-gesture/proxy.php` fastcgi 路由 |
| codenames 猜词 404 | `/api/generate-words` 被 `/api/` 转发到 8080（photo-service）而非 8082 | 补 `location = /api/generate-words` 精确代理到 8082 |
