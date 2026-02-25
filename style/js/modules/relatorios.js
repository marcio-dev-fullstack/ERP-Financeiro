// ========================================
// ERP FINANCEIRO - MÓDULO RELATÓRIOS
// ========================================

const RelatoriosModule = {
    render() {
        const relatorios = [
            { id: 'contas', titulo: 'Contas a Pagar/Receber', desc: 'Relatório completo de títulos em aberto', icon: 'file-invoice-dollar', cor: 'blue' },
            { id: 'fluxo', titulo: 'Fluxo de Caixa', desc: 'Projeção e movimentação financeira', icon: 'chart-line', cor: 'green' },
            { id: 'dre', titulo: 'DRE Completa', desc: 'Demonstração de resultados detalhada', icon: 'percentage', cor: 'purple' },
            { id: 'inadimplencia', titulo: 'Inadimplência', desc: 'Análise de clientes inadimplentes', icon: 'users', cor: 'orange' },
            { id: 'comissoes', titulo: 'Comissões', desc: 'Relatório de comissões por vendedor', icon: 'money-check-alt', cor: 'red' },
            { id: 'personalizado', titulo: 'Personalizado', desc: 'Criar relatório com filtros avançados', icon: 'cog', cor: 'gray' }
        ];

        return `
            <div id="relatorios" class="section">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${relatorios.map(r => this.renderCard(r)).join('')}
                </div>
            </div>
        `;
    },

    renderCard(relatorio) {
        const cores = {
            blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
            green: { bg: 'bg-green-100', text: 'text-green-600' },
            purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
            orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
            red: { bg: 'bg-red-100', text: 'text-red-600' },
            gray: { bg: 'bg-gray-100', text: 'text-gray-600' }
        };

        const c = cores[relatorio.cor];

        return `
            <div onclick="RelatoriosModule.gerar('${relatorio.id}')" 
                class="bg-white p-6 rounded-xl shadow-sm card-hover cursor-pointer">
                <div class="w-12 h-12 ${c.bg} rounded-lg flex items-center justify-center mb-4">
                    <i class="fas fa-${relatorio.icon} ${c.text} text-xl"></i>
                </div>
                <h4 class="font-bold mb-2">${relatorio.titulo}</h4>
                <p class="text-sm text-gray-500">${relatorio.desc}</p>
            </div>
        `;
    },

    gerar(id) {
        const nomes = {
            contas: 'Contas a Pagar/Receber',
            fluxo: 'Fluxo de Caixa',
            dre: 'DRE Completa',
            inadimplencia: 'Inadimplência',
            comissoes: 'Comissões',
            personalizado: 'Relatório Personalizado'
        };
        
        alert(`Gerando relatório: ${nomes[id]}...`);
    }
};