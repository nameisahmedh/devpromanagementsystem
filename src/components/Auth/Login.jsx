import React, { useState } from "react";


const Login = ({handleLogin}) => {
  // console.log(handleLogin)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SubmitHandler = (e) => {
    e.preventDefault();
    handleLogin(email,password)
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#232946] to-[#121629]">
      {/* Left side - Brand section */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center p-12 bg-gradient-to-br from-[#3e54ac] to-[#6246ea]">
        <div className="mb-8">
          <svg
            className="w-16 h-16 text-white"
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
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">DevPro Solutions</h1>
        <p className="text-xl text-[#b8c1ec] text-center mb-6">Staff Management System</p>
        <p className="text-[#d4d7e2] text-center max-w-md">
          Enterprise-grade solutions for development teams. Manage your team efficiently with our comprehensive suite of tools.
        </p>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 lg:p-12">
        <div className="mx-auto w-full max-w-md">
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

          <div className="bg-[#1a1a2e] shadow-2xl rounded-xl p-8 border border-[#3a3a4e]">
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
                className="w-full py-2.5 px-4 bg-[#3e54ac] hover:bg-[#6246ea] focus:ring-4 focus:ring-[#3e54ac] font-medium rounded-lg text-white transition-colors duration-200"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-[#b8c1ec] text-sm">Need access? </span>
              <a href="#" className="text-[#6246ea] hover:text-[#b8c1ec] text-sm font-medium">
                Contact your administrator
              </a>
            </div>
          </div>

          <p className="mt-8 text-xs text-center text-[#b8c1ec]">
            DevPro Solutions Staff Management System © 2025
            <br />
            <span className="text-[#b8c1ec]">Version 2.4.1</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
