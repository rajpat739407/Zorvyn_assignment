import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { generateMockTransactions } from '../data/mockData'

const useFinanceStore = create(
  persist(
    (set, get) => ({
      // State
      transactions: generateMockTransactions(),
      role: 'admin', // 'admin' or 'viewer'
      theme: 'light', // 'light' or 'dark'
      
      // Filters
      filters: {
        search: '',
        category: '',
        type: '',
        dateRange: { start: null, end: null },
        sortBy: 'date', // 'date' or 'amount'
        sortOrder: 'desc' // 'asc' or 'desc'
      },

      // Actions
      setRole: (role) => set({ role }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      
      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
      })),
      
      addTransaction: (transaction) => set((state) => ({
        transactions: [{ ...transaction, id: Date.now() }, ...state.transactions]
      })),
      
      editTransaction: (id, updatedTransaction) => set((state) => ({
        transactions: state.transactions.map(t => 
          t.id === id ? { ...t, ...updatedTransaction } : t
        )
      })),
      
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(t => t.id !== id)
      })),

      // Computed values
      getFilteredTransactions: () => {
        const { transactions, filters } = get()
        let filtered = [...transactions]
        
        // Search
        if (filters.search) {
          const searchLower = filters.search.toLowerCase()
          filtered = filtered.filter(t => 
            t.description.toLowerCase().includes(searchLower) ||
            t.category.toLowerCase().includes(searchLower)
          )
        }
        
        // Category filter
        if (filters.category) {
          filtered = filtered.filter(t => t.category === filters.category)
        }
        
        // Type filter
        if (filters.type) {
          filtered = filtered.filter(t => t.type === filters.type)
        }
        
        // Date range
        if (filters.dateRange.start) {
          filtered = filtered.filter(t => new Date(t.date) >= new Date(filters.dateRange.start))
        }
        if (filters.dateRange.end) {
          filtered = filtered.filter(t => new Date(t.date) <= new Date(filters.dateRange.end))
        }
        
        // Sorting
        filtered.sort((a, b) => {
          if (filters.sortBy === 'date') {
            return filters.sortOrder === 'desc' 
              ? new Date(b.date) - new Date(a.date)
              : new Date(a.date) - new Date(b.date)
          } else {
            return filters.sortOrder === 'desc' 
              ? b.amount - a.amount
              : a.amount - b.amount
          }
        })
        
        return filtered
      },
      
      getTotalBalance: () => {
        const { transactions } = get()
        return transactions.reduce((sum, t) => 
          t.type === 'income' ? sum + t.amount : sum - t.amount, 0
        )
      },
      
      getTotalIncome: () => {
        const { transactions } = get()
        return transactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0)
      },
      
      getTotalExpenses: () => {
        const { transactions } = get()
        return transactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0)
      },
      
      getSavingsRate: () => {
        const income = get().getTotalIncome()
        const expenses = get().getTotalExpenses()
        if (income === 0) return 0
        return ((income - expenses) / income) * 100
      }
    }),
    {
      name: 'finance-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useFinanceStore