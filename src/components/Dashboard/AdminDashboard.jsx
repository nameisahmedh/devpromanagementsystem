import React, { useState, useEffect } from "react";
import Sidebar from "../Navigation/Sidebar";
import AllTask from "../other/AllTask";
import CreateTask from "../other/CreateTask";
import DashboardStats from "../Stats/DashboardStats";
import SearchAndFilter from "../common/SearchAndFilter";
import { useApp } from "../../context/AppContext";
import { motion } from "framer-motion";

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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Admin Dashboard
              </h1>
              <p className={`text-sm sm:text-base ${
                darkMode ? 'text-[#b8c1ec]' : 'text-gray-600'
              }`}>
                Manage your team and monitor progress
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex rounded-lg p-1 ${
                darkMode ? 'bg-[#232946]' : 'bg-gray-200'
              }`}>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-[#6246ea] text-white'
                      : darkMode 
                        ? 'text-[#b8c1ec] hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'tasks'
                      ? 'bg-[#6246ea] text-white'
                      : darkMode 
                        ? 'text-[#b8c1ec] hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Task Management
                </button>
              </div>
              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className={`px-4 py-2 rounded-lg shadow transition-colors ${
                  darkMode
                    ? 'bg-[#232946] text-white hover:bg-[#6246ea]'
                    : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {darkMode ? "🌙 Dark" : "☀️ Light"}
              </button>
            </div>
          </div>
          
          <div className="w-full">
            <DashboardStats userRole="admin" darkMode={darkMode} />
          </div>
          
          {activeTab === 'overview' && (
            <div className="flex flex-col lg:flex-row gap-8 w-full">
              <div className="w-full lg:w-1/2">
                <CreateTask darkMode={darkMode} />
              </div>
              <div className="w-full lg:w-1/2">
                <AllTask darkMode={darkMode} />
              </div>
            </div>
          )}
          
          {activeTab === 'tasks' && (
            <div className="w-full">
              <SearchAndFilter
                searchTerm={searchTerm}
                onSearchChange={setSearch}
                filter={filter}
                onFilterChange={setFilter}
                darkMode={darkMode}
              />
              <AllTask showDetailed={true} darkMode={darkMode} />
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;