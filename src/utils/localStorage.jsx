const staff = [
  {
    id: 1,
    name: "Alice",
    email: "alice@mail.com",
    password: "12345",
    role: "frontend",
    tasks: [
      {
        id: 1001,
        taskTitle: "Home Page UI",
        taskDescription: "Create layout for homepage.",
        category: "frontend",
        priority: "high",
        taskDate: "2025-05-01",
        dueDate: "2025-05-04",
        status: "in-progress",
        createdAt: "2025-05-01T10:00:00Z",
        updatedAt: "2025-05-01T10:00:00Z"
      },
      {
        id: 1002,
        taskTitle: "Fix Navbar Bug",
        taskDescription: "Resolve alignment issue on mobile.",
        category: "frontend",
        priority: "medium",
        taskDate: "2025-05-02",
        dueDate: "2025-05-05",
        status: "new",
        createdAt: "2025-05-02T10:00:00Z",
        updatedAt: "2025-05-02T10:00:00Z"
      },
      {
        id: 1003,
        taskTitle: "Footer Links",
        taskDescription: "Add contact and about links in footer.",
        category: "frontend",
        priority: "low",
        taskDate: "2025-04-28",
        dueDate: "2025-04-30",
        status: "completed",
        createdAt: "2025-04-28T10:00:00Z",
        updatedAt: "2025-04-30T10:00:00Z"
      }
    ]
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@mail.com",
    password: "12345",
    role: "backend",
    tasks: [
      {
        id: 2001,
        taskTitle: "User Auth API",
        taskDescription: "Implement user login and register APIs.",
        category: "backend",
        priority: "high",
        taskDate: "2025-05-01",
        dueDate: "2025-05-03",
        status: "in-progress",
        createdAt: "2025-05-01T10:00:00Z",
        updatedAt: "2025-05-01T10:00:00Z"
      },
      {
        id: 2002,
        taskTitle: "Database Setup",
        taskDescription: "Setup tables and relations in PostgreSQL.",
        category: "backend",
        priority: "high",
        taskDate: "2025-04-29",
        dueDate: "2025-05-01",
        status: "completed",
        createdAt: "2025-04-29T10:00:00Z",
        updatedAt: "2025-05-01T10:00:00Z"
      },
      {
        id: 2003,
        taskTitle: "API Docs",
        taskDescription: "Write documentation for all endpoints.",
        category: "backend",
        priority: "medium",
        taskDate: "2025-05-02",
        dueDate: "2025-05-06",
        status: "new",
        createdAt: "2025-05-02T10:00:00Z",
        updatedAt: "2025-05-02T10:00:00Z"
      }
    ]
  },
  {
    id: 3,
    name: "Carol",
    email: "carol@mail.com",
    password: "12345",
    role: "design",
    tasks: [
      {
        id: 3001,
        taskTitle: "Dashboard Mockup",
        taskDescription: "Design dashboard wireframe.",
        category: "design",
        priority: "medium",
        taskDate: "2025-05-01",
        dueDate: "2025-05-03",
        status: "in-progress",
        createdAt: "2025-05-01T10:00:00Z",
        updatedAt: "2025-05-01T10:00:00Z"
      },
      {
        id: 3002,
        taskTitle: "Logo Update",
        taskDescription: "Revamp the project logo.",
        category: "design",
        priority: "low",
        taskDate: "2025-04-28",
        dueDate: "2025-04-30",
        status: "completed",
        createdAt: "2025-04-28T10:00:00Z",
        updatedAt: "2025-04-30T10:00:00Z"
      },
      {
        id: 3003,
        taskTitle: "Color Research",
        taskDescription: "Suggest 3 color palette options.",
        category: "design",
        priority: "low",
        taskDate: "2025-05-02",
        dueDate: "2025-05-04",
        status: "new",
        createdAt: "2025-05-02T10:00:00Z",
        updatedAt: "2025-05-02T10:00:00Z"
      }
    ]
  },
  {
    id: 4,
    name: "David",
    email: "david@mail.com",
    password: "12345",
    role: "testing",
    tasks: [
      {
        id: 4001,
        taskTitle: "Write Test Cases",
        taskDescription: "Write unit tests for backend APIs.",
        category: "testing",
        priority: "high",
        taskDate: "2025-05-03",
        dueDate: "2025-05-06",
        status: "in-progress",
        createdAt: "2025-05-03T10:00:00Z",
        updatedAt: "2025-05-03T10:00:00Z"
      },
      {
        id: 4002,
        taskTitle: "Login Flow Testing",
        taskDescription: "Verify all edge cases in login.",
        category: "testing",
        priority: "high",
        taskDate: "2025-05-01",
        dueDate: "2025-05-02",
        status: "completed",
        createdAt: "2025-05-01T10:00:00Z",
        updatedAt: "2025-05-02T10:00:00Z"
      },
      {
        id: 4003,
        taskTitle: "UI Bugs Review",
        taskDescription: "Check and report UI inconsistencies.",
        category: "testing",
        priority: "medium",
        taskDate: "2025-05-02",
        dueDate: "2025-05-04",
        status: "new",
        createdAt: "2025-05-02T10:00:00Z",
        updatedAt: "2025-05-02T10:00:00Z"
      }
    ]
  },
  {
    id: 5,
    name: "Eva",
    email: "eva@mail.com",
    password: "12345",
    role: "frontend",
    tasks: [
      {
        id: 5001,
        taskTitle: "Sidebar Component",
        taskDescription: "Build collapsible sidebar menu.",
        category: "frontend",
        priority: "medium",
        taskDate: "2025-05-03",
        dueDate: "2025-05-06",
        status: "in-progress",
        createdAt: "2025-05-03T10:00:00Z",
        updatedAt: "2025-05-03T10:00:00Z"
      },
      {
        id: 5002,
        taskTitle: "Contact Page",
        taskDescription: "Develop contact form with validation.",
        category: "frontend",
        priority: "low",
        taskDate: "2025-04-30",
        dueDate: "2025-05-02",
        status: "completed",
        createdAt: "2025-04-30T10:00:00Z",
        updatedAt: "2025-05-02T10:00:00Z"
      },
      {
        id: 5003,
        taskTitle: "Theme Switcher",
        taskDescription: "Add light/dark mode toggle.",
        category: "frontend",
        priority: "low",
        taskDate: "2025-05-04",
        dueDate: "2025-05-07",
        status: "new",
        createdAt: "2025-05-04T10:00:00Z",
        updatedAt: "2025-05-04T10:00:00Z"
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
        id: 9001,
        taskTitle: "Review Progress",
        taskDescription: "Check team updates and task statuses.",
        category: "others",
        priority: "high",
        taskDate: "2025-05-02",
        dueDate: "2025-05-03",
        status: "in-progress",
        createdAt: "2025-05-02T10:00:00Z",
        updatedAt: "2025-05-02T10:00:00Z"
      },
      {
        id: 9002,
        taskTitle: "Update Docs",
        taskDescription: "Edit and publish project documentation.",
        category: "others",
        priority: "medium",
        taskDate: "2025-04-30",
        dueDate: "2025-05-01",
        status: "completed",
        createdAt: "2025-04-30T10:00:00Z",
        updatedAt: "2025-05-01T10:00:00Z"
      },
      {
        id: 9003,
        taskTitle: "Schedule Meeting",
        taskDescription: "Plan meeting with team leads.",
        category: "others",
        priority: "medium",
        taskDate: "2025-05-03",
        dueDate: "2025-05-04",
        status: "new",
        createdAt: "2025-05-03T10:00:00Z",
        updatedAt: "2025-05-03T10:00:00Z"
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
