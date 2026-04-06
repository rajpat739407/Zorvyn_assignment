import { useState } from 'react'
import { Moon, Sun, UserCog, Search, X } from 'lucide-react'
import useFinanceStore from '../../store/useFinanceStore'

const TopBar = () => {
  const { role, setRole, theme, toggleTheme, filters, setFilters } = useFinanceStore()
  const [showSearch, setShowSearch] = useState(false)
  const [searchValue, setSearchValue] = useState(filters.search)

  const handleRoleChange = (newRole) => {
    setRole(newRole)
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchValue(value)
    setFilters({ search: value })
  }

  const clearSearch = () => {
    setSearchValue('')
    setFilters({ search: '' })
    setShowSearch(false)
  }

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showSearch ? (
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchValue}
                onChange={handleSearch}
                className="bg-transparent outline-none text-sm w-64"
                autoFocus
              />
              <button onClick={clearSearch} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Role Switcher */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => handleRoleChange('viewer')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                role === 'viewer'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Viewer
            </button>
            <button
              onClick={() => handleRoleChange('admin')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                role === 'admin'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <UserCog className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium hidden md:block">
              {role === 'admin' ? 'Admin User' : 'Guest User'}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopBar