// C:\xampp\htdocs\educaflex-poc\src\frontend\assets\script.js

// 1. URL BASE DA API (Aponta para a pasta 'backend/')
const API_BASE_URL = 'http://localhost/educaflex-poc/src/backend/';
const USER_ID_STORAGE_KEY = 'educaflex_user_id'; // Chave para salvar o ID do usuário
const USER_NAME_STORAGE_KEY = 'educaflex_user_name'; // Chave para salvar o nome do usuário

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
// FUNÇÕES AUXILIARES
// ====================================================================
function getUserId() {
    return localStorage.getItem(USER_ID_STORAGE_KEY);
}

function getUserName() {
    return localStorage.getItem(USER_NAME_STORAGE_KEY);
}

// ====================================================================
// FUNÇÃO AUXILIAR: Remove o ID e o Nome do usuário (Logout)
// ====================================================================
function logout() {
    localStorage.removeItem(USER_ID_STORAGE_KEY);
    localStorage.removeItem(USER_NAME_STORAGE_KEY); 
    // Redireciona para a tela de login
    window.location.href = 'index.html'; 
}

// 3. Lógica Principal (Executada após o carregamento do HTML)
document.addEventListener('DOMContentLoaded', () => {
    
    // Configura o botão Sair/Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // ====================================================================
    // 3.1. Lógica de Cadastro (Para register.html)
    // ====================================================================
    const formCadastro = document.getElementById('cadastroForm');
    
    if (formCadastro) {
        const msg = document.getElementById('msg');

        formCadastro.addEventListener('submit', async (e) => {
            e.preventDefault();

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
            
            const result = await apiFetch('auth/register.php', 'POST', userData);

            if (result.success) {
                msg.classList.remove('text-danger');
                msg.classList.add('text-success');
                msg.textContent = 'Cadastro realizado com sucesso! Redirecionando...';
                formCadastro.reset();
                setTimeout(() => { window.location.href = 'index.html'; }, 1500); 
            } else {
                msg.classList.remove('text-success');
                msg.classList.add('text-danger');
                msg.textContent = result.error || result.message || 'Erro ao registrar';
            }
        });
    }

    // ====================================================================
    // 3.2. Lógica de Login (Para index.html)
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

            const result = await apiFetch('auth/login.php', 'POST', loginData);

            if (result.success && result.user && result.user.id) {
                localStorage.setItem(USER_ID_STORAGE_KEY, result.user.id);
                
                const userName = result.user.name || 'Aluno'; 
                localStorage.setItem(USER_NAME_STORAGE_KEY, userName); 

                msg.classList.remove('text-danger');
                msg.classList.add('text-success');
                msg.textContent = 'Login bem-sucedido! Redirecionando...';

                setTimeout(() => { window.location.href = 'dashboard.html'; }, 500);
            } else {
                msg.classList.remove('text-success');
                msg.classList.add('text-danger');
                msg.textContent = result.error || result.message || 'E-mail ou senha inválidos.';
            }
        });
    }
    
    // ====================================================================
    // 3.3. Lógica de Roteamento e Carregamento de Dados
    // ====================================================================
    const userId = getUserId();
    const dashboardList = document.getElementById('trailsList');
    const trailTitle = document.getElementById('trailTitle');
    const profileDetails = document.getElementById('profileDetails'); 
    const welcomeMessage = document.getElementById('welcomeMessage'); 

    // Se o usuário não estiver logado E não estiver na tela de Login/Cadastro, redireciona para o Login
    if (!userId && window.location.pathname.indexOf('index.html') === -1 && window.location.pathname.indexOf('register.html') === -1) {
        window.location.href = 'index.html';
        return; 
    }
    
    // Roteamento:
    if (dashboardList) {
        // Lógica da Dashboard
        if (welcomeMessage) {
            const userName = getUserName() || 'Aluno';
            welcomeMessage.textContent = `Olá, ${userName}!`;
        }
        getTrails(userId); 
    } else if (trailTitle) {
        // Lógica da Trilha
        const urlParams = new URLSearchParams(window.location.search);
        const trailId = urlParams.get('trail_id');
        
        if (trailId) {
            getTrailDetails(trailId, userId); 
        } else {
            trailTitle.textContent = 'Erro: Trilha não especificada.';
        }
    } else if (profileDetails) {
        // Lógica da Tela de Perfil
        loadUserProfile(userId);
    }
});


// ====================================================================
// 4. Lógica para Listar Trilhas
// ====================================================================
async function getTrails(userId) {
    const trailsListElement = document.getElementById('trailsList');
    if (!trailsListElement) return;

    trailsListElement.innerHTML = '<p>Buscando dados das trilhas...</p>';

    const endpoint = `api/get_trails.php?user_id=${userId}`;
    const result = await apiFetch(endpoint, 'GET');
    
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
// 5. Lógica para Detalhes da Trilha e Módulos - CORRIGIDA E FINAL
// ====================================================================
async function getTrailDetails(trailId, userId) {
    const moduleListElement = document.getElementById('moduleList');
    const titleElement = document.getElementById('trailTitle');
    
    if (!moduleListElement) return;

    moduleListElement.innerHTML = '<p>Buscando detalhes da trilha e módulos...</p>';
    titleElement.textContent = 'Carregando...';

    const endpoint = `api/get_trail_details.php?trail_id=${trailId}&user_id=${userId}`;
    const result = await apiFetch(endpoint, 'GET');
    
    const trail = result.trail;

    if (trail && trail.modules && Array.isArray(trail.modules)) {
        titleElement.textContent = trail.title; 
        
        const descElement = document.getElementById('trailDescription');
        if (descElement) {
            descElement.textContent = trail.description; 
        }

        // Adiciona o progresso total
        const progressTotalElement = document.getElementById('progressTotal');
        if (progressTotalElement) {
            // Calcula o progresso total da trilha a partir dos módulos (se não vier do Backend)
            const completedModules = trail.modules.filter(m => m.is_completed).length;
            const totalModules = trail.modules.length;
            const progressPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

            progressTotalElement.textContent = `Progresso da trilha: ${progressPercent}%`;
            const progressBar = document.getElementById('trailProgressBar');
            if (progressBar) {
                progressBar.style.width = `${progressPercent}%`;
                progressBar.setAttribute('aria-valuenow', progressPercent);
            }
        }

        
 // CÓDIGO A SER SUBSTITUÍDO DENTRO DE getTrailDetails:

// ... (Linha 358 - dentro de moduleListElement.innerHTML = trail.modules.map...)

        moduleListElement.innerHTML = trail.modules.map((module, index) => {
            // NOVO CÓDIGO: Usa a porcentagem real (ou 0 se for null)
            const currentProgress = module.progress_percentage || 0; 
            
            // Define o texto e a classe do status de conclusão
            const statusText = `Concluído: ${currentProgress}%`;
            const statusClass = currentProgress === 100 ? 'text-success' : 'text-danger';

            // Define qual botão de ação será exibido
            let actionButtonHTML;
            
            if (currentProgress === 100) {
                // BOTÃO DESMARCAR (Se 100%)
                actionButtonHTML = `<button class="btn btn-sm btn-warning" onclick="updateProgress(${module.id}, ${userId}, 0)">Desmarcar</button>`;
            } else {
                // BOTÃO MARCAR (Se 0% ou qualquer outro valor)
                actionButtonHTML = `<button class="btn btn-sm btn-primary" onclick="updateProgress(${module.id}, ${userId}, 100)">Marcar 100%</button>`;
            }


            return `
                <div class="card-body module-item d-flex justify-content-between align-items-start">
                    <div class="module-info">
                        <h5 class="mb-0">${index + 1}. ${module.title}</h5>
                        <p class="small text-muted mb-1">${module.type} • <a href="${module.url}" target="_blank">${module.url}</a></p>
                    </div>
                    <div class="module-actions d-flex flex-column align-items-end">
                        <span class="${statusClass} mb-1 small">${statusText}</span>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-info" onclick="window.open('${module.url}', '_blank')">Abrir</button>
                            ${actionButtonHTML}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } else {
        titleElement.textContent = 'Trilha Não Encontrada';
        moduleListElement.innerHTML = '<p class="text-danger">Erro ao carregar trilha. Verifique o backend (get_trail_details.php) e os dados de teste.</p>';
    }
}


// ====================================================================
// 6. Lógica para Atualizar Progresso - AJUSTADA PARA ACEITAR PERCENTUAL
// ====================================================================
async function updateProgress(moduleId, userId, percentage) {
    let confirmationMessage;
    let successMessage;

    if (percentage === 100) {
        confirmationMessage = "Tem certeza que deseja marcar este módulo como CONCLUÍDO?";
        successMessage = "Módulo marcado como concluído!";
    } else if (percentage === 0) {
        confirmationMessage = "Tem certeza que deseja DESMARCAR a conclusão deste módulo?";
        successMessage = "Módulo desmarcado com sucesso. Progresso resetado!";
    } else {
        // Caso o percentual seja diferente de 0 ou 100
        confirmationMessage = `Tem certeza que deseja atualizar o progresso para ${percentage}%?`;
        successMessage = `Progresso atualizado para ${percentage}%!`;
    }

    if (!confirm(confirmationMessage)) {
        return; 
    }

    const data = {
        module_id: moduleId,
        user_id: userId,
        percentage: percentage 
    };

    console.log(`Tentando atualizar progresso do módulo ${moduleId} para ${percentage}%...`);

    const result = await apiFetch('api/update_progress.php', 'POST', data);
    
    if (result.success) {
        alert(successMessage);
        
        // Recarrega os detalhes da trilha para atualizar a lista
        const urlParams = new URLSearchParams(window.location.search);
        const trailId = urlParams.get('trail_id');

        if (trailId) {
            getTrailDetails(trailId, userId); 
        }
    } else {
        alert(`Erro ao atualizar progresso: ${result.error || result.message || 'Erro desconhecido.'}`);
    }
}


// ====================================================================
// 7. Lógica para Carregar o Perfil e Progresso Global
// ====================================================================
async function loadUserProfile(userId) {
    // 1. Carregar Detalhes Básicos (Nome e E-mail) do Cache
    document.getElementById('userName').textContent = getUserName() || 'Não disponível';
    
    // 2. Tentar Obter Dados do Perfil e Progresso Global da API
    const endpoint = `api/get_user_profile.php?user_id=${userId}`;
    const result = await apiFetch(endpoint, 'GET');

    if (result.success && result.user) {
        // A. Atualizar Detalhes
        document.getElementById('userEmail').textContent = result.user.email || 'Não disponível';
        document.getElementById('userType').textContent = result.user.type || 'Não disponível';

        // B. Atualizar Progresso Global
        if (result.progress) {
            const completed = result.progress.completed_trails || 0;
            const total = result.progress.total_trails || 0;
            const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
            
            document.getElementById('completedTrails').textContent = completed;
            document.getElementById('totalTrails').textContent = total;
            
            const progressBar = document.getElementById('globalProgressBar');
            progressBar.style.width = `${percentage}%`;
            progressBar.setAttribute('aria-valuenow', percentage);
            progressBar.textContent = `${percentage}%`;
        }
    } else {
        // Exibir mensagem de erro ou de API indisponível
        document.getElementById('globalProgress').innerHTML = `
            <h4>Progresso Total nas Trilhas</h4>
            <p class="text-danger">Erro ao carregar o progresso global. API (get_user_profile.php) indisponível ou dados incompletos.</p>
        `;
    }
}