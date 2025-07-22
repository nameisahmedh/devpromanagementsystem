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
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className={
      `min-h-screen flex flex-col lg:flex-row transition-colors duration-300
      dark:bg-gradient-to-br dark:from-[#181824] dark:via-[#232946] dark:to-[#181824]
      bg-gradient-to-br from-[#f3f4f6] via-[#e5e7eb] to-[#f3f4f6]`
    }>
      <Sidebar userRole="admin" onLogout={onLogout} />
      <main className="flex-1 w-full lg:ml-20 transition-all duration-300">
        <motion.div
          className="max-w-full mx-auto p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 dark:text-white text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm sm:text-base dark:text-[#b8c1ec] text-gray-600">
                Manage your team and monitor progress
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-[#232946] rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-[#6246ea] text-white'
                      : 'text-[#b8c1ec] hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'tasks'
                      ? 'bg-[#6246ea] text-white'
                      : 'text-[#b8c1ec] hover:text-white'
                  }`}
                >
                  Task Management
                </button>
              </div>
              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className={`px-4 py-2 rounded-lg shadow transition-colors
                  ${darkMode
                    ? 'bg-[#3a3a4e] text-white hover:bg-[#232946]'
                    : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'}
                `}
              >
                {darkMode ? "🌙 Dark" : "☀️ Light"}
              </button>
            </div>
          </div>
          
          <div className="w-full">
            <DashboardStats userRole="admin" />
          </div>
          
          {activeTab === 'overview' && (
            <div className="flex flex-col lg:flex-row gap-8 w-full">
              <div className="w-full lg:w-1/2">
                <CreateTask />
              </div>
              <div className="w-full lg:w-1/2">
                <AllTask />
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
              />
              <AllTask showDetailed={true} />
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;