import { useState, useEffect, createContext, useContext } from 'react'
import { supabase, authHelpers } from '../lib/supabase'
import toast from 'react-hot-toast'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [preferences, setPreferences] = useState(null)
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        await loadUserData(session.user.id)
      }
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          await loadUserData(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
          setPreferences(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Load user profile and preferences
  const loadUserData = async (userId) => {
    try {
      // Load profile
      const { data: profileData, error: profileError } = await authHelpers.getUserProfile(userId)
      if (profileError) throw profileError
      setProfile(profileData)

      // Load preferences
      const { data: preferencesData, error: preferencesError } = await authHelpers.getUserPreferences(userId)
      if (preferencesError && preferencesError.code !== 'PGRST116') {
        throw preferencesError
      }
      
      if (preferencesData) {
        setPreferences(preferencesData)
        setTheme(preferencesData.theme || 'dark')
        applyTheme(preferencesData.theme || 'dark')
      } else {
        // Create default preferences
        const defaultPrefs = { theme: 'dark', notifications_enabled: true, language: 'en' }
        const { data: newPrefs } = await authHelpers.updateUserPreferences(userId, defaultPrefs)
        setPreferences(newPrefs)
        setTheme('dark')
        applyTheme('dark')
      }
    } catch (error) {
      console.error('Error loading user data:', error)
      toast.error('Failed to load user data')
    }
  }

  // Apply theme to document
  const applyTheme = (newTheme) => {
    const root = document.documentElement
    const body = document.body
    
    if (newTheme === 'dark') {
      root.classList.add('dark')
      body.classList.add('dark')
      root.classList.remove('light')
      body.classList.remove('light')
    } else {
      root.classList.add('light')
      body.classList.add('light')
      root.classList.remove('dark')
      body.classList.remove('dark')
    }
    
    localStorage.setItem('theme', newTheme)
  }

  // Toggle theme
  const toggleTheme = async () => {
    if (!user || !preferences) return
    
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    applyTheme(newTheme)
    
    try {
      const { data, error } = await authHelpers.updateUserPreferences(user.id, {
        ...preferences,
        theme: newTheme
      })
      if (error) throw error
      setPreferences(data)
      toast.success(`Switched to ${newTheme} mode`)
    } catch (error) {
      console.error('Error updating theme:', error)
      toast.error('Failed to save theme preference')
      // Revert theme on error
      setTheme(theme === 'dark' ? 'light' : 'dark')
      applyTheme(theme === 'dark' ? 'light' : 'dark')
    }
  }

  // Sign up
  const signUp = async (email, password, fullName) => {
    try {
      setLoading(true)
      const { data, error } = await authHelpers.signUp(email, password, fullName)
      if (error) throw error
      
      toast.success('Account created! Please check your email to verify your account.')
      return { data, error: null }
    } catch (error) {
      toast.error(error.message)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Sign in
  const signIn = async (email, password) => {
    try {
      setLoading(true)
      const { data, error } = await authHelpers.signIn(email, password)
      if (error) throw error
      
      toast.success('Welcome back!')
      return { data, error: null }
    } catch (error) {
      toast.error(error.message)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await authHelpers.signOut()
      if (error) throw error
      
      toast.success('Signed out successfully')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Reset password
  const resetPassword = async (email) => {
    try {
      const { data, error } = await authHelpers.resetPassword(email)
      if (error) throw error
      
      toast.success('Password reset email sent! Check your inbox.')
      return { data, error: null }
    } catch (error) {
      toast.error(error.message)
      return { data: null, error }
    }
  }

  // Update password
  const updatePassword = async (newPassword) => {
    try {
      const { data, error } = await authHelpers.updatePassword(newPassword)
      if (error) throw error
      
      toast.success('Password updated successfully!')
      return { data, error: null }
    } catch (error) {
      toast.error(error.message)
      return { data: null, error }
    }
  }

  // Update profile
  const updateProfile = async (updates) => {
    try {
      if (!user) throw new Error('No user logged in')
      
      const { data, error } = await authHelpers.updateUserProfile(user.id, updates)
      if (error) throw error
      
      setProfile(data)
      toast.success('Profile updated successfully!')
      return { data, error: null }
    } catch (error) {
      toast.error(error.message)
      return { data: null, error }
    }
  }

  const value = {
    user,
    profile,
    preferences,
    loading,
    theme,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    toggleTheme,
    isAdmin: profile?.role === 'admin',
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}