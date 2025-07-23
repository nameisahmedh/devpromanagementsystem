import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { dataStorage } from '../utils/dataStorage';
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
  MARK_OVERDUE_TASKS: 'MARK_OVERDUE_TASKS',
  ADD_STAFF: 'ADD_STAFF',
  REMOVE_STAFF: 'REMOVE_STAFF',
  UPDATE_STAFF: 'UPDATE_STAFF'
};

// Initial state
const initialState = {
  userData: [],
  adminData: [],
  filter: 'all',
  searchTerm: '',
  notifications: [],
  settings: {}
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER_DATA:
      return { 
        ...state, 
        userData: action.payload.staff || [],
        adminData: action.payload.admin || [],
        settings: action.payload.settings || {}
      };
    
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
      
      // Update storage
      dataStorage.updateStaff(updatedData);
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
            updatedAt: new Date().toISOString()
          };
          return { ...staff, tasks: [...staff.tasks, newTask] };
        }
        return staff;
      });
      
      dataStorage.updateStaff(updatedData);
      return { ...state, userData: updatedData };
    }
    
    case ACTIONS.DELETE_TASK: {
      const { staffId, taskId } = action.payload;
      const updatedData = state.userData.map(staff => {
        if (staff.id === staffId) {
          return { ...staff, tasks: staff.tasks.filter(task => task.id !== taskId) };
        }
        return staff;
      });
      
      dataStorage.updateStaff(updatedData);
      return { ...state, userData: updatedData };
    }

    case ACTIONS.ADD_STAFF: {
      const newStaff = {
        ...action.payload,
        id: Date.now(),
        tasks: [],
        joinDate: new Date().toISOString().split('T')[0]
      };
      const updatedData = [...state.userData, newStaff];
      dataStorage.updateStaff(updatedData);
      return { ...state, userData: updatedData };
    }

    case ACTIONS.REMOVE_STAFF: {
      const updatedData = state.userData.filter(staff => staff.id !== action.payload);
      dataStorage.updateStaff(updatedData);
      return { ...state, userData: updatedData };
    }

    case ACTIONS.UPDATE_STAFF: {
      const { staffId, updates } = action.payload;
      const updatedData = state.userData.map(staff => 
        staff.id === staffId ? { ...staff, ...updates } : staff
      );
      dataStorage.updateStaff(updatedData);
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
          if (task.dueDate < today && task.status !== 'completed' && task.status !== 'failed') {
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

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Load data from storage
    const data = dataStorage.getData();
    if (data) {
      dispatch({ type: ACTIONS.SET_USER_DATA, payload: data });
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

  const addStaff = (staffData) => {
    dispatch({
      type: ACTIONS.ADD_STAFF,
      payload: staffData
    });
    toast.success('Staff member added successfully!');
  };

  const removeStaff = (staffId) => {
    dispatch({
      type: ACTIONS.REMOVE_STAFF,
      payload: staffId
    });
    toast.success('Staff member removed successfully!');
  };

  const updateStaff = (staffId, updates) => {
    dispatch({
      type: ACTIONS.UPDATE_STAFF,
      payload: { staffId, updates }
    });
    toast.success('Staff information updated successfully!');
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

  const getStaffById = (id) => {
    return state.userData.find(staff => staff.id === id);
  };

  // Calculate task statistics
  const getTaskStats = () => {
    const allTasks = state.userData.flatMap(staff => staff.tasks);
    return {
      total: allTasks.length,
      new: allTasks.filter(task => task.status === 'new').length,
      inProgress: allTasks.filter(task => task.status === 'in-progress').length,
      completed: allTasks.filter(task => task.status === 'completed').length,
      failed: allTasks.filter(task => task.status === 'failed').length,
      overdue: allTasks.filter(task => task.isOverdue).length
    };
  };

  const value = {
    ...state,
    updateTaskStatus,
    addTask,
    deleteTask,
    addStaff,
    removeStaff,
    updateStaff,
    setFilter,
    setSearch,
    getFilteredTasks,
    getTaskById,
    getStaffByName,
    getStaffById,
    getTaskStats,
    dataStorage
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