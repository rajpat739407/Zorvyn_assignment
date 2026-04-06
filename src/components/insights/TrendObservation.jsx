import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import useFinanceStore from '../../store/useFinanceStore'
import { subMonths, startOfMonth, endOfMonth } from 'date-fns'

const TrendObservation = () => {
  const transactions = useFinanceStore((state) => state.transactions)
  
  const now = new Date()
  const thisMonthStart = startOfMonth(now)
  const thisMonthEnd = endOfMonth(now)
  const lastMonthStart = startOfMonth(subMonths(now, 1))
  const lastMonthEnd = endOfMonth(subMonths(now, 1))
  const twoMonthsAgoStart = startOfMonth(subMonths(now, 2))
  const twoMonthsAgoEnd = endOfMonth(subMonths(now, 2))
  
  const getMonthlyExpenses = (start, end) => {
    return transactions
      .filter(t => {
        const tDate = new Date(t.date)
        return t.type === 'expense' && tDate >= start && tDate <= end
      })
      .reduce((sum, t) => sum + t.amount, 0)
  }
  
  const thisMonth = getMonthlyExpenses(thisMonthStart, thisMonthEnd)
  const lastMonth = getMonthlyExpenses(lastMonthStart, lastMonthEnd)
  const twoMonthsAgo = getMonthlyExpenses(twoMonthsAgoStart, twoMonthsAgoEnd)
  
  let trend = ''
  let icon = null
  let color = ''
  
  if (thisMonth > lastMonth && lastMonth > twoMonthsAgo) {
    trend = 'Spending is consistently increasing over the last 3 months'
    icon = <TrendingUp className="w-5 h-5" />
    color = 'text-red-600'
  } else if (thisMonth < lastMonth && lastMonth < twoMonthsAgo) {
    trend = 'Great! Spending is consistently decreasing'
    icon = <TrendingDown className="w-5 h-5" />
    color = 'text-green-600'
  } else if (thisMonth > lastMonth) {
    trend = 'Spending increased compared to last month'
    icon = <TrendingUp className="w-5 h-5" />
    color = 'text-orange-500'
  } else if (thisMonth < lastMonth) {
    trend = 'Spending decreased compared to last month'
    icon = <TrendingDown className="w-5 h-5" />
    color = 'text-green-600'
  } else {
    trend = 'Spending remained stable compared to last month'
    icon = <Minus className="w-5 h-5" />
    color = 'text-blue-500'
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Trend Observation
      </h3>
      <div className={`flex items-center gap-3 ${color}`}>
        {icon}
        <p className="text-gray-700 dark:text-gray-300">{trend}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">2 months ago</span>
          <span className="text-gray-500 dark:text-gray-400">Last month</span>
          <span className="text-gray-500 dark:text-gray-400">This month</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-medium text-gray-900 dark:text-white">
            ${twoMonthsAgo.toLocaleString()}
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            ${lastMonth.toLocaleString()}
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            ${thisMonth.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TrendObservation