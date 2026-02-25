// ========================================
// ERP FINANCEIRO - MÓDULO BOLETOS
// ========================================

const BoletosModule = {
    render() {
        return `
            <div id="boletos" class="section">
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div class="p-6 border-b flex justify-between items-center flex-wrap gap-4">
                        <h3 class="font-bold text-lg">Gestão de Boletos e Cobranças</h3>
                        <div class="flex gap-2">
                            <button onclick="BoletosModule.gerarBoleto()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                                <i class="fas fa-plus"></i> Gerar Boleto
                            </button>
                            <button onclick="BoletosModule.importarRetorno()" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
                                <i class="fas fa-file-import"></i> Importar Retorno
                            </button>
                        </div>
                    </div>
                    
                    ${this.renderResumo()}

                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Nosso Número</th>
                                    <th>Cliente</th>
                                    <th>Vencimento</th>
                                    <th>Valor</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                ${this.renderRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    renderResumo() {
        const emitidos = AppData.boletos.length;
        const pagos = AppData.boletos.filter(b => b.status === 'pago').length;
        const pendentes = AppData.boletos.filter(b => b.status === 'pendente').length;
        const vencidos = AppData.boletos.filter(b => b.status === 'vencido').length;

        return `
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50">
                <div class="bg-white p-4 rounded-lg shadow-sm text-center">
                    <p class="text-sm text-gray-500">Emitidos</p>
                    <p class="text-2xl font-bold text-blue-600">${emitidos}</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm text-center">
                    <p class="text-sm text-gray-500">Pagos</p>
                    <p class="text-2xl font-bold text-green-600">${pagos}</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm text-center">
                    <p class="text-sm text-gray-500">Pendentes</p>
                    <p class="text-2xl font-bold text-yellow-600">${pendentes}</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm text-center">
                    <p class="text-sm text-gray-500">Vencidos</p>
                    <p class="text-2xl font-bold text-red-600">${vencidos}</p>
                </div>
            </div>
        `;
    },

    renderRows() {
        return AppData.boletos.map(b => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 font-medium">${b.numero}</td>
                <td class="px-6 py-4">${b.cliente}</td>
                <td class="px-6 py-4 text-gray-500">${b.venc}</td>
                <td class="px-6 py-4 font-medium">${b.valorFormatado}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 text-xs rounded-full status-${b.status}">
                        ${b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <button onclick="BoletosModule.imprimir(${b.id})" class="text-blue-600 hover:text-blue-800 mr-2" title="Imprimir">
                        <i class="fas fa-print"></i>
                    </button>
                    <button onclick="BoletosModule.enviarEmail(${b.id})" class="text-green-600 hover:text-green-800 mr-2" title="Enviar email">
                        <i class="fas fa-envelope"></i>
                    </button>
                    <button onclick="BoletosModule.verBoleto(${b.id})" class="text-purple-600 hover:text-purple-800" title="Ver boleto">
                        <i class="fas fa-barcode"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    },

    gerarBoleto() {
        alert('Abrir formulário de geração de boleto...');
    },

    importarRetorno() {
        alert('Abrir dialogo de importação de arquivo de retorno...');
    },

    imprimir(id) {
        const boleto = AppData.boletos.find(b => b.id === id);
        alert(`Imprimindo boleto ${boleto.numero}...`);
    },

    enviarEmail(id) {
        const boleto = AppData.boletos.find(b => b.id === id);
        alert(`Enviando boleto ${boleto.numero} por email...`);
    },

    verBoleto(id) {
        const boleto = AppData.boletos.find(b => b.id === id);
        alert(`Visualizando boleto ${boleto.numero}...`);
    }
};