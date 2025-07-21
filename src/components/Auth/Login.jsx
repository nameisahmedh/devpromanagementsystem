import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";


const Login = ({handleLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const SubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      handleLogin(email, password);
      toast.success("Login successful!");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div 
        className="flex min-h-screen bg-gradient-to-br from-[#232946] to-[#121629]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
      {/* Left side - Brand section */}
      <motion.div 
        className="hidden md:flex md:w-1/2 flex-col justify-center items-center p-12 bg-gradient-to-br from-[#3e54ac] to-[#6246ea]"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div 
          className="mb-8"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <motion.svg
            className="w-16 h-16 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            whileHover={{ scale: 1.1 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </motion.svg>
        </motion.div>
        <h1 className="text-4xl font-bold text-white mb-4">DevPro Solutions</h1>
        <p className="text-xl text-[#b8c1ec] text-center mb-6">Staff Management System</p>
        <p className="text-[#d4d7e2] text-center max-w-md">
          Enterprise-grade solutions for development teams. Manage your team efficiently with our comprehensive suite of tools.
        </p>
      </motion.div>

      {/* Right side - Login form */}
      <motion.div 
        className="w-full md:w-1/2 flex flex-col justify-center p-8 lg:p-12"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.div 
          className="mx-auto w-full max-w-md"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Mobile logo - only shows on small screens */}
          <div className="flex md:hidden items-center justify-center mb-8">
            <svg
              className="w-10 h-10 text-[#6246ea]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            <h1 className="ml-2 text-2xl font-bold text-white">DevPro Solutions</h1>
          </div>

          <motion.div 
            className="bg-[#1a1a2e] shadow-2xl rounded-xl p-8 border border-[#3a3a4e]"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-8 text-center">Sign In</h2>

            <form onSubmit={SubmitHandler} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[#b8c1ec]">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-[#b8c1ec]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full pl-10 py-2.5 bg-[#232946] border border-[#3a3a4e] rounded-lg text-white placeholder-[#a6b0d3] focus:ring-[#6246ea] focus:border-[#6246ea]"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#b8c1ec]">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-[#b8c1ec]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    className="block w-full pl-10 py-2.5 bg-[#232946] border border-[#3a3a4e] rounded-lg text-white placeholder-[#a6b0d3] focus:ring-[#6246ea] focus:border-[#6246ea]"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="w-4 h-4 text-[#6246ea] bg-[#232946] border-[#3a3a4e] rounded focus:ring-[#6246ea]"
                  />
                  <label htmlFor="remember-me" className="block ml-2 text-sm text-[#b8c1ec]">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-[#6246ea] hover:text-[#b8c1ec]">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-[#3e54ac] hover:bg-[#6246ea] focus:ring-4 focus:ring-[#3e54ac] font-medium rounded-lg text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-[#b8c1ec] text-sm">Need access? </span>
              <a href="#" className="text-[#6246ea] hover:text-[#b8c1ec] text-sm font-medium">
                Contact your administrator
              </a>
            </div>
          </motion.div>
          </motion.div>
          <p className="mt-8 text-xs text-center text-[#b8c1ec]">
            DevPro Solutions Staff Management System © 2025
            <br />
            <span className="text-[#b8c1ec]">Version 2.4.1</span>
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Login;
