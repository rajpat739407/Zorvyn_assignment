import useFinanceStore from '../../store/useFinanceStore'

const TopSpendingCategories = () => {
  const transactions = useFinanceStore((state) => state.transactions)
  
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})
  
  const sortedCategories = Object.entries(expensesByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
  
  if (sortedCategories.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Top Spending Categories
        </h3>
        <p className="text-gray-500 dark:text-gray-400">No expense data</p>
      </div>
    )
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Top Spending Categories
      </h3>
      <div className="space-y-3">
        {sortedCategories.map(([category, amount], index) => (
          <div key={category} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                #{index + 1}
              </span>
              <span className="text-gray-900 dark:text-white">{category}</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">
              ${amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopSpendingCategories