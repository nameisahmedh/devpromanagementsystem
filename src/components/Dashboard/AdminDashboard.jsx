import React, { useState, useEffect } from "react";
import Sidebar from "../Navigation/Sidebar";
import CreateTask from "../other/CreateTask";
import DashboardStats from "../Stats/DashboardStats";
import SearchAndFilter from "../common/SearchAndFilter";
import { useApp } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Users, BarChart3, Sun, Moon, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const AdminDashboard = ({ onLogout }) => {
  const { userData, filter, searchTerm, setFilter, setSearch, getFilteredTasks } = useApp();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'create', label: 'Create Task', icon: Plus }
  ];

  // Get top performers (staff with more than 5 completed tasks)
  const getTopPerformers = () => {
    if (!userData) return []
    
    return userData
      .map(staff => {
        const completedTasks = staff.tasks?.filter(task => task.status === 'completed').length || 0
        const totalTasks = staff.tasks?.length || 0
        const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
        
        return {
          ...staff,
          completedTasks,
          totalTasks,
          completionRate
        }
      })
      .filter(staff => staff.completedTasks >= 5) // Only show staff with 5+ completed tasks
      .sort((a, b) => b.completedTasks - a.completedTasks)
      .slice(0, 5) // Top 5 performers
  }

  // Get recent tasks summary
  const getRecentTasksSummary = () => {
    if (!userData) return []
    
    const allTasks = userData.flatMap(staff => 
      staff.tasks?.map(task => ({
        ...task,
        staffName: staff.name,
        staffRole: staff.role
      })) || []
    )
    
    return allTasks
      .sort((a, b) => new Date(b.createdAt || b.taskDate) - new Date(a.createdAt || a.taskDate))
      .slice(0, 8) // Show only 8 recent tasks
  }

  const topPerformers = getTopPerformers()
  const recentTasks = getRecentTasksSummary()

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-400" />
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-400" />
      default: return <AlertTriangle className="w-4 h-4 text-blue-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400'
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400'
      case 'failed': return 'bg-red-500/20 text-red-400'
      default: return 'bg-blue-500/20 text-blue-400'
    }
  }

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <Sidebar userRole="admin" onLogout={onLogout} />
      
      <main className="flex-1 w-full lg:ml-64 transition-all duration-300">
        <motion.div
          className="max-w-full mx-auto p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Admin Dashboard
              </h1>
              <p className={`text-base ${
                darkMode ? 'text-[#b8c1ec]' : 'text-gray-600'
              }`}>
                Manage your team and monitor progress
              </p>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className={`p-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 ${
                  darkMode
                    ? 'bg-[#232946] text-white hover:bg-[#6246ea] border border-[#3a3a4e]'
                    : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100 shadow-md'
                }`}
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          </div>

          {/* Stats */}
          <DashboardStats userRole="admin" darkMode={darkMode} />

          {/* Tab Navigation */}
          <motion.div 
            className={`flex flex-wrap gap-2 mb-8 p-2 rounded-xl ${
              darkMode ? 'bg-[#232946] border border-[#3a3a4e]' : 'bg-white border border-gray-200 shadow-sm'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 relative ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#6246ea] to-[#3e54ac] text-white shadow-lg'
                      : darkMode 
                        ? 'text-[#b8c1ec] hover:bg-[#3a3a4e] hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#6246ea]/20 to-[#3e54ac]/20 rounded-lg"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 xl:grid-cols-2 gap-8"
              >
                {/* Top Performers */}
                <div className={`rounded-xl p-6 shadow-lg border ${
                  darkMode 
                    ? 'bg-[#232946] border-[#3a3a4e]' 
                    : 'bg-white border-gray-200'
                }`}>
                  <h3 className={`text-xl font-bold mb-6 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    🏆 Top Performers (5+ Completed Tasks)
                  </h3>
                  
                  {topPerformers.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🎯</div>
                      <p className={`${darkMode ? 'text-[#b8c1ec]' : 'text-gray-600'}`}>
                        No top performers yet. Complete more tasks to appear here!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {topPerformers.map((performer, index) => (
                        <motion.div
                          key={performer.id}
                          className={`flex items-center justify-between p-4 rounded-lg ${
                            darkMode ? 'bg-[#1a1a2e]' : 'bg-gray-50'
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-12 h-12 bg-gradient-to-r from-[#6246ea] to-[#3e54ac] rounded-full flex items-center justify-center text-white font-bold">
                                {performer.name.charAt(0)}
                              </div>
                              {index === 0 && (
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-xs">
                                  👑
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {performer.name}
                              </h4>
                              <p className={`text-sm capitalize ${darkMode ? 'text-[#b8c1ec]' : 'text-gray-600'}`}>
                                {performer.role}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {performer.completedTasks}
                            </div>
                            <div className={`text-sm ${darkMode ? 'text-[#b8c1ec]' : 'text-gray-600'}`}>
                              completed ({performer.completionRate}%)
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Tasks Summary */}
                <div className={`rounded-xl p-6 shadow-lg border ${
                  darkMode 
                    ? 'bg-[#232946] border-[#3a3a4e]' 
                    : 'bg-white border-gray-200'
                }`}>
                  <h3 className={`text-xl font-bold mb-6 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    📋 Recent Tasks
                  </h3>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {recentTasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          darkMode ? 'bg-[#1a1a2e]' : 'bg-gray-50'
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {getStatusIcon(task.status)}
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {task.taskTitle}
                            </h4>
                            <p className={`text-sm ${darkMode ? 'text-[#b8c1ec]' : 'text-gray-600'}`}>
                              {task.staffName} • {task.category}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                          {task.status.replace('-', ' ')}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'create' && (
              <motion.div
                key="create"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CreateTask darkMode={darkMode} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;