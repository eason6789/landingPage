# Deploy: 陀螺的创想世界 (Landing Page)

## Server Path

`/var/www/landingPage/`

## Domain

https://tuteng3.site

## Files to Deploy

All files in the project root, excluding `.git/` and files listed in `.gitignore`:

- `index.html` -- Main landing page
- `games.html` -- Games collection page
- `tools.html` -- Tools collection page
- `pixel-avatar-v3.png`, `pixel-avatar.png` -- Avatar images
- `qr-minigame.png`, `qr-wishlist.png` -- QR code images
- Subdirectories: `claw/`, `finlearn/`, `video-feed/`, `wiki/`

## Deploy Steps

1. **SFTP upload all files to server**

```bash
cd /Users/easonlv/progs/landingPage
scp -r *.html *.png root@<server_ip>:/var/www/landingPage/
scp -r claw/ finlearn/ video-feed/ wiki/ root@<server_ip>:/var/www/landingPage/
```

2. **Verify deployment**

```bash
ssh root@<server_ip> "ls -la /var/www/landingPage/index.html"
```

3. **Reload Nginx (if config changed)**

```bash
ssh root@<server_ip> "nginx -t && systemctl reload nginx"
```

4. **Browser verification**: Open https://tuteng3.site

## Nginx Config Reference

```nginx
server {
    listen 80 default_server;
    server_name tuteng3.site www.tuteng3.site;
    root /var/www/landingPage;
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

    root /var/www/landingPage;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

## Dependencies

- Nginx
- Let's Encrypt (SSL)
