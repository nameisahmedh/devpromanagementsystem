import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import TaskDetails from './components/Tasks/TaskDetails'
import Profile from './components/Profile/Profile'
import Analytics from './components/Analytics/Analytics'
import NotFound from './components/NotFound/NotFound'
import LoadingScreen from './components/Loading/LoadingScreen'
import './App.css'
import { AuthContext } from './context/AuthProvider'

const App = () => {
  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData, setUserData] = useContext(AuthContext)
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
    if (email === 'ahmed@mail.com' && password === '123') {
      setUser('admin')
      setLoggedInUserData(null)
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
    } else if (userData) {
      const staff = userData.find(
        (e) => email === e.email && e.password === password
      )
      if (staff) {
        setUser('staff')
        setLoggedInUserData(staff)
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ role: 'staff', data: staff })
        )
      } else {
        throw new Error('Invalid credentials')
      }
    } else {
      throw new Error('Invalid credentials')
    }
  }

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