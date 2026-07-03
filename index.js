// ==========================================================================
// ALTERNADOR DE MODO CLARO / ESCURO (LIGHT / DARK MODE)
// ==========================================================================
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    let newTheme = 'dark';

    if (currentTheme === 'dark') {
        newTheme = 'light';
        themeToggleBtn.innerHTML = '<span class="icon">🌙</span>';
    } else {
        newTheme = 'dark';
        themeToggleBtn.innerHTML = '<span class="icon">☀️</span>';
    }

    htmlElement.setAttribute('data-theme', newTheme);
});

// ==========================================================================
// ANIMAÇÃO DE SCROLL (REVELAR ELEMENTOS E DISPARAR GRÁFICOS/CONTADORES)
// ==========================================================================
const scrollElements = document.querySelectorAll('.scroll-animate');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('active');
    
    // Se a seção visível contiver o gráfico, anima as barras
    if(element.id === 'dados') {
        animarGrafico();
    }
    // Se a seção visível contiver os contadores, anima os números
    if(element.id === 'curiosidades') {
        animarContadores();
    }
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
    handleBackToTopButton();
});

// Animação das Barras do Gráfico
function animarGrafico() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        const progress = bar.style.getPropertyValue('--progress');
        bar.style.width = progress;
    });
}

// Animação Progressiva dos Contadores Numéricos
let contadoresAtivados = false;
function animarContadores() {
    if (contadoresAtivados) return;
    contadoresAtivados = true;

    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = 40; // Quanto menor, mais rápido
        const increment = target / speed;

        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 25);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// ==========================================================================
// SEÇÃO INTERATIVA: CALCULADORA DE ECONOMIA DIGITAL
// ==========================================================================
function calcularEconomia() {
    const hoursInput = document.getElementById('hours-input').value;
    const resultBox = document.getElementById('calc-result');
    const resHoras = document.getElementById('res-horas');

    if(hoursInput && hoursInput > 0) {
        // Cálculo simulado: Redução de até 60% do tempo gasto anualmente (52 semanas)
        const economiaAnual = Math.round((hoursInput * 52) * 0.6);
        resHoras.innerText = economiaAnual;
        resultBox.classList.remove('hidden');
    } else {
        alert('Por favor, insira um número válido de horas.');
    }
}

// ==========================================================================
// SEÇÃO INTERATIVA: COMPARADOR DINÂMICO
// ==========================================================================
const dadosComparacao = {
    processos: {
        legacy: "Processos manuais em papel, levando até 5 dias úteis por lote de arquivos.",
        tech: "Sistemas em nuvem criptografados e indexados de forma imediata e automatizada."
    },
    comunicacao: {
        legacy: "Múltiplos e-mails perdidos em caixas de entrada lotadas e ruídos de entrega.",
        tech: "Plataformas de comunicação centralizadas e assíncronas com histórico indexado."
    },
    armazenamento: {
        legacy: "Arquivos físicos em salas dedicadas, vulneráveis a danos e difíceis de buscar.",
        tech: "Armazenamento escalável e redundante em múltiplos servidores globais protegidos."
    }
};

function atualizarComparacao() {
    const select = document.getElementById('compare-select');
    const valorSelecionado = select.value;
    
    const legacyText = document.getElementById('comp-legacy');
    const techText = document.getElementById('comp-tech');

    // Transição suave ao alterar texto
    legacyText.style.opacity = 0;
    techText.style.opacity = 0;

    setTimeout(() => {
        legacyText.innerText = dadosComparacao[valorSelecionado].legacy;
        techText.innerText = dadosComparacao[valorSelecionado].tech;
        legacyText.style.opacity = 1;
        techText.style.opacity = 1;
    }, 200);
}

// ==========================================================================
// BOTÃO VOLTAR AO TOPO
// ==========================================================================
const backToTopBtn = document.getElementById('back-to-top');

function handleBackToTopButton() {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Inicialização imediata caso elementos já estejam na tela ao carregar
window.addEventListener('load', handleScrollAnimation);
