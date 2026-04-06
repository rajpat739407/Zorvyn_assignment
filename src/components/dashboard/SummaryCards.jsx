import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, TrendingDown, Percent } from 'lucide-react'
import useFinanceStore from '../../store/useFinanceStore'

const SummaryCards = () => {
  const getTotalBalance = useFinanceStore((state) => state.getTotalBalance)
  const getTotalIncome = useFinanceStore((state) => state.getTotalIncome)
  const getTotalExpenses = useFinanceStore((state) => state.getTotalExpenses)
  const getSavingsRate = useFinanceStore((state) => state.getSavingsRate)

  const balance = getTotalBalance()
  const income = getTotalIncome()
  const expenses = getTotalExpenses()
  const savingsRate = getSavingsRate()

  const cards = [
    {
      title: 'Total Balance',
      value: `$${balance.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      change: '+12%',
    },
    {
      title: 'Total Income',
      value: `$${income.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20',
      change: '+8%',
    },
    {
      title: 'Total Expenses',
      value: `$${expenses.toLocaleString()}`,
      icon: TrendingDown,
      color: 'text-red-600',
      bg: 'bg-red-50 dark:bg-red-900/20',
      change: '-3%',
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      icon: Percent,
      color: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      change: '+5%',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${card.bg}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
              {card.change}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {card.title}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {card.value}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

export default SummaryCards