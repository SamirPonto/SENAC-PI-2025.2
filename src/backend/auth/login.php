<?php
require_once __DIR__ . '/../config.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}
$data = json_decode(file_get_contents('php://input'), true);
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
if (!$email || !$password) {
    json_response(['error' => 'Email e senha são obrigatórios'], 400);
}
$stmt = $pdo->prepare("SELECT id, name, email, password_hash FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();
if (!$user || !password_verify($password, $user['password_hash'])) {
    json_response(['error' => 'Credenciais inválidas'], 401);
}
$_SESSION['user_id'] = $user['id'];
$_SESSION['user_name'] = $user['name'];
json_response(['success' => true, 'user' => ['id' => $user['id'], 'name' => $user['name'], 'email' => $user['email']]]);
