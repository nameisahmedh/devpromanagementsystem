import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../Navigation/Sidebar'
import { AuthContext } from '../../context/AuthProvider'

const Analytics = ({ onLogout, userRole }) => {
  const [userData] = useContext(AuthContext)

  const getTeamPerformance = () => {
    if (!userData) return []
    
    return userData.map(staff => {
      const totalTasks = staff.tasks?.length || 0
      const completedTasks = staff.tasks?.filter(task => task.completed).length || 0
      const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
      
      return {
        name: staff.name,
        role: staff.role,
        totalTasks,
        completedTasks,
        completionRate,
        efficiency: completionRate > 80 ? 'High' : completionRate > 60 ? 'Medium' : 'Low'
      }
    }).sort((a, b) => b.completionRate - a.completionRate)
  }

  const teamPerformance = getTeamPerformance()

  const getEfficiencyColor = (efficiency) => {
    switch (efficiency) {
      case 'High': return 'text-green-400'
      case 'Medium': return 'text-yellow-400'
      case 'Low': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex">
      <Sidebar userRole={userRole} onLogout={onLogout} />
      
      <div className="flex-1 ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-white mb-8">Analytics Dashboard</h1>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e]">
              <h2 className="text-xl font-bold text-white mb-6">Team Performance</h2>
              <div className="space-y-4">
                {teamPerformance.map((member, index) => (
                  <motion.div
                    key={member.name}
                    className="flex items-center justify-between p-4 bg-[#1a1a2e] rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#6246ea] to-[#3e54ac] rounded-full flex items-center justify-center text-white font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{member.name}</h3>
                        <p className="text-[#b8c1ec] text-sm capitalize">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{member.completionRate}%</div>
                      <div className={`text-sm ${getEfficiencyColor(member.efficiency)}`}>
                        {member.efficiency}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e]">
              <h2 className="text-xl font-bold text-white mb-6">Task Distribution</h2>
              <div className="space-y-4">
                {['frontend', 'backend', 'design', 'testing'].map((category, index) => {
                  const categoryTasks = userData?.reduce((acc, staff) => {
                    const tasks = staff.tasks?.filter(task => task.category === category).length || 0
                    return acc + tasks
                  }, 0) || 0

                  return (
                    <motion.div
                      key={category}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-[#b8c1ec] capitalize">{category}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-[#1a1a2e] rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-[#6246ea] to-[#3e54ac] h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((categoryTasks / 10) * 100, 100)}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          />
                        </div>
                        <span className="text-white font-semibold w-8">{categoryTasks}</span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Detailed Analytics Table */}
          <div className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e]">
            <h2 className="text-xl font-bold text-white mb-6">Detailed Performance Metrics</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#3a3a4e]">
                    <th className="text-[#b8c1ec] font-semibold py-3 px-4">Employee</th>
                    <th className="text-[#b8c1ec] font-semibold py-3 px-4">Role</th>
                    <th className="text-[#b8c1ec] font-semibold py-3 px-4">Total Tasks</th>
                    <th className="text-[#b8c1ec] font-semibold py-3 px-4">Completed</th>
                    <th className="text-[#b8c1ec] font-semibold py-3 px-4">Completion Rate</th>
                    <th className="text-[#b8c1ec] font-semibold py-3 px-4">Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {teamPerformance.map((member, index) => (
                    <motion.tr
                      key={member.name}
                      className="border-b border-[#3a3a4e] hover:bg-[#1a1a2e] transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#6246ea] to-[#3e54ac] rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {member.name.charAt(0)}
                          </div>
                          <span className="text-white font-medium">{member.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#b8c1ec] capitalize">{member.role}</td>
                      <td className="py-4 px-4 text-white">{member.totalTasks}</td>
                      <td className="py-4 px-4 text-white">{member.completedTasks}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-[#1a1a2e] rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-[#6246ea] to-[#3e54ac] h-2 rounded-full"
                              style={{ width: `${member.completionRate}%` }}
                            />
                          </div>
                          <span className="text-white text-sm">{member.completionRate}%</span>
                        </div>
                      </td>
                      <td className={`py-4 px-4 font-semibold ${getEfficiencyColor(member.efficiency)}`}>
                        {member.efficiency}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Analytics