import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import DashboardLayout from '../dashboard/DashboardLayout'

const Profile = () => {
  const { user, profile, updateProfile, theme } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    full_name: profile?.full_name || '',
    email: profile?.email || '',
    role: profile?.role || '',
    department: profile?.department || '',
    bio: 'Passionate developer focused on creating amazing user experiences.'
  })

  const handleSave = async () => {
    const { error } = await updateProfile({
      full_name: profileData.full_name,
      department: profileData.department
    })
    
    if (!error) {
      setIsEditing(false)
    }
  }

  // Mock task statistics - in real app, this would come from the database
  const taskStats = {
    total: 12,
    completed: 8,
    inProgress: 3,
    failed: 1,
    new: 0
  }

  const completionRate = taskStats.total > 0 ? Math.round((taskStats.completed / taskStats.total) * 100) : 0

  const cardClass = theme === 'dark' 
    ? 'bg-slate-800 border-slate-700' 
    : 'bg-white border-gray-200 shadow-sm'
  const titleClass = theme === 'dark' ? 'text-white' : 'text-gray-900'
  const subtitleClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
  const inputClass = theme === 'dark'
    ? 'bg-slate-700 border-slate-600 text-white'
    : 'bg-gray-50 border-gray-300 text-gray-900'

  const handleCancel = () => {
    setIsEditing(false)
    setProfileData({
      full_name: profile?.full_name || '',
      email: profile?.email || '',
      role: profile?.role || '',
      department: profile?.department || '',
      bio: 'Passionate developer focused on creating amazing user experiences.'
    })
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className={`text-3xl font-bold mb-8 ${titleClass}`}>Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className={`${cardClass} rounded-xl p-6 border`}>
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4">
                  {profileData.full_name.charAt(0)}
                </div>
                <h2 className={`text-xl font-bold ${titleClass}`}>{profileData.full_name}</h2>
                <p className={`capitalize ${subtitleClass}`}>{profileData.role} Developer</p>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${titleClass}`}>{completionRate}%</div>
                  <div className={`text-sm ${subtitleClass}`}>Task Completion Rate</div>
                </div>
                
                <div className={`w-full rounded-full h-3 ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}>
                  <motion.div
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${completionRate}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                
                <div className={`text-center text-sm ${subtitleClass}`}>
                  {taskStats.completed} of {taskStats.total} tasks completed
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className={`${cardClass} rounded-xl p-6 border`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${titleClass}`}>Profile Information</h3>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          theme === 'dark' 
                            ? 'bg-slate-600 hover:bg-slate-500 text-white' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                        }`}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block font-semibold mb-2 ${subtitleClass}`}>Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.full_name}
                        onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
                        className={`w-full rounded-lg px-4 py-3 border focus:ring-2 focus:ring-indigo-500 ${inputClass}`}
                      />
                    ) : (
                      <p className={`rounded-lg px-4 py-3 ${inputClass}`}>{profileData.full_name}</p>
                    )}
                  </div>

                  <div>
                    <label className={`block font-semibold mb-2 ${subtitleClass}`}>Email</label>
                    <p className={`rounded-lg px-4 py-3 ${inputClass}`}>{profileData.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block font-semibold mb-2 ${subtitleClass}`}>Role</label>
                    <p className={`rounded-lg px-4 py-3 capitalize ${inputClass}`}>{profileData.role}</p>
                  </div>

                  <div>
                    <label className={`block font-semibold mb-2 ${subtitleClass}`}>Department</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.department}
                        onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                        className={`w-full rounded-lg px-4 py-3 border focus:ring-2 focus:ring-indigo-500 ${inputClass}`}
                        placeholder="e.g., Engineering, Design"
                      />
                    ) : (
                      <p className={`rounded-lg px-4 py-3 ${inputClass}`}>{profileData.department || 'Not specified'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className={`block font-semibold mb-2 ${subtitleClass}`}>Bio</label>
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      rows={4}
                      className={`w-full rounded-lg px-4 py-3 border focus:ring-2 focus:ring-indigo-500 resize-none ${inputClass}`}
                    />
                  ) : (
                    <p className={`rounded-lg px-4 py-3 ${inputClass}`}>{profileData.bio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Task Statistics */}
            <div className={`${cardClass} rounded-xl p-6 border mt-6`}>
              <h3 className={`text-xl font-bold mb-6 ${titleClass}`}>Task Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{taskStats.new}</div>
                  <div className={`text-sm ${subtitleClass}`}>New</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{taskStats.inProgress}</div>
                  <div className={`text-sm ${subtitleClass}`}>In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{taskStats.completed}</div>
                  <div className={`text-sm ${subtitleClass}`}>Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{taskStats.failed}</div>
                  <div className={`text-sm ${subtitleClass}`}>Failed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-400">{taskStats.total}</div>
                  <div className={`text-sm ${subtitleClass}`}>Total</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

export default Profile