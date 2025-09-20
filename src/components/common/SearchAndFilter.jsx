import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchAndFilter = ({ 
  searchTerm, 
  onSearchChange, 
  filter, 
  onFilterChange, 
  darkMode = true 
}) => {
  const filters = [
    { value: 'all', label: 'All Tasks', color: 'bg-gray-500' },
    { value: 'new', label: 'New', color: 'bg-blue-500' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-yellow-500' },
    { value: 'completed', label: 'Completed', color: 'bg-green-500' },
    { value: 'failed', label: 'Failed', color: 'bg-red-500' }
  ];

  const containerClass = `
    ${darkMode 
      ? 'bg-[#232946] border-[#3a3a4e]' 
      : 'bg-white border-gray-200 shadow-sm'
    }
    rounded-xl p-4 mb-6 border
  `;

  const inputClass = `
    w-full pl-10 pr-10 py-2.5 rounded-lg border transition-all
    ${darkMode 
      ? 'bg-[#1a1a2e] text-white border-[#3a3a4e] focus:ring-2 focus:ring-[#6246ea] focus:border-transparent placeholder-[#b8c1ec]'
      : 'bg-gray-50 text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500'
    }
  `;

  const iconClass = darkMode ? 'text-[#b8c1ec]' : 'text-gray-500';

  return (
    <motion.div 
      className={containerClass}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1 min-w-0">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconClass} w-4 h-4`} />
          <input
            type="text"
            placeholder="Search tasks by title, description, or category..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={inputClass}
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${iconClass} hover:text-red-400 transition-colors`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className={`${iconClass} w-4 h-4`} />
          {filters.map((filterOption) => (
            <button
              key={filterOption.value}
              onClick={() => onFilterChange(filterOption.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === filterOption.value
                  ? `${filterOption.color} text-white shadow-lg`
                  : darkMode
                    ? 'bg-[#1a1a2e] text-[#b8c1ec] hover:bg-[#3a3a4e] hover:text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchAndFilter;