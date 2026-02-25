// ========================================
// ERP FINANCEIRO - MÓDULO DRE
// ========================================

const DreModule = {
    render() {
        const d = AppData.dre;
        
        return `
            <div id="dre" class="section">
                <div class="bg-white rounded-xl shadow-sm p-8">
                    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
                        <h3 class="text-xl font-bold">Demonstração do Resultado do Exercício (DRE)</h3>
                        <div class="flex gap-2">
                            <button onclick="DreModule.exportar('pdf')" class="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                                <i class="fas fa-file-pdf text-red-500"></i> Exportar PDF
                            </button>
                            <button onclick="DreModule.exportar('excel')" class="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                                <i class="fas fa-file-excel text-green-500"></i> Exportar Excel
                            </button>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        ${this.renderLinha('RECEITA BRUTA', d.receitaBruta, 'destaque', false)}
                        
                        <div class="pl-4 space-y-2 text-gray-600">
                            ${this.renderLinhaDetalhe('(-) Impostos s/ Vendas', d.impostos, true)}
                            ${this.renderLinhaDetalhe('(-) Devoluções', d.devolucoes, true)}
                        </div>
                        
                        ${this.renderLinha('RECEITA LÍQUIDA', d.receitaLiquida, 'sucesso', false, 'bg-gray-50')}
                        
                        <div class="pl-4 space-y-2 text-gray-600">
                            ${this.renderLinhaDetalhe('(-) Custo dos Produtos Vendidos', d.cpv, true)}
                        </div>
                        
                        ${this.renderLinha('LUCRO BRUTO', d.lucroBruto, 'info', false, 'bg-blue-50')}
                        
                        <div class="pl-4 space-y-2 text-gray-600">
                            ${this.renderLinhaDetalhe('(-) Despesas Operacionais', d.despesasOperacionais, true)}
                            <div class="pl-4">
                                ${this.renderLinhaDetalhe('Despesas Administrativas', d.detalheDespesas.administrativas, true)}
                                ${this.renderLinhaDetalhe('Despesas com Vendas', d.detalheDespesas.vendas, true)}
                                ${this.renderLinhaDetalhe('Despesas Financeiras', d.detalheDespesas.financeiras, true)}
                            </div>
                        </div>
                        
                        ${this.renderLinha('LUCRO LÍQUIDO', d.lucroLiquido, 'sucesso', true, 'bg-green-50')}
                        
                        <div class="flex justify-between items-center py-2 text-gray-600 border-t pt-4">
                            <span>Margem Líquida</span>
                            <span class="font-bold text-lg">${d.margemLiquida.toFixed(2)}%</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderLinha(label, valor, tipo, isDestaque = false, bgClass = '') {
        const classes = {
            destaque: 'border-b-2 border-gray-800',
            sucesso: 'text-green-600',
            info: 'text-blue-600'
        };

        const fontClass = isDestaque ? 'text-xl' : 'text-lg';
        const padding = bgClass ? 'px-4 py-3 rounded' : 'py-3';

        return `
            <div class="flex justify-between items-center ${classes[tipo]} ${bgClass} ${padding}">
                <span class="font-bold ${fontClass}">${label}</span>
                <span class="font-bold ${fontClass} ${tipo === 'sucesso' ? 'text-green-600' : tipo === 'info' ? 'text-blue-600' : ''}">
                    ${formatCurrency(valor)}
                </span>
            </div>
        `;
    },

    renderLinhaDetalhe(label, valor, negativo = false) {
        const valorFormatado = negativo ? `(${formatCurrency(valor)})` : formatCurrency(valor);
        return `
            <div class="flex justify-between py-1">
                <span>${label}</span>
                <span>${valorFormatado}</span>
            </div>
        `;
    },

    exportar(formato) {
        alert(`Exportando DRE em formato ${formato.toUpperCase()}...`);
    }
};