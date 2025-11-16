// C:\xampp\htdocs\educaflex-poc\src\frontend\assets\script.js

// 1. URL BASE DA API (Aponta para a pasta 'backend/')
const API_BASE_URL = 'http://localhost/educaflex-poc/src/backend/';

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

// 3. Lógica Principal (Executada após o carregamento do HTML)
document.addEventListener('DOMContentLoaded', () => {
    
    // ====================================================================
    // 3.1. Lógica de Cadastro (Para register.html - Passo 2)
    // ====================================================================
    const form = document.getElementById('cadastroForm');
    
    if (form) {
        const msg = document.getElementById('msg'); // Elemento de mensagem

        form.addEventListener('submit', async (e) => {
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
                form.reset();
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
    // 3.2. Lógica de Dashboard (Para dashboard.html - Início do Passo 3)
    // ====================================================================
    const trailsListElement = document.getElementById('trailsList');
    if (trailsListElement) {
        // Simulação de login: Usamos o ID de um aluno de teste (ex: 1) para carregar as trilhas
        getTrails(1); 
    }
});

// ====================================================================
// 4. Lógica para Listar Trilhas (Passo 3 - Implementação fora do DOMContentLoaded)
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
                <p>Progresso: <b class="text-success">0%</b></p>
                <button class="btn btn-sm btn-outline-primary" onclick="window.location.href='trail.html?id=${trail.id}'">Acessar Módulos</button>
            </div>
        `).join('');
    } else {
        trailsListElement.innerHTML = '<p class="text-warning">Nenhuma trilha encontrada ou erro ao carregar dados.</p>';
    }
}


// ====================================================================
// 5. Lógica para Consultar Progresso (Passo 4 - Placeholder)
// ====================================================================
// Esta função será implementada na próxima etapa e chamada no progresso.html
async function getProgress(userId) {
    // Implementação do Passo 4 virá aqui.
}