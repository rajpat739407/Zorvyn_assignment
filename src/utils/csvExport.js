export const exportToCSV = (transactions) => {
  const headers = ['Date', 'Description', 'Category', 'Amount', 'Type']
  const csvRows = [headers]
  
  for (const transaction of transactions) {
    const row = [
      transaction.date,
      transaction.description,
      transaction.category,
      transaction.amount,
      transaction.type
    ]
    csvRows.push(row.join(','))
  }
  
  const csvContent = csvRows.join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}