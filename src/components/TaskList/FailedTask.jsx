import React from 'react';

const FailedTask = ({ data }) => {
  return (
    <div className="bg-[#232946] rounded-2xl shadow-lg p-6 transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl">
      <div className="flex items-center gap-3 mb-3">
        <span className="px-4 py-1 rounded-full text-xs font-bold tracking-wide bg-red-600 text-white">
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

      <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95">
        Failed
      </button>
    </div>
  );
};

export default FailedTask;
