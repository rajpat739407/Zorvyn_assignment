import TransactionTable from '../components/transactions/TransactionTable'

const TransactionsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track all your financial transactions</p>
      </div>
      
      <TransactionTable />
    </div>
  )
}

export default TransactionsPage