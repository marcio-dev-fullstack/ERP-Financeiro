# ERP Financeiro - Sistema de Gestão Financeira

Sistema ERP completo para gestão financeira empresarial, desenvolvido com HTML, CSS e JavaScript vanilla.

## Estrutura de Pastas

```
erp_financeiro/
├── index.html              # Página principal
├── css/
│   └── style.css          # Estilos globais
├── js/
│   ├── main.js            # Inicialização e navegação
│   ├── data.js            # Dados e estado da aplicação
│   ├── charts.js          # Configurações de gráficos
│   └── modules/           # Módulos do sistema
│       ├── dashboard.js   # Dashboard e KPIs
│       ├── contas.js      # Contas a pagar/receber
│       ├── fluxo.js       # Fluxo de caixa
│       ├── dre.js         # Demonstração de resultados
│       ├── banco.js       # Conciliação bancária
│       ├── boletos.js     # Gestão de boletos
│       └── relatorios.js  # Relatórios diversos
└── assets/                # Imagens e recursos
```

## Funcionalidades

### 1. Dashboard
- KPIs em tempo real (Saldo, Contas a Receber/Pagar)
- Gráficos de Fluxo de Caixa
- Comparativo Receitas vs Despesas
- Movimentações recentes

### 2. Contas a Pagar/Receber
- Cadastro de títulos
- Filtros por tipo e status
- Baixa de pagamentos
- Controle de atrasos

### 3. Fluxo de Caixa
- Projeção para 90 dias
- Saldo por conta bancária
- Próximos vencimentos

### 4. DRE (Demonstração do Resultado)
- Estrutura completa
- Cálculo automático de margens
- Exportação PDF/Excel

### 5. Conciliação Bancária
- Comparativo extrato vs sistema
- Conciliação automática
- Controle de divergências

### 6. Boletos e Cobranças
- Emissão de boletos
- Importação de retorno
- Controle de vencidos

### 7. Relatórios
- Diversos relatórios pré-configurados
- Relatórios personalizados

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com Tailwind-like classes
- **JavaScript ES6+** - Lógica e interatividade
- **Chart.js** - Gráficos interativos
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia Inter

## Recursos

- Design responsivo
- Interface moderna e intuitiva
- Animações suaves
- Navegação por atalhos de teclado
- Modais interativos
- Gráficos dinâmicos

## Como Usar

1. Abra o arquivo `index.html` em um navegador moderno
2. Navegue pelo menu lateral
3. Explore todas as funcionalidades
4. Dados de demonstração já inclusos

## Desenvolvimento

Para desenvolvimento, recomenda-se usar um servidor local:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve

# PHP
php -S localhost:8000
```

## Licença

Todos os direitos reservados © 2026 KM Engenharia & Tecnologia.

É proibida a reprodução, distribuição ou modificação deste projeto sem autorização expressa.

KM Engenharia & Tecnologia
Soluções em engenharia com excelência técnica
