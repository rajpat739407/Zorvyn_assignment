import { subDays, format } from 'date-fns'

const categories = {
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Refund'],
  expense: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Healthcare', 'Education']
}

const descriptions = {
  Food: ['Grocery Store', 'Restaurant', 'Cafe', 'Fast Food', 'Supermarket'],
  Transport: ['Uber', 'Gas Station', 'Metro', 'Bus', 'Car Maintenance'],
  Shopping: ['Amazon', 'Clothing Store', 'Electronics', 'Home Decor'],
  Entertainment: ['Netflix', 'Cinema', 'Concert', 'Spotify', 'Gaming'],
  Bills: ['Electricity', 'Water', 'Internet', 'Rent', 'Phone Bill'],
  Healthcare: ['Pharmacy', 'Doctor Visit', 'Dental', 'Insurance'],
  Education: ['Books', 'Course', 'Tutoring'],
  Salary: ['Monthly Salary', 'Bonus', 'Overtime'],
  Freelance: ['Web Development', 'Design', 'Consulting'],
  Investment: ['Dividend', 'Stock Profit'],
  Gift: ['Birthday Gift', 'Wedding Gift'],
  Refund: ['Product Return', 'Tax Refund']
}

const getRandomAmount = (type) => {
  if (type === 'income') {
    return Math.floor(Math.random() * 5000) + 500
  }
  return Math.floor(Math.random() * 500) + 10
}

const getRandomDate = () => {
  const daysAgo = Math.floor(Math.random() * 90)
  return subDays(new Date(), daysAgo)
}

export const generateMockTransactions = () => {
  const transactions = []
  
  // Generate 60+ transactions
  for (let i = 0; i < 65; i++) {
    const type = Math.random() > 0.7 ? 'income' : 'expense'
    const categoryList = type === 'income' ? categories.income : categories.expense
    const category = categoryList[Math.floor(Math.random() * categoryList.length)]
    const descList = descriptions[category] || ['General Transaction']
    const description = descList[Math.floor(Math.random() * descList.length)]
    const amount = getRandomAmount(type)
    const date = getRandomDate()
    
    transactions.push({
      id: i + 1,
      date: format(date, 'yyyy-MM-dd'),
      description,
      category,
      amount,
      type
    })
  }
  
  // Sort by date (newest first)
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
}