import React, { useState, useEffect } from "react";
import Sidebar from "../Navigation/Sidebar";
import AllTask from "../other/AllTask";
import CreateTask from "../other/CreateTask";
import DashboardStats from "../Stats/DashboardStats";
import SearchAndFilter from "../common/SearchAndFilter";
import { useApp } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Users, BarChart3, Settings, Sun, Moon } from "lucide-react";

const AdminDashboard = ({ onLogout }) => {
  const { userData, filter, searchTerm, setFilter, setSearch } = useApp();
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
    { id: 'tasks', label: 'Task Management', icon: Users },
    { id: 'create', label: 'Create Task', icon: Plus }
  ];

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <Sidebar userRole="admin" onLogout={onLogout} />
      
      <main className="flex-1 w-full lg:ml-64 transition-all duration-300">
        <motion.div
          className="max-w-full mx-auto p-4 sm:p-6 lg:p-8 pt-20 lg:pt-16 transition-colors duration-300"
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
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 relative ${
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
                  <span className="hidden sm:inline">{tab.label}</span>
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
                <div className="space-y-6">
                  <AllTask darkMode={darkMode} showSummary={true} />
                </div>
                <div className="space-y-6">
                  <motion.div
                    className={`p-6 rounded-xl shadow-lg ${
                      darkMode 
                        ? 'bg-[#232946] border border-[#3a3a4e]' 
                        : 'bg-white border border-gray-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className={`text-xl font-bold mb-4 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setActiveTab('create')}
                        className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-[#6246ea] to-[#3e54ac] text-white rounded-lg hover:shadow-lg transition-all duration-300"
                      >
                        <Plus className="w-5 h-5" />
                        Create New Task
                      </button>
                      <button
                        onClick={() => setActiveTab('tasks')}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                          darkMode 
                            ? 'bg-[#3a3a4e] text-white hover:bg-[#4a4a5e]' 
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        <Users className="w-5 h-5" />
                        Manage All Tasks
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === 'tasks' && (
              <motion.div
                key="tasks"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SearchAndFilter
                  searchTerm={searchTerm}
                  onSearchChange={setSearch}
                  filter={filter}
                  onFilterChange={setFilter}
                  darkMode={darkMode}
                />
                <AllTask showDetailed={true} darkMode={darkMode} />
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