import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import useFinanceStore from '../../store/useFinanceStore'

const COLORS = ['#10B981', '#EF4444']

const IncomeExpenseRatio = () => {
  const getTotalIncome = useFinanceStore((state) => state.getTotalIncome)
  const getTotalExpenses = useFinanceStore((state) => state.getTotalExpenses)
  
  const income = getTotalIncome()
  const expenses = getTotalExpenses()
  
  const data = [
    { name: 'Income', value: income },
    { name: 'Expenses', value: expenses }
  ]
  
  const ratio = income === 0 ? 0 : (expenses / income) * 100
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Income vs Expenses
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `$${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#F3F4F6'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Expense-to-Income Ratio
        </p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {ratio.toFixed(1)}%
        </p>
      </div>
    </div>
  )
}

export default IncomeExpenseRatio