import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  BarChart3, 
  User, 
  LogOut, 
  Menu,
  Code
} from 'lucide-react'

const Sidebar = ({ userRole, onLogout }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
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
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' }
  ]

  const staffMenuItems = [
    { path: '/staff/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/staff/profile', icon: User, label: 'Profile' }
  ]

  const menuItems = userRole === 'admin' ? adminMenuItems : staffMenuItems

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen)
  const toggleCollapse = () => setIsCollapsed(!isCollapsed)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#232946] text-white p-2 rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Desktop Collapse Button */}
      <button
        onClick={toggleCollapse}
        className="hidden lg:block fixed top-4 z-50 bg-[#232946] text-white p-2 rounded-lg shadow-lg transition-all duration-300"
        style={{ left: isCollapsed ? '4px' : '260px' }}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className={`
          bg-gradient-to-b from-[#232946] to-[#1a1a2e] h-screen fixed left-0 top-0 z-40 transition-all duration-300 border-r border-[#3a3a4e]
          ${isCollapsed && window.innerWidth >= 1024 ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : window.innerWidth >= 1024 ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed && window.innerWidth >= 1024 ? '-translate-x-44' : ''}
          flex flex-col
        `}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#6246ea] to-[#3e54ac] rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              {((!isCollapsed && window.innerWidth >= 1024) || isMobileOpen || window.innerWidth < 1024) && (
                <h2 className="text-white font-bold text-xl">DevPro</h2>
              )}
            </div>
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
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group
                    ${isActive
                      ? 'bg-gradient-to-r from-[#6246ea] to-[#3e54ac] text-white shadow-lg'
                      : 'text-[#b8c1ec] hover:bg-[#3a3a4e] hover:text-white'
                    }
                  `}
                >
                  <IconComponent className={`w-6 h-6 ${isActive ? 'text-white' : 'group-hover:text-[#6246ea]'}`} />
                  {((!isCollapsed && window.innerWidth >= 1024) || isMobileOpen || window.innerWidth < 1024) && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User Role Badge */}
          {((!isCollapsed && window.innerWidth >= 1024) || isMobileOpen || window.innerWidth < 1024) && (
            <div className="mb-4 p-3 bg-[#3a3a4e] rounded-xl">
              <div className="text-xs text-[#b8c1ec] mb-1">Logged in as</div>
              <div className="text-white font-semibold capitalize">{userRole}</div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={() => {
              onLogout();
              setIsMobileOpen(false);
            }}
            className="flex items-center gap-4 p-3 w-full text-[#b8c1ec] hover:bg-red-600/20 hover:text-red-400 rounded-xl transition-all duration-200 group"
          >
            <LogOut className="w-6 h-6 group-hover:text-red-400" />
            {((!isCollapsed && window.innerWidth >= 1024) || isMobileOpen || window.innerWidth < 1024) && (
              <span className="font-medium">Logout</span>
            )}
          </button>
        </div>
      </motion.div>
    </>
  )
}

export default Sidebar