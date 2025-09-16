import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../../hooks/useAuth'
import { dbHelpers } from '../../lib/supabase'
import toast from 'react-hot-toast'

const schema = yup.object({
  title: yup.string().required('Task title is required'),
  description: yup.string().required('Task description is required'),
  assigned_to: yup.string().required('Please assign the task to someone'),
  category: yup.string().required('Please select a category'),
  priority: yup.string().required('Please select a priority'),
  due_date: yup.date().required('Due date is required').min(new Date(), 'Due date must be in the future')
})

const CreateTask = ({ onTaskCreated }) => {
  const { user, theme } = useAuth()
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    loadStaff()
  }, [])

  const loadStaff = async () => {
    try {
      const { data, error } = await dbHelpers.getAllStaff()
      if (error) throw error
      setStaff(data?.filter(member => member.role !== 'admin') || [])
    } catch (error) {
      console.error('Error loading staff:', error)
      toast.error('Failed to load staff members')
    }
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      
      const taskData = {
        ...data,
        created_by: user.id,
        due_date: new Date(data.due_date).toISOString().split('T')[0]
      }
      
      const { error } = await dbHelpers.createTask(taskData)
      if (error) throw error
      
      toast.success('Task created successfully!')
      reset()
      
      if (onTaskCreated) {
        onTaskCreated()
      }
    } catch (error) {
      console.error('Error creating task:', error)
      toast.error('Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  const isLoading = loading || isSubmitting

  const cardClass = theme === 'dark' 
    ? 'bg-slate-800 border-slate-700' 
    : 'bg-white border-gray-200 shadow-sm'
  const inputClass = theme === 'dark'
    ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500'
  const labelClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
  const titleClass = theme === 'dark' ? 'text-white' : 'text-gray-900'

  return (
    <motion.div
      className={`${cardClass} rounded-xl p-6 sm:p-8 border`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className={`text-2xl sm:text-3xl font-bold ${titleClass}`}>Create New Task</h2>
        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Assign a new task to your team members
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Task Title */}
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium ${labelClass} mb-2`}>
              Task Title
            </label>
            <input
              {...register('title')}
              type="text"
              className={`block w-full px-3 py-3 border rounded-xl shadow-sm transition-all duration-200 ${inputClass} ${
                errors.title ? 'border-red-500 ring-red-500' : ''
              }`}
              placeholder="Enter task title"
              disabled={isLoading}
            />
            {errors.title && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 dark:text-red-400"
              >
                {errors.title.message}
              </motion.p>
            )}
          </div>

          {/* Task Description */}
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium ${labelClass} mb-2`}>
              Description
            </label>
            <textarea
              {...register('description')}
              rows={4}
              className={`block w-full px-3 py-3 border rounded-xl shadow-sm transition-all duration-200 resize-none ${inputClass} ${
                errors.description ? 'border-red-500 ring-red-500' : ''
              }`}
              placeholder="Enter task description"
              disabled={isLoading}
            />
            {errors.description && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 dark:text-red-400"
              >
                {errors.description.message}
              </motion.p>
            )}
          </div>

          {/* Assign To */}
          <div>
            <label className={`block text-sm font-medium ${labelClass} mb-2`}>
              Assign To
            </label>
            <select
              {...register('assigned_to')}
              className={`block w-full px-3 py-3 border rounded-xl shadow-sm transition-all duration-200 ${inputClass} ${
                errors.assigned_to ? 'border-red-500 ring-red-500' : ''
              }`}
              disabled={isLoading}
            >
              <option value="">Select Staff Member</option>
              {staff.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.full_name} ({member.role})
                </option>
              ))}
            </select>
            {errors.assigned_to && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 dark:text-red-400"
              >
                {errors.assigned_to.message}
              </motion.p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className={`block text-sm font-medium ${labelClass} mb-2`}>
              Category
            </label>
            <select
              {...register('category')}
              className={`block w-full px-3 py-3 border rounded-xl shadow-sm transition-all duration-200 ${inputClass} ${
                errors.category ? 'border-red-500 ring-red-500' : ''
              }`}
              disabled={isLoading}
            >
              <option value="">Select Category</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="design">Design</option>
              <option value="testing">Testing</option>
              <option value="devops">DevOps</option>
              <option value="general">General</option>
            </select>
            {errors.category && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 dark:text-red-400"
              >
                {errors.category.message}
              </motion.p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className={`block text-sm font-medium ${labelClass} mb-2`}>
              Priority
            </label>
            <select
              {...register('priority')}
              className={`block w-full px-3 py-3 border rounded-xl shadow-sm transition-all duration-200 ${inputClass} ${
                errors.priority ? 'border-red-500 ring-red-500' : ''
              }`}
              disabled={isLoading}
            >
              <option value="">Select Priority</option>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            {errors.priority && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 dark:text-red-400"
              >
                {errors.priority.message}
              </motion.p>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label className={`block text-sm font-medium ${labelClass} mb-2`}>
              Due Date
            </label>
            <input
              {...register('due_date')}
              type="date"
              min={new Date().toISOString().split('T')[0]}
              className={`block w-full px-3 py-3 border rounded-xl shadow-sm transition-all duration-200 ${inputClass} ${
                errors.due_date ? 'border-red-500 ring-red-500' : ''
              }`}
              disabled={isLoading}
            />
            {errors.due_date && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 dark:text-red-400"
              >
                {errors.due_date.message}
              </motion.p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Creating Task...
              </div>
            ) : (
              'Create Task'
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}

export default CreateTask