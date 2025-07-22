import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import toast from 'react-hot-toast';

const AppContext = createContext();

// Action types
const ACTIONS = {
  SET_USER_DATA: 'SET_USER_DATA',
  UPDATE_TASK_STATUS: 'UPDATE_TASK_STATUS',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  SET_FILTER: 'SET_FILTER',
  SET_SEARCH: 'SET_SEARCH',
  MARK_OVERDUE_TASKS: 'MARK_OVERDUE_TASKS'
};

// Initial state
const initialState = {
  userData: [],
  filter: 'all',
  searchTerm: '',
  notifications: []
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER_DATA:
      return { ...state, userData: action.payload };
    
    case ACTIONS.UPDATE_TASK_STATUS: {
      const { staffId, taskId, newStatus } = action.payload;
      const updatedData = state.userData.map(staff => {
        if (staff.id === staffId) {
          const updatedTasks = staff.tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                status: newStatus,
                updatedAt: new Date().toISOString(),
              };
            }
            return task;
          });

          return { ...staff, tasks: updatedTasks };
        }
        return staff;
      });
      
      // Update localStorage
      localStorage.setItem('staff', JSON.stringify(updatedData));
      return { ...state, userData: updatedData };
    }
    
    case ACTIONS.ADD_TASK: {
      const { staffId, task } = action.payload;
      const updatedData = state.userData.map(staff => {
        if (staff.id === staffId) {
          const newTask = {
            ...task,
            id: Date.now() + Math.random(),
            status: 'new',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            newTask: true,
            active: false,
            completed: false,
            failed: false
          };
          
          const updatedTasks = [...staff.tasks, newTask];
          const taskCount = calculateTaskCount(updatedTasks);
          return { ...staff, tasks: updatedTasks, taskCount };
        }
        return staff;
      });
      
      localStorage.setItem('staff', JSON.stringify(updatedData));
      return { ...state, userData: updatedData };
    }
    
    case ACTIONS.DELETE_TASK: {
      const { staffId, taskId } = action.payload;
      const updatedData = state.userData.map(staff => {
        if (staff.id === staffId) {
          const updatedTasks = staff.tasks.filter(task => task.id !== taskId);
          const taskCount = calculateTaskCount(updatedTasks);
          return { ...staff, tasks: updatedTasks, taskCount };
        }
        return staff;
      });
      
      localStorage.setItem('staff', JSON.stringify(updatedData));
      return { ...state, userData: updatedData };
    }
    
    case ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload };
    
    case ACTIONS.SET_SEARCH:
      return { ...state, searchTerm: action.payload };
    
    case ACTIONS.MARK_OVERDUE_TASKS: {
      const today = new Date().toISOString().split('T')[0];
      const updatedData = state.userData.map(staff => {
        const updatedTasks = staff.tasks.map(task => {
          if (task.dueDate < today && !task.completed && !task.failed) {
            return { ...task, isOverdue: true };
          }
          return task;
        });
        return { ...staff, tasks: updatedTasks };
      });
      
      return { ...state, userData: updatedData };
    }
    
    default:
      return state;
  }
};

// Helper function to calculate task counts
const calculateTaskCount = (tasks) => {
  return {
    new: tasks.filter(task => task.status === 'new').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length,
    completed: tasks.filter(task => task.status === 'completed').length,
    failed: tasks.filter(task => task.status === 'failed').length,
    total: tasks.length
  };
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    setLocalStorage();
    const localStorageData = getLocalStorage();
    if (localStorageData?.staff) {
      dispatch({ type: ACTIONS.SET_USER_DATA, payload: localStorageData.staff });
    }
  }, []);

  // Check for overdue tasks every hour
  useEffect(() => {
    const checkOverdueTasks = () => {
      dispatch({ type: ACTIONS.MARK_OVERDUE_TASKS });
    };
    
    checkOverdueTasks();
    const interval = setInterval(checkOverdueTasks, 3600000); // 1 hour
    
    return () => clearInterval(interval);
  }, []);

  const updateTaskStatus = (staffId, taskId, newStatus) => {
    dispatch({
      type: ACTIONS.UPDATE_TASK_STATUS,
      payload: { staffId, taskId, newStatus }
    });
    
    const statusMessages = {
      'in-progress': 'Task started successfully!',
      'completed': 'Task completed successfully!',
      'failed': 'Task marked as failed!',
      'new': 'Task reset to new status!'
    };
    
    toast.success(statusMessages[newStatus] || 'Task updated!');
  };

  const addTask = (staffId, task) => {
    dispatch({
      type: ACTIONS.ADD_TASK,
      payload: { staffId, task }
    });
    toast.success('Task assigned successfully!');
  };

  const deleteTask = (staffId, taskId) => {
    dispatch({
      type: ACTIONS.DELETE_TASK,
      payload: { staffId, taskId }
    });
    toast.success('Task deleted successfully!');
  };

  const setFilter = (filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  };

  const setSearch = (searchTerm) => {
    dispatch({ type: ACTIONS.SET_SEARCH, payload: searchTerm });
  };

  const getFilteredTasks = (tasks) => {
    let filtered = tasks;
    
    // Apply status filter
    if (state.filter !== 'all') {
      filtered = filtered.filter(task => task.status === state.filter);
    }
    
    // Apply search filter
    if (state.searchTerm) {
      filtered = filtered.filter(task =>
        task.taskTitle.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        task.taskDescription.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        task.category.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getTaskById = (staffId, taskId) => {
    const staff = state.userData.find(s => s.id === staffId);
    return staff?.tasks.find(t => t.id === taskId);
  };

  const getStaffByName = (name) => {
    return state.userData.find(staff => 
      staff.name.toLowerCase() === name.toLowerCase()
    );
  };

  const value = {
    ...state,
    updateTaskStatus,
    addTask,
    deleteTask,
    setFilter,
    setSearch,
    getFilteredTasks,
    getTaskById,
    getStaffByName
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};