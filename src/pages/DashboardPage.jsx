import SummaryCards from '../components/dashboard/SummaryCards'
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart'
import SpendingBreakdownChart from '../components/dashboard/SpendingBreakdownChart'
import MonthlyComparisonChart from '../components/dashboard/MonthlyComparisonChart'

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's your financial overview</p>
      </div>
      
      <SummaryCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>
      
      <MonthlyComparisonChart />
    </div>
  )
}

export default DashboardPage