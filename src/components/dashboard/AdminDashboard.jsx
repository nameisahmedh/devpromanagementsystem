import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import { dbHelpers } from '../../lib/supabase'
import DashboardLayout from './DashboardLayout'
import CreateTask from '../tasks/CreateTask'
import TaskCard from '../common/TaskCard'
import { Plus, Users, BarChart3, CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const { user, profile, theme } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [tasks, setTasks] = useState([])
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalStaff: 0,
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    failedTasks: 0,
    overdueTask: 0
  })

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Load all tasks and staff
      const [tasksResult, staffResult] = await Promise.all([
        dbHelpers.getAllTasks(),
        dbHelpers.getAllStaff()
      ])
      
      if (tasksResult.error) throw tasksResult.error
      if (staffResult.error) throw staffResult.error
      
      setTasks(tasksResult.data || [])
      setStaff(staffResult.data || [])
      
      // Calculate stats
      const taskData = tasksResult.data || []
      const staffData = staffResult.data || []
      
      const newStats = {
        totalStaff: staffData.length,
        totalTasks: taskData.length,
        completedTasks: taskData.filter(task => task.status === 'completed').length,
        inProgressTasks: taskData.filter(task => task.status === 'in-progress').length,
        failedTasks: taskData.filter(task => task.status === 'failed').length,
        overdueTask: taskData.filter(task => {
          const dueDate = new Date(task.due_date)
          const today = new Date()
          return dueDate < today && task.status !== 'completed'
        }).length
      }
      setStats(newStats)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      toast.error('Failed to load dashboard data')
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
      
      // Reload stats
      await loadDashboardData()
      
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

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    
    try {
      const { error } = await dbHelpers.deleteTask(taskId)
      if (error) throw error
      
      setTasks(prev => prev.filter(task => task.id !== taskId))
      await loadDashboardData()
      toast.success('Task deleted successfully!')
    } catch (error) {
      console.error('Error deleting task:', error)
      toast.error('Failed to delete task')
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'create', label: 'Create Task', icon: Plus }
  ]

  const statCards = [
    {
      title: 'Total Staff',
      value: stats.totalStaff,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50',
      borderColor: theme === 'dark' ? 'border-blue-500/20' : 'border-blue-200'
    },
    {
      title: 'Total Tasks',
      value: stats.totalTasks,
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
      bgColor: theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-50',
      borderColor: theme === 'dark' ? 'border-purple-500/20' : 'border-purple-200'
    },
    {
      title: 'Completed',
      value: stats.completedTasks,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: theme === 'dark' ? 'bg-green-500/10' : 'bg-green-50',
      borderColor: theme === 'dark' ? 'border-green-500/20' : 'border-green-200'
    },
    {
      title: 'In Progress',
      value: stats.inProgressTasks,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: theme === 'dark' ? 'bg-yellow-500/10' : 'bg-yellow-50',
      borderColor: theme === 'dark' ? 'border-yellow-500/20' : 'border-yellow-200'
    },
    {
      title: 'Failed',
      value: stats.failedTasks,
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      bgColor: theme === 'dark' ? 'bg-red-500/10' : 'bg-red-50',
      borderColor: theme === 'dark' ? 'border-red-500/20' : 'border-red-200'
    },
    {
      title: 'Overdue',
      value: stats.overdueTask,
      icon: TrendingUp,
      color: 'from-red-600 to-red-700',
      bgColor: theme === 'dark' ? 'bg-red-600/10' : 'bg-red-50',
      borderColor: theme === 'dark' ? 'border-red-600/20' : 'border-red-200'
    }
  ]

  const titleClass = theme === 'dark' ? 'text-white' : 'text-gray-900'
  const subtitleClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
  const cardClass = theme === 'dark' 
    ? 'bg-slate-800 border-slate-700' 
    : 'bg-white border-gray-200 shadow-sm'

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${titleClass}`}>
            Admin Dashboard
          </h1>
          <p className={`text-base ${subtitleClass}`}>
            Manage your team and monitor progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
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
                <h3 className={`font-semibold text-sm ${subtitleClass}`}>{stat.title}</h3>
              </motion.div>
            )
          })}
        </div>

        {/* Tab Navigation */}
        <motion.div 
          className={`flex flex-wrap gap-2 mb-8 p-2 rounded-xl ${cardClass} border`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 relative ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : theme === 'dark' 
                      ? 'text-gray-300 hover:bg-slate-700 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent className="w-5 h-5" />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h2 className={`text-2xl font-bold mb-6 ${titleClass}`}>
                  All Tasks ({tasks.length})
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
                    <h3 className={`text-xl font-semibold mb-2 ${titleClass}`}>No tasks created yet</h3>
                    <p className={subtitleClass}>Create your first task to get started.</p>
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
                          onDelete={handleDeleteTask}
                          showActions={true}
                          darkMode={theme === 'dark'}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'create' && (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CreateTask onTaskCreated={loadDashboardData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard