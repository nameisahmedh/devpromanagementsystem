import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from '../Navigation/Sidebar'

const TaskDetails = ({ data, onLogout }) => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  
  const task = data?.tasks?.[parseInt(taskId)]

  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex">
        <Sidebar userRole="staff" onLogout={onLogout} />
        <div className="flex-1 ml-64 p-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Task Not Found</h2>
            <button
              onClick={() => navigate('/staff/dashboard')}
              className="bg-[#6246ea] hover:bg-[#3e54ac] text-white px-6 py-3 rounded-lg transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = () => {
    if (task.completed) return 'text-green-400'
    if (task.failed) return 'text-red-400'
    if (task.active) return 'text-yellow-400'
    return 'text-blue-400'
  }

  const getStatusText = () => {
    if (task.completed) return 'Completed'
    if (task.failed) return 'Failed'
    if (task.active) return 'In Progress'
    return 'New Task'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex">
      <Sidebar userRole="staff" onLogout={onLogout} />
      
      <div className="flex-1 ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/staff/dashboard')}
              className="text-[#b8c1ec] hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-white">Task Details</h1>
          </div>

          <div className="bg-[#232946] rounded-xl p-8 shadow-lg border border-[#3a3a4e]">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{task.taskTitle}</h2>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor()} bg-opacity-20`}>
                    {getStatusText()}
                  </span>
                  <span className="text-[#b8c1ec] text-sm">{task.category}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                <p className="text-[#b8c1ec] leading-relaxed">{task.taskDescription}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-[#b8c1ec] mb-1">Assigned Date</h4>
                  <p className="text-white">{task.taskDate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#b8c1ec] mb-1">Due Date</h4>
                  <p className="text-white">{task.dueDate}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {task.newTask && (
                <>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    Accept Task
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    Reject Task
                  </button>
                </>
              )}
              {task.active && (
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Mark as Complete
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TaskDetails