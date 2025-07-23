import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, User, Mail, Shield, Calendar } from 'lucide-react'
import Sidebar from '../Navigation/Sidebar'
import { useApp } from '../../context/AppContext'
import toast from 'react-hot-toast'

const UserManagement = ({ onLogout }) => {
  const { userData, addStaff, removeStaff, updateStaff } = useApp()
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'frontend'
  })

  const roles = ['frontend', 'backend', 'design', 'testing', 'devops']

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all fields')
      return
    }

    // Check if email already exists
    const emailExists = userData.some(user => 
      user.email === formData.email && user.id !== editingUser?.id
    )
    
    if (emailExists) {
      toast.error('Email already exists')
      return
    }

    if (editingUser) {
      updateStaff(editingUser.id, formData)
      setEditingUser(null)
    } else {
      addStaff(formData)
    }

    setFormData({ name: '', email: '', password: '', role: 'frontend' })
    setShowAddModal(false)
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role
    })
    setShowAddModal(true)
  }

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This will also delete all their tasks.')) {
      removeStaff(userId)
    }
  }

  const closeModal = () => {
    setShowAddModal(false)
    setEditingUser(null)
    setFormData({ name: '', email: '', password: '', role: 'frontend' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex flex-col lg:flex-row">
      <Sidebar userRole="admin" onLogout={onLogout} />
      
      <div className="flex-1 w-full lg:ml-64 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto w-full"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">User Management</h1>
              <p className="text-[#b8c1ec]">Manage team members and their access</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-[#6246ea] hover:bg-[#3e54ac] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Add User
            </button>
          </div>

          {/* Users Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {userData?.map((user, index) => (
              <motion.div
                key={user.id}
                className="bg-[#232946] rounded-xl p-4 sm:p-6 shadow-lg border border-[#3a3a4e]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#6246ea] to-[#3e54ac] rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg flex-shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex gap-1 sm:gap-2 ml-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="p-1.5 sm:p-2 text-blue-400 hover:bg-blue-400/20 rounded-lg transition-colors"
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-1.5 sm:p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-white font-bold text-base sm:text-lg mb-2 truncate">{user.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-[#b8c1ec] text-xs sm:text-sm">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#b8c1ec] text-xs sm:text-sm">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="capitalize">{user.role}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#b8c1ec] text-xs sm:text-sm">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">Joined {user.joinDate || 'N/A'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#3a3a4e]">
                  <div className="text-center">
                    <div className="text-white font-bold text-sm sm:text-base">{user.tasks?.length || 0}</div>
                    <div className="text-[#b8c1ec] text-xs">Tasks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-bold text-sm sm:text-base">
                      {user.tasks?.filter(t => t.status === 'completed').length || 0}
                    </div>
                    <div className="text-[#b8c1ec] text-xs">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-400 font-bold text-sm sm:text-base">
                      {user.tasks?.filter(t => t.status === 'in-progress').length || 0}
                    </div>
                    <div className="text-[#b8c1ec] text-xs">Active</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add/Edit User Modal */}
          <AnimatePresence>
            {showAddModal && (
              <motion.div
                className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
              >
                <motion.div
                  className="bg-[#232946] rounded-xl p-6 sm:p-8 w-full max-w-md border border-[#3a3a4e] mx-4"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {editingUser ? 'Edit User' : 'Add New User'}
                    </h2>
                    <button
                      onClick={closeModal}
                      className="text-[#b8c1ec] hover:text-white transition-colors p-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[#b8c1ec] font-semibold mb-2">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#1a1a2e] text-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 border border-[#3a3a4e] focus:ring-2 focus:ring-[#6246ea] text-sm sm:text-base"
                        placeholder="Enter full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[#b8c1ec] font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#1a1a2e] text-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 border border-[#3a3a4e] focus:ring-2 focus:ring-[#6246ea] text-sm sm:text-base"
                        placeholder="Enter email address"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[#b8c1ec] font-semibold mb-2">Password</label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full bg-[#1a1a2e] text-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 border border-[#3a3a4e] focus:ring-2 focus:ring-[#6246ea] text-sm sm:text-base"
                        placeholder="Enter password"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[#b8c1ec] font-semibold mb-2">Role</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full bg-[#1a1a2e] text-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 border border-[#3a3a4e] focus:ring-2 focus:ring-[#6246ea] text-sm sm:text-base"
                      >
                        {roles.map(role => (
                          <option key={role} value={role} className="capitalize">
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-[#6246ea] hover:bg-[#3e54ac] text-white py-2 sm:py-3 px-4 rounded-lg font-semibold transition-colors text-sm sm:text-base"
                      >
                        {editingUser ? 'Update User' : 'Add User'}
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 bg-[#3a3a4e] hover:bg-[#4a4a5e] text-white py-2 sm:py-3 px-4 rounded-lg font-semibold transition-colors text-sm sm:text-base"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default UserManagement