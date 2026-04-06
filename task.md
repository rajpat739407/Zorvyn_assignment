# Finance Dashboard UI – Task Checklist

## Phase 1: Planning
- [x] Define project architecture and tech stack
- [x] Create implementation plan

## Phase 2: Project Setup
- [ ] Scaffold Vite + React project in d:\Assignment
- [ ] Install dependencies (Tailwind, Recharts, Zustand, React Router, date-fns, lucide-react)
- [ ] Configure Tailwind CSS with dark mode support
- [ ] Set up project folder structure

## Phase 3: Mock Data & State
- [ ] Create comprehensive mock transactions data (50+ records)
- [ ] Create Zustand store (transactions, filters, role, theme)
- [ ] Add localStorage persistence middleware

## Phase 4: Core Components
- [ ] Layout: AppShell (sidebar + topbar + content area)
- [ ] Sidebar navigation component
- [ ] TopBar (role switcher, dark mode toggle, search)
- [ ] SummaryCards (Total Balance, Income, Expenses, Savings Rate)
- [ ] BalanceTrendChart (line chart – time-based)
- [ ] SpendingBreakdownChart (pie/donut chart – categorical)
- [ ] MonthlyComparisonChart (bar chart)

## Phase 5: Transactions Section
- [ ] TransactionTable with date, amount, category, type columns
- [ ] Search bar filter
- [ ] Category/Type filter dropdowns
- [ ] Date range filter
- [ ] Sort by date/amount
- [ ] Add/Edit Transaction modal (Admin only)
- [ ] Empty state component

## Phase 6: Insights Section
- [ ] Highest spending category card
- [ ] Monthly comparison (this month vs last month)
- [ ] Income vs Expense ratio
- [ ] Top 3 spending categories list
- [ ] Trend observation (up/down month-over-month)

## Phase 7: Role-Based UI
- [ ] Viewer role: read-only, no add/edit buttons
- [ ] Admin role: add/edit/delete transactions
- [ ] Role switcher dropdown in TopBar

## Phase 8: Optional Enhancements
- [ ] Dark mode (CSS variables + Tailwind)
- [ ] CSV export functionality
- [ ] Animations/transitions (Framer Motion or CSS)
- [ ] Advanced filtering

## Phase 9: Polish & Documentation
- [ ] Responsive design check (mobile/tablet/desktop)
- [ ] Empty state & loading states
- [ ] README.md with setup instructions and feature overview
- [ ] Final review and cleanup
