import React, { useState, useEffect } from "react";
import BG from "./assets/notes-background.jpg";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");

  // Load tasks from localStorage on first render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const onSubmitHandle = (e) => {
    e.preventDefault();

    // Prevent empty submission
    if (!title.trim() || !task.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      task: task.trim(),
    };

    // Functional update (best practice)
    setTasks((prev) => [...prev, newTask]);

    setTitle("");
    setTask("");
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((elem) => elem.id !== id));
  };

  return (
    <div className="bg-black min-h-screen w-full lg:flex">
      {/* Form Section */}
      <div className="w-full lg:border-r-2 border-white">
        <form
          className="flex flex-col gap-4 pt-20 px-20 text-white"
          onSubmit={onSubmitHandle}
        >
          <h1 className="text-4xl font-bold">Add Task</h1>

          <input
            type="text"
            placeholder="Enter heading"
            className="border py-2 px-3 rounded text-xl text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Enter task"
            className="h-32 border py-2 px-3 rounded text-xl resize-none text-black"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button
            type="submit"
            className="bg-white px-3 py-2 rounded cursor-pointer active:scale-95 text-black font-bold tracking-wide"
          >
            Add Task
          </button>
        </form>
      </div>

      {/* Tasks Section */}
      <div className="w-full px-10 py-20 overflow-auto">
        <h1 className="text-white text-4xl font-bold">Recent Tasks</h1>

        <div className="flex gap-4 flex-wrap mt-6">
          {tasks.map((elem) => (
            <div
              key={elem.id}
              className="bg-cover h-52 w-44 rounded-xl flex flex-col justify-between px-3 py-2 shadow-lg"
              style={{ backgroundImage: `url(${BG})` }}
            >
              <div>
                <h1 className="text-black font-bold text-lg uppercase truncate">
                  {elem.title}
                </h1>

                <p className="text-sm text-gray-700 mt-3 line-clamp-4">
                  {elem.task}
                </p>
              </div>

              <button
                className="bg-red-500 rounded text-white text-sm py-1 cursor-pointer hover:bg-red-600 transition"
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