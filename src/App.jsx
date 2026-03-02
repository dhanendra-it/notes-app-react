import React, { useState } from "react";
import BG from './assets/notes-background.jpg'

const App = () => {
  const [tasks , setTasks] = useState([])
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");

  const onSubmitHandle = (e) => {
    e.preventDefault();
    
    const copyTasks = [...tasks]

    copyTasks.push({title,task})
    setTasks(copyTasks)

    setTitle("");
    setTask("");
  };
  const deleteTask = (idx) => {
    // console.log(idx);
    
    const copyTasks = [...tasks]
    copyTasks.splice(idx,1)
    setTasks(copyTasks);
  }

  return (
    <div className="bg-black min:h-screen w-full lg:flex">
      <div className=" w-full lg:border-r-2 border-white">
        <form
          className="flex flex-col gap-4  pt-20 px-20 text-white "
          onSubmit={(e) => {
            onSubmitHandle(e);
          }}
        >
          <h1 className="text-white text-4xl font-bold  ">Add task</h1>
          <input
            type="text"
            placeholder="enter heading"
            className="border py-2 px-3 rounded text-xl"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            type="text"
            placeholder="enter task"
            className="h-32 border py-2 px-3 rounded text-xl resize-none"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
          <button
            type="submit"
            className="bg-white px-3 py-2 rounded cursor-pointer active:scale-98 text-black font-bold tracking-wide"
          >
            Add task
          </button>
        </form>
      </div>
      <div className=" w-full px-10 py-20 overflow-auto">
        <h1 className="text-white text-4xl font-bold  ">Recent task</h1>
        <div className=" flex gap-4 flex-wrap mt-6">
          {tasks.map((elem,idx) =>(
            <div key={idx}
           className="bg-cover h-50 w-40 rounded-xl flex flex-col justify-between px-3 py-1 pt-2"
            style={{ backgroundImage: `url(${BG})` }}
          >
            <div>
              <h1 className="text-black font-bold text-2xl tracking-tighter uppercase">{elem.title}</h1>
              <p className="h-30 tracking-tight text-sm text-gray-600 pt-3 leading-4.5 overflow-scroll" style={{ scrollbarWidth: "none" }}>{elem.task}</p>
            </div>
            <button className="bg-red-500 rounded text-white text-sm py-0.5 cursor-pointer" onClick={()=>deleteTask(idx)}>Delete</button>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
