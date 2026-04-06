import { TrendingUp } from 'lucide-react'
import useFinanceStore from '../../store/useFinanceStore'

const HighestSpendingCategory = () => {
  const transactions = useFinanceStore((state) => state.transactions)
  
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})
  
  let highestCategory = ''
  let highestAmount = 0
  
  Object.entries(expensesByCategory).forEach(([category, amount]) => {
    if (amount > highestAmount) {
      highestAmount = amount
      highestCategory = category
    }
  })
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Highest Spending Category
        </h3>
        <TrendingUp className="w-5 h-5 text-red-500" />
      </div>
      {highestCategory ? (
        <>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {highestCategory}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total: ${highestAmount.toLocaleString()}
          </p>
        </>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No expense data</p>
      )}
    </div>
  )
}

export default HighestSpendingCategory