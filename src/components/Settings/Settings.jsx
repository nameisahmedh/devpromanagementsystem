import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Sidebar from '../Navigation/Sidebar'

const Settings = ({ onLogout, userRole }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    darkMode: true,
    autoSave: true,
    language: 'en',
    timezone: 'UTC'
  })

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    toast.success(`${key} updated successfully!`)
  }

  const handleSaveSettings = () => {
    // Here you would typically save to backend
    toast.success('Settings saved successfully!')
  }

  const handleResetSettings = () => {
    setSettings({
      notifications: true,
      emailAlerts: false,
      darkMode: true,
      autoSave: true,
      language: 'en',
      timezone: 'UTC'
    })
    toast.success('Settings reset to default!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex">
      <Sidebar userRole={userRole} onLogout={onLogout} />
      
      <div className="flex-1 ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

          <div className="space-y-6">
            {/* General Settings */}
            <div className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e]">
              <h2 className="text-xl font-bold text-white mb-6">General Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold">Push Notifications</h3>
                    <p className="text-[#b8c1ec] text-sm">Receive notifications for new tasks and updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#1a1a2e] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6246ea]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold">Email Alerts</h3>
                    <p className="text-[#b8c1ec] text-sm">Get email notifications for important updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailAlerts}
                      onChange={(e) => handleSettingChange('emailAlerts', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#1a1a2e] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6246ea]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold">Auto Save</h3>
                    <p className="text-[#b8c1ec] text-sm">Automatically save your work</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoSave}
                      onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#1a1a2e] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6246ea]"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e]">
              <h2 className="text-xl font-bold text-white mb-6">Appearance</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold">Dark Mode</h3>
                    <p className="text-[#b8c1ec] text-sm">Use dark theme for better eye comfort</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.darkMode}
                      onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#1a1a2e] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6246ea]"></div>
                  </label>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">Language</h3>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    className="w-full bg-[#1a1a2e] text-white rounded-lg px-4 py-3 border border-[#3a3a4e] focus:ring-2 focus:ring-[#6246ea]"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">Timezone</h3>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleSettingChange('timezone', e.target.value)}
                    className="w-full bg-[#1a1a2e] text-white rounded-lg px-4 py-3 border border-[#3a3a4e] focus:ring-2 focus:ring-[#6246ea]"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time</option>
                    <option value="PST">Pacific Time</option>
                    <option value="GMT">Greenwich Mean Time</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e]">
              <h2 className="text-xl font-bold text-white mb-6">Security</h2>
              
              <div className="space-y-4">
                <button className="w-full bg-[#6246ea] hover:bg-[#3e54ac] text-white py-3 px-4 rounded-lg font-semibold transition-colors text-left">
                  Change Password
                </button>
                <button className="w-full bg-[#1a1a2e] hover:bg-[#3a3a4e] text-white py-3 px-4 rounded-lg font-semibold transition-colors text-left border border-[#3a3a4e]">
                  Two-Factor Authentication
                </button>
                <button className="w-full bg-[#1a1a2e] hover:bg-[#3a3a4e] text-white py-3 px-4 rounded-lg font-semibold transition-colors text-left border border-[#3a3a4e]">
                  Login History
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleSaveSettings}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Save Settings
              </button>
              <button
                onClick={handleResetSettings}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Reset to Default
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings