import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  User,
  LogOut, 
  Menu,
  Code,
  X,
  Sun,
  Moon
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const Sidebar = () => {
  const { user, profile, signOut, theme, toggleTheme, isAdmin } = useAuth()
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

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/profile', icon: User, label: 'Profile' }
  ]

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen)

  const handleLogout = async () => {
    await signOut()
    setIsMobileOpen(false)
  }

  const cardClass = theme === 'dark' 
    ? 'bg-slate-800 border-slate-700' 
    : 'bg-white border-gray-200 shadow-lg'
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900'
  const subtextClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600'

  return (
    <>
      {/* Mobile Menu Button - Only show on small screens */}
      <motion.button
        onClick={toggleMobile}
        className={`lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl shadow-lg border transition-colors ${
          theme === 'dark' 
            ? 'bg-slate-800 text-white border-slate-700 hover:bg-indigo-600' 
            : 'bg-white text-gray-900 border-gray-200 hover:bg-indigo-600 hover:text-white'
        }`}
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
          ${cardClass} h-screen fixed left-0 top-0 z-40 w-64 transition-all duration-300 border-r shadow-2xl
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
                className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
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
                <h2 className={`font-bold text-xl ${textClass}`}>DevPro</h2>
                <p className={`text-xs ${subtextClass}`}>Solutions</p>
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
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                      ${isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                        : theme === 'dark'
                          ? 'text-gray-300 hover:bg-slate-700 hover:text-white hover:scale-105'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:scale-105'
                      }}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <IconComponent className={`w-6 h-6 ${
                        isActive ? 'text-white' : theme === 'dark' ? 'group-hover:text-indigo-400' : 'group-hover:text-indigo-600'
                      } relative z-10`} />
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
                        className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className={`flex items-center gap-4 p-3 w-full rounded-xl transition-all duration-200 group mb-4 ${
              theme === 'dark'
                ? 'text-gray-300 hover:bg-slate-700 hover:text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: theme === 'dark' ? 180 : -180 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {theme === 'dark' ? (
                <Sun className="w-6 h-6 group-hover:text-yellow-400 relative z-10" />
              ) : (
                <Moon className="w-6 h-6 group-hover:text-indigo-600 relative z-10" />
              )}
            </motion.div>
            <motion.span 
              className="font-medium relative z-10"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </motion.span>
          </motion.button>

          {/* User Role Badge */}
          <motion.div 
            className={`mb-4 p-4 rounded-xl border ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-slate-700 to-slate-600 border-slate-600' 
                : 'bg-gradient-to-r from-gray-100 to-gray-50 border-gray-200'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`text-xs mb-1 ${subtextClass}`}>Logged in as</div>
            <div className={`font-semibold capitalize flex items-center gap-2 ${textClass}`}>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              {profile?.full_name || 'User'}
            </div>
            <div className={`text-xs mt-1 ${subtextClass}`}>
              {isAdmin ? 'Administrator' : 'Staff Member'}
            </div>
          </motion.div>

          {/* Logout Button */}
          <motion.button
            onClick={handleLogout}
            className={`flex items-center gap-4 p-3 w-full rounded-xl transition-all duration-200 group relative overflow-hidden ${
              theme === 'dark'
                ? 'text-gray-300 hover:bg-red-600/20 hover:text-red-400'
                : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <LogOut className={`w-6 h-6 relative z-10 ${
                theme === 'dark' ? 'group-hover:text-red-400' : 'group-hover:text-red-600'
              }`} />
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