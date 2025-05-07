import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";


const TaskList = ({data}) => {
  // console.log(data)
  return (
    <div className="w-full max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-3xl font-extrabold text-white mb-8 text-center md:text-left">
        Task List
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.tasks.map((ele,idx )=>{
          
          if(ele.active){
            return <AcceptTask key = {idx} data = {ele}/>
          }
          if(ele.completed){
            return <CompleteTask key = {idx} data = {ele}/>
          }
          if(ele.failed){
            return <FailedTask key = {idx} data = {ele}/>
          }
          if(ele.newTask){
            return <NewTask key = {idx} data = {ele}/>
          }
        })}
      </div>
    </div>
  );
};

export default TaskList;
