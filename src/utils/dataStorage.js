// Enhanced data storage utility with proper persistence
class DataStorage {
  constructor() {
    this.storageKey = 'devpro_data';
    this.init();
  }

  init() {
    // Initialize with default data if not exists
    const existingData = this.getData();
    if (!existingData || !existingData.staff || existingData.staff.length === 0) {
      this.setData(this.getDefaultData());
    }
  }

  getData() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  setData(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  }

  updateData(updateFn) {
    const currentData = this.getData();
    if (currentData) {
      const updatedData = updateFn(currentData);
      return this.setData(updatedData);
    }
    return false;
  }

  // Staff operations
  getStaff() {
    const data = this.getData();
    return data?.staff || [];
  }

  updateStaff(staffData) {
    return this.updateData(data => ({
      ...data,
      staff: staffData
    }));
  }

  addStaff(newStaff) {
    return this.updateData(data => ({
      ...data,
      staff: [...data.staff, { ...newStaff, id: Date.now() }]
    }));
  }

  removeStaff(staffId) {
    return this.updateData(data => ({
      ...data,
      staff: data.staff.filter(s => s.id !== staffId)
    }));
  }

  // Task operations
  addTask(staffId, task) {
    return this.updateData(data => ({
      ...data,
      staff: data.staff.map(staff => {
        if (staff.id === staffId) {
          const newTask = {
            ...task,
            id: Date.now() + Math.random(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          return {
            ...staff,
            tasks: [...staff.tasks, newTask]
          };
        }
        return staff;
      })
    }));
  }

  updateTask(staffId, taskId, updates) {
    return this.updateData(data => ({
      ...data,
      staff: data.staff.map(staff => {
        if (staff.id === staffId) {
          return {
            ...staff,
            tasks: staff.tasks.map(task => {
              if (task.id === taskId) {
                return {
                  ...task,
                  ...updates,
                  updatedAt: new Date().toISOString()
                };
              }
              return task;
            })
          };
        }
        return staff;
      })
    }));
  }

  deleteTask(staffId, taskId) {
    return this.updateData(data => ({
      ...data,
      staff: data.staff.map(staff => {
        if (staff.id === staffId) {
          return {
            ...staff,
            tasks: staff.tasks.filter(task => task.id !== taskId)
          };
        }
        return staff;
      })
    }));
  }

  // Admin operations
  getAdmin() {
    const data = this.getData();
    return data?.admin || [];
  }

  updateAdmin(adminData) {
    return this.updateData(data => ({
      ...data,
      admin: adminData
    }));
  }

  // Settings operations
  getSettings() {
    const data = this.getData();
    return data?.settings || this.getDefaultSettings();
  }

  updateSettings(settings) {
    return this.updateData(data => ({
      ...data,
      settings: { ...data.settings, ...settings }
    }));
  }

  getDefaultSettings() {
    return {
      theme: 'dark',
      notifications: true,
      autoSave: true,
      language: 'en'
    };
  }

  getDefaultData() {
    return {
      staff: [
        {
          id: 1,
          name: "Alice",
          email: "alice@mail.com",
          password: "12345",
          role: "frontend",
          avatar: null,
          joinDate: "2024-01-15",
          tasks: [
            {
              id: 1001,
              taskTitle: "Home Page UI",
              taskDescription: "Create responsive layout for homepage with modern design principles.",
              category: "frontend",
              priority: "high",
              taskDate: "2025-01-15",
              dueDate: "2025-01-20",
              status: "in-progress",
              createdAt: "2025-01-15T10:00:00Z",
              updatedAt: "2025-01-15T10:00:00Z"
            },
            {
              id: 1002,
              taskTitle: "Fix Navbar Bug",
              taskDescription: "Resolve alignment issue on mobile devices and improve accessibility.",
              category: "frontend",
              priority: "medium",
              taskDate: "2025-01-16",
              dueDate: "2025-01-18",
              status: "new",
              createdAt: "2025-01-16T10:00:00Z",
              updatedAt: "2025-01-16T10:00:00Z"
            },
            {
              id: 1003,
              taskTitle: "Footer Links",
              taskDescription: "Add contact and about links in footer with proper styling.",
              category: "frontend",
              priority: "low",
              taskDate: "2025-01-10",
              dueDate: "2025-01-14",
              status: "completed",
              createdAt: "2025-01-10T10:00:00Z",
              updatedAt: "2025-01-14T10:00:00Z"
            }
          ]
        },
        {
          id: 2,
          name: "Bob",
          email: "bob@mail.com",
          password: "12345",
          role: "backend",
          avatar: null,
          joinDate: "2024-02-01",
          tasks: [
            {
              id: 2001,
              taskTitle: "User Auth API",
              taskDescription: "Implement secure user login and registration APIs with JWT tokens.",
              category: "backend",
              priority: "high",
              taskDate: "2025-01-15",
              dueDate: "2025-01-22",
              status: "in-progress",
              createdAt: "2025-01-15T10:00:00Z",
              updatedAt: "2025-01-15T10:00:00Z"
            },
            {
              id: 2002,
              taskTitle: "Database Setup",
              taskDescription: "Setup tables and relations in PostgreSQL with proper indexing.",
              category: "backend",
              priority: "high",
              taskDate: "2025-01-12",
              dueDate: "2025-01-16",
              status: "completed",
              createdAt: "2025-01-12T10:00:00Z",
              updatedAt: "2025-01-16T10:00:00Z"
            },
            {
              id: 2003,
              taskTitle: "API Documentation",
              taskDescription: "Write comprehensive documentation for all API endpoints.",
              category: "backend",
              priority: "medium",
              taskDate: "2025-01-17",
              dueDate: "2025-01-25",
              status: "new",
              createdAt: "2025-01-17T10:00:00Z",
              updatedAt: "2025-01-17T10:00:00Z"
            }
          ]
        },
        {
          id: 3,
          name: "Carol",
          email: "carol@mail.com",
          password: "12345",
          role: "design",
          avatar: null,
          joinDate: "2024-01-20",
          tasks: [
            {
              id: 3001,
              taskTitle: "Dashboard Mockup",
              taskDescription: "Design comprehensive dashboard wireframe with user flow.",
              category: "design",
              priority: "medium",
              taskDate: "2025-01-15",
              dueDate: "2025-01-20",
              status: "in-progress",
              createdAt: "2025-01-15T10:00:00Z",
              updatedAt: "2025-01-15T10:00:00Z"
            },
            {
              id: 3002,
              taskTitle: "Logo Redesign",
              taskDescription: "Revamp the project logo with modern design trends.",
              category: "design",
              priority: "low",
              taskDate: "2025-01-10",
              dueDate: "2025-01-14",
              status: "completed",
              createdAt: "2025-01-10T10:00:00Z",
              updatedAt: "2025-01-14T10:00:00Z"
            }
          ]
        },
        {
          id: 4,
          name: "David",
          email: "david@mail.com",
          password: "12345",
          role: "testing",
          avatar: null,
          joinDate: "2024-03-01",
          tasks: [
            {
              id: 4001,
              taskTitle: "Unit Test Suite",
              taskDescription: "Write comprehensive unit tests for backend APIs.",
              category: "testing",
              priority: "high",
              taskDate: "2025-01-18",
              dueDate: "2025-01-25",
              status: "new",
              createdAt: "2025-01-18T10:00:00Z",
              updatedAt: "2025-01-18T10:00:00Z"
            },
            {
              id: 4002,
              taskTitle: "Login Flow Testing",
              taskDescription: "Verify all edge cases in user authentication flow.",
              category: "testing",
              priority: "high",
              taskDate: "2025-01-16",
              dueDate: "2025-01-19",
              status: "completed",
              createdAt: "2025-01-16T10:00:00Z",
              updatedAt: "2025-01-19T10:00:00Z"
            }
          ]
        }
        {
          id: 5,
          name: "Emma",
          email: "emma@mail.com",
          password: "12345",
          role: "devops",
          avatar: null,
          joinDate: "2024-02-15",
          tasks: [
            {
              id: 5001,
              taskTitle: "CI/CD Pipeline",
              taskDescription: "Setup automated deployment pipeline with Docker and GitHub Actions.",
              category: "devops",
              priority: "high",
              taskDate: "2025-01-16",
              dueDate: "2025-01-23",
              status: "in-progress",
              createdAt: "2025-01-16T10:00:00Z",
              updatedAt: "2025-01-16T10:00:00Z"
            },
            {
              id: 5002,
              taskTitle: "Server Monitoring",
              taskDescription: "Implement comprehensive server monitoring and alerting system.",
              category: "devops",
              priority: "medium",
              taskDate: "2025-01-18",
              dueDate: "2025-01-26",
              status: "new",
              createdAt: "2025-01-18T10:00:00Z",
              updatedAt: "2025-01-18T10:00:00Z"
            }
          ]
        }
      ],
      admin: [
        {
          id: 1,
          name: "Ahmed",
          email: "ahmed@mail.com",
          password: "123",
          role: "admin",
          permissions: ["create_tasks", "manage_users", "view_analytics", "system_settings"],
          lastLogin: new Date().toISOString()
        }
      ],
      settings: this.getDefaultSettings()
    };
  }

  // Backup and restore
  exportData() {
    const data = this.getData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devpro-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (this.setData(data)) {
            resolve(data);
          } else {
            reject(new Error('Failed to import data'));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  }

  // Clear all data
  clearAll() {
    localStorage.removeItem(this.storageKey);
    this.init();
  }
}

export const dataStorage = new DataStorage();
export default dataStorage;