import React, { useContext } from "react";
import Header from "../other/Header";
import AllTask from "../other/AllTask";
import CreateTask from "../other/CreateTask";
import { AuthContext } from "../../context/AuthProvider";

const AdminDashboard = ({ onLogout }) => {
  const [userData, setUserData] = useContext(AuthContext);
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-4 sm:px-6 md:px-10 py-4 md:py-8 animate-fadeInSlow">
      

      <Header onLogout={onLogout}/>

      <CreateTask/>
      <AllTask/>
    </div>
  );
};

export default AdminDashboard;