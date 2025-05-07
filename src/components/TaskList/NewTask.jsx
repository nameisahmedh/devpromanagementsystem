import React from 'react';

const NewTask = ({ data }) => {
  return (
    <div className="bg-[#232946] rounded-2xl shadow-lg p-6 transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl">
      <div className="flex items-center gap-3 mb-3">
        <span className="px-4 py-1 rounded-full text-xs font-bold tracking-wide bg-yellow-400 text-gray-900">
          {data.category}
        </span>
        <span className="text-[#b8c1ec] text-xs font-medium">{data.taskDate}</span>
      </div>
      <h3 className="text-white font-bold text-lg md:text-xl mb-2">
        {data.taskTitle}
      </h3>
      <p className="text-[#b8c1ec] text-sm md:text-base mb-4">
        {data.taskDescription}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95">
          Accept Task
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95">
          Reject Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
