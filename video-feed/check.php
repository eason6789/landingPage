<?php
error_reporting(0);
ini_set('session.save_path', '/var/lib/php/session');
ini_set('session.cookie_httponly', 1);
header('Content-Type: application/json');
header('Cache-Control: no-store, no-cache, must-revalidate');

session_start();

if (session_status() === PHP_SESSION_ACTIVE) {
    $authenticated = false;
    if (isset($_SESSION['video_auth']) && $_SESSION['video_auth'] === true) {
        if (isset($_SESSION['auth_time']) && (time() - $_SESSION['auth_time']) < 3600) {
            $authenticated = true;
        }
    }
} else {
    $authenticated = false;
}

echo json_encode(['authenticated' => $authenticated]);
?>