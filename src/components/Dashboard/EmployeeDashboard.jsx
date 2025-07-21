import React from 'react'
import Sidebar from '../Navigation/Sidebar'
import TaskListCount from '../other/TakListCount'
import TaskList from '../TaskList/TaskList'
import { motion } from 'framer-motion'

const EmployeeDashboard = ({ data, onLogout }) => {  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <Sidebar userRole="staff" onLogout={onLogout} />
      
      <div className="lg:ml-64 transition-all duration-300">
        <motion.div
          className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              Welcome back, {data?.name}! 👋
            </h1>
            <p className="text-[#b8c1ec] text-sm sm:text-base">Here's what's on your plate today</p>
          </div>
          
          <TaskListCount data={data} />
          <TaskList data={data} />
        </motion.div>
      </div>
    </div>
  )
}

export default EmployeeDashboard
