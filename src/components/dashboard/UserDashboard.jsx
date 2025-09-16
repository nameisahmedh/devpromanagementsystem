import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import { dbHelpers } from '../../lib/supabase'
import DashboardLayout from './DashboardLayout'
import TaskCard from '../common/TaskCard'
import { CheckCircle, Clock, AlertTriangle, Plus } from 'lucide-react'
import toast from 'react-hot-toast'

const UserDashboard = () => {
  const { user, profile, theme } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    inProgress: 0,
    completed: 0,
    failed: 0
  })

  useEffect(() => {
    if (user) {
      loadUserTasks()
    }
  }, [user])

  const loadUserTasks = async () => {
    try {
      setLoading(true)
      const { data, error } = await dbHelpers.getUserTasks(user.id)
      if (error) throw error
      
      setTasks(data || [])
      
      // Calculate stats
      const newStats = {
        total: data?.length || 0,
        new: data?.filter(task => task.status === 'new').length || 0,
        inProgress: data?.filter(task => task.status === 'in-progress').length || 0,
        completed: data?.filter(task => task.status === 'completed').length || 0,
        failed: data?.filter(task => task.status === 'failed').length || 0
      }
      setStats(newStats)
    } catch (error) {
      console.error('Error loading tasks:', error)
      toast.error('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const { data, error } = await dbHelpers.updateTask(taskId, { status: newStatus })
      if (error) throw error
      
      // Update local state
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ))
      
      // Update stats
      await loadUserTasks()
      
      const statusMessages = {
        'in-progress': 'Task started successfully!',
        'completed': 'Task completed successfully!',
        'failed': 'Task marked as failed!',
        'new': 'Task reset to new status!'
      }
      
      toast.success(statusMessages[newStatus] || 'Task updated!')
    } catch (error) {
      console.error('Error updating task:', error)
      toast.error('Failed to update task')
    }
  }

  const statCards = [
    {
      title: 'New Tasks',
      value: stats.new,
      icon: Plus,
      color: 'from-blue-500 to-blue-600',
      bgColor: theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50',
      borderColor: theme === 'dark' ? 'border-blue-500/20' : 'border-blue-200'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: theme === 'dark' ? 'bg-yellow-500/10' : 'bg-yellow-50',
      borderColor: theme === 'dark' ? 'border-yellow-500/20' : 'border-yellow-200'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: theme === 'dark' ? 'bg-green-500/10' : 'bg-green-50',
      borderColor: theme === 'dark' ? 'border-green-500/20' : 'border-green-200'
    },
    {
      title: 'Failed',
      value: stats.failed,
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      bgColor: theme === 'dark' ? 'bg-red-500/10' : 'bg-red-50',
      borderColor: theme === 'dark' ? 'border-red-500/20' : 'border-red-200'
    }
  ]

  const titleClass = theme === 'dark' ? 'text-white' : 'text-gray-900'
  const subtitleClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600'

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${titleClass}`}>
            Welcome back, {profile?.full_name}! 👋
          </h1>
          <p className={`text-base ${subtitleClass}`}>
            Here's what's on your plate today
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={stat.title}
                className={`${stat.bgColor} ${stat.borderColor} rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    className={`text-3xl font-bold ${titleClass}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                </div>
                <h3 className={`font-semibold ${subtitleClass}`}>{stat.title}</h3>
              </motion.div>
            )
          })}
        </div>

        {/* Tasks Section */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-6 ${titleClass}`}>
            Your Tasks ({tasks.length})
          </h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-200'} rounded-xl h-48`} />
                </div>
              ))}
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className={`text-xl font-semibold mb-2 ${titleClass}`}>No tasks assigned yet</h3>
              <p className={subtitleClass}>Your tasks will appear here once they're assigned by your admin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task, idx) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  <TaskCard
                    task={{
                      id: task.id,
                      taskTitle: task.title,
                      taskDescription: task.description,
                      category: task.category,
                      priority: task.priority,
                      status: task.status,
                      taskDate: task.created_at,
                      dueDate: task.due_date
                    }}
                    onStatusChange={handleStatusChange}
                    showActions={true}
                    darkMode={theme === 'dark'}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default UserDashboard