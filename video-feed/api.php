<?php
error_reporting(0);
ini_set('session.save_path', '/var/lib/php/session');
ini_set('session.cookie_httponly', 1);
header('Content-Type: application/json');
header('Cache-Control: no-store, no-cache, must-revalidate');

session_start();

// 初始化数据库 + 迁移
try {
    $pdo = new PDO('mysql:unix_socket=/var/lib/mysql/mysql.sock;dbname=video_feed_db;charset=utf8mb4', 'root', 'OpenClaw2026!');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // 添加 video_key 列（兼容旧表结构）
    try { $pdo->exec("ALTER TABLE video_likes ADD COLUMN video_key VARCHAR(512) NULL"); } catch (Exception $e) {}
    // 添加复合索引加速查询
    try { $pdo->exec("ALTER TABLE video_likes ADD INDEX idx_ip_key (client_ip, video_key)"); } catch (Exception $e) {}
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'DB connection failed']);
    exit;
}

// 获取客户端IP作为用户标识
$clientIp = $_SERVER['REMOTE_ADDR'] ?: 'unknown';

// 获取当前用户的点赞列表（按文件名）
if (isset($_GET['action']) && $_GET['action'] === 'get_likes') {
    $stmt = $pdo->prepare("SELECT video_key FROM video_likes WHERE client_ip = ? AND video_key IS NOT NULL");
    $stmt->execute([$clientIp]);
    $rows = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo json_encode(['success' => true, 'likes' => $rows]);
    exit;
}

// 获取所有视频的总点赞数（按文件名分组）
if (isset($_GET['action']) && $_GET['action'] === 'get_counts') {
    $stmt = $pdo->query("SELECT video_key, COUNT(*) as cnt FROM video_likes WHERE video_key IS NOT NULL GROUP BY video_key");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $counts = [];
    foreach ($rows as $row) {
        $counts[$row['video_key']] = intval($row['cnt']);
    }
    echo json_encode(['success' => true, 'counts' => $counts]);
    exit;
}

// 添加/移除点赞（按文件名，按用户隔离）
if (isset($_GET['action']) && $_GET['action'] === 'like') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $videoKey = isset($data['video_key']) ? trim($data['video_key']) : '';
    $liked = isset($data['liked']) ? boolval($data['liked']) : false;

    if (empty($videoKey)) {
        echo json_encode(['success' => false, 'error' => 'invalid key']);
        exit;
    }

    if ($liked) {
        $stmt = $pdo->prepare("INSERT IGNORE INTO video_likes (client_ip, video_key, created_at) VALUES (?, ?, NOW())");
        $stmt->execute([$clientIp, $videoKey]);
    } else {
        $stmt = $pdo->prepare("DELETE FROM video_likes WHERE client_ip = ? AND video_key = ?");
        $stmt->execute([$clientIp, $videoKey]);
    }

    echo json_encode(['success' => true]);
    exit;
}

echo json_encode(['success' => false, 'error' => 'unknown action']);
