# Landing Page (创想世界) - 服务器部署指南

## 访问地址

- **主站**: https://tuteng3.site
- **games**: https://tuteng3.site/games.html
- **tools**: https://tuteng3.site/tools.html

## 服务器配置

- **项目路径**: `/root/project/portfolio-home/src/`
- **Web 根目录**: `/root/project/portfolio-home/src/`
- **Nginx 配置**: `/etc/nginx/conf.d/tuteng3.site.conf`

## 部署步骤

### 方式一：自动部署（本地开发后）

#### 步骤 1: 上传代码到服务器

```bash
# 在本地项目目录执行
cd /Users/easonlv/Code/web/landingPage

# 上传所有文件（排除 .gitignore 和备份文件）
scp -r . root@119.29.178.222:/root/project/portfolio-home/src/
```

#### 步骤 2: 验证部署

```bash
# SSH 到服务器验证
ssh root@119.29.178.222 "ls -la /root/project/portfolio-home/src/index.html"
```

### 方式二：手动部署

```bash
# SSH 到服务器
ssh root@119.29.178.222

# 创建目录（如果不存在）
mkdir -p /root/project/portfolio-home/src

# 从 Git 拉取最新代码
cd /root/project/portfolio-home/src
git pull origin main
```

## Nginx 配置

服务器使用以下 Nginx 配置（已配置）：

```nginx
server {
    listen 80 default_server;
    server_name tuteng3.site www.tuteng3.site 119.29.178.222;
    root /root/project/portfolio-home/src;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}

server {
    listen 443 ssl http2;
    server_name tuteng3.site www.tuteng3.site 119.29.178.222;

    ssl_certificate /etc/letsencrypt/live/tuteng3.site/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tuteng3.site/privkey.pem;

    root /root/project/portfolio-home/src;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

## 维护命令

### 重启 Nginx

```bash
ssh root@119.29.178.222 "nginx -s reload"
```

### 查看日志

```bash
ssh root@119.29.178.222 "tail -f /var/log/nginx/access.log"
```

## 注意事项

1. **静态页面项目**: 这是一个纯静态网站，无需构建
2. **文件上传**: 直接上传到 `/root/project/portfolio-home/src/` 目录
3. **备份**: 部署前可以先备份现有文件
4. **子项目**:
   - `/games.html` - 游戏页面
   - `/tools.html` - 工具页面
   - `/claw/management/` - 智能体管理
   - `/claw/photo/` - 证件照工具
   - `/finlearn/` - 金融学习

---

*最后更新: 2026-04-25*