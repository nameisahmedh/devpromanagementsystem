import React from 'react';

const AcceptTask = ({ data }) => {
  return (
    <div className="bg-[#232946] rounded-2xl shadow-lg p-6 mb-6 transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl">
      
      <div className="flex items-center gap-3 mb-3">
        <span className="px-4 py-1 rounded-full text-xs font-bold tracking-wide bg-red-500 text-white">
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

      <div className="text-xs text-gray-400 mb-3">
        <p>Status: {data.completed ? "Completed" : data.failed ? "Failed" : data.active ? "In Progress" : data.newTask ? "New Task" : "Pending"}</p>
        <p>Due: {data.dueDate}</p>
      </div>

      <div className="flex gap-4">
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
          Mark as Accepted
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
          Mark as Rejected
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
