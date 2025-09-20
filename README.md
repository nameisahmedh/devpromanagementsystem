# 💼 DevPro Solutions – Staff Management System

**DevPro Solutions** is an enterprise-grade staff management system designed to help development teams organize tasks, assign responsibilities, and monitor progress—all within a simple, clean UI.

## 🧩 Features

- 🚀 Clean and modern UI with dark/light theme support
- 🔐 Secure authentication with Supabase
- 👨‍💼 Admin Dashboard:
  - Assign tasks to staff
  - View existing tasks
  - Create new tasks
  - Monitor staff performance
- 👨‍💻 Staff Dashboard:
  - View assigned tasks
  - Track task progress
  - Search and filter tasks
- 📱 Fully responsive design
- ⚡ Real-time updates

## 🛠 Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **State Management:** React Hooks + Context
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Yup validation
- **Notifications:** React Hot Toast

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devpro-solutions
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Copy the project URL and anon key
   - Run the migration in `supabase/migrations/` to set up the database schema

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 📝 Usage

### First Time Setup

1. **Create an Admin Account**
   - Sign up with your email
   - Update your profile role to 'admin' in the Supabase dashboard

2. **Add Staff Members**
   - Staff can sign up themselves
   - Their role will default to 'staff'

### Admin Features

- **Dashboard Overview**: View all tasks and team statistics
- **Task Management**: Create, assign, and monitor tasks
- **Team Monitoring**: Track individual and team performance
- **Profile Management**: Update personal information

### Staff Features

- **Personal Dashboard**: View assigned tasks with filtering and search
- **Task Updates**: Change task status (new → in-progress → completed/failed)
- **Profile Management**: Update personal information
- **Real-time Updates**: See changes immediately

## 🏗️ Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── common/         # Reusable components
│   ├── dashboard/      # Dashboard layouts
│   ├── Navigation/     # Sidebar and navigation
│   ├── Profile/        # User profile components
│   └── tasks/          # Task-related components
├── hooks/              # Custom React hooks
├── lib/                # External service configurations
└── main.jsx           # Application entry point
```

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level access control
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Admin and staff role separation
- **Input Validation**: Client and server-side validation
- **Secure Password Reset**: Email-based password recovery

## 🎨 Design System

- **Theme Support**: Dark and light mode with system preference detection
- **Responsive Design**: Mobile-first approach with breakpoints
- **Consistent Spacing**: 8px grid system
- **Color System**: Comprehensive color palette with semantic meanings
- **Typography**: Hierarchical text styles with proper contrast ratios
- **Animations**: Smooth transitions and micro-interactions

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide React](https://lucide.dev/) for icons