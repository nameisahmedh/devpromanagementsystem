import React from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../Navigation/Sidebar'
import { useApp } from '../../context/AppContext'

const Analytics = ({ onLogout, userRole }) => {
  const { userData } = useApp()

  const getTeamPerformance = () => {
    if (!userData) return []
    
    return userData.map(staff => {
      const totalTasks = staff.tasks?.length || 0
      const completedTasks = staff.tasks?.filter(task => task.status === 'completed').length || 0
      const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
      
      return {
        name: staff.name,
        role: staff.role,
        totalTasks,
        completedTasks,
        completionRate,
        efficiency: completionRate >= 80 ? 'High' : completionRate >= 50 ? 'Medium' : 'Low'
      }
    }).sort((a, b) => b.completionRate - a.completionRate)
  }

  const getTaskDistribution = () => {
    if (!userData) return []
    
    const categories = ['frontend', 'backend', 'design', 'testing', 'devops']
    const totalTasks = userData.reduce((acc, staff) => acc + (staff.tasks?.length || 0), 0)
    
    return categories.map(category => {
      const categoryTasks = userData.reduce((acc, staff) => {
        const tasks = staff.tasks?.filter(task => task.category === category).length || 0
        return acc + tasks
      }, 0)
      
      const percentage = totalTasks > 0 ? Math.round((categoryTasks / totalTasks) * 100) : 0
      
      return {
        category,
        count: categoryTasks,
        percentage
      }
    })
  }

  const teamPerformance = getTeamPerformance()
  const taskDistribution = getTaskDistribution()

  const getEfficiencyColor = (efficiency) => {
    switch (efficiency) {
      case 'High': return 'text-green-400 bg-green-400/20'
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20'
      case 'Low': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      frontend: 'from-blue-500 to-blue-600',
      backend: 'from-green-500 to-green-600',
      design: 'from-purple-500 to-purple-600',
      testing: 'from-orange-500 to-orange-600',
      devops: 'from-red-500 to-red-600'
    }
    return colors[category] || 'from-gray-500 to-gray-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex flex-col lg:flex-row">
      <Sidebar userRole={userRole} onLogout={onLogout} />
      
      <div className="flex-1 w-full lg:ml-64 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto w-full"
        >
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-[#b8c1ec]">Monitor team performance and task distribution</p>
          </div>

          {/* Performance Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <motion.div
              className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{userData?.length || 0}</span>
                </div>
              </div>
              <h3 className="text-white font-semibold text-lg">Total Team Members</h3>
              <p className="text-[#b8c1ec] text-sm">Active employees</p>
            </motion.div>

            <motion.div
              className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {userData?.reduce((acc, staff) => acc + (staff.tasks?.filter(t => t.status === 'completed').length || 0), 0)}
                  </span>
                </div>
              </div>
              <h3 className="text-white font-semibold text-lg">Completed Tasks</h3>
              <p className="text-[#b8c1ec] text-sm">Successfully finished</p>
            </motion.div>

            <motion.div
              className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {userData?.reduce((acc, staff) => acc + (staff.tasks?.filter(t => t.status === 'in-progress').length || 0), 0)}
                  </span>
                </div>
              </div>
              <h3 className="text-white font-semibold text-lg">In Progress</h3>
              <p className="text-[#b8c1ec] text-sm">Currently working</p>
            </motion.div>

            <motion.div
              className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {Math.round(userData?.reduce((acc, staff) => {
                      const total = staff.tasks?.length || 0
                      const completed = staff.tasks?.filter(t => t.status === 'completed').length || 0
                      return acc + (total > 0 ? (completed / total) * 100 : 0)
                    }, 0) / (userData?.length || 1))}%
                  </span>
                </div>
              </div>
              <h3 className="text-white font-semibold text-lg">Avg Completion</h3>
              <p className="text-[#b8c1ec] text-sm">Team average</p>
            </motion.div>
          </div>

          {/* Main Analytics Content */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Team Performance */}
            <motion.div
              className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl font-bold text-white mb-6">Team Performance</h2>
              <div className="space-y-4">
                {teamPerformance.map((member, index) => (
                  <motion.div
                    key={member.name}
                    className="flex items-center justify-between p-4 bg-[#1a1a2e] rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#6246ea] to-[#3e54ac] rounded-full flex items-center justify-center text-white font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{member.name}</h3>
                        <p className="text-[#b8c1ec] text-sm capitalize">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-white font-bold text-lg">{member.completionRate}%</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getEfficiencyColor(member.efficiency)}`}>
                          {member.efficiency}
                        </span>
                      </div>
                      <div className="text-[#b8c1ec] text-sm">
                        {member.completedTasks}/{member.totalTasks} tasks
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Task Distribution */}
            <motion.div
              className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl font-bold text-white mb-6">Task Distribution</h2>
              <div className="space-y-4">
                {taskDistribution.map((item, index) => (
                  <motion.div
                    key={item.category}
                    className="space-y-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[#b8c1ec] capitalize font-medium">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{item.count}</span>
                        <span className="text-[#b8c1ec] text-sm">({item.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-[#1a1a2e] rounded-full h-3">
                      <motion.div
                        className={`bg-gradient-to-r ${getCategoryColor(item.category)} h-3 rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Detailed Performance Table */}
          <motion.div
            className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e] mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-xl font-bold text-white mb-6">Detailed Performance Metrics</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-[#3a3a4e]">
                    <th className="text-[#b8c1ec] font-semibold py-3 px-4">Employee</th>
                    <th className="text-[#b8c1ec] font-semibold py-3 px-4 text-center">Total Tasks</th>
                    <th className="text-[#b8c1ec] font-semibold py-3 px-4 text-center">Completed</th>
                    <th className="text-[#b8c1ec] font-semibold py-3 px-4 text-center">In Progress</th>
                    <th className="text-[#b8c1ec] font-semibold py-3 px-4 text-center">Completion Rate</th>
                    <th className="text-[#b8c1ec] font-semibold py-3 px-4 text-center">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {teamPerformance.map((member, index) => (
                    <motion.tr
                      key={member.name}
                      className="border-b border-[#3a3a4e] hover:bg-[#1a1a2e] transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.05 }}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-[#6246ea] to-[#3e54ac] rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <span className="text-white font-medium">{member.name}</span>
                            <div className="text-[#b8c1ec] text-sm capitalize">{member.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center text-white font-semibold">{member.totalTasks}</td>
                      <td className="py-4 px-4 text-center text-green-400 font-semibold">{member.completedTasks}</td>
                      <td className="py-4 px-4 text-center text-yellow-400 font-semibold">
                        {member.totalTasks - member.completedTasks}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 bg-[#1a1a2e] rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-[#6246ea] to-[#3e54ac] h-2 rounded-full"
                              style={{ width: `${member.completionRate}%` }}
                            />
                          </div>
                          <span className="text-white text-sm font-semibold">{member.completionRate}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getEfficiencyColor(member.efficiency)}`}>
                          {member.efficiency}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Analytics