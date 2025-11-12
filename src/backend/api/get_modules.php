<?php
require_once __DIR__ . '/../config.php';
$trail_id = $_GET['trail_id'] ?? null;
$user_id = $_SESSION['user_id'] ?? null;
if (!$trail_id) json_response(['error' => 'trail_id required'], 400);
$stmt = $pdo->prepare("SELECT id, title, type, content_url, module_order FROM modules WHERE trail_id = ? ORDER BY module_order");
$stmt->execute([$trail_id]);
$modules = $stmt->fetchAll();
if ($user_id) {
    foreach ($modules as &$m) {
        $stmt2 = $pdo->prepare("SELECT percentage FROM progress WHERE user_id = ? AND module_id = ?");
        $stmt2->execute([$user_id, $m['id']]);
        $p = $stmt2->fetchColumn();
        $m['percentage'] = $p !== false ? (int)$p : 0;
    }
}
json_response(['modules' => $modules]);
