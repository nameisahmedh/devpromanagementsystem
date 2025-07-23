import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import TaskDetails from './components/Tasks/TaskDetails'
import Profile from './components/Profile/Profile'
import Analytics from './components/Analytics/Analytics'
import UserManagement from './components/UserManagement/UserManagement'
import Settings from './components/Settings/Settings'
import NotFound from './components/NotFound/NotFound'
import LoadingScreen from './components/Loading/LoadingScreen'
import { useApp } from './context/AppContext'
import './App.css'

const App = () => {
  const { userData, adminData, getStaffByName } = useApp()
  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      const loggedInUser = localStorage.getItem('loggedInUser')
      if (loggedInUser) {
        const userData = JSON.parse(loggedInUser)
        setUser(userData.role)
        setLoggedInUserData(userData.data)
      }
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = (email, password) => {
    // Check admin login
    if (email === 'ahmed@mail.com' && password === '123') {
      const adminUser = adminData?.[0] || { name: 'Ahmed', email: 'ahmed@mail.com', role: 'admin' }
      setUser('admin')
      setLoggedInUserData(adminUser)
      localStorage.setItem('loggedInUser', JSON.stringify({ 
        role: 'admin', 
        data: adminUser 
      }))
      return
    }

    // Check staff login
    if (userData) {
      const staff = userData.find(e => email === e.email && password === e.password)
      if (staff) {
        setUser('staff')
        setLoggedInUserData(staff)
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ role: 'staff', data: staff, staffId: staff.id })
        )
        return
      }
    }
    
    // Log available users for debugging
    console.log('Available staff:', userData?.map(u => ({ name: u.name, email: u.email })));
    throw new Error('Invalid email or password. Please check your credentials.')
  }

  // Update logged in user data when userData changes
  useEffect(() => {
    if (user === 'staff' && loggedInUserData && userData) {
      const updatedStaff = userData.find(s => s.id === loggedInUserData.id)
      if (updatedStaff) {
        setLoggedInUserData(updatedStaff)
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ role: 'staff', data: updatedStaff, staffId: updatedStaff.id })
        )
      }
    }
  }, [userData, user, loggedInUserData])

  const handleLogout = () => {
    setUser(null)
    setLoggedInUserData(null)
    localStorage.removeItem('loggedInUser')
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#232946',
              color: '#fff',
              border: '1px solid #3a3a4e'
            }
          }}
        />
        
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <Login handleLogin={handleLogin} /> : <Navigate to="/" />} 
          />
          
          <Route 
            path="/" 
            element={
              user ? (
                user === 'admin' ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  <Navigate to="/staff/dashboard" />
                )
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          
          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              user === 'admin' ? (
                <AdminDashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/admin/analytics" 
            element={
              user === 'admin' ? (
                <Analytics onLogout={handleLogout} userRole="admin" />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              user === 'admin' ? (
                <UserManagement onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              user === 'admin' ? (
                <Settings onLogout={handleLogout} userRole="admin" />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          
          {/* Staff Routes */}
          <Route 
            path="/staff/dashboard" 
            element={
              user === 'staff' ? (
                <EmployeeDashboard data={loggedInUserData} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/staff/profile" 
            element={
              user === 'staff' ? (
                <Profile data={loggedInUserData} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/staff/tasks/:taskId" 
            element={
              user === 'staff' ? (
                <TaskDetails data={loggedInUserData} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App