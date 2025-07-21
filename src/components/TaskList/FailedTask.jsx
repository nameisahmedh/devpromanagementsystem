import React from 'react';
import { XCircle, Clock, AlertTriangle } from 'lucide-react';

const FailedTask = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-[#232946] to-[#1a1a2e] rounded-2xl shadow-lg p-4 sm:p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-red-500/30 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-red-500/20 to-transparent rounded-bl-full"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-red-500 to-red-600 text-white">
          <AlertTriangle className="w-3 h-3" />
          {data.category}
        </span>
        <div className="flex items-center gap-1 text-[#b8c1ec] text-xs font-medium">
          <Clock className="w-3 h-3" />
          {data.taskDate}
        </div>
        <span className="text-[#b8c1ec] text-xs font-medium">{data.taskDate}</span>
      </div>
      
      <h3 className="text-white font-bold text-base sm:text-lg lg:text-xl mb-2 group-hover:text-red-300 transition-colors">
        {data.taskTitle}
      </h3>
      <p className="text-[#b8c1ec] text-sm sm:text-base mb-4 line-clamp-3">
        {data.taskDescription}
      </p>

      <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
        <span>Due: {data.dueDate}</span>
        <span className="flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-400 rounded-full">
          <XCircle className="w-3 h-3" />
          Failed
        </span>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 px-4 py-2 rounded-xl border border-red-500/30">
          <XCircle className="w-4 h-4" />
          <span className="font-semibold">Task Failed</span>
        </div>
      </div>
    </div>
  );
};

export default FailedTask;
