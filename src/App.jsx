import React, { useState, useEffect } from "react";
import MainBg from "./assets/hehe2.png";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");

  // Load from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const onSubmitHandle = (e) => {
    e.preventDefault();

    if (!title.trim() || !task.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      task: task.trim(),
    };

    setTasks((prev) => [...prev, newTask]);
    setTitle("");
    setTask("");
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((elem) => elem.id !== id));
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col lg:flex-row bg-cover bg-center"
      style={{ backgroundImage: `url(${MainBg})` }}
    >
      {/* ================= FORM SECTION ================= */}
      <div className="w-full lg:w-1/2 lg:border-r-2 border-white flex justify-center items-center py-12">
        <form
          onSubmit={onSubmitHandle}
          className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[80%] 
          flex flex-col gap-4 px-6 sm:px-10 py-10 
          text-white bg-[#00000091] 
          rounded-3xl backdrop-blur-md shadow-xl"
        >
          <h1 className="text-3xl sm:text-4xl font-bold">Add Task</h1>

          <input
            type="text"
            placeholder="Enter heading"
            className="border py-2 px-3 rounded text-lg sm:text-xl text-white bg-transparent outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Enter task"
            className="h-32 border py-2 px-3 rounded text-lg sm:text-xl resize-none text-white bg-transparent outline-none"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button
            type="submit"
            className="bg-white px-3 py-2 rounded 
            cursor-pointer active:scale-95 
            text-black font-bold tracking-wide 
            transition"
          >
            Add Task
          </button>
        </form>
      </div>

      {/* ================= TASK SECTION ================= */}
      <div className="w-full lg:w-1/2 px-6 sm:px-10 py-12 overflow-auto bg-[#11111198]">
        <h1 className="text-white text-3xl sm:text-4xl font-bold">
          Recent Tasks
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {tasks.map((elem) => (
            <div
              key={elem.id}
              className="h-60 rounded-2xl flex flex-col 
              justify-between p-4 
              bg-[#f5f1e6] shadow-xl 
              border border-[#00000020] 
              hover:scale-105 transition-all duration-300"
            >
              {/* Content Area */}
              <div className="flex flex-col flex-1">
                <h1 className="text-black font-bold text-lg text-center uppercase truncate">
                  {elem.title}
                </h1>

                <p
                  className="h-32 text-md text-[#272259c8] mt-3 overflow-auto "
                  style={{
                    scrollbarWidth: "none", // Firefox
                    msOverflowStyle: "none", // IE/Edge
                  }}
                >
                  {elem.task}
                </p>
              </div>

              {/* Delete Button */}
              <button
                className="bg-[#212423c5] rounded 
                text-white text-sm py-1 
                cursor-pointer hover:bg-red-600 
                transition mt-2"
                onClick={() => deleteTask(elem.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
