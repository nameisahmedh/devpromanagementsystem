import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaArrowLeft } from "react-icons/fa";
import { useApp } from '../../context/AppContext';
import { FaRegCalendarAlt } from "react-icons/fa";



const CreateTask = () => {
    const { userData, addTask, getStaffByName } = useApp();
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [assignTo, setAssignTo] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('medium');
    const [taskDate, setTaskDate] = useState('');
    const [dueDate, setDueDate] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        if (!taskTitle || !taskDescription || !assignTo || !category || !priority || !taskDate || !dueDate) {
            toast.error('Please fill in all fields');
            return;
        }

        // Validate dates
        if (new Date(dueDate) <= new Date(taskDate)) {
            toast.error('Due date must be after the assigned date');
            return;
        }

        const task = {
            taskTitle,
            taskDescription,
            category,
            priority,
            taskDate,
            dueDate,
            status: 'new'
        };

        const assignedUser = getStaffByName(assignTo);
        if (!assignedUser) {
            toast.error('User not found. Please check the name.');
            return;
        }

        addTask(assignedUser.id, task);
        
        // Clear form
        setTaskTitle('');
        setTaskDescription('');
        setAssignTo('');
        setCategory('');
        setPriority('medium');
        setTaskDate('');
        setDueDate('');
    };

    return (
        <div>
            <motion.main 
                className="w-full max-w-6xl mx-auto bg-[#232946] rounded-2xl shadow-2xl p-4 sm:p-6 md:p-10 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-4 mb-6">
                    <button
                        className="text-white hover:text-blue-400 transition duration-300 transform hover:-translate-x-1"
                        aria-label="Go Back"
                    >
                        <FaArrowLeft size={20} />
                    </button>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#b8c1ec] ">Create Task</h1>
                </div>

                <form onSubmit={submitHandler}>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[#cdd6f4] font-semibold mb-1">Task Title</label>
                                <input
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                    type="text"
                                    placeholder="Enter task title"
                                    className="w-full bg-[#1e1e2f] text-white rounded-md px-3 py-2 border border-[#3a3a4e] focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-[#cdd6f4] font-semibold mb-1">Description</label>
                                <textarea
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                    rows={4}
                                    placeholder="Enter task description"
                                    className="w-full bg-[#1e1e2f] text-white rounded-md px-3 py-2 border border-[#3a3a4e] resize-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-[#cdd6f4] font-semibold mb-1">Assign To</label>
                                <select
                                    value={assignTo}
                                    onChange={(e) => setAssignTo(e.target.value)}
                                    className="w-full bg-[#1e1e2f] text-white rounded-md px-3 py-2 border border-[#3a3a4e] focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                >
                                    <option value="">Select Staff Member</option>
                                    {userData?.map((staff) => (
                                        <option key={staff.id} value={staff.name}>
                                            {staff.name} ({staff.role})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-[#cdd6f4] font-semibold mb-1">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-[#1e1e2f] text-white rounded-md px-3 py-2 border border-[#3a3a4e] focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                >
                                    <option value="">Select Category</option>
                                    <option value="frontend">Frontend</option>
                                    <option value="backend">Backend</option>
                                    <option value="devops">DevOps</option>
                                    <option value="design">Design</option>
                                    <option value="testing">Testing</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[#cdd6f4] font-semibold mb-1">Priority</label>
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="w-full bg-[#1e1e2f] text-white rounded-md px-3 py-2 border border-[#3a3a4e] focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                >
                                    <option value="low">Low Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="high">High Priority</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-[#cdd6f4] font-semibold mb-1">Date Assigned</label>
                                <input
                                    type="date"
                                    value={taskDate}
                                    onChange={(e) => setTaskDate(e.target.value)}
                                    className="w-full bg-[#1e1e2f] text-white rounded-md px-3 py-2 border border-[#3a3a4e] focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            <div>
                                <label className="block text-[#cdd6f4] font-semibold mb-1">Date to Finish</label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full bg-[#1e1e2f] text-white rounded-md px-3 py-2 border border-[#3a3a4e] focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                    min={taskDate || new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            <div className="pt-8">
                                <motion.button
                                    type="submit"
                                    className="bg-[#3e54ac] hover:bg-[#6246ea] transition-all duration-300 w-full px-6 py-3 rounded-lg font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6246ea]"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Create Task
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </form>
            </motion.main>
        </div>
    );
}

export default CreateTask;
