
// ========================================
// ERP FINANCEIRO - ARQUIVO PRINCIPAL
// ========================================

// Módulo de Navegação
const NavigationModule = {
    currentSection: 'dashboard',

    init() {
        this.renderSidebar();
        this.navigate('dashboard');
        this.updateDate();
    },

    renderSidebar() {
        const nav = document.getElementById('sidebar-nav');
        nav.innerHTML = AppData.menuItems.map(item => `
            <a href="#" 
               onclick="NavigationModule.navigate('${item.id}'); return false;"
               class="sidebar-item ${item.id === this.currentSection ? 'active' : ''}" 
               data-section="${item.id}">
                <i class="fas fa-${item.icon} w-5"></i>
                <span>${item.label}</span>
            </a>
        `).join('');
    },

    navigate(sectionId) {
        this.currentSection = sectionId;
        AppData.state.currentSection = sectionId;

        // Atualizar sidebar
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.toggle('active', item.dataset.section === sectionId);
        });

        // Atualizar título
        const titles = {
            dashboard: 'Dashboard Financeiro',
            contas: 'Contas Pagar/Receber',
            fluxo: 'Fluxo de Caixa',
            dre: 'DRE - Demonstração do Resultado',
            banco: 'Conciliação Bancária',
            boletos: 'Boletos e Cobranças',
            relatorios: 'Relatórios'
        };
        document.getElementById('page-title').textContent = titles[sectionId];

        // Renderizar conteúdo
        const content = document.getElementById('main-content');
        content.innerHTML = this.getModuleContent(sectionId);

        // Inicializar gráficos se necessário
        if (sectionId === 'dashboard') {
            setTimeout(() => DashboardModule.initCharts(), 100);
        } else if (sectionId === 'fluxo') {
            setTimeout(() => FluxoModule.initCharts(), 100);
        }
    },

    getModuleContent(sectionId) {
        switch(sectionId) {
            case 'dashboard': return DashboardModule.render();
            case 'contas': return ContasModule.render();
            case 'fluxo': return FluxoModule.render();
            case 'dre': return DreModule.render();
            case 'banco': return BancoModule.render();
            case 'boletos': return BoletosModule.render();
            case 'relatorios': return RelatoriosModule.render();
            default: return DashboardModule.render();
        }
    },

    updateDate() {
        const dateElement = document.getElementById('current-date');
        const now = new Date();
        const options = { month: 'short', year: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('pt-BR', options);
    }
};

// Módulo de Modais
const ModalModule = {
    openModal(modalId) {
        const modal = document.getElementById(`modal${modalId.charAt(0).toUpperCase() + modalId.slice(1)}`);
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            AppData.state.modalOpen = true;
        }
    },

    closeModal(modalId) {
        const modal = document.getElementById(`modal${modalId.charAt(0).toUpperCase() + modalId.slice(1)}`);
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            AppData.state.modalOpen = false;
        }
    }
};

// Inicialização quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    NavigationModule.init();

    // Handler do formulário de nova conta
    const form = document.getElementById('formNovaConta');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = {
                tipo: form.tipo.value,
                documento: form.documento.value,
                cliente: form.cliente.value,
                vencimento: form.vencimento.value,
                valor: form.valor.value,
                descricao: form.descricao.value
            };
            ContasModule.add(formData);
            form.reset();
        });
    }

    // Fechar modal ao clicar fora
    window.onclick = (event) => {
        if (event.target.classList.contains('fixed')) {
            event.target.classList.add('hidden');
            event.target.classList.remove('flex');
        }
    };
});

// Atalhos de teclado
document.addEventListener('keydown', (e) => {
    // ESC fecha modais
    if (e.key === 'Escape' && AppData.state.modalOpen) {
        ModalModule.closeModal('novaConta');
    }
});