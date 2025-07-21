import React, { useContext } from 'react';
import { CheckCircle, XCircle, Clock, Play } from 'lucide-react';
import { TaskContext } from '../../context/TaskContext';

const AcceptTask = ({ data, staffId, taskIndex }) => {
  const { updateTaskStatus } = useContext(TaskContext);

  const handleComplete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateTaskStatus(staffId, taskIndex, 'completed');
  };

  const handleFail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateTaskStatus(staffId, taskIndex, 'failed');
  };

  return (
    <div className="bg-gradient-to-br from-[#232946] to-[#1a1a2e] rounded-2xl shadow-lg p-4 sm:p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-[#3a3a4e] group">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <Play className="w-3 h-3" />
          {data.category}
        </span>
        <div className="flex items-center gap-1 text-[#b8c1ec] text-xs font-medium">
          <Clock className="w-3 h-3" />
          {data.taskDate}
        </div>
      </div>

      <h3 className="text-white font-bold text-base sm:text-lg lg:text-xl mb-2 group-hover:text-blue-300 transition-colors">
        {data.taskTitle}
      </h3>
      <p className="text-[#b8c1ec] text-sm sm:text-base mb-4 line-clamp-3">
        {data.taskDescription}
      </p>

      <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
        <span>Due: {data.dueDate}</span>
        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">In Progress</span>
      </div>

          onClick={handleComplete}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-500/25"
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
          <CheckCircle className="w-4 h-4" />
          Mark Complete
          onClick={handleFail}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/25"
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
          <XCircle className="w-4 h-4" />
          Mark Failed
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
