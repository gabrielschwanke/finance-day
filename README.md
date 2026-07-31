# FinanceDay

> Personal finance app for tracking income, expenses, budget, investments, and financial goals.

## 🚀 Live Demo
https://finance-day.vercel.app/


## 📸 Screenshots

<img src="/screeshots/dashboard.png" alt="Dashboard" width="800" />
<img src="/screeshots/mobile.jpeg" alt="Mobile" width="300" />
<img src="/screeshots/orcamento.png" alt="Orcamento" width="800" />

## ✨ Features

- 📊 Dashboard with KPI Cards for income, expenses, and balance
- 💸 Add, edit, and delete transactions
- 📅 Filter by month and year
- 🥧 Pie chart by category
- 📈 Monthly bar chart comparison
- 💰 Budget with 50/30/20 rule
- 📂 Category configuration by bucket
- 📉 Investment portfolio with profitability tracking
- 🎯 Financial goals with progress and time estimate
- 💾 Data stored locally in the browser (localStorage)
- 📤 Export data as JSON
- 📱 Responsive layout for mobile

## 🛠 Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/gabrielschwanke/finance-day.git

# Navigate to the project folder
cd finance-day

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📁 Project Structure
```

finance-day/
├── screenshots/
│   ├── dashboard.png
│   ├── mobile.png
│   └── orcamento.png
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.jsx
│   │   ├── NavTabs.jsx
│   │   ├── KpiCard.jsx
│   │   ├── QuickAdd.jsx
│   │   ├── TransactionList.jsx
│   │   ├── EditTransactionModal.jsx
│   │   ├── BucketsModal.jsx
│   │   ├── MonthFilter.jsx
│   │   ├── CustomSelect.jsx
│   │   ├── PieChart.jsx
│   │   ├── BarChart.jsx
│   │   ├── Toast.jsx
│   │   └── Footer.jsx
│   ├── pages/               # Application pages
│   │   ├── Receitas.jsx
│   │   ├── Orcamento.jsx
│   │   ├── Investimentos.jsx
│   │   └── Metas.jsx
│   ├── context/             # Global state
│   │   └── DataContext.jsx
│   ├── hooks/               # Custom hooks
│   │   └── useToast.js
│   ├── utils/               # Utility functions
│   │   ├── formatters.js
│   │   └── helpers.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── README.md
```

## 👤 Author

Gabriel Pereira Schwanke — Frontend Developer