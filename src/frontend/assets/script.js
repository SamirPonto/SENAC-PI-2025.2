// C:\xampp\htdocs\educaflex-poc\src\frontend\assets\script.js

// 1. URL BASE DA API (Aponta para a pasta 'backend/')
const API_BASE_URL = 'http://localhost/educaflex-poc/src/backend/';
const USER_ID_STORAGE_KEY = 'educaflex_user_id'; // Chave para salvar o ID do usuário

// 2. FUNÇÃO GENÉRICA apiFetch (Reutilizável para todas as chamadas GET/POST)
async function apiFetch(path, method = 'GET', data = null) {
    const url = `${API_BASE_URL}${path}`;
    
    const options = {
        method: method,
        headers: {
            // Content-Type é obrigatório para enviar dados JSON no POST
            'Content-Type': 'application/json',
        },
    };

    if (data) {
        // Converte os dados JavaScript para JSON
        options.body = JSON.stringify(data); 
    }

    try {
        const response = await fetch(url, options);
        const text = await response.text();
        
        // Tenta fazer o parse do JSON. Retorna um objeto padrão se a resposta for vazia.
        return text ? JSON.parse(text) : { success: response.ok, message: 'No content received.' };

    } catch (error) {
        console.error('Erro na requisição da API:', error);
        return { success: false, message: 'Erro ao conectar com o backend ou erro de rede.' };
    }
}

// ====================================================================
// FUNÇÃO AUXILIAR: Obtém o ID do usuário logado do localStorage
// ====================================================================
function getUserId() {
    return localStorage.getItem(USER_ID_STORAGE_KEY);
}

// ====================================================================
// FUNÇÃO AUXILIAR: Remove o ID do usuário (Logout)
// ====================================================================
function logout() {
    localStorage.removeItem(USER_ID_STORAGE_KEY);
    // Redireciona para a tela de login
    window.location.href = 'index.html'; 
}

// 3. Lógica Principal (Executada após o carregamento do HTML)
document.addEventListener('DOMContentLoaded', () => {
    
    // Configura o botão Sair/Logout (se existir na página)
    // O dashboard.html precisa ter um botão com o ID 'logoutBtn'
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // ====================================================================
    // 3.1. Lógica de Cadastro (Para register.html - Passo 2)
    // ====================================================================
    const formCadastro = document.getElementById('cadastroForm');
    
    if (formCadastro) {
        const msg = document.getElementById('msg'); // Elemento de mensagem

        formCadastro.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 1. Obter e Validar dados
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const password2 = document.getElementById('password2').value; 
            const user_type = document.getElementById('user_type').value; 

            msg.textContent = '';
            if (!name || !email || !password || !password2 || !user_type) { 
                msg.textContent = 'Preencha todos os campos.'; 
                return; 
            }
            if (password !== password2) { 
                msg.textContent = 'Senhas não conferem.'; 
                return; 
            }

            const userData = { name, email, password, user_type };

            msg.textContent = 'Cadastrando...';
            msg.classList.remove('text-danger', 'text-success');
            
            // 2. CHAMADA POST CRUCIAL: auth/register.php
            const result = await apiFetch('auth/register.php', 'POST', userData);

            // 3. Tratar a Resposta
            if (result.success) {
                msg.classList.remove('text-danger');
                msg.classList.add('text-success');
                msg.textContent = 'Cadastro realizado com sucesso! Redirecionando...';
                formCadastro.reset();
                // Redireciona para o login (index.html) após 1.5s
                setTimeout(() => { window.location.href = 'index.html'; }, 1500); 
            } else {
                msg.classList.remove('text-success');
                msg.classList.add('text-danger');
                msg.textContent = result.error || result.message || 'Erro ao registrar';
            }
        });
    }

    // ====================================================================
    // 3.2. Lógica de Login (Para index.html - Implementação NOVO)
    // ====================================================================
    const formLogin = document.getElementById('loginForm');

    if (formLogin) {
        const msg = document.getElementById('msg');

        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            msg.textContent = '';
            if (!email || !password) {
                msg.textContent = 'Preencha todos os campos.';
                return;
            }

            const loginData = { email, password };
            
            msg.textContent = 'Autenticando...';
            msg.classList.remove('text-danger', 'text-success');

            // CHAMADA POST CRUCIAL: auth/login.php
            const result = await apiFetch('auth/login.php', 'POST', loginData);

            // A API de Login deve retornar {success: true, user: {id: 1, ...}}
            if (result.success && result.user && result.user.id) {
                // SALVA O ID DO USUÁRIO no armazenamento local
                localStorage.setItem(USER_ID_STORAGE_KEY, result.user.id);
                
                msg.classList.remove('text-danger');
                msg.classList.add('text-success');
                msg.textContent = 'Login bem-sucedido! Redirecionando...';

                // Redireciona para o dashboard
                setTimeout(() => { window.location.href = 'dashboard.html'; }, 500);
            } else {
                msg.classList.remove('text-success');
                msg.classList.add('text-danger');
                msg.textContent = result.error || result.message || 'E-mail ou senha inválidos.';
            }
        });
    }
    
    // ====================================================================
    // 3.3. Lógica para Carregar Dados (Dashboard e Trail) - Agora verifica login real
    // ====================================================================
    const userId = getUserId();
    const dashboardList = document.getElementById('trailsList');
    const trailTitle = document.getElementById('trailTitle');

    if (dashboardList) {
        if (userId) {
            getTrails(userId); // Chama as trilhas se o usuário estiver logado
        } else {
            // Se tentar acessar o dashboard sem login, redireciona para o login
            window.location.href = 'index.html'; 
        }
    } else if (trailTitle) {
        const urlParams = new URLSearchParams(window.location.search);
        const trailId = urlParams.get('trail_id');
        
        if (userId && trailId) {
            getTrailDetails(trailId, userId); // Chama os detalhes da trilha
        } else if (!userId) {
            window.location.href = 'index.html'; // Redireciona se não estiver logado
        } else {
            trailTitle.textContent = 'Erro: Trilha não especificada.';
        }
    }
});


// ====================================================================
// 4. Lógica para Listar Trilhas (Passo 3)
// ====================================================================
async function getTrails(userId) {
    const trailsListElement = document.getElementById('trailsList');
    if (!trailsListElement) return;

    trailsListElement.innerHTML = '<p>Buscando dados das trilhas...</p>';

    // Chamada da API GET api/get_trails.php
    const endpoint = `api/get_trails.php?user_id=${userId}`;
    const result = await apiFetch(endpoint, 'GET');
    
    // Assumimos que a resposta JSON tem o formato: {"trails": [ {...} ]}
    const trails = result.trails; 

    if (trails && Array.isArray(trails) && trails.length > 0) {
        trailsListElement.innerHTML = trails.map(trail => `
            <div class="card p-3 mb-3">
                <h4 class="text-primary">${trail.title}</h4>
                <p class="text-muted">${trail.description}</p>
                <p>Módulos: <b>${trail.modules_count}</b></p>
                <p>Progresso: <b class="text-success">${trail.progress || 0}%</b></p>
                                <button class="btn btn-sm btn-outline-primary" onclick="window.location.href='trail.html?trail_id=${trail.id}'">Acessar Módulos</button>
            </div>
        `).join('');
    } else {
        trailsListElement.innerHTML = '<p class="text-warning">Nenhuma trilha encontrada ou erro ao carregar dados.</p>';
    }
}


// ====================================================================
// 5. Lógica para Detalhes da Trilha e Módulos (Passo 4a)
// ====================================================================
async function getTrailDetails(trailId, userId) {
    const moduleListElement = document.getElementById('moduleList');
    const titleElement = document.getElementById('trailTitle');
    
    if (!moduleListElement) return;

    moduleListElement.innerHTML = '<p>Buscando detalhes da trilha e módulos...</p>';
    titleElement.textContent = 'Carregando...';

    // Chamada da API GET api/get_trail_details.php
    const endpoint = `api/get_trail_details.php?trail_id=${trailId}&user_id=${userId}`;
    const result = await apiFetch(endpoint, 'GET');
    
    const trail = result.trail;

    // Verifica se a trilha e os módulos existem
    if (trail && trail.modules && Array.isArray(trail.modules)) {
        titleElement.textContent = `Trilha: ${trail.title}`; 
        
        const descElement = document.getElementById('trailDescription');
        if (descElement) {
            descElement.textContent = trail.description; 
        }

        // Renderiza a lista de módulos
        moduleListElement.innerHTML = trail.modules.map(module => `
            <div class="card p-3 mb-2">
                <h5>${module.title}</h5>
                <p class="small">${module.description}</p>
                <p>Status: <b class="${module.is_completed ? 'text-success' : 'text-danger'}">${module.is_completed ? 'Concluído' : 'Pendente'}</b></p>
                <p class="small text-muted">Tipo: ${module.type}</p>
                
                <button class="btn btn-sm btn-outline-primary mt-1" onclick="alert('Abrir o recurso para ${module.title}')">Abrir Módulo</button>
                
                ${!module.is_completed ? 
                    `<button class="btn btn-sm btn-success mt-1" onclick="updateProgress(${module.id}, ${userId})">Marcar como Concluído</button>`
                    : ''
                }
            </div>
        `).join('');
    } else {
        titleElement.textContent = 'Trilha Não Encontrada';
        moduleListElement.innerHTML = '<p class="text-danger">Erro ao carregar trilha. Verifique o backend (get_trail_details.php) e os dados de teste.</p>';
    }
}


// ====================================================================
// 6. Lógica para Atualizar Progresso (Passo 4b - Implementação Real)
// ====================================================================
async function updateProgress(moduleId, userId) {
    if (!confirm("Tem certeza que deseja marcar este módulo como concluído?")) {
        return; // Usuário cancelou
    }

    const data = {
        module_id: moduleId,
        user_id: userId,
        percentage: 100 // Hardcode para 100%
    };

    console.log(`Tentando atualizar progresso do módulo ${moduleId}...`);

    // Chamada da API POST api/update_progress.php
    const result = await apiFetch('api/update_progress.php', 'POST', data);
    
    if (result.success) {
        alert("Progresso atualizado com sucesso!");
        
        // Após o sucesso, recarregar os detalhes da trilha para atualizar o estado da tela
        const urlParams = new URLSearchParams(window.location.search);
        const trailId = urlParams.get('trail_id');

        if (trailId) {
            getTrailDetails(trailId, userId); // Reuso da função 5.
        }
    } else {
        alert(`Erro ao atualizar progresso: ${result.error || result.message || 'Erro desconhecido.'}`);
    }
}