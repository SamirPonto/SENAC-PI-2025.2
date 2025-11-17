# Documentação Técnica do Frontend - EducaFlex PoC

## 1. Tecnologias Utilizadas

* **Estrutura:** HTML5
* **Estilização:** Bootstrap 5.3.x e `assets/css/style.css` (customizações)
* **Lógica:** JavaScript Vanilla (`assets/script.js`)

## 2. Estrutura de Arquivos Principais

| Arquivo | Propósito | Dependências |
| :--- | :--- | :--- |
| **index.html** | Tela de Login (Ponto de entrada) | `loginForm` |
| **register.html** | Tela de Cadastro | `cadastroForm` |
| **dashboard.html** | Tela Principal (Lista de Trilhas) | `trailsList`, `welcomeMessage`, `logoutBtn` |
| **trail.html** | Detalhes de uma Trilha (Lista de Módulos) | Query string `?trail_id=X` |

## 3. Variáveis de Ambiente e Armazenamento

O `script.js` utiliza o `localStorage` do navegador para persistir o estado de autenticação:

| Variável | Uso |
| :--- | :--- |
| `API_BASE_URL` | Define o ponto de acesso ao Backend: `http://localhost/educaflex-poc/src/backend/` |
| `educaflex_user_id` | Armazena o ID do usuário após um Login bem-sucedido. Usado para carregar trilhas e progresso. |
| `educaflex_user_name` | Armazena o Nome do usuário para exibição de boas-vindas no Dashboard. |

## 4. Chamadas Cruciais para o Backend

Todas as chamadas são gerenciadas pela função `apiFetch(path, method, data)` em `script.js`.

* `auth/register.php` (POST)
* `auth/login.php` (POST)
* `api/get_trails.php` (GET com `user_id`)
* `api/get_trail_details.php` (GET com `trail_id` e `user_id`)
* `api/update_progress.php` (POST para `module_id` e `user_id`)