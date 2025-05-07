import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AllTask = () => {
  const [staffData] = useContext(AuthContext); // Destructure the context

  return (
    <div className="bg-[#232946] p-6 rounded-xl shadow-2xl mt-6 w-full max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-[#b8c1ec] mb-6 text-center">
        Employee Task Overview
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-white">
          <thead className="bg-[#1f2937] text-[#b8c1ec] uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Employee Name</th>
              <th className="px-6 py-3">New Task</th>
              <th className="px-6 py-3">Active Task</th>
              <th className="px-6 py-3">Completed</th>
              <th className="px-6 py-3">Failed</th>
            </tr>
          </thead>
          <tbody>
            {staffData?.map((emp, index) => (
              <tr
                key={index}
                className="border-b border-[#374151] hover:bg-[#3b4d69] transition duration-200"
              >
                <td className="px-6 py-3">{emp.name}</td>
                <td className="px-6 py-3 text-blue-400 hover:underline cursor-pointer">
                  {emp.taskCount?.newtask || 0}
                </td>
                <td className="px-6 py-3 text-yellow-400">
                  {emp.taskCount?.inProgress || 0}
                </td>
                <td className="px-6 py-3 text-green-400">
                  {emp.taskCount?.completed || 0}
                </td>
                <td className="px-6 py-3 text-red-500 font-semibold">
                  {emp.taskCount?.pending || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTask;
