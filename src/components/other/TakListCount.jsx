import React, { useEffect, useState } from 'react';
import { Plus, CheckCircle, Clock, Activity } from 'lucide-react';

const AnimatedCount = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target) || 0;
    if (start === end) return;
    
    const duration = 1000;
    const increment = end / (duration / 50);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
};

const TaskListCount = ({ data, darkMode = true }) => {
  // Calculate task counts from actual task data
  const taskCounts = {
    newtask: data?.tasks?.filter(task => task.status === 'new').length || 0,
    inProgress: data?.tasks?.filter(task => task.status === 'in-progress').length || 0,
    completed: data?.tasks?.filter(task => task.status === 'completed').length || 0,
    failed: data?.tasks?.filter(task => task.status === 'failed').length || 0,
  };

  const cardClass = `
    ${darkMode 
      ? 'bg-gradient-to-br from-[#232946] to-[#1a1a2e] border-[#3a3a4e]' 
      : 'bg-white border-gray-200 shadow-sm'
    }
    rounded-xl p-4 sm:p-6 border transition-all duration-300 hover:scale-105 hover:shadow-lg
    flex flex-col items-center text-center
  `;

  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const subtextClass = darkMode ? 'text-[#b8c1ec]' : 'text-gray-600';

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* New Tasks */}
      <div className={cardClass}>
        <Plus className="text-blue-500 w-8 h-8 mb-3" />
        <span className={`text-2xl font-bold ${textClass} mb-1`}>
          <AnimatedCount target={taskCounts.newtask} />
        </span>
        <span className={`text-sm ${subtextClass}`}>New Tasks</span>
      </div>

      {/* In Progress */}
      <div className={cardClass}>
        <Activity className="text-yellow-500 w-8 h-8 mb-3" />
        <span className={`text-2xl font-bold ${textClass} mb-1`}>
          <AnimatedCount target={taskCounts.inProgress} />
        </span>
        <span className={`text-sm ${subtextClass}`}>In Progress</span>
      </div>

      {/* Completed */}
      <div className={cardClass}>
        <CheckCircle className="text-green-500 w-8 h-8 mb-3" />
        <span className={`text-2xl font-bold ${textClass} mb-1`}>
          <AnimatedCount target={taskCounts.completed} />
        </span>
        <span className={`text-sm ${subtextClass}`}>Completed</span>
      </div>

      {/* Failed */}
      <div className={cardClass}>
        <Clock className="text-red-500 w-8 h-8 mb-3" />
        <span className={`text-2xl font-bold ${textClass} mb-1`}>
          <AnimatedCount target={taskCounts.failed} />
        </span>
        <span className={`text-sm ${subtextClass}`}>Failed</span>
      </div>
    </div>
  );
};

export default TaskListCount;