<?php
// seed.php - execute uma vez para criar o banco e usuário de teste
require_once __DIR__ . '/src/backend/config.php';

try {
    $pdo->exec("CREATE DATABASE IF NOT EXISTS educaflex_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
} catch (Exception $e) {
    echo 'DB create error: '.$e->getMessage();
    exit;
}

// create tables
$sql = file_get_contents(__DIR__ . '/schema.sql');
$pdo->exec($sql);

// create test user if not exists
$email = 'aluno@teste.com';
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);
if (!$stmt->fetch()) {
    $password = 'senha123';
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt2 = $pdo->prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)");
    $stmt2->execute(['Aluno Teste', $email, $hash]);
    echo "Usuário criado: {$email} / senha: {$password}\n";
} else {
    echo "Usuário já existe: {$email}\n";
}
