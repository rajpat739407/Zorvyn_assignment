import HighestSpendingCategory from '../components/insights/HighestSpendingCategory'
import MonthlyComparison from '../components/insights/MonthlyComparison'
import IncomeExpenseRatio from '../components/insights/IncomeExpenseRatio'
import TopSpendingCategories from '../components/insights/TopSpendingCategories'
import TrendObservation from '../components/insights/TrendObservation'

const InsightsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Insights</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Analyze your spending patterns and get valuable insights</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HighestSpendingCategory />
        <MonthlyComparison />
        <IncomeExpenseRatio />
        <TopSpendingCategories />
        <TrendObservation />
      </div>
    </div>
  )
}

export default InsightsPage