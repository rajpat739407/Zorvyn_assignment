import { ArrowUp, ArrowDown } from 'lucide-react'
import useFinanceStore from '../../store/useFinanceStore'
import { subMonths, format, startOfMonth, endOfMonth } from 'date-fns'

const MonthlyComparison = () => {
  const transactions = useFinanceStore((state) => state.transactions)
  
  const now = new Date()
  const thisMonthStart = startOfMonth(now)
  const thisMonthEnd = endOfMonth(now)
  const lastMonthStart = startOfMonth(subMonths(now, 1))
  const lastMonthEnd = endOfMonth(subMonths(now, 1))
  
  const getMonthExpenses = (start, end) => {
    return transactions
      .filter(t => {
        const tDate = new Date(t.date)
        return t.type === 'expense' && tDate >= start && tDate <= end
      })
      .reduce((sum, t) => sum + t.amount, 0)
  }
  
  const thisMonthExpenses = getMonthExpenses(thisMonthStart, thisMonthEnd)
  const lastMonthExpenses = getMonthExpenses(lastMonthStart, lastMonthEnd)
  
  const percentChange = lastMonthExpenses === 0 
    ? 100 
    : ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100
  
  const isIncrease = percentChange > 0
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Monthly Comparison
      </h3>
      <div className="space-y-2">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          ${thisMonthExpenses.toLocaleString()}
        </p>
        <div className={`flex items-center gap-2 ${isIncrease ? 'text-red-600' : 'text-green-600'}`}>
          {isIncrease ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          <span className="font-medium">
            {Math.abs(percentChange).toFixed(1)}% vs last month
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last month: ${lastMonthExpenses.toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export default MonthlyComparison