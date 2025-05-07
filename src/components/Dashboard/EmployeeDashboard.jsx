import React from 'react'
import Header from '../other/Header'
import TaskListCount from '../other/TakListCount'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = ({ data, onLogout }) => {  
  return (
    <div>
      <Header data={data} onLogout={onLogout} />      
      <TaskListCount data={data} />
      <TaskList data={data} />
    </div>
  )
}

export default EmployeeDashboard
