<?php
require_once __DIR__ . '/../config.php';
$user_id = $_SESSION['user_id'] ?? null;
$trail_id = $_GET['trail_id'] ?? null;
if (!$user_id) json_response(['error' => 'Not authenticated'], 401);
if (!$trail_id) json_response(['error' => 'trail_id required'], 400);
$stmt = $pdo->prepare("SELECT AVG(p.percentage) as avg_progress
FROM progress p
JOIN modules m ON p.module_id = m.id
WHERE p.user_id = ? AND m.trail_id = ?");
$stmt->execute([$user_id, $trail_id]);
$avg = $stmt->fetchColumn();
json_response(['progress' => $avg !== null ? (int)round($avg) : 0]);
