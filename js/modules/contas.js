// ========================================
// ERP FINANCEIRO - MÓDULO CONTAS
// ========================================

const ContasModule = {
    currentFilter: 'receber',

    // Renderizar página de contas
    render() {
        return `
            <div id="contas" class="section">
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div class="p-6 border-b flex justify-between items-center flex-wrap gap-4">
                        <div class="flex gap-4">
                            <button onclick="ContasModule.filter('receber')" 
                                id="btn-receber" 
                                class="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-medium transition-colors">
                                Contas a Receber
                            </button>
                            <button onclick="ContasModule.filter('pagar')" 
                                id="btn-pagar" 
                                class="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                                Contas a Pagar
                            </button>
                        </div>
                        <button onclick="ModalModule.openModal('novaConta')" 
                            class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 transition-colors">
                            <i class="fas fa-plus"></i> Novo Lançamento
                        </button>
                    </div>

                    <div class="p-4 bg-gray-50 flex gap-4 flex-wrap">
                        <input type="text" 
                            placeholder="Buscar..." 
                            onkeyup="ContasModule.search(this.value)"
                            class="flex-1 min-w-[200px] px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <select onchange="ContasModule.filterStatus(this.value)" class="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option value="">Todos os status</option>
                            <option value="pendente">Pendente</option>
                            <option value="pago">Pago</option>
                            <option value="atrasado">Atrasado</option>
                        </select>
                        <input type="date" class="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>

                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Documento</th>
                                    <th>Cliente/Fornecedor</th>
                                    <th>Vencimento</th>
                                    <th>Valor</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody id="contasTableBody" class="divide-y divide-gray-200">
                                ${this.renderRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    // Renderizar linhas da tabela
    renderRows(filter = this.currentFilter, searchTerm = '', statusFilter = '') {
        let filtered = AppData.contas;

        if (filter) {
            filtered = filtered.filter(c => c.tipo === filter);
        }

        if (searchTerm) {
            filtered = filtered.filter(c => 
                c.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.doc.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter) {
            filtered = filtered.filter(c => c.status === statusFilter);
        }

        if (filtered.length === 0) {
            return `
                <tr>
                    <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                        <i class="fas fa-inbox text-4xl mb-2"></i>
                        <p>Nenhum registro encontrado</p>
                    </td>
                </tr>
            `;
        }

        return filtered.map(c => `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 font-medium">${c.doc}</td>
                <td class="px-6 py-4">${c.cliente}</td>
                <td class="px-6 py-4 text-gray-500">${c.venc}</td>
                <td class="px-6 py-4 font-medium">${c.valorFormatado}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 text-xs rounded-full status-${c.status}">
                        ${c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <button onclick="ContasModule.edit(${c.id})" class="text-blue-600 hover:text-blue-800 mr-3" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="ContasModule.baixar(${c.id})" class="text-green-600 hover:text-green-800 mr-3" title="Baixar">
                        <i class="fas fa-check"></i>
                    </button>
                    <button onclick="ContasModule.delete(${c.id})" class="text-red-600 hover:text-red-800" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    },

    // Filtrar por tipo (receber/pagar)
    filter(tipo) {
        this.currentFilter = tipo;

        // Atualizar botões
        document.getElementById('btn-receber').className = 
            tipo === 'receber' 
                ? 'px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-medium transition-colors'
                : 'px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors';

        document.getElementById('btn-pagar').className = 
            tipo === 'pagar'
                ? 'px-4 py-2 rounded-lg bg-red-100 text-red-700 font-medium transition-colors'
                : 'px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors';

        // Atualizar tabela
        document.getElementById('contasTableBody').innerHTML = this.renderRows(tipo);
    },

    // Buscar
    search(term) {
        document.getElementById('contasTableBody').innerHTML = 
            this.renderRows(this.currentFilter, term);
    },

    // Filtrar por status
    filterStatus(status) {
        document.getElementById('contasTableBody').innerHTML = 
            this.renderRows(this.currentFilter, '', status);
    },

    // Ações
    edit(id) {
        const conta = AppData.contas.find(c => c.id === id);
        alert(`Editar ${conta.doc} - ${conta.cliente}`);
    },

    baixar(id) {
        const conta = AppData.contas.find(c => c.id === id);
        if (confirm(`Confirmar pagamento de ${conta.valorFormatado}?`)) {
            conta.status = 'pago';
            this.filter(this.currentFilter);
        }
    },

    delete(id) {
        const conta = AppData.contas.find(c => c.id === id);
        if (confirm(`Excluir ${conta.doc}?`)) {
            AppData.contas = AppData.contas.filter(c => c.id !== id);
            this.filter(this.currentFilter);
        }
    },

    // Adicionar nova conta
    add(formData) {
        const newId = Math.max(...AppData.contas.map(c => c.id)) + 1;
        const newConta = {
            id: newId,
            doc: formData.documento,
            cliente: formData.cliente,
            venc: formData.vencimento,
            valor: parseFloat(formData.valor.replace(/[^0-9,-]/g, '').replace(',', '.')),
            valorFormatado: formData.valor,
            status: 'pendente',
            tipo: formData.tipo
        };

        AppData.contas.push(newConta);
        this.filter(this.currentFilter);
        ModalModule.closeModal('novaConta');
    }
};