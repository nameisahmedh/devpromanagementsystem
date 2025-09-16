import React from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../Navigation/Sidebar'
import { useAuth } from '../../hooks/useAuth'

const DashboardLayout = ({ children }) => {
  const { theme } = useAuth()

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
    }`}>
      <Sidebar />
      
      <div className="lg:ml-64 transition-all duration-300">
        <motion.div
          className="p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardLayout