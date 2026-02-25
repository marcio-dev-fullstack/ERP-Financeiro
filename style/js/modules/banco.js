// ========================================
// ERP FINANCEIRO - MÓDULO CONCILIAÇÃO BANCÁRIA
// ========================================

const BancoModule = {
    render() {
        return `
            <div id="banco" class="section">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="lg:col-span-2 space-y-6">
                        <div class="bg-white p-6 rounded-xl shadow-sm">
                            <div class="flex justify-between items-center mb-4 flex-wrap gap-4">
                                <h3 class="font-bold text-lg">Extrato Bancário vs Sistema</h3>
                                <button onclick="BancoModule.conciliar()" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
                                    <i class="fas fa-sync"></i> Conciliar Automático
                                </button>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>Data</th>
                                            <th>Histórico</th>
                                            <th class="text-right">Valor</th>
                                            <th class="text-center">Status</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y">
                                        ${this.renderRows()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-6">
                        ${this.renderResumo()}
                        ${this.renderAcoesRapidas()}
                    </div>
                </div>
            </div>
        `;
    },

    renderRows() {
        return AppData.conciliacao.map(item => `
            <tr class="hover:bg-gray-50">
                <td class="px-4 py-3 text-sm">${item.data}</td>
                <td class="px-4 py-3 text-sm font-medium">${item.hist}</td>
                <td class="px-4 py-3 text-sm text-right font-medium ${item.valor < 0 ? 'text-red-600' : 'text-green-600'}">
                    ${item.valorFormatado}
                </td>
                <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 text-xs rounded-full status-${item.status}">
                        ${item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                </td>
                <td class="px-4 py-3">
                    ${item.status !== 'conciliado' ? `
                        <button onclick="BancoModule.conciliarItem(${item.id})" class="text-green-600 hover:text-green-800 mr-2" title="Conciliar">
                            <i class="fas fa-check"></i>
                        </button>
                    ` : ''}
                    <button onclick="BancoModule.editar(${item.id})" class="text-blue-600 hover:text-blue-800" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    },

    renderResumo() {
        const conciliados = AppData.conciliacao.filter(i => i.status === 'conciliado').length;
        const pendentes = AppData.conciliacao.filter(i => i.status === 'pendente').length;
        const divergentes = AppData.conciliacao.filter(i => i.status === 'divergente').length;

        return `
            <div class="bg-white p-6 rounded-xl shadow-sm">
                <h4 class="font-bold mb-4">Resumo de Conciliação</h4>
                <div class="space-y-4">
                    <div class="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div class="flex items-center gap-2 mb-1">
                            <i class="fas fa-check-circle text-green-600"></i>
                            <span class="font-medium text-green-800">Conciliados</span>
                        </div>
                        <p class="text-2xl font-bold text-green-600">${conciliados}</p>
                    </div>
                    <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div class="flex items-center gap-2 mb-1">
                            <i class="fas fa-exclamation-triangle text-yellow-600"></i>
                            <span class="font-medium text-yellow-800">Pendentes</span>
                        </div>
                        <p class="text-2xl font-bold text-yellow-600">${pendentes}</p>
                    </div>
                    <div class="p-4 bg-red-50 rounded-lg border border-red-200">
                        <div class="flex items-center gap-2 mb-1">
                            <i class="fas fa-times-circle text-red-600"></i>
                            <span class="font-medium text-red-800">Divergentes</span>
                        </div>
                        <p class="text-2xl font-bold text-red-600">${divergentes}</p>
                    </div>
                </div>
            </div>
        `;
    },

    renderAcoesRapidas() {
        return `
            <div class="bg-white p-6 rounded-xl shadow-sm">
                <h4 class="font-bold mb-4">Ações Rápidas</h4>
                <div class="space-y-3">
                    <button onclick="BancoModule.importarExtrato()" class="w-full p-3 text-left rounded-lg border hover:bg-gray-50 flex items-center gap-3">
                        <i class="fas fa-file-import text-blue-600"></i>
                        <span>Importar Extrato</span>
                    </button>
                    <button onclick="BancoModule.exportarConciliacao()" class="w-full p-3 text-left rounded-lg border hover:bg-gray-50 flex items-center gap-3">
                        <i class="fas fa-file-export text-green-600"></i>
                        <span>Exportar Conciliação</span>
                    </button>
                    <button onclick="BancoModule.historico()" class="w-full p-3 text-left rounded-lg border hover:bg-gray-50 flex items-center gap-3">
                        <i class="fas fa-history text-purple-600"></i>
                        <span>Histórico</span>
                    </button>
                </div>
            </div>
        `;
    },

    conciliar() {
        alert('Iniciando conciliação automática...');
    },

    conciliarItem(id) {
        const item = AppData.conciliacao.find(i => i.id === id);
        if (confirm(`Conciliar: ${item.hist}?`)) {
            item.status = 'conciliado';
            NavigationModule.navigate('banco');
        }
    },

    editar(id) {
        const item = AppData.conciliacao.find(i => i.id === id);
        alert(`Editar: ${item.hist}`);
    },

    importarExtrato() {
        alert('Abrir dialogo de importação de extrato...');
    },

    exportarConciliacao() {
        alert('Exportando conciliação...');
    },

    historico() {
        alert('Abrir histórico de conciliações...');
    }
};