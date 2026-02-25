// ========================================
// ERP FINANCEIRO - MÓDULO FLUXO DE CAIXA
// ========================================

const FluxoModule = {
    render() {
        return `
            <div id="fluxo" class="section">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                        <h3 class="font-bold text-lg mb-4">Projeção de Caixa - 90 dias</h3>
                        <div class="chart-container-lg">
                            <canvas id="projecaoChart"></canvas>
                        </div>
                    </div>
                    <div class="space-y-6">
                        ${this.renderContasBancarias()}
                        ${this.renderProximosVencimentos()}
                    </div>
                </div>
            </div>
        `;
    },

    renderContasBancarias() {
        const cores = {
            purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
            blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
            green: { bg: 'bg-green-100', text: 'text-green-600' }
        };

        return `
            <div class="bg-white p-6 rounded-xl shadow-sm">
                <h4 class="font-bold mb-4">Saldo por Conta</h4>
                <div class="space-y-3">
                    ${AppData.contasBancarias.map(conta => {
                        const c = cores[conta.cor];
                        return `
                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 ${c.bg} rounded-lg flex items-center justify-center">
                                        <i class="fas fa-${conta.icone} ${c.text}"></i>
                                    </div>
                                    <span class="font-medium">${conta.nome}</span>
                                </div>
                                <span class="font-bold">${formatCurrency(conta.saldo)}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    renderProximosVencimentos() {
        const coresUrgencia = {
            alta: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600' },
            media: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-600' },
            baixa: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600' }
        };

        return `
            <div class="bg-white p-6 rounded-xl shadow-sm">
                <h4 class="font-bold mb-4">Próximos Vencimentos</h4>
                <div class="space-y-3">
                    ${AppData.proximosVencimentos.map(v => {
                        const c = coresUrgencia[v.urgencia];
                        return `
                            <div class="flex justify-between items-center p-3 ${c.bg} rounded-lg border ${c.border}">
                                <div>
                                    <p class="font-medium text-sm">${v.descricao}</p>
                                    <p class="text-xs text-gray-500">${v.data}</p>
                                </div>
                                <span class="font-bold ${c.text}">${formatCurrency(v.valor)}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    initCharts() {
        ChartModule.initProjecaoChart('projecaoChart');
    }
};