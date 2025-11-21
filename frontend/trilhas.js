/**
 * Arquivo de Mock de Dados (Simulação de Banco de Dados) para o Frontend EducaFlex.
 * Este arquivo contém as informações de todas as trilhas, aulas e quizzes.
 *
 * NOTA: Este arquivo será substituído pela integração com o Firebase/Firestore no futuro.
 */

// Dados das Trilhas de Aprendizagem
const mockTrilhasData = [
    {
        id: 'direito-adm',
        nome: 'Direito Administrativo para Concursos',
        descricao: 'Foco na legislação e jurisprudência essenciais para carreiras públicas.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>',
        progressoAtual: 40,
        totalAulas: 10,
        aulas: [
            { id: 1, titulo: 'Aula 01: Conceitos Fundamentais, Fontes e Princípios', videoId: 'dF2VC4JrwEo' },
            { id: 2, titulo: 'Aula 02: Regime Jurídico Administrativo (Base e Restrições)', videoId: 'grclGajkRKg' },
            { id: 3, titulo: 'Aula 03: Organização da Administração Pública (Centralização e Descentralização)', videoId: 'ct-2Tj_ja7s' },
            { id: 4, titulo: 'Aula 04: Princípios Expressos (L.I.M.P.E.) e Implícitos', videoId: 'Z4JWZCJf-Gc' },
            { id: 5, titulo: 'Aula 05: Princípios Implícitos (Razoabilidade e Proporcionalidade)', videoId: 'otGxm90I1c0' },
        ]
    },
    {
        id: 'full-stack',
        nome: 'Desenvolvimento Full Stack Moderno',
        descricao: 'Aprenda a criar aplicações web completas com React e Node.js.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>',
        progressoAtual: 75,
        totalAulas: 12,
        aulas: [
            // Vídeos confirmados para todas as aulas
            { id: 1, titulo: 'Aula 01: Introdução ao JavaScript Moderno (ES6+)', videoId: 'x7q-D1R7-qY' },
            { id: 2, titulo: 'Aula 02: Fundamentos de React - Componentes e Props', videoId: 'yO6UuF-H62M' },
            { id: 3, titulo: 'Aula 03: Gerenciamento de Estado com Hooks', videoId: 'aB2UuF-H77R' },
            { id: 4, titulo: 'Aula 04: APIs RESTful com Node.js e Express', videoId: 'vC3UuF-H3PZ' },
        ]
    },
    {
        id: 'gestao-turmas',
        nome: 'Gestão Eficaz de Turmas e Feedback',
        descricao: 'Técnicas e ferramentas para professores gerenciarem grandes grupos online.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M7 15c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M17 15v-2a3 3 0 00-5.356-1.857M17 15H7m0 0v-2c0-.656-.126-1.283-.356-1.857" /></svg>',
        progressoAtual: 10,
        totalAulas: 8,
        aulas: [
            { id: 1, titulo: 'Aula 01: Mapeamento de Perfis de Alunos', videoId: 'jA1UuF-H1Dk' },
            { id: 2, titulo: 'Aula 02: Ferramentas de Comunicação Assíncrona', videoId: 'pS2UuF-H2Ew' },
            { id: 3, titulo: 'Aula 03: Estratégias de Feedback Construtivo', videoId: 'iT3UuF-H3Rz' },
        ]
    }
];

// Dados Mock dos Quizzes (Mantidos separados para facilitar a busca)
const mockQuizData = {
    // QUIZES TRILHA DIREITO ADMINISTRATIVO
    
    // Quiz para Aula 1 (Original)
    'direito-adm-1': {
        pergunta: 'Qual o princípio que exige que todo ato administrativo seja motivado e transparente?',
        opcoes: ['Legalidade', 'Moralidade', 'Publicidade', 'Impessoalidade'],
        respostaCorreta: 'Publicidade'
    },
    
    // Quiz para Aula 2
    'direito-adm-2': {
        pergunta: 'Qual o principal fundamento do Regime Jurídico Administrativo que confere à Administração Pública uma posição de superioridade sobre o particular?',
        opcoes: [
            'Princípio da Legalidade',
            'Princípio da Supremacia do Interesse Público',
            'Princípio da Indisponibilidade do Interesse Público',
            'Princípio da Isonomia'
        ],
        respostaCorreta: 'Princípio da Supremacia do Interesse Público'
    },

    // Quiz para Aula 3: Organização da Administração Pública
    'direito-adm-3': {
        pergunta: 'No contexto da Organização da Administração Pública, o que é a descentralização?',
        opcoes: [
            'Distribuição interna de competências dentro do mesmo órgão.',
            'Criação de novas entidades, com personalidade jurídica própria, para executar serviços.',
            'Concentração de funções em um único ente da Federação.',
            'Transferência de execução de serviço para a iniciativa privada (concessão).'
        ],
        respostaCorreta: 'Criação de novas entidades, com personalidade jurídica própria, para executar serviços.'
    },

    // Quiz para Aula 4: Princípios Expressos (L.I.M.P.E.) e Implícitos
    'direito-adm-4': {
        pergunta: 'O Princípio da Impessoalidade, previsto no art. 37 da Constituição, está relacionado a qual ideia fundamental?',
        opcoes: [
            'Exigência de concurso público para todos os cargos.',
            'Necessidade de o agente público atuar buscando o interesse público, sem promoção pessoal.',
            'Publicação obrigatória de todos os atos no Diário Oficial.',
            'Atuação conforme a lei, sem margem para discricionariedade.'
        ],
        respostaCorreta: 'Necessidade de o agente público atuar buscando o interesse público, sem promoção pessoal.'
    },

    // Quiz para Aula 5: Princípios Implícitos (Razoabilidade e Proporcionalidade)
    'direito-adm-5': {
        pergunta: 'Embora sejam frequentemente utilizados juntos, o Princípio da Proporcionalidade exige uma relação de adequação entre:',
        opcoes: [
            'O agente público e o cargo ocupado.',
            'A lei e o ato administrativo que a executa.',
            'Os meios empregados pela Administração e os fins que ela pretende alcançar.',
            'A validade do ato e sua publicidade.'
        ],
        respostaCorreta: 'Os meios empregados pela Administração e os fins que ela pretende alcançar.'
    },

    // QUIZES TRILHA FULL STACK (Com vídeos e quizzes configurados)
    
    // Quiz para Aula 1: Introdução ao JavaScript Moderno (ES6+)
    'full-stack-1': {
        pergunta: 'Qual característica do ES6+ permite escrever funções que lidam com operações assíncronas de forma mais legível?',
        opcoes: ['Classes', 'Spread Operator', 'Arrow Functions', 'Async/Await'],
        respostaCorreta: 'Async/Await'
    },

    // Quiz para Aula 2: Fundamentos de React - Componentes e Props
    'full-stack-2': {
        pergunta: 'No React, qual é a principal diferença entre Componentes de Classe e Componentes Funcionais (utilizando Hooks)?',
        opcoes: [
            'Componentes de Classe são mais rápidos em renderização.',
            'Componentes Funcionais são mais antigos e menos recomendados.',
            'Componentes Funcionais com Hooks são a abordagem moderna e permitem gerenciar estado e ciclo de vida sem classes.',
            'Props só podem ser usadas em Componentes de Classe.'
        ],
        respostaCorreta: 'Componentes Funcionais com Hooks são a abordagem moderna e permitem gerenciar estado e ciclo de vida sem classes.'
    },
    
    // Quiz para Aula 3: Gerenciamento de Estado com Hooks
    'full-stack-3': {
        pergunta: 'Qual o Hook do React é usado para adicionar estado a um componente funcional?',
        opcoes: [
            'useEffect',
            'useContext',
            'useReducer',
            'useState'
        ],
        respostaCorreta: 'useState'
    },
    
    // Quiz para Aula 4: APIs RESTful com Node.js e Express
    'full-stack-4': {
        pergunta: 'Em uma API RESTful, qual método HTTP é tipicamente usado para solicitar a criação de um novo recurso no servidor?',
        opcoes: [
            'GET',
            'PUT',
            'POST',
            'DELETE'
        ],
        respostaCorreta: 'POST'
    },

    // QUIZ TRILHA GESTÃO DE TURMAS
    'gestao-turmas-1': {
        pergunta: 'Qual é a primeira etapa para otimizar o processo de gestão em uma nova turma online?',
        opcoes: ['Criar um plano de aulas detalhado', 'Mapear os perfis e expectativas dos alunos', 'Definir as notas de corte', 'Distribuir os materiais digitais'],
        respostaCorreta: 'Mapear os perfis e expectativas dos alunos'
    }
};

// Funções utilitárias (podem ser exportadas em um ambiente de módulos)
function getTrilhas() {
    return mockTrilhasData;
}

function getTrilhaById(id) {
    return mockTrilhasData.find(t => t.id === id);
}

function getAula(trilhaId, aulaId) {
    const trilha = getTrilhaById(trilhaId);
    if (!trilha) return null;
    return trilha.aulas.find(a => a.id === aulaId);
}

function getQuiz(trilhaId, aulaId) {
    const quizKey = `${trilhaId}-${aulaId}`;
    return mockQuizData[quizKey] || {
        pergunta: 'Quiz indisponível para esta aula.',
        opcoes: [],
        respostaCorreta: ''
    };
}

// Em um ambiente de navegador, as funções são globais ou usadas internamente.
// Para fins de simplificação na PoC, vamos usar as funções de acesso (getTrilhas, getAula, getQuiz).