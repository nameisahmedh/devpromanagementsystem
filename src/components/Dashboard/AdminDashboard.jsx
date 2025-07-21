import React, { useContext } from "react";
import Sidebar from "../Navigation/Sidebar";
import AllTask from "../other/AllTask";
import CreateTask from "../other/CreateTask";
import DashboardStats from "../Stats/DashboardStats";
import { AuthContext } from "../../context/AuthProvider";
import { motion } from "framer-motion";

const AdminDashboard = ({ onLogout }) => {
  const [userData, setUserData] = useContext(AuthContext);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <Sidebar userRole="admin" onLogout={onLogout} />
      
      <div className="lg:ml-64 transition-all duration-300">
        <motion.div
          className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-[#b8c1ec] text-sm sm:text-base">Manage your team and monitor progress</p>
          </div>
          
          <DashboardStats userRole="admin" />
          <CreateTask />
          <AllTask />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;