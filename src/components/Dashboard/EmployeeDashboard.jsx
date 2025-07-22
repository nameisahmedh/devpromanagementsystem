import React, { useState, useEffect, useMemo } from 'react'
import Sidebar from '../Navigation/Sidebar'
import TaskListCount from '../other/TakListCount'
import TaskList from '../TaskList/TaskList'
import SearchAndFilter from '../common/SearchAndFilter'
import { useApp } from '../../context/AppContext'
import { motion } from 'framer-motion'

const EmployeeDashboard = ({ data, onLogout }) => {
  const { filter, searchTerm, setFilter, setSearch, getFilteredTasks } = useApp();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const filteredTasks = useMemo(() => {
    return getFilteredTasks(data?.tasks || []);
  }, [data?.tasks, filter, searchTerm, getFilteredTasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] dark:from-[#181824] dark:via-[#232946] dark:to-[#181824]">
      <Sidebar userRole="staff" onLogout={onLogout} />
      
      <div className="lg:ml-64 transition-all duration-300">
        <motion.div
          className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                Welcome back, {data?.name}! 👋
              </h1>
              <p className="text-[#b8c1ec] text-sm sm:text-base">Here's what's on your plate today</p>
            </div>
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="bg-[#232946] dark:bg-[#3a3a4e] text-white px-4 py-2 rounded-lg shadow hover:bg-[#6246ea] dark:hover:bg-[#232946] transition-colors"
            >
              {darkMode ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
          
          <TaskListCount data={data} />
          
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearch}
            filter={filter}
            onFilterChange={setFilter}
          />
          
          <TaskList data={{ ...data, tasks: filteredTasks }} />
        </motion.div>
      </div>
    </div>
  )
}

export default EmployeeDashboard
