import React, { useEffect, useState } from 'react';
import { Plus, CheckCircle, Clock, Activity } from 'lucide-react';

const AnimatedCount = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    if (start === end) return;
    let incrementTime = 30;
    let step = Math.ceil(end / 30);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
};

const TaskListCount = ({data}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 my-6 w-full max-w-7xl mx-auto px-2">
      {/* New Tasks */}
      <div className="tech-card group w-full">
        <Plus className="text-blue-400 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-2 animate-float" />
        <span className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">
          <AnimatedCount target={data.taskCount.newtask} />
        </span>
        <span className="text-[#b8c1ec] text-xs sm:text-sm lg:text-base mt-1">New</span>
      </div>
      {/* Completed Tasks */}
      <div className="tech-card group w-full">
        <CheckCircle className="text-green-400 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-2 animate-bounce-slow" />
        <span className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">
          <AnimatedCount target={data.taskCount.completed} />
        </span>
        <span className="text-[#b8c1ec] text-xs sm:text-sm lg:text-base mt-1">Completed</span>
      </div>
      {/* Pending Tasks */}
      <div className="tech-card group w-full">
        <Clock className="text-yellow-300 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-2 animate-pulse-slow" />
        <span className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">
          <AnimatedCount target={data.taskCount.pending} />
        </span>
        <span className="text-[#b8c1ec] text-xs sm:text-sm lg:text-base mt-1">Pending</span>
      </div>
      {/* In Progress */}
      <div className="tech-card group w-full">
        <Activity className="text-purple-400 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-2 animate-spin-slow" />
        <span className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">
          <AnimatedCount target={data.taskCount.inProgress} />
        </span>
        <span className="text-[#b8c1ec] text-xs sm:text-sm lg:text-base mt-1">In Progress</span>
      </div>
      <style>{`
        .tech-card {
          background: linear-gradient(135deg, #232946 80%, #283e51 100%);
          border-radius: 1rem;
          box-shadow: 0 4px 32px 0 rgba(44, 62, 80, 0.15);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s;
          opacity: 0;
          transform: translateY(30px) scale(0.98);
          animation: fadeInUp 0.8s forwards;
          border: 1px solid rgba(98, 70, 234, 0.1);
        }
        @media (min-width: 640px) {
          .tech-card {
            padding: 1.5rem;
          }
        }
        @media (min-width: 1024px) {
          .tech-card {
            padding: 2rem;
          }
        }
        .tech-card:nth-child(1) { animation-delay: 0.05s; }
        .tech-card:nth-child(2) { animation-delay: 0.15s; }
        .tech-card:nth-child(3) { animation-delay: 0.25s; }
        .tech-card:nth-child(4) { animation-delay: 0.35s; }
        .tech-card:hover, .tech-card:focus-within {
          transform: scale(1.035) translateY(-2px);
          box-shadow: 0 8px 32px 0 rgba(98, 70, 234, 0.18), 0 1.5px 8px rgba(44, 62, 80, 0.18);
          z-index: 1;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px) scale(0.98);}
          to { opacity: 1; transform: translateY(0) scale(1);}
        }
        .animate-spin-slow {
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        .animate-bounce-slow {
          animation: bounce 2.2s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0);}
          20% { transform: translateY(-8px);}
          40% { transform: translateY(0);}
        }
        .animate-pulse-slow {
          animation: pulse 1.7s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1;}
          50% { opacity: 0.6;}
        }
        .animate-float {
          animation: float 2.4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-10px);}
        }
      `}</style>
    </div>
  );
};

export default TaskListCount;
