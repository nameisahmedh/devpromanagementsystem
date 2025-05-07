const staff = [
  {
    id: 1,
    name: "Alice",
    email: "alice@mail.com",
    password: "12345",
    role: "frontend",
    taskCount: { inProgress: 2, completed: 1, pending: 0, newtask: 1 },
    tasks: [
      {
        taskTitle: "Home Page UI",
        taskDescription: "Create layout for homepage.",
        category: "frontend",
        taskDate: "2025-05-01",
        dueDate: "2025-05-04",
        active: true,
        newTask: false,
        failed: false,
        completed: false
      },
      {
        taskTitle: "Fix Navbar Bug",
        taskDescription: "Resolve alignment issue on mobile.",
        category: "frontend",
        taskDate: "2025-05-02",
        dueDate: "2025-05-05",
        active: true,
        newTask: true,
        failed: false,
        completed: false
      },
      {
        taskTitle: "Footer Links",
        taskDescription: "Add contact and about links in footer.",
        category: "frontend",
        taskDate: "2025-04-28",
        dueDate: "2025-04-30",
        active: false,
        newTask: false,
        failed: false,
        completed: true
      }
    ]
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@mail.com",
    password: "12345",
    role: "backend",
    taskCount: { inProgress: 1, completed: 2, pending: 0, newtask: 1 },
    tasks: [
      {
        taskTitle: "User Auth API",
        taskDescription: "Implement user login and register APIs.",
        category: "backend",
        taskDate: "2025-05-01",
        dueDate: "2025-05-03",
        active: true,
        newTask: false,
        failed: false,
        completed: false
      },
      {
        taskTitle: "Database Setup",
        taskDescription: "Setup tables and relations in PostgreSQL.",
        category: "backend",
        taskDate: "2025-04-29",
        dueDate: "2025-05-01",
        active: false,
        newTask: false,
        failed: false,
        completed: true
      },
      {
        taskTitle: "API Docs",
        taskDescription: "Write documentation for all endpoints.",
        category: "backend",
        taskDate: "2025-05-02",
        dueDate: "2025-05-06",
        active: true,
        newTask: true,
        failed: false,
        completed: false
      }
    ]
  },
  {
    id: 3,
    name: "Carol",
    email: "carol@mail.com",
    password: "12345",
    role: "design",
    taskCount: { inProgress: 1, completed: 1, pending: 1, newtask: 1 },
    tasks: [
      {
        taskTitle: "Dashboard Mockup",
        taskDescription: "Design dashboard wireframe.",
        category: "design",
        taskDate: "2025-05-01",
        dueDate: "2025-05-03",
        active: true,
        newTask: false,
        failed: false,
        completed: false
      },
      {
        taskTitle: "Logo Update",
        taskDescription: "Revamp the project logo.",
        category: "design",
        taskDate: "2025-04-28",
        dueDate: "2025-04-30",
        active: false,
        newTask: false,
        failed: false,
        completed: true
      },
      {
        taskTitle: "Color Research",
        taskDescription: "Suggest 3 color palette options.",
        category: "design",
        taskDate: "2025-05-02",
        dueDate: "2025-05-04",
        active: false,
        newTask: true,
        failed: false,
        completed: false
      }
    ]
  },
  {
    id: 4,
    name: "David",
    email: "david@mail.com",
    password: "12345",
    role: "testing",
    taskCount: { inProgress: 1, completed: 2, pending: 0, newtask: 1 },
    tasks: [
      {
        taskTitle: "Write Test Cases",
        taskDescription: "Write unit tests for backend APIs.",
        category: "testing",
        taskDate: "2025-05-03",
        dueDate: "2025-05-06",
        active: true,
        newTask: false,
        failed: false,
        completed: false
      },
      {
        taskTitle: "Login Flow Testing",
        taskDescription: "Verify all edge cases in login.",
        category: "testing",
        taskDate: "2025-05-01",
        dueDate: "2025-05-02",
        active: false,
        newTask: false,
        failed: false,
        completed: true
      },
      {
        taskTitle: "UI Bugs Review",
        taskDescription: "Check and report UI inconsistencies.",
        category: "testing",
        taskDate: "2025-05-02",
        dueDate: "2025-05-04",
        active: true,
        newTask: true,
        failed: false,
        completed: false
      }
    ]
  },
  {
    id: 5,
    name: "Eva",
    email: "eva@mail.com",
    password: "12345",
    role: "frontend",
    taskCount: { inProgress: 1, completed: 1, pending: 1, newtask: 1 },
    tasks: [
      {
        taskTitle: "Sidebar Component",
        taskDescription: "Build collapsible sidebar menu.",
        category: "frontend",
        taskDate: "2025-05-03",
        dueDate: "2025-05-06",
        active: true,
        newTask: false,
        failed: false,
        completed: false
      },
      {
        taskTitle: "Contact Page",
        taskDescription: "Develop contact form with validation.",
        category: "frontend",
        taskDate: "2025-04-30",
        dueDate: "2025-05-02",
        active: false,
        newTask: false,
        failed: false,
        completed: true
      },
      {
        taskTitle: "Theme Switcher",
        taskDescription: "Add light/dark mode toggle.",
        category: "frontend",
        taskDate: "2025-05-04",
        dueDate: "2025-05-07",
        active: false,
        newTask: true,
        failed: false,
        completed: false
      }
    ]
  }
];

const admin = [
  {
    id: 1,
    name: "Ahmed",
    email: "ahmed@mail.com",
    password: "123",
    role: "admin",
    taskCount: { inProgress: 1, completed: 2, pending: 0, newtask: 1 },
    tasks: [
      {
        taskTitle: "Review Progress",
        taskDescription: "Check team updates and task statuses.",
        category: "others",
        taskDate: "2025-05-02",
        dueDate: "2025-05-03",
        active: true,
        newTask: false,
        failed: false,
        completed: false
      },
      {
        taskTitle: "Update Docs",
        taskDescription: "Edit and publish project documentation.",
        category: "others",
        taskDate: "2025-04-30",
        dueDate: "2025-05-01",
        active: false,
        newTask: false,
        failed: false,
        completed: true
      },
      {
        taskTitle: "Schedule Meeting",
        taskDescription: "Plan meeting with team leads.",
        category: "others",
        taskDate: "2025-05-03",
        dueDate: "2025-05-04",
        active: true,
        newTask: true,
        failed: false,
        completed: false
      }
    ]
  }
];


export const setLocalStorage = () => {
  localStorage.setItem('staff', JSON.stringify(staff));
  localStorage.setItem('admin', JSON.stringify(admin));
}

export const getLocalStorage = () => {
  const staff = JSON.parse(localStorage.getItem('staff'));
  const admin = JSON.parse(localStorage.getItem('admin'));
  return { staff, admin };
}
