import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Sidebar from '../Navigation/Sidebar'
import { useApp } from '../../context/AppContext'

const Settings = ({ onLogout, userRole }) => {
  const { dataStorage } = useApp()
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    darkMode: true,
    autoSave: true,
    language: 'en',
    timezone: 'UTC'
  })

  useEffect(() => {
    // Load settings from storage
    const savedSettings = dataStorage.getSettings()
    setSettings(savedSettings)
  }, [dataStorage])

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    
    // Save to storage
    dataStorage.updateSettings(newSettings)
    
    if (key === 'darkMode') {
      if (value) {
        document.documentElement.classList.add('dark')
        document.body.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        document.body.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }
    
    toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} updated successfully!`)
  }

  const handleSaveSettings = () => {
    dataStorage.updateSettings(settings)
    toast.success('All settings saved successfully!')
  }

  const handleResetSettings = () => {
    const defaultSettings = dataStorage.getDefaultSettings()
    setSettings(defaultSettings)
    dataStorage.updateSettings(defaultSettings)
    
    // Apply dark mode
    if (defaultSettings.darkMode) {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    
    toast.success('Settings reset to default!')
  }

  const handleExportData = () => {
    try {
      dataStorage.exportData()
      toast.success('Data exported successfully!')
    } catch (error) {
      toast.error('Failed to export data')
    }
  }

  const handleImportData = (event) => {
    const file = event.target.files[0]
    if (file) {
      dataStorage.importData(file)
        .then(() => {
          toast.success('Data imported successfully!')
          window.location.reload() // Reload to reflect changes
        })
        .catch((error) => {
          toast.error('Failed to import data: ' + error.message)
        })
    }
  }

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      dataStorage.clearAll()
      toast.success('All data cleared!')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex flex-col md:flex-row">
      <Sidebar userRole={userRole} onLogout={onLogout} />
      <div className="flex-1 md:ml-64 p-4 sm:p-8 pt-20 lg:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-[#b8c1ec]">Manage your application preferences</p>
          </div>

          <div className="space-y-6">
            {/* General Settings */}
            <motion.div 
              className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-bold text-white mb-6">General Settings</h2>
              
              <div className="space-y-6">
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
            </motion.div>

            {/* Appearance Settings */}
            <motion.div 
              className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-white mb-6">Appearance</h2>
              
              <div className="space-y-6">
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
                  <h3 className="text-white font-semibold mb-3">Language</h3>
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
                  <h3 className="text-white font-semibold mb-3">Timezone</h3>
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
            </motion.div>

            {/* Data Management */}
            <motion.div 
              className="bg-[#232946] rounded-xl p-6 shadow-lg border border-[#3a3a4e]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-bold text-white mb-6">Data Management</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleExportData}
                    className="w-full bg-[#6246ea] hover:bg-[#3e54ac] text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                  >
                    Export Data
                  </button>
                  
                  <label className="w-full bg-[#1a1a2e] hover:bg-[#3a3a4e] text-white py-3 px-4 rounded-lg font-semibold transition-colors cursor-pointer text-center border border-[#3a3a4e]">
                    Import Data
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportData}
                      className="hidden"
                    />
                  </label>
                </div>
                
                <button
                  onClick={handleClearAllData}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  Clear All Data
                </button>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={handleSaveSettings}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Save All Settings
              </button>
              <button
                onClick={handleResetSettings}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Reset to Default
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings