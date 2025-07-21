import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { AuthContext } from '../../context/AuthProvider'

const DashboardStats = ({ userRole }) => {
  const [userData] = useContext(AuthContext)

  const calculateStats = () => {
    if (!userData) return { totalStaff: 0, totalTasks: 0, completedTasks: 0, pendingTasks: 0 }

    const totalStaff = userData.length
    let totalTasks = 0
    let completedTasks = 0
    let pendingTasks = 0

    userData.forEach(staff => {
      if (staff.tasks) {
        totalTasks += staff.tasks.length
        completedTasks += staff.tasks.filter(task => task.completed).length
        pendingTasks += staff.tasks.filter(task => !task.completed && !task.failed).length
      }
    })

    return { totalStaff, totalTasks, completedTasks, pendingTasks }
  }

  const stats = calculateStats()
  const completionRate = stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0

  const statCards = [
    {
      title: 'Total Staff',
      value: stats.totalStaff,
      icon: '👥',
      color: 'from-blue-500 to-blue-600',
      change: '+2 this month'
    },
    {
      title: 'Total Tasks',
      value: stats.totalTasks,
      icon: '📋',
      color: 'from-purple-500 to-purple-600',
      change: '+12 this week'
    },
    {
      title: 'Completed',
      value: stats.completedTasks,
      icon: '✅',
      color: 'from-green-500 to-green-600',
      change: `${completionRate}% completion rate`
    },
    {
      title: 'Pending',
      value: stats.pendingTasks,
      icon: '⏳',
      color: 'from-orange-500 to-orange-600',
      change: 'Need attention'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center text-2xl`}>
              {stat.icon}
            </div>
            <div className="text-right">
              <motion.div
                className="text-3xl font-bold text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
              >
                {stat.value}
              </motion.div>
            </div>
          </div>
          <h3 className="text-[#b8c1ec] font-semibold mb-1">{stat.title}</h3>
          <p className="text-sm text-[#9ca3af]">{stat.change}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default DashboardStats