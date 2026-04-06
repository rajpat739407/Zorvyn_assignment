# 💰 FinanceFlow — Finance Dashboard UI

A clean, interactive finance dashboard built with **React + Vite**, **Tailwind CSS**, **Recharts**, and **Zustand** for state management.

---

## Setup Instructions

### Prerequisites
- Node.js v18+ installed
- npm or yarn

### Installation

```bash
# Clone or navigate to the project directory
cd Assignment

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Feature Overview

### 1. Dashboard Overview
- **Summary Cards** — Total Balance, Total Income, Total Expenses, Savings Rate with animated entrance
- **Balance Trend Chart** — Line chart showing balance over the last 30 days
- **Spending Breakdown Chart** — Donut/pie chart showing expense categories
- **Monthly Comparison Chart** — Bar chart comparing income vs expenses by month

### 2. Transactions Section
- Full **transactions table** with date, description, category, type, and amount
- **Search** — Global search bar in the TopBar filtering by description or category
- **Filtering** — Filter by category, by type (income/expense), and by date range
- **Sorting** — Sort by date or amount in ascending/descending order
- **Empty state** — Graceful "no results" message when filters return nothing

### 3. Role-Based UI (RBAC Simulation)
- **Viewer Role** — Read-only mode; Add/Edit/Delete controls are hidden
- **Admin Role** — Full access to add, edit, and delete transactions
- **Role Switcher** — Toggle button in the TopBar for instant role switching (no login required)

### 4. Insights Section
- **Highest Spending Category** — Identifies top expense category with % breakdown
- **Monthly Comparison** — Current vs previous month income and expense delta
- **Income vs Expense Ratio** — Visual ratio card with progress indicator
- **Top Spending Categories** — Ranked list of all expense categories
- **Trend Observation** — Auto-generated text observations about spending habits

### 5. State Management
- **Zustand** with `persist` middleware — all state (transactions, filters, role, theme) persists in `localStorage`
- Computed selectors (`getTotalBalance`, `getFilteredTransactions`, etc.) run directly from the store
- Filters, role, and theme all survive page refreshes

### 6. Dark Mode / Light Mode
- Full **dark/light mode** toggle via the moon/sun icon in the TopBar
- Tailwind `darkMode: 'class'` strategy — the `.dark` class is applied to `<html>` via a `useEffect` in `App.jsx`
- Preferred mode persists in localStorage across sessions

---

## Tech Stack

| Layer           | Technology             |
|-----------------|------------------------|
| Framework       | React 18 + Vite        |
| Styling         | Tailwind CSS v3        |
| Charts          | Recharts               |
| State           | Zustand + persist      |
| Routing         | React Router v6        |
| Animations      | Framer Motion          |
| Icons           | Lucide React           |
| Date utilities  | date-fns               |

---

## Project Structure

```
src/
├── components/
│   ├── dashboard/          # SummaryCards, BalanceTrendChart, SpendingBreakdownChart, MonthlyComparisonChart
│   ├── insights/           # HighestSpendingCategory, MonthlyComparison, IncomeExpenseRatio, etc.
│   ├── layout/             # AppShell, Sidebar, TopBar
│   └── transactions/       # TransactionTable, AddEditTransactionModal
├── data/
│   └── mockData.js         # Mock transaction generator (65+ transactions)
├── pages/
│   ├── DashboardPage.jsx
│   ├── TransactionsPage.jsx
│   └── InsightsPage.jsx
├── store/
│   └── useFinanceStore.js  # Zustand store with persist middleware
├── App.jsx                 # Theme sync + routing
└── main.jsx
```

---

## Approach & Design Decisions

- **Static mock data** is generated procedurally on first load and persisted in `localStorage`, so it survives refreshes without being regenerated.
- **Role-based UI** is purely frontend-simulated — the `role` field in Zustand controls which actions are visible, with no backend dependency.
- **Dark mode** is implemented by watching the Zustand `theme` state in `App.jsx` and toggling the `dark` class on `document.documentElement`, which is how Tailwind's class strategy works.
- **Recharts** was chosen for its React-native integration and responsive container support.
- **Framer Motion** adds entrance animations to summary cards for a polished UX.
- All components check the `role` from the store directly — no prop drilling.

---

## Assignment Requirements Checklist

All the assignment requiremnts cleared as below are mentioned.

| Requirement                          | Status |
|--------------------------------------|--------|
| Summary cards (Balance, Income, Expense) | ✅ |
| Time-based visualization             | ✅ Balance Trend (line chart) |
| Categorical visualization            | ✅ Spending Breakdown (pie chart) |
| Transaction list with date/amount/category/type | ✅ |
| Search                               | ✅ |
| Filtering & Sorting                  | ✅ |
| Role-based UI (Viewer / Admin)       | ✅ |
| Insights section                     | ✅ 5 insight components |
| State management (Zustand)           | ✅ |
| Responsive design                    | ✅ |
| Empty/no-data handling               | ✅ |
| Dark mode                            | ✅ |
| Data persistence (localStorage)      | ✅ |
| Animations / transitions             | ✅ Framer Motion |

---

## Assumptions

- All financial data is mock/simulated — no real backend or API
- Role switching is for UI demonstration only (no auth)
- Amounts are in USD ($)
- The date range covers the last 90 days from today