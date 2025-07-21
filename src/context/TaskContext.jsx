import React, { createContext, useContext, useState } from 'react';
import { AuthContext } from './AuthProvider';
import toast from 'react-hot-toast';

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [userData, setUserData] = useContext(AuthContext);

  const updateTaskStatus = (staffId, taskIndex, newStatus) => {
    if (!userData) return;

    const updatedData = userData.map(staff => {
      if (staff.id === staffId) {
        const updatedTasks = staff.tasks.map((task, index) => {
          if (index === taskIndex) {
            // Reset all status flags
            const updatedTask = {
              ...task,
              active: false,
              newTask: false,
              completed: false,
              failed: false
            };

            // Set the new status
            switch (newStatus) {
              case 'accepted':
                updatedTask.active = true;
                break;
              case 'completed':
                updatedTask.completed = true;
                break;
              case 'failed':
                updatedTask.failed = true;
                break;
              case 'rejected':
                updatedTask.failed = true;
                break;
              default:
                updatedTask.newTask = true;
            }

            return updatedTask;
          }
          return task;
        });

        // Update task counts
        const taskCount = {
          newtask: updatedTasks.filter(task => task.newTask).length,
          inProgress: updatedTasks.filter(task => task.active).length,
          completed: updatedTasks.filter(task => task.completed).length,
          pending: updatedTasks.filter(task => task.failed).length
        };

        return {
          ...staff,
          tasks: updatedTasks,
          taskCount
        };
      }
      return staff;
    });

    setUserData(updatedData);
    
    // Update localStorage
    localStorage.setItem('staff', JSON.stringify(updatedData));
    
    // Show success message
    const statusMessages = {
      accepted: 'Task accepted successfully!',
      completed: 'Task marked as completed!',
      failed: 'Task marked as failed!',
      rejected: 'Task rejected successfully!'
    };
    
    toast.success(statusMessages[newStatus] || 'Task updated!');
  };

  return (
    <TaskContext.Provider value={{ updateTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;