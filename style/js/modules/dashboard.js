// ========================================
// ERP FINANCEIRO - MÓDULO DASHBOARD
// ========================================

const DashboardModule = {
    // Renderizar KPIs
    renderKPIs() {
        const saldoCaixa = 247850.00;
        const contasReceber = 89450.00;
        const contasPagar = 45200.00;
        const projecao = 292100.00;

        return `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                ${this.createKPICard('Saldo em Caixa', saldoCaixa, '+12,5% este mês', 'success', 'wallet')}
                ${this.createKPICard('Contas a Receber', contasReceber, '15 títulos em aberto', 'info', 'arrow-down')}
                ${this.createKPICard('Contas a Pagar', contasPagar, '8 títulos em aberto', 'danger', 'arrow-up')}
                ${this.createKPICard('Projeção 30 dias', projecao, 'Positivo', 'warning', 'crystal-ball')}
            </div>
        `;
    },

    createKPICard(title, value, subtitle, type, icon) {
        const colors = {
            success: { border: 'border-green-500', bg: 'bg-green-100', text: 'text-green-600', sub: 'text-green-600' },
            info: { border: 'border-blue-500', bg: 'bg-blue-100', text: 'text-blue-600', sub: 'text-blue-600' },
            danger: { border: 'border-red-500', bg: 'bg-red-100', text: 'text-red-600', sub: 'text-red-600' },
            warning: { border: 'border-purple-500', bg: 'bg-purple-100', text: 'text-purple-600', sub: 'text-purple-600' }
        };

        const c = colors[type];
        const formattedValue = formatCurrency(value);

        return `
            <div class="kpi-card ${type} card-hover">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-sm text-gray-500 mb-1">${title}</p>
                        <h3 class="text-2xl font-bold text-gray-800">${formattedValue}</h3>
                        <p class="text-xs ${c.sub} mt-1 flex items-center gap-1">
                            ${type === 'success' ? '<i class="fas fa-arrow-up"></i>' : ''}
                            ${type === 'warning' ? '<i class="fas fa-chart-line"></i>' : ''}
                            ${subtitle}
                        </p>
                    </div>
                    <div class="w-12 h-12 ${c.bg} rounded-lg flex items-center justify-center">
                        <i class="fas fa-${icon} ${c.text} text-xl"></i>
                    </div>
                </div>
            </div>
        `;
    },

    // Renderizar gráficos
    renderCharts() {
        return `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="font-bold text-lg">Fluxo de Caixa - 6 Meses</h3>
                        <button class="text-sm text-purple-600 hover:underline">Ver detalhes</button>
                    </div>
                    <div class="chart-container">
                        <canvas id="fluxoChart"></canvas>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="font-bold text-lg">Receitas vs Despesas</h3>
                        <select class="text-sm border rounded-lg px-3 py-1" id="periodoChart">
                            <option value="mes">Este mês</option>
                            <option value="trimestre">Últimos 3 meses</option>
                        </select>
                    </div>
                    <div class="chart-container">
                        <canvas id="receitasChart"></canvas>
                    </div>
                </div>
            </div>
        `;
    },

    // Renderizar tabela de transações recentes
    renderTransactions() {
        const rows = AppData.transactions.map(t => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 font-medium text-gray-900">${t.desc}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 text-xs rounded-full ${t.tipo === 'Receita' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${t.tipo}
                    </span>
                </td>
                <td class="px-6 py-4 text-gray-500">${t.data}</td>
                <td class="px-6 py-4 font-medium">${t.valorFormatado}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 text-xs rounded-full status-${t.status}">
                        ${t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                    </span>
                </td>
            </tr>
        `).join('');

        return `
            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                <div class="p-6 border-b flex justify-between items-center">
                    <h3 class="font-bold text-lg">Movimentações Recentes</h3>
                    <button onclick="NavigationModule.navigate('contas')" class="text-purple-600 text-sm hover:underline">Ver todas</button>
                </div>
                <div class="overflow-x-auto">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Tipo</th>
                                <th>Vencimento</th>
                                <th>Valor</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            ${rows}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    // Renderizar página completa
    render() {
        return `
            <div id="dashboard" class="section">
                ${this.renderKPIs()}
                ${this.renderCharts()}
                ${this.renderTransactions()}
            </div>
        `;
    },

    // Inicializar gráficos do dashboard
    initCharts() {
        ChartModule.initFluxoChart('fluxoChart');
        ChartModule.initReceitasChart('receitasChart');
    }
};