// ========================================
// ERP FINANCEIRO - DADOS E ESTADO
// ========================================

const AppData = {
    // Transações recentes para o dashboard
    transactions: [
        { 
            id: 1,
            desc: 'Venda - Cliente ABC', 
            tipo: 'Receita', 
            data: '25/02/2025', 
            valor: 15000.00, 
            valorFormatado: 'R$ 15.000,00',
            status: 'pago' 
        },
        { 
            id: 2,
            desc: 'Fornecedor XYZ Ltda', 
            tipo: 'Despesa', 
            data: '28/02/2025', 
            valor: 8500.00, 
            valorFormatado: 'R$ 8.500,00',
            status: 'pendente' 
        },
        { 
            id: 3,
            desc: 'Aluguel Matriz', 
            tipo: 'Despesa', 
            data: '05/03/2025', 
            valor: 12000.00, 
            valorFormatado: 'R$ 12.000,00',
            status: 'pendente' 
        },
        { 
            id: 4,
            desc: 'Venda - Cliente DEF', 
            tipo: 'Receita', 
            data: '20/02/2025', 
            valor: 22000.00, 
            valorFormatado: 'R$ 22.000,00',
            status: 'pago' 
        },
        { 
            id: 5,
            desc: 'Energia Elétrica', 
            tipo: 'Despesa', 
            data: '10/02/2025', 
            valor: 3200.00, 
            valorFormatado: 'R$ 3.200,00',
            status: 'atrasado' 
        },
    ],

    // Contas a pagar e receber
    contas: [
        { 
            id: 1,
            doc: 'NF-001', 
            cliente: 'Empresa ABC Ltda', 
            venc: '28/02/2025', 
            valor: 12500.00, 
            valorFormatado: 'R$ 12.500,00', 
            status: 'pendente', 
            tipo: 'receber' 
        },
        { 
            id: 2,
            doc: 'NF-002', 
            cliente: 'Cliente XYZ', 
            venc: '25/02/2025', 
            valor: 8900.00, 
            valorFormatado: 'R$ 8.900,00', 
            status: 'pago', 
            tipo: 'receber' 
        },
        { 
            id: 3,
            doc: 'NF-003', 
            cliente: 'Fornecedor Silva', 
            venc: '05/03/2025', 
            valor: 15200.00, 
            valorFormatado: 'R$ 15.200,00', 
            status: 'pendente', 
            tipo: 'pagar' 
        },
        { 
            id: 4,
            doc: 'NF-004', 
            cliente: 'Cliente Delta', 
            venc: '15/02/2025', 
            valor: 5600.00, 
            valorFormatado: 'R$ 5.600,00', 
            status: 'atrasado', 
            tipo: 'receber' 
        },
        { 
            id: 5,
            doc: 'NF-005', 
            cliente: 'Locadora Alfa', 
            venc: '10/02/2025', 
            valor: 8000.00, 
            valorFormatado: 'R$ 8.000,00', 
            status: 'atrasado', 
            tipo: 'pagar' 
        },
    ],

    // Boletos
    boletos: [
        { 
            id: 1,
            numero: '001/2025', 
            cliente: 'Cliente ABC', 
            venc: '28/02/2025', 
            valor: 5000.00, 
            valorFormatado: 'R$ 5.000,00', 
            status: 'pendente' 
        },
        { 
            id: 2,
            numero: '002/2025', 
            cliente: 'Cliente XYZ', 
            venc: '25/02/2025', 
            valor: 3500.00, 
            valorFormatado: 'R$ 3.500,00', 
            status: 'pago' 
        },
        { 
            id: 3,
            numero: '003/2025', 
            cliente: 'Cliente Delta', 
            venc: '20/02/2025', 
            valor: 8000.00, 
            valorFormatado: 'R$ 8.000,00', 
            status: 'vencido' 
        },
    ],

    // Dados para conciliação
    conciliacao: [
        { 
            id: 1,
            data: '24/02', 
            hist: 'TRANSFERENCIA RECEBIDA', 
            valor: 15000.00, 
            valorFormatado: 'R$ 15.000,00', 
            status: 'conciliado' 
        },
        { 
            id: 2,
            data: '24/02', 
            hist: 'PAGAMENTO FORNECEDOR', 
            valor: -8500.00, 
            valorFormatado: '(R$ 8.500,00)', 
            status: 'conciliado' 
        },
        { 
            id: 3,
            data: '23/02', 
            hist: 'TARIFA BANCARIA', 
            valor: -45.00, 
            valorFormatado: '(R$ 45,00)', 
            status: 'pendente' 
        },
        { 
            id: 4,
            data: '23/02', 
            hist: 'DEPOSITO CHEQUE', 
            valor: 12000.00, 
            valorFormatado: 'R$ 12.000,00', 
            status: 'divergente' 
        },
    ],

    // Contas bancárias
    contasBancarias: [
        { nome: 'Banco Bradesco', saldo: 125000.00, icone: 'university', cor: 'purple' },
        { nome: 'Banco Itaú', saldo: 98500.00, icone: 'university', cor: 'blue' },
        { nome: 'Caixa Interno', saldo: 24350.00, icone: 'money-bill-wave', cor: 'green' },
    ],

    // Próximos vencimentos
    proximosVencimentos: [
        { descricao: 'Fornecedor XYZ', data: 'Vence hoje', valor: 8500.00, tipo: 'pagar', urgencia: 'alta' },
        { descricao: 'Aluguel', data: 'Em 3 dias', valor: 12000.00, tipo: 'pagar', urgencia: 'media' },
        { descricao: 'Receita Cliente A', data: 'Em 5 dias', valor: 25000.00, tipo: 'receber', urgencia: 'baixa' },
    ],

    // Dados para gráficos
    charts: {
        fluxoCaixa: {
            labels: ['Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev'],
            entradas: [320000, 350000, 380000, 420000, 390000, 450000],
            saidas: [280000, 300000, 310000, 350000, 320000, 340000]
        },
        receitasDespesas: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
            receitas: [45000, 52000, 48000, 61000],
            despesas: [38000, 42000, 35000, 45000]
        },
        projecao: {
            labels: ['Atual', '+30 dias', '+60 dias', '+90 dias'],
            valores: [247850, 292100, 315000, 340000]
        }
    },

    // DRE
    dre: {
        receitaBruta: 450000.00,
        impostos: 67500.00,
        devolucoes: 5000.00,
        receitaLiquida: 377500.00,
        cpv: 150000.00,
        lucroBruto: 227500.00,
        despesasOperacionais: 85000.00,
        detalheDespesas: {
            administrativas: 45000.00,
            vendas: 25000.00,
            financeiras: 15000.00
        },
        lucroLiquido: 142500.00,
        margemLiquida: 31.67
    },

    // Configurações do menu
    menuItems: [
        { id: 'dashboard', label: 'Dashboard', icon: 'home' },
        { id: 'contas', label: 'Contas Pagar/Receber', icon: 'wallet' },
        { id: 'fluxo', label: 'Fluxo de Caixa', icon: 'exchange-alt' },
        { id: 'dre', label: 'DRE', icon: 'chart-pie' },
        { id: 'banco', label: 'Conciliação Bancária', icon: 'university' },
        { id: 'boletos', label: 'Boletos/Cobranças', icon: 'barcode' },
        { id: 'relatorios', label: 'Relatórios', icon: 'file-alt' },
    ],

    // Estado atual
    state: {
        currentSection: 'dashboard',
        contasFilter: 'receber',
        modalOpen: false
    }
};

// Helper para formatar moeda
const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

// Helper para formatar data
const formatDate = (date) => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
};

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AppData, formatCurrency, formatDate };
}
