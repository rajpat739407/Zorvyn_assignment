import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import DashboardPage from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import InsightsPage from './pages/InsightsPage'
import useFinanceStore from './store/useFinanceStore'

function App() {
  const theme = useFinanceStore((state) => state.theme)

  // ✅ Core dark mode fix: sync Zustand `theme` state → <html class="dark">
  // Tailwind's `darkMode: 'class'` strategy requires the `.dark` class on
  // the root element. Without this effect, toggling theme in the store has
  // no visual effect on the page.
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}

export default App