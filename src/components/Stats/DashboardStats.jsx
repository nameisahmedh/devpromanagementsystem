import React from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { Users, ClipboardList, CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react'

const DashboardStats = ({ userRole, darkMode = true }) => {
  const { userData, getTaskStats } = useApp()

  const stats = getTaskStats()
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  const statCards = [
    {
      title: 'Total Staff',
      value: userData?.length || 0,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      change: `${userData?.length || 0} team members`,
      bgColor: darkMode ? 'bg-blue-500/10' : 'bg-blue-50',
      borderColor: darkMode ? 'border-blue-500/20' : 'border-blue-200'
    },
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: ClipboardList,
      color: 'from-purple-500 to-purple-600',
      change: `All assigned tasks`,
      bgColor: darkMode ? 'bg-purple-500/10' : 'bg-purple-50',
      borderColor: darkMode ? 'border-purple-500/20' : 'border-purple-200'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      change: `${completionRate}% completion rate`,
      bgColor: darkMode ? 'bg-green-500/10' : 'bg-green-50',
      borderColor: darkMode ? 'border-green-500/20' : 'border-green-200'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      change: 'Active tasks',
      bgColor: darkMode ? 'bg-orange-500/10' : 'bg-orange-50',
      borderColor: darkMode ? 'border-orange-500/20' : 'border-orange-200'
    },
    {
      title: 'Failed',
      value: stats.failed,
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      change: 'Need review',
      bgColor: darkMode ? 'bg-red-500/10' : 'bg-red-50',
      borderColor: darkMode ? 'border-red-500/20' : 'border-red-200'
    },
    {
      title: 'Overdue',
      value: stats.overdue,
      icon: TrendingUp,
      color: 'from-red-600 to-red-700',
      change: 'Urgent attention',
      bgColor: darkMode ? 'bg-red-600/10' : 'bg-red-50',
      borderColor: darkMode ? 'border-red-600/20' : 'border-red-200'
    }
  ]

  const cardClass = `
    ${darkMode 
      ? 'bg-[#232946] border-[#3a3a4e]' 
      : 'bg-white border-gray-200 shadow-sm'
    }
    rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-lg
  `;

  const titleClass = darkMode ? 'text-white' : 'text-gray-900';
  const subtitleClass = darkMode ? 'text-[#b8c1ec]' : 'text-gray-600';
  const changeClass = darkMode ? 'text-[#9ca3af]' : 'text-gray-500';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <motion.div
            key={stat.title}
            className={cardClass}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <motion.div
                  className={`text-3xl font-bold ${titleClass}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
              </div>
            </div>
            <h3 className={`font-semibold mb-1 ${subtitleClass}`}>{stat.title}</h3>
            <p className={`text-sm ${changeClass}`}>{stat.change}</p>
            
            {/* Progress bar for completion rate */}
            {stat.title === 'Completed' && (
              <div className="mt-3">
                <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-[#1a1a2e]' : 'bg-gray-200'}`}>
                  <motion.div
                    className="h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${completionRate}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  )
}

export default DashboardStats