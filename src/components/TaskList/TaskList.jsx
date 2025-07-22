import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TaskCard from "../common/TaskCard";
import { useApp } from "../../context/AppContext";

const TaskList = ({ data, darkMode = true }) => {
  const { updateTaskStatus } = useApp();

  const handleStatusChange = (taskId, newStatus) => {
    updateTaskStatus(data.id, taskId, newStatus);
  };

  const titleClass = darkMode ? 'text-white' : 'text-gray-900';
  const subtitleClass = darkMode ? 'text-[#b8c1ec]' : 'text-gray-600';

  return (
    <motion.div
      className="w-full max-w-7xl mx-auto mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${titleClass}`}>
        Your Tasks ({data.tasks.length})
      </h2>
      
      {data.tasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className={`text-xl font-semibold mb-2 ${titleClass}`}>No tasks assigned yet</h3>
          <p className={subtitleClass}>Your tasks will appear here once they're assigned by your admin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.tasks.map((task, idx) => (
            <motion.div
              key={task.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -2 }}
            >
              <Link to={`/staff/tasks/${task.id || idx}`} className="block">
                <TaskCard
                  task={task}
                  onStatusChange={handleStatusChange}
                  showActions={true}
                  darkMode={darkMode}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TaskList;