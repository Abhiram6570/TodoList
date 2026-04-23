import React, { useEffect, useState } from "react";

type todoTaskTypes = string[];
type inputTodoTaskType = string;

const initalTodoTask = ["Demo"];

const Dashboard = () => {
  const [todoTask, setTodoTask] = useState<todoTaskTypes>(initalTodoTask);
  const [inputTodoTask, setInputTodoTask] = useState<inputTodoTaskType>("");
  const [isEdited, setIsEdited] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ LOAD
  useEffect(() => {
    const storedData = localStorage.getItem("todoList");

    if (storedData) {
      setTodoTask(JSON.parse(storedData));
    }

    setIsLoaded(true);
  }, []);

  // ✅ SAVE
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todoList", JSON.stringify(todoTask));
    }
  }, [todoTask, isLoaded]);

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTodoTask(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputTodoTask.trim()) return;

    setTodoTask((prev) => [...prev, inputTodoTask]);
    setInputTodoTask("");
  };

  const handleEdit = (index: number) => {
    const selectedItem = todoTask[index];

    setInputTodoTask(selectedItem);
    setIsEdited(index);
  };

  const hadlerEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated = todoTask.map((item, index) => {
      if (index === isEdited) {
        return inputTodoTask;
      }
      return item;
    });

    setTodoTask(updated);
    setIsEdited(null);
    setInputTodoTask("");
  };

  const handleDelete = (deleteIndex: number) => {
    const updated = todoTask.filter((_, index) => index !== deleteIndex);
    setTodoTask(updated);

    if (isEdited === deleteIndex) {
      setIsEdited(null);
      setInputTodoTask("");
      return;
    }

    if (isEdited !== null && deleteIndex < isEdited) {
      setIsEdited(isEdited - 1);
    }
  };


  const hadlerClearTodoList = ()=>{
    localStorage.removeItem("todoList");
    setTodoTask(initalTodoTask);

  }

  return (
        <div className="min-h-screen w-full bg-gray-100 flex items-start justify-center pt-4 pb-24 px-3">
      <div className="w-full max-w-xl bg-white  p-4 sm:p-6 rounded-xl shadow-lg">
        

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">
          Todo List Tasks
        </h1>

        {/* Form */}
            <form className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter your task..."
            value={inputTodoTask}
            onChange={handlerChange}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {isEdited === null ? (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full sm:w-auto"
              onClick={handleSubmit}
            >
              Add
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition w-full sm:w-auto"
              onClick={hadlerEditSubmit}
            >
              Update
            </button>
          )}
          <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition w-full sm:w-auto"
              onClick={hadlerClearTodoList}
            >
              Clear
            </button>
        </form>

        {/* Task List */}
        <div className="space-y-3">
          {todoTask.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm w-full sm:w-auto"
            >
              <div className="flex justify-between items-center gap-2">
                <p className="text-sm text-gray-500">{index + 1}</p>
                <p className="font-medium">{item}</p>
              </div>

              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition w-full sm:w-auto"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>

                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition w-full sm:w-auto"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;