import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './hooks/useAuth'
import SignInForm from './components/auth/SignInForm'
import SignUpForm from './components/auth/SignUpForm'
import ForgotPasswordForm from './components/auth/ForgotPasswordForm'
import ResetPasswordForm from './components/auth/ResetPasswordForm'
import ProtectedRoute from './components/auth/ProtectedRoute'
import UserDashboard from './components/dashboard/UserDashboard'
import AdminDashboard from './components/dashboard/AdminDashboard'
import Profile from './components/Profile/Profile'
import NotFound from './components/NotFound/NotFound'
import LoadingScreen from './components/Loading/LoadingScreen'
import './App.css'

const AppRoutes = () => {
  const { loading, isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()
  
  if (loading) {
    return <LoadingScreen />
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/signin" 
        element={!isAuthenticated ? <SignInForm /> : <Navigate to="/dashboard" replace />} 
      />
      <Route 
        path="/signup" 
        element={!isAuthenticated ? <SignUpForm /> : <Navigate to="/dashboard" replace />} 
      />
      <Route 
        path="/forgot-password" 
        element={!isAuthenticated ? <ForgotPasswordForm /> : <Navigate to="/dashboard" replace />} 
      />
      <Route 
        path="/reset-password" 
        element={!isAuthenticated ? <ResetPasswordForm /> : <Navigate to="/dashboard" replace />} 
      />
      
      {/* Root redirect */}
      <Route 
        path="/" 
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/signin" replace />
          )
        } 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            {isAdmin ? <AdminDashboard /> : <UserDashboard />}
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-300">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
                border: '1px solid var(--toast-border)'
              }
            }}
          />
          
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App