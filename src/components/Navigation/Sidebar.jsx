import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  BarChart3, 
  User, 
  LogOut, 
  Menu, 
  X,
  Code
} from 'lucide-react'

const Sidebar = ({ userRole, onLogout }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth >= 1024)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark')
  const location = useLocation()

  // Responsive: collapsed on large screens, expanded on mobile/tablet
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth >= 1024)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
    // eslint-disable-next-line
  }, [location.pathname])

  // Sync dark mode across app
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  // Listen for theme changes in other tabs/windows
  useEffect(() => {
    const syncTheme = () => {
      setDarkMode(localStorage.getItem('theme') === 'dark')
    }
    window.addEventListener('storage', syncTheme)
    return () => window.removeEventListener('storage', syncTheme)
  }, [])

  const adminMenuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' }
  ]

  const staffMenuItems = [
    { path: '/staff/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/staff/profile', icon: User, label: 'Profile' }
  ]

  const menuItems = userRole === 'admin' ? adminMenuItems : staffMenuItems

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen)
  const closeMobile = () => setIsMobileOpen(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobile}
        aria-label={isMobileOpen ? 'Close sidebar' : 'Open sidebar'}
        className="lg:hidden fixed top-4 left-4 z-[101] bg-[#232946] text-white p-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6246ea]"
      >
        {isMobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] lg:hidden"
          onClick={closeMobile}
          aria-label="Sidebar overlay"
        />
      )}

      {/* Sidebar */}
      <motion.div
        className={`
          bg-gradient-to-b from-[#232946] to-[#1a1a2e] h-screen fixed left-0 top-0 z-[102] transition-all duration-300 border-r border-[#3a3a4e]
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        tabIndex={-1}
        aria-label="Sidebar navigation"
        style={{ outline: isMobileOpen ? '2px solid #6246ea' : 'none' }}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#6246ea] to-[#3e54ac] rounded-lg flex items-center justify-center">
                <Code className="w-7 h-7 text-white" />
              </div>
              {!isCollapsed && (
                <h2 className="text-white font-bold text-xl">DevPro</h2>
              )}
            </div>
            {/* Close button for mobile sidebar */}
            <button
              onClick={closeMobile}
              className="lg:hidden text-white hover:text-red-400 transition-colors p-1 rounded"
              aria-label="Close sidebar"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobile}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group
                    ${isActive
                      ? 'bg-gradient-to-r from-[#6246ea] to-[#3e54ac] text-white shadow-lg'
                      : 'text-[#b8c1ec] hover:bg-[#3a3a4e] hover:text-white'
                    }
                  `}
                >
                  <IconComponent className={`w-7 h-7 ${isActive ? 'text-white' : 'group-hover:text-[#6246ea]'}`} />
                  {/* Only show label on mobile/tablet */}
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              )
            })}
          </nav>
          {/* User Role Badge */}
          {!isCollapsed && (
            <div className="mb-4 p-3 bg-[#3a3a4e] rounded-xl">
              <div className="text-xs text-[#b8c1ec] mb-1">Logged in as</div>
              <div className="text-white font-semibold capitalize">{userRole}</div>
            </div>
          )}
          {/* Logout Button */}
          <button
            onClick={() => {
              onLogout();
              closeMobile();
            }}
            className="flex items-center gap-4 p-3 w-full text-[#b8c1ec] hover:bg-red-600/20 hover:text-red-400 rounded-xl transition-all duration-200 group"
          >
            <LogOut className="w-7 h-7 group-hover:text-red-400" />
            {!isCollapsed && (
              <span className="font-medium">Logout</span>
            )}
          </button>
        </div>
      </motion.div>
    </>
  )
}

export default Sidebar