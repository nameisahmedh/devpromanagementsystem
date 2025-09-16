import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import LoadingScreen from '../Loading/LoadingScreen'

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, profile, loading, isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    // Redirect to sign in page with return url
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  if (requireAdmin && !isAdmin) {
    // Redirect to dashboard if user is not admin
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default ProtectedRoute