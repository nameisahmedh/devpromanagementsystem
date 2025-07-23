import React, { useMemo } from "react";
import { Users, Activity, CheckCircle, Clock, AlertCircle, TrendingUp } from "lucide-react";
import TaskCard from "../common/TaskCard";
import { useApp } from "../../context/AppContext";
import { motion } from "framer-motion";

const AllTask = ({ showDetailed = false, showSummary = false, darkMode = true }) => {
  const { userData, updateTaskStatus, deleteTask, getFilteredTasks, getTaskStats } = useApp();

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

  const taskStats = getTaskStats();

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

  // Calculate task counts for each employee
  const employeeStats = useMemo(() => {
    return userData?.map(emp => {
      const tasks = emp.tasks || [];
      return {
        ...emp,
        taskCount: {
          total: tasks.length,
          new: tasks.filter(task => task.status === 'new').length,
          inProgress: tasks.filter(task => task.status === 'in-progress').length,
          completed: tasks.filter(task => task.status === 'completed').length,
          failed: tasks.filter(task => task.status === 'failed').length
        }
      };
    }) || [];
  }, [userData]);

  const containerClass = `
    ${darkMode 
      ? 'bg-gradient-to-br from-[#232946] to-[#1a1a2e] border-[#3a3a4e]' 
      : 'bg-white border-gray-200 shadow-sm'
    }
    rounded-xl p-4 sm:p-6 shadow-lg border
  `;

  const titleClass = darkMode ? 'text-white' : 'text-gray-900';
  const subtitleClass = darkMode ? 'text-[#b8c1ec]' : 'text-gray-600';

  if (showSummary) {
    return (
      <div className={containerClass}>
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-8 h-8 text-[#6246ea]" />
          <h2 className={`text-2xl font-bold ${titleClass}`}>
            Team Overview
          </h2>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#1a1a2e]' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className={`text-sm ${subtitleClass}`}>Total Staff</span>
            </div>
            <div className={`text-2xl font-bold ${titleClass}`}>{userData?.length || 0}</div>
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#1a1a2e]' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-yellow-400" />
              <span className={`text-sm ${subtitleClass}`}>Active Tasks</span>
            </div>
            <div className={`text-2xl font-bold ${titleClass}`}>{taskStats.inProgress}</div>
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#1a1a2e]' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className={`text-sm ${subtitleClass}`}>Completed</span>
            </div>
            <div className={`text-2xl font-bold ${titleClass}`}>{taskStats.completed}</div>
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#1a1a2e]' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className={`text-sm ${subtitleClass}`}>Overdue</span>
            </div>
            <div className={`text-2xl font-bold ${titleClass}`}>{taskStats.overdue}</div>
          </div>
        </div>

        {/* Top Performers */}
        <div>
          <h3 className={`text-lg font-semibold mb-4 ${titleClass}`}>Top Performers</h3>
          <div className="space-y-3">
            {employeeStats
              .sort((a, b) => b.taskCount.completed - a.taskCount.completed)
              .slice(0, 3)
              .map((emp, index) => (
                <motion.div
                  key={emp.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    darkMode ? 'bg-[#1a1a2e]' : 'bg-gray-50'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#6246ea] to-[#3e54ac] rounded-full flex items-center justify-center text-white font-bold">
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <div className={`font-semibold ${titleClass}`}>{emp.name}</div>
                      <div className={`text-sm capitalize ${subtitleClass}`}>{emp.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${titleClass}`}>{emp.taskCount.completed}</div>
                    <div className={`text-sm ${subtitleClass}`}>completed</div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  if (showDetailed) {
    return (
      <div className={containerClass}>
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-8 h-8 text-[#6246ea]" />
          <h2 className={`text-2xl sm:text-3xl font-bold ${titleClass}`}>
            All Tasks ({filteredTasks.length})
          </h2>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className={`text-xl font-semibold mb-2 ${titleClass}`}>No tasks found</h3>
            <p className={subtitleClass}>Try adjusting your search or filter criteria.</p>
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
                darkMode={darkMode}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-[#6246ea]" />
        <h2 className={`text-2xl sm:text-3xl font-bold ${titleClass}`}>
          Employee Task Overview
        </h2>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className={`${darkMode ? 'bg-gradient-to-r from-[#1f2937] to-[#374151] text-[#b8c1ec]' : 'bg-gray-100 text-gray-700'} uppercase text-xs`}>
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
            {employeeStats.map((emp, index) => (
              <motion.tr
                key={emp.id}
                className={`border-b transition duration-200 ${
                  darkMode 
                    ? 'border-[#374151] hover:bg-[#3b4d69] text-white' 
                    : 'border-gray-200 hover:bg-gray-50 text-gray-900'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#6246ea] to-[#3e54ac] rounded-full flex items-center justify-center text-white font-bold">
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{emp.name}</div>
                      <div className={`text-xs capitalize ${subtitleClass}`}>{emp.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">
                    <AlertCircle className="w-3 h-3" />
                    {emp.taskCount.new}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold">
                    <Activity className="w-3 h-3" />
                    {emp.taskCount.inProgress}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                    <CheckCircle className="w-3 h-3" />
                    {emp.taskCount.completed}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-500 rounded-full text-sm font-semibold">
                    <Clock className="w-3 h-3" />
                    {emp.taskCount.failed}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full text-sm font-semibold">
                    {emp.taskCount.total}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {employeeStats.map((emp, index) => (
          <motion.div
            key={emp.id}
            className={`rounded-lg p-4 border ${
              darkMode 
                ? 'bg-[#1a1a2e] border-[#3a3a4e]' 
                : 'bg-gray-50 border-gray-200'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#6246ea] to-[#3e54ac] rounded-full flex items-center justify-center text-white font-bold">
                {emp.name.charAt(0)}
              </div>
              <div>
                <div className={`font-semibold ${titleClass}`}>{emp.name}</div>
                <div className={`text-sm capitalize ${subtitleClass}`}>{emp.role}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-lg font-bold">{emp.taskCount.new}</span>
                </div>
                <div className={`text-xs ${subtitleClass}`}>New</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
                  <Activity className="w-4 h-4" />
                  <span className="text-lg font-bold">{emp.taskCount.inProgress}</span>
                </div>
                <div className={`text-xs ${subtitleClass}`}>In Progress</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-lg font-bold">{emp.taskCount.completed}</span>
                </div>
                <div className={`text-xs ${subtitleClass}`}>Completed</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-red-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-lg font-bold">{emp.taskCount.failed}</span>
                </div>
                <div className={`text-xs ${subtitleClass}`}>Failed</div>
              </div>
              
              <div className="text-center sm:col-span-1 col-span-2">
                <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                  <span className="text-lg font-bold">{emp.taskCount.total}</span>
                </div>
                <div className={`text-xs ${subtitleClass}`}>Total</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;