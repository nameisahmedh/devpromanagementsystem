import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  BarChart3, 
  User, 
  LogOut, 
  Menu,
  Code,
  X,
  Settings,
  Users
} from 'lucide-react'

const Sidebar = ({ userRole, onLogout }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [location.pathname])

  const adminMenuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/admin/users', icon: Users, label: 'Manage Users' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' }
  ]

  const staffMenuItems = [
    { path: '/staff/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/staff/profile', icon: User, label: 'Profile' }
  ]

  const menuItems = userRole === 'admin' ? adminMenuItems : staffMenuItems

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen)

  return (
    <>
      {/* Mobile Menu Button - Only show on small screens */}
      <motion.button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#232946] text-white p-3 rounded-xl shadow-lg border border-[#3a3a4e] hover:bg-[#6246ea] transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isMobileOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Always visible on desktop, toggle on mobile */}
      <motion.div
        className={`
          bg-gradient-to-b from-[#232946] to-[#1a1a2e] h-screen fixed left-0 top-0 z-40 w-64 transition-all duration-300 border-r border-[#3a3a4e] shadow-2xl
          ${isMobileOpen ? 'translate-x-0' : 'lg:translate-x-0 -translate-x-full'}
          flex flex-col overflow-hidden
        `}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Header */}
          <motion.div 
            className="flex items-center justify-center mb-8 min-h-[60px]"
            layout
          >
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-r from-[#6246ea] to-[#3e54ac] rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Code className="w-7 h-7 text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-white font-bold text-xl">DevPro</h2>
                <p className="text-[#b8c1ec] text-xs">Solutions</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1 overflow-y-auto">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                      ${isActive
                        ? 'bg-gradient-to-r from-[#6246ea] to-[#3e54ac] text-white shadow-lg transform scale-105'
                        : 'text-[#b8c1ec] hover:bg-[#3a3a4e] hover:text-white hover:scale-105'
                      }
                    `}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <IconComponent className={`w-6 h-6 ${isActive ? 'text-white' : 'group-hover:text-[#6246ea]'} relative z-10`} />
                    </motion.div>
                    <motion.span 
                      className="font-medium relative z-10"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#6246ea]/20 to-[#3e54ac]/20 rounded-xl"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* User Role Badge */}
          <motion.div 
            className="mb-4 p-4 bg-gradient-to-r from-[#3a3a4e] to-[#2a2a3e] rounded-xl border border-[#4a4a5e]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-xs text-[#b8c1ec] mb-1">Logged in as</div>
            <div className="text-white font-semibold capitalize flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              {userRole}
            </div>
          </motion.div>

          {/* Logout Button */}
          <motion.button
            onClick={() => {
              onLogout();
              setIsMobileOpen(false);
            }}
            className="flex items-center gap-4 p-3 w-full text-[#b8c1ec] hover:bg-red-600/20 hover:text-red-400 rounded-xl transition-all duration-200 group relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <LogOut className="w-6 h-6 group-hover:text-red-400 relative z-10" />
            </motion.div>
            <motion.span 
              className="font-medium relative z-10"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              Logout
            </motion.span>
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}

export default Sidebar