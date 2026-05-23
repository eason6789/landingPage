<div align="center">
  <a href="#english">English</a> | <a href="#chinese">中文</a>
</div>

---

<h2 id="english">Deploy: Landing Page</h2>

### Server Path

`/var/www/landingpage/`

### Domain

https://tuteng3.site

### Files to Deploy

All files in the project root, excluding `.git/` and files listed in `.gitignore`:

- `index.html` -- Main landing page
- `games.html` -- Games collection page
- `tools.html` -- Tools collection page
- `pixel-avatar-v3.png`, `pixel-avatar.png` -- Avatar images
- `qr-minigame.png`, `qr-wishlist.png` -- QR code images
- Subdirectories: `claw/`, `finlearn/`, `video-feed/`, `wiki/`

### Deploy Steps

1. **SFTP upload all files to server**

```bash
cd /Users/easonlv/progs/landingPage
scp -r *.html *.png root@<server_ip>:/var/www/landingPage/
scp -r claw/ finlearn/ video-feed/ wiki/ root@<server_ip>:/var/www/landingPage/
```

2. **Verify deployment**

```bash
ssh root@<server_ip> "ls -la /var/www/landingpage/index.html"
```

3. **Reload Nginx (if config changed)**

```bash
ssh root@<server_ip> "nginx -t && systemctl reload nginx"
```

4. **Browser verification**: Open https://tuteng3.site

### Nginx Config Reference

```nginx
server {
    listen 80 default_server;
    server_name tuteng3.site www.tuteng3.site;
    root /var/www/landingpage;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}

server {
    listen 443 ssl http2;
    server_name tuteng3.site www.tuteng3.site;

    ssl_certificate /etc/letsencrypt/live/tuteng3.site/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tuteng3.site/privkey.pem;

    root /var/www/landingpage;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

### Dependencies

- Nginx
- Let's Encrypt (SSL)

### Environment Variables

This is a pure static frontend — no environment variables required.

---

<h2 id="chinese">部署：Landing Page</h2>

### 服务器路径

`/var/www/landingpage/`

### 域名

https://tuteng3.site

### 需要部署的文件

项目根目录下所有文件，排除 `.git/` 和 `.gitignore` 中列出的文件：

- `index.html` -- 主页
- `games.html` -- 游戏合集页
- `tools.html` -- 工具合集页
- `pixel-avatar-v3.png`, `pixel-avatar.png` -- 头像图片
- `qr-minigame.png`, `qr-wishlist.png` -- 二维码图片
- 子目录：`claw/`、`finlearn/`、`video-feed/`、`wiki/`

### 部署步骤

1. **SFTP 上传所有文件到服务器**

```bash
cd /Users/easonlv/progs/landingPage
scp -r *.html *.png root@<server_ip>:/var/www/landingPage/
scp -r claw/ finlearn/ video-feed/ wiki/ root@<server_ip>:/var/www/landingPage/
```

2. **验证部署**

```bash
ssh root@<server_ip> "ls -la /var/www/landingpage/index.html"
```

3. **重载 Nginx（如配置有变更）**

```bash
ssh root@<server_ip> "nginx -t && systemctl reload nginx"
```

4. **浏览器验证**：打开 https://tuteng3.site

### Nginx 配置参考

```nginx
server {
    listen 80 default_server;
    server_name tuteng3.site www.tuteng3.site;
    root /var/www/landingpage;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}

server {
    listen 443 ssl http2;
    server_name tuteng3.site www.tuteng3.site;

    ssl_certificate /etc/letsencrypt/live/tuteng3.site/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tuteng3.site/privkey.pem;

    root /var/www/landingpage;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 依赖

- Nginx
- Let's Encrypt (SSL)

### 环境变量

本项目为纯静态前端，无需配置环境变量。
