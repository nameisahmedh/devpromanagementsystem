import React from 'react';
import { Clock, Calendar, AlertTriangle, CheckCircle, XCircle, Play, User } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskCard = ({ 
  task, 
  onStatusChange, 
  showActions = true, 
  showAssignee = false,
  assigneeName = '',
  onDelete = null 
}) => {
  const getStatusConfig = (status) => {
    const configs = {
      'new': {
        color: 'border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-600/5',
        badge: 'bg-blue-500 text-white',
        icon: AlertTriangle,
        actions: [
          { label: 'Start Task', status: 'in-progress', color: 'bg-green-500 hover:bg-green-600', icon: Play }
        ]
      },
      'in-progress': {
        color: 'border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5',
        badge: 'bg-yellow-500 text-white',
        icon: Play,
        actions: [
          { label: 'Complete', status: 'completed', color: 'bg-green-500 hover:bg-green-600', icon: CheckCircle },
          { label: 'Mark Failed', status: 'failed', color: 'bg-red-500 hover:bg-red-600', icon: XCircle }
        ]
      },
      'completed': {
        color: 'border-green-500/30 bg-gradient-to-br from-green-500/10 to-green-600/5',
        badge: 'bg-green-500 text-white',
        icon: CheckCircle,
        actions: []
      },
      'failed': {
        color: 'border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-600/5',
        badge: 'bg-red-500 text-white',
        icon: XCircle,
        actions: [
          { label: 'Retry', status: 'new', color: 'bg-blue-500 hover:bg-blue-600', icon: AlertTriangle }
        ]
      }
    };
    return configs[status] || configs['new'];
  };

  const config = getStatusConfig(task.status);
  const StatusIcon = config.icon;
  const isOverdue = task.isOverdue && !task.completed;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'text-red-400',
      'medium': 'text-yellow-400',
      'low': 'text-green-400'
    };
    return colors[priority] || 'text-gray-400';
  };

  return (
    <motion.div
      className={`rounded-xl p-4 sm:p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${config.color} ${
        isOverdue ? 'ring-2 ring-red-500/50' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${config.badge}`}>
            <StatusIcon className="w-3 h-3" />
            {task.status.replace('-', ' ').toUpperCase()}
          </span>
          <span className="px-2 py-1 bg-[#3a3a4e] text-[#b8c1ec] rounded-full text-xs font-medium capitalize">
            {task.category}
          </span>
          {task.priority && (
            <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority.toUpperCase()} PRIORITY
            </span>
          )}
          {isOverdue && (
            <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold animate-pulse">
              OVERDUE
            </span>
          )}
        </div>
        
        {onDelete && (
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-400 hover:text-red-300 transition-colors p-1"
            title="Delete task"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Task Content */}
      <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
        {task.taskTitle}
      </h3>
      
      <p className="text-[#b8c1ec] text-sm mb-4 line-clamp-3">
        {task.taskDescription}
      </p>

      {/* Assignee */}
      {showAssignee && assigneeName && (
        <div className="flex items-center gap-2 mb-3">
          <User className="w-4 h-4 text-[#b8c1ec]" />
          <span className="text-[#b8c1ec] text-sm">Assigned to: {assigneeName}</span>
        </div>
      )}

      {/* Dates */}
      <div className="flex items-center justify-between text-xs text-[#b8c1ec] mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>Created: {formatDate(task.taskDate)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span className={isOverdue ? 'text-red-400 font-bold' : ''}>
            Due: {formatDate(task.dueDate)}
          </span>
        </div>
      </div>

      {/* Actions */}
      {showActions && config.actions.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {config.actions.map((action, index) => {
            const ActionIcon = action.icon;
            return (
              <button
                key={index}
                onClick={() => onStatusChange(task.id, action.status)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${action.color} text-white shadow-lg flex-1 justify-center`}
              >
                <ActionIcon className="w-4 h-4" />
                {action.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Progress indicator for completed tasks */}
      {task.status === 'completed' && (
        <div className="mt-4 flex items-center gap-2 text-green-400">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Task completed successfully!</span>
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;