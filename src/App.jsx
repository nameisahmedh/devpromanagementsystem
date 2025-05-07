import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import './App.css'
import { AuthContext } from './context/AuthProvider'
import AllTask from './components/other/AllTask'

const App = () => {
  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData,setUserData] = useContext(AuthContext)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser)
      setUser(userData.role)
      setLoggedInUserData(userData.data)
    }

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
        alert('Invalid Credentials')
      }
    } else {
      alert('Invalid Credentials')
    }
  }

  const handleLogout = () => {
    setUser(null)
    setLoggedInUserData(null)
    localStorage.removeItem('loggedInUser')
  }



  return (
    <>
      {!user && <Login handleLogin={handleLogin} />}
      {user === 'admin' && <AdminDashboard onLogout={handleLogout} />}
      {user === 'staff' && (
        <EmployeeDashboard data={loggedInUserData} onLogout={handleLogout} />
      )}
      {/* <AllTask/> */}
    </>
  )
}

export default App
