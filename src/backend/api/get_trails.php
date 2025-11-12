<?php
require_once __DIR__ . '/../config.php';
$user_id = $_SESSION['user_id'] ?? null;
$sql = "SELECT t.id, t.title, t.description,
       (SELECT COUNT(*) FROM modules m WHERE m.trail_id = t.id) as modules_count
       FROM trails t
       ORDER BY t.id";
$stmt = $pdo->query($sql);
$trails = $stmt->fetchAll();
if ($user_id) {
    foreach ($trails as &$t) {
        $sql2 = "SELECT COUNT(*) as total_modules FROM modules WHERE trail_id = ?";
        $stmt2 = $pdo->prepare($sql2);
        $stmt2->execute([$t['id']]);
        $tm = (int)$stmt2->fetchColumn();
        if ($tm === 0) { $t['progress'] = 0; continue; }
        $sql3 = "SELECT AVG(percentage) as avgp FROM progress p
                 JOIN modules m ON p.module_id = m.id
                 WHERE m.trail_id = ? AND p.user_id = ?";
        $stmt3 = $pdo->prepare($sql3);
        $stmt3->execute([$t['id'], $user_id]);
        $avg = $stmt3->fetchColumn();
        $t['progress'] = $avg !== null ? (int)round($avg) : 0;
    }
}
json_response(['trails' => $trails]);
