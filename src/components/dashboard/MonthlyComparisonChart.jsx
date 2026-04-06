import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import useFinanceStore from '../../store/useFinanceStore'
import { format, subMonths, eachMonthOfInterval, startOfMonth, endOfMonth } from 'date-fns'

const MonthlyComparisonChart = () => {
  const transactions = useFinanceStore((state) => state.transactions)
  
  // Get last 6 months
  const endDate = new Date()
  const startDate = subMonths(endDate, 5)
  const months = eachMonthOfInterval({ start: startDate, end: endDate })
  
  const data = months.map(month => {
    const monthStart = startOfMonth(month)
    const monthEnd = endOfMonth(month)
    
    const monthTransactions = transactions.filter(t => {
      const tDate = new Date(t.date)
      return tDate >= monthStart && tDate <= monthEnd
    })
    
    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const expenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    
    return {
      month: format(month, 'MMM'),
      Income: income,
      Expenses: expenses,
    }
  })
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Monthly Comparison
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip
            formatter={(value) => `$${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#F3F4F6'
            }}
          />
          <Legend />
          <Bar dataKey="Income" fill="#10B981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MonthlyComparisonChart