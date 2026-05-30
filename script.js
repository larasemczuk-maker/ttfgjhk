// Controle de abas
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class de todos os botões e conteúdos
            buttons.forEach(btn => btn.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));
            
            // Adiciona active class no botão e conteúdo clicados
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

// Dados de consumo das culturas (em mm/dia)
const culturaDados = {
    tomate: { min: 4, max: 6, nome: 'Tomate' },
    milho: { min: 5, max: 8, nome: 'Milho' },
    arroz: { min: 6, max: 10, nome: 'Arroz' },
    trigo: { min: 3, max: 5, nome: 'Trigo' },
    cafe: { min: 2, max: 4, nome: 'Café' }
};

// Calculadora de água
function calcularAgua() {
    const cultura = document.getElementById('cultura').value;
    const area = parseFloat(document.getElementById('area').value);
    const eficiencia = parseFloat(document.getElementById('eficiencia').value);
    
    // Validações
    if (isNaN(area) || area <= 0) {
        alert('Por favor, insira uma área válida (maior que 0).');
        return;
    }
    
    if (isNaN(eficiencia) || eficiencia < 30 || eficiencia > 100) {
        alert('Por favor, insira uma eficiência entre 30% e 100%.');
        return;
    }
    
    // Consumo médio da cultura (mm/dia)
    const dadosCultura = culturaDados[cultura];
    const consumoMedio = (dadosCultura.min + dadosCultura.max) / 2;
    
    // Cálculo: 1 mm sobre 1 m² = 1 litro
    // Água necessária por dia = (consumo em mm) * área em m²
    const aguaNecessariaDia = consumoMedio * area;
    
    // Ajustando pela eficiência do sistema
    const aguaRealDia = aguaNecessariaDia / (eficiencia / 100);
    
    // Consumo mensal (30 dias)
    const aguaMensal = aguaRealDia * 30;
    
    // Formatando números
    const consumoDiarioFormatado = Math.round(aguaRealDia).toLocaleString('pt-BR');
    const consumoMensalFormatado = Math.round(aguaMensal).toLocaleString('pt-BR');
    
    // Atualizando DOM
    document.getElementById('consumo-diario').textContent = consumoDiarioFormatado;
    document.getElementById('consumo-mensal').textContent = consumoMensalFormatado;
    
    // Gerando sugestão baseada na eficiência
    const sugestaoElement = document.getElementById('sugestao');
    if (eficiencia < 60) {
        sugestaoElement.innerHTML = '⚠️ <strong>Sugestão:</strong> Seu sistema tem baixa eficiência. Considere mudar para gotejamento para economizar até 40% de água!';
        sugestaoElement.style.color = '#f44336';
    } else if (eficiencia < 85) {
        sugestaoElement.innerHTML = '💡 <strong>Sugestão:</strong> Bom sistema! Pequenas melhorias podem aumentar ainda mais a eficiência.';
        sugestaoElement.style.color = '#ff9800';
    } else {
        sugestaoElement.innerHTML = '✅ <strong>Sugestão:</strong> Excelente! Seu sistema é muito eficiente. Continue mantendo as boas práticas!';
        sugestaoElement.style.color = '#4caf50';
    }
}

// Adicionando event listener ao botão calcular
const calcularBtn = document.getElementById('calcular-btn');
if (calcularBtn) {
    calcularBtn.addEventListener('click', calcularAgua);
}

// Efeito de digitação no fato importante (opcional)
function atualizarConsumoGlobal() {
    const consumoElement = document.getElementById('consumo-agricultura');
    if (consumoElement) {
        let valor = 70;
        setInterval(() => {
            valor = valor === 70 ? 71 : 70;
            consumoElement.textContent = `${valor}%`;
        }, 3000);
    }
}

// Animação ao scroll para os cards
function adicionarAnimacaoScroll() {
    const cards = document.querySelectorAll('.card, .method-card, .solution-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
}

// Inicializar funcionalidades extras
atualizarConsumoGlobal();
adicionarAnimacaoScroll();

// Validação de entrada numérica
const areaInput = document.getElementById('area');
if (areaInput) {
    areaInput.addEventListener('input', function() {
        if (this.value < 0) this.value = 0;
        if (this.value > 1000000) this.value = 1000000;
    });
}

const eficienciaInput = document.getElementById('eficiencia');
if (eficienciaInput) {
    eficienciaInput.addEventListener('input', function() {
        if (this.value < 30) this.value = 30;
        if (this.value > 100) this.value = 100;
    });
}

// Função para carregar exemplos interativos
function carregarExemplos() {
    console.log('Projeto Agricultura e Água carregado com sucesso!');
    
    // Adicionar tooltips informativos
    const culturas = document.querySelectorAll('.method-card');
    culturas.forEach((cultura, index) => {
        cultura.setAttribute('data-tooltip', 'Clique para mais informações');
        cultura.addEventListener('click', () => {
            alert('Método essencial para otimizar o uso da água na agricultura!');
        });
    });
}

// Executar após o carregamento da página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarExemplos);
} else {
    carregarExemplos();
}
