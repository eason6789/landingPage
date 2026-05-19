<?php
error_reporting(0);
ini_set('session.save_path', '/var/lib/php/session');
ini_set('session.cookie_httponly', 1);
header('Content-Type: application/json');
header('Cache-Control: no-store, no-cache, must-revalidate');

$input = file_get_contents('php://input');
$data = json_decode($input, true);
$pwd = isset($data['password']) ? $data['password'] : '';

$hash = '4422fff10cf2f162e030bbd06f5f3c1c'; // TIMI 的 MD5

if (md5(strtoupper($pwd)) === $hash) {
    session_start();
    $_SESSION['video_auth'] = true;
    $_SESSION['auth_time'] = time();
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>