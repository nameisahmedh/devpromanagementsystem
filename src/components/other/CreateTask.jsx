import React, { useContext, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { AuthContext } from '../../context/AuthProvider';
import { FaRegCalendarAlt } from "react-icons/fa";




const CreateTask = () => {

    const [userData,setUserData] = useContext(AuthContext);
    

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [assignTo, setAssignTo] = useState('');
    const [category, setCategory] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [dueDate, setDueDate] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        const task = {
            taskTitle,
            taskDescription,
            category,
            taskDate,
            dueDate,
            active: false,
            newTask: true,
            failed: false,
            completed: false
        };

        const data = userData;
        data.forEach(function (ele) {
            if (assignTo === ele.name) {
                if (!ele.tasks) ele.tasks = [];
                ele.tasks.push(task);
                if (!ele.taskCount) ele.taskCount = { newtask: 0 };
                ele.taskCount.newtask = ele.taskCount.newtask + 1;
            }
        });
        setUserData(data)
       

        // Clear form
        setTaskTitle('');
        setTaskDescription('');
        setAssignTo('');
        setCategory('');
        setTaskDate('');
        setDueDate('');
    };

    return (
        <div>
            <main className="w-full max-w-6xl mx-auto bg-[#232946] rounded-2xl shadow-2xl p-4 sm:p-6 md:p-10 mt-4 transition-all duration-500 animate-slideUp">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6 animate-fadeInDelay">
                            <div>
                                <label className="block text-[#cdd6f4] font-semibold mb-1">Task Title</label>
                                <input
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                    type="text"
                                    placeholder="Enter task title"
                                    className="w-full bg-[#1e1e2f] text-white rounded-md px-3 py-2 border border-[#3a3a4e] focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-[#cdd6f4] font-semibold mb-1">Description</label>
                                <textarea
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                    rows={4}
                                    placeholder="Enter task description"
                                    className="w-full bg-[#1e1e2f] text-white rounded-md px-3 py-2 border border-[#3a3a4e] resize-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-[#cdd6f4] font-semibold mb-1">Assign To</label>
                                <input
                                    value={assignTo}
                                    onChange={(e) => setAssignTo(e.target.value)}
                                    type="text"
                                    placeholder="Person's name or team"
                                    className="w-full bg-[#1e1e2f] text-white rounded-md px-3 py-2 border border-[#3a3a4e] focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-[#cdd6f4] font-semibold mb-1">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-[#1e1e2f] text-white rounded-md px-3 py-2 border border-[#3a3a4e] focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Category</option>
                                    <option value="frontend">Frontend</option>
                                    <option value="backend">Backend</option>
                                    <option value="devops">DevOps</option>
                                    <option value="design">Design</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6 animate-fadeInDelay" style={{ animationDelay: '0.2s' }}>
                            <div>
                                <label className="block text-[#cdd6f4] font-semibold mb-1">Date Assigned</label>
                                <input
                                    type="date"
                                    value={taskDate}
                                    onChange={(e) => setTaskDate(e.target.value)}
                                    className="w-full bg-[#1e1e2f] text-white rounded-md px-3 py-2 border border-[#3a3a4e] focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-[#cdd6f4] font-semibold mb-1">Date to Finish</label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full bg-[#1e1e2f] text-white rounded-md px-3 py-2 border border-[#3a3a4e] focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="pt-8">
                                <button
                                    type="submit"
                                    className="bg-[#3e54ac] hover:bg-[#6246ea] transition-all duration-300 w-full px-6 py-3 rounded-lg font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6246ea] transform hover:scale-105"
                                >
                                    Create Task
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
            {/* <AllTask/> */}
            <style>{`
                .animate-fadeInSlow {
                    animation: fadeInSlow 1s ease-out both;
                }
                .animate-slideUp {
                    animation: slideUp 0.8s ease-out both;
                }
                .animate-fadeInDelay {
                    animation: fadeInUp 0.7s ease-out both;
                }
                @keyframes fadeInSlow {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default CreateTask;
