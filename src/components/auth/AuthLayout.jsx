import React from 'react'
import { motion } from 'framer-motion'
import { Code, Shield, Users, Zap } from 'lucide-react'

const AuthLayout = ({ children, title, subtitle }) => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Enterprise-grade security with encrypted data protection'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Seamless workflow management for development teams'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Instant synchronization across all team members'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex">
      {/* Left Panel - Branding */}
      <motion.div 
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 relative overflow-hidden"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          {/* Logo */}
          <motion.div 
            className="mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
              <Code className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Brand Text */}
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">DevPro Solutions</h1>
            <p className="text-xl text-white/90 max-w-md">
              Empowering development teams with intelligent project management and seamless collaboration tools.
            </p>
          </motion.div>

          {/* Features */}
          <div className="space-y-6 max-w-md">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-white/80 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full blur-xl" />
      </motion.div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-12">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Code className="w-8 h-8 text-white" />
          </div>
          <div className="ml-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DevPro</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Solutions</p>
          </div>
        </div>

        <motion.div
          className="w-full max-w-md mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          </div>

          {/* Form Content */}
          {children}
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>© 2025 DevPro Solutions. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  )
}

export default AuthLayout