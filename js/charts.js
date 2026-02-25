// ========================================
// ERP FINANCEIRO - MÓDULO DE GRÁFICOS
// ========================================

const ChartModule = {
    instances: {},

    // Configuração padrão
    defaultOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: { size: 12 }
                }
            }
        }
    },

    // Gráfico de Fluxo de Caixa (Linha)
    initFluxoChart(canvasId) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        if (this.instances[canvasId]) {
            this.instances[canvasId].destroy();
        }

        const dados = AppData.charts.fluxoCaixa;

        this.instances[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dados.labels,
                datasets: [
                    {
                        label: 'Entradas',
                        data: dados.entradas,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Saídas',
                        data: dados.saidas,
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }
                ]
            },
            options: {
                ...this.defaultOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'R$ ' + (value / 1000).toFixed(0) + 'k';
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    },

    // Gráfico de Receitas vs Despesas (Barra)
    initReceitasChart(canvasId) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        if (this.instances[canvasId]) {
            this.instances[canvasId].destroy();
        }

        const dados = AppData.charts.receitasDespesas;

        this.instances[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dados.labels,
                datasets: [
                    {
                        label: 'Receitas',
                        data: dados.receitas,
                        backgroundColor: '#10b981',
                        borderRadius: 6,
                        borderSkipped: false
                    },
                    {
                        label: 'Despesas',
                        data: dados.despesas,
                        backgroundColor: '#ef4444',
                        borderRadius: 6,
                        borderSkipped: false
                    }
                ]
            },
            options: {
                ...this.defaultOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'R$ ' + (value / 1000).toFixed(0) + 'k';
                            }
                        }
                    }
                }
            }
        });
    },

    // Gráfico de Projeção (Linha Área)
    initProjecaoChart(canvasId) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        if (this.instances[canvasId]) {
            this.instances[canvasId].destroy();
        }

        const dados = AppData.charts.projecao;

        this.instances[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dados.labels,
                datasets: [{
                    label: 'Saldo Projetado',
                    data: dados.valores,
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#8b5cf6',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return 'R$ ' + (value / 1000).toFixed(0) + 'k';
                            }
                        }
                    }
                }
            }
        });
    },

    // Destruir todos os gráficos
    destroyAll() {
        Object.values(this.instances).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.instances = {};
    }
};