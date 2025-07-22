import React, { useMemo } from "react";
import { Users, Activity, CheckCircle, Clock, AlertCircle } from "lucide-react";
import TaskCard from "../common/TaskCard";
import { useApp } from "../../context/AppContext";

const AllTask = ({ showDetailed = false }) => {
  const { userData, updateTaskStatus, deleteTask, getFilteredTasks } = useApp();

  const allTasks = useMemo(() => {
    if (!userData) return [];
    
    return userData.flatMap(staff => 
      staff.tasks.map(task => ({
        ...task,
        staffId: staff.id,
        staffName: staff.name,
        staffRole: staff.role
      }))
    );
  }, [userData]);

  const filteredTasks = useMemo(() => {
    return getFilteredTasks(allTasks);
  }, [allTasks, getFilteredTasks]);

  const handleStatusChange = (taskId, newStatus) => {
    const task = allTasks.find(t => t.id === taskId);
    if (task) {
      updateTaskStatus(task.staffId, taskId, newStatus);
    }
  };

  const handleDeleteTask = (taskId) => {
    const task = allTasks.find(t => t.id === taskId);
    if (task && window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.staffId, taskId);
    }
  };

  if (showDetailed) {
    return (
      <div className="bg-gradient-to-br from-[#232946] to-[#1a1a2e] p-4 sm:p-6 rounded-xl shadow-2xl border border-[#3a3a4e]">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-8 h-8 text-[#6246ea]" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            All Tasks ({filteredTasks.length})
          </h2>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-white mb-2">No tasks found</h3>
            <p className="text-[#b8c1ec]">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteTask}
                showActions={true}
                showAssignee={true}
                assigneeName={`${task.staffName} (${task.staffRole})`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#232946] to-[#1a1a2e] p-4 sm:p-6 rounded-xl shadow-2xl mt-6 w-full max-w-7xl mx-auto border border-[#3a3a4e]">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-[#6246ea]" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Employee Task Overview
        </h2>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm text-left text-white">
          <thead className="bg-gradient-to-r from-[#1f2937] to-[#374151] text-[#b8c1ec] uppercase text-xs">
            <tr>
              <th className="px-6 py-4 font-semibold">Employee</th>
              <th className="px-6 py-4 font-semibold text-center">New Tasks</th>
              <th className="px-6 py-4 font-semibold text-center">In Progress</th>
              <th className="px-6 py-4 font-semibold text-center">Completed</th>
              <th className="px-6 py-4 font-semibold text-center">Failed</th>
              <th className="px-6 py-4 font-semibold text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((emp, index) => (
              <tr
                key={index}
                className="border-b border-[#374151] hover:bg-[#3b4d69] transition duration-200"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#6246ea] to-[#3e54ac] rounded-full flex items-center justify-center text-white font-bold">
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{emp.name}</div>
                      <div className="text-xs text-[#b8c1ec] capitalize">{emp.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">
                    <AlertCircle className="w-3 h-3" />
                    {emp.taskCount?.newtask || 0}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold">
                    <Activity className="w-3 h-3" />
                    {emp.taskCount?.inProgress || 0}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                    <CheckCircle className="w-3 h-3" />
                    {emp.taskCount?.completed || 0}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-500 rounded-full text-sm font-semibold">
                    <Clock className="w-3 h-3" />
                    {emp.taskCount?.pending || 0}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full text-sm font-semibold">
                    {emp.taskCount?.total || 0}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {userData?.map((emp, index) => (
          <div
            key={index}
            className="bg-[#1a1a2e] rounded-lg p-4 border border-[#3a3a4e]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#6246ea] to-[#3e54ac] rounded-full flex items-center justify-center text-white font-bold">
                {emp.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-white">{emp.name}</div>
                <div className="text-sm text-[#b8c1ec] capitalize">{emp.role}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-lg font-bold">{emp.taskCount?.newtask || 0}</span>
                </div>
                <div className="text-xs text-[#b8c1ec]">New</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
                  <Activity className="w-4 h-4" />
                  <span className="text-lg font-bold">{emp.taskCount?.inProgress || 0}</span>
                </div>
                <div className="text-xs text-[#b8c1ec]">In Progress</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-lg font-bold">{emp.taskCount?.completed || 0}</span>
                </div>
                <div className="text-xs text-[#b8c1ec]">Completed</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-red-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-lg font-bold">{emp.taskCount?.pending || 0}</span>
                </div>
                <div className="text-xs text-[#b8c1ec]">Failed</div>
              </div>
              
              <div className="text-center sm:col-span-1 col-span-2">
                <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                  <span className="text-lg font-bold">{emp.taskCount?.total || 0}</span>
                </div>
                <div className="text-xs text-[#b8c1ec]">Total</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;
