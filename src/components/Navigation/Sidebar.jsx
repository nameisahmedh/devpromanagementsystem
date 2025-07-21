import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Sidebar = ({ userRole, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  const adminMenuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin/analytics', icon: '📈', label: 'Analytics' },
    { path: '/admin/settings', icon: '⚙️', label: 'Settings' }
  ]

  const staffMenuItems = [
    { path: '/staff/dashboard', icon: '📋', label: 'Dashboard' },
    { path: '/staff/profile', icon: '👤', label: 'Profile' }
  ]

  const menuItems = userRole === 'admin' ? adminMenuItems : staffMenuItems

  return (
    <motion.div
      className={`bg-[#232946] h-screen fixed left-0 top-0 z-50 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.h2
                className="text-white font-bold text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                DevPro
              </motion.h2>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:text-[#6246ea] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-[#6246ea] text-white'
                  : 'text-[#b8c1ec] hover:bg-[#3a3a4e] hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 p-3 w-full text-[#b8c1ec] hover:bg-red-600 hover:text-white rounded-lg transition-all duration-200"
          >
            <span className="text-xl">🚪</span>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-medium"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Sidebar