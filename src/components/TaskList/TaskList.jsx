import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";


const TaskList = ({data}) => {
  return (
    <motion.div 
      className="w-full max-w-6xl mx-auto mt-8 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-extrabold text-white mb-8 text-center md:text-left">
        Task List
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.tasks.map((ele, idx) => {
          const taskComponent = (() => {
          if(ele.active){
            return <AcceptTask key={idx} data={ele} />
          }
          if(ele.completed){
            return <CompleteTask key={idx} data={ele} />
          }
          if(ele.failed){
            return <FailedTask key={idx} data={ele} />
          }
          if(ele.newTask){
            return <NewTask key={idx} data={ele} />
          }
          })();

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link to={`/staff/tasks/${idx}`} className="block">
                {taskComponent}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TaskList;
