<?php
require_once __DIR__ . '/../config.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['error' => 'Method not allowed'], 405);
$user_id = $_SESSION['user_id'] ?? null;
if (!$user_id) json_response(['error' => 'Not authenticated'], 401);
$data = json_decode(file_get_contents('php://input'), true);
$module_id = (int)($data['module_id'] ?? 0);
$percentage = (int)($data['percentage'] ?? 0);
if (!$module_id || $percentage < 0 || $percentage > 100) {
    json_response(['error' => 'Dados inválidos'], 400);
}
try {
    $stmt = $pdo->prepare("INSERT INTO progress (user_id, module_id, percentage) VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE percentage = VALUES(percentage), updated_at = CURRENT_TIMESTAMP");
    $stmt->execute([$user_id, $module_id, $percentage]);
    json_response(['success' => true]);
} catch (Exception $e) {
    json_response(['error' => 'DB error: ' . $e->getMessage()], 500);
}
