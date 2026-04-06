import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import useFinanceStore from '../../store/useFinanceStore'
import { format, subMonths, eachMonthOfInterval, startOfMonth, endOfMonth } from 'date-fns'

const BalanceTrendChart = () => {
  const transactions = useFinanceStore((state) => state.transactions)
  
  // Get last 6 months
  const endDate = new Date()
  const startDate = subMonths(endDate, 5)
  const months = eachMonthOfInterval({ start: startDate, end: endDate })
  
  let runningBalance = 0
  const data = months.map(month => {
    const monthStart = startOfMonth(month)
    const monthEnd = endOfMonth(month)
    
    const monthTransactions = transactions.filter(t => {
      const tDate = new Date(t.date)
      return tDate >= monthStart && tDate <= monthEnd
    })
    
    monthTransactions.forEach(t => {
      if (t.type === 'income') {
        runningBalance += t.amount
      } else {
        runningBalance -= t.amount
      }
    })
    
    return {
      month: format(month, 'MMM'),
      balance: runningBalance,
    }
  })
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Balance Trend
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#F3F4F6'
            }}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: '#3B82F6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BalanceTrendChart