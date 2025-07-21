import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../Navigation/Sidebar'

const Profile = ({ data, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: data?.name || '',
    email: data?.email || '',
    role: data?.role || '',
    bio: 'Passionate developer focused on creating amazing user experiences.'
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend/context
  }

  const completedTasks = data?.tasks?.filter(task => task.completed).length || 0
  const totalTasks = data?.tasks?.length || 0
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex">
      <Sidebar userRole="staff" onLogout={onLogout} />
      
      <div className="flex-1 ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e]">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-[#6246ea] to-[#3e54ac] rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4">
                    {profileData.name.charAt(0)}
                  </div>
                  <h2 className="text-xl font-bold text-white">{profileData.name}</h2>
                  <p className="text-[#b8c1ec] capitalize">{profileData.role} Developer</p>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{completionRate}%</div>
                    <div className="text-sm text-[#b8c1ec]">Task Completion Rate</div>
                  </div>
                  
                  <div className="w-full bg-[#1a1a2e] rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-[#6246ea] to-[#3e54ac] h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${completionRate}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <div className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Profile Information</h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-[#6246ea] hover:bg-[#3e54ac] text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#b8c1ec] font-semibold mb-2">Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          className="w-full bg-[#1a1a2e] text-white rounded-lg px-4 py-3 border border-[#3a3a4e] focus:ring-2 focus:ring-[#6246ea]"
                        />
                      ) : (
                        <p className="text-white bg-[#1a1a2e] rounded-lg px-4 py-3">{profileData.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[#b8c1ec] font-semibold mb-2">Email</label>
                      <p className="text-white bg-[#1a1a2e] rounded-lg px-4 py-3">{profileData.email}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#b8c1ec] font-semibold mb-2">Role</label>
                    <p className="text-white bg-[#1a1a2e] rounded-lg px-4 py-3 capitalize">{profileData.role}</p>
                  </div>

                  <div>
                    <label className="block text-[#b8c1ec] font-semibold mb-2">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        rows={4}
                        className="w-full bg-[#1a1a2e] text-white rounded-lg px-4 py-3 border border-[#3a3a4e] focus:ring-2 focus:ring-[#6246ea] resize-none"
                      />
                    ) : (
                      <p className="text-white bg-[#1a1a2e] rounded-lg px-4 py-3">{profileData.bio}</p>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex gap-4">
                      <button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Task Statistics */}
              <div className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e] mt-6">
                <h3 className="text-xl font-bold text-white mb-6">Task Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{data?.taskCount?.newtask || 0}</div>
                    <div className="text-sm text-[#b8c1ec]">New</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{data?.taskCount?.inProgress || 0}</div>
                    <div className="text-sm text-[#b8c1ec]">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{data?.taskCount?.completed || 0}</div>
                    <div className="text-sm text-[#b8c1ec]">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{data?.taskCount?.pending || 0}</div>
                    <div className="text-sm text-[#b8c1ec]">Pending</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile