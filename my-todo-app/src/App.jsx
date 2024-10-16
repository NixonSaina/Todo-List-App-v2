import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);


  // Save tasks and update completed tasks whenever the tasks array changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    const totalCompleted = tasks.filter((task) => task.completed).length;
    setCompletedTasks(totalCompleted);
  }, [tasks]);

  // Persist task input fields in localStorage as they change
  useEffect(() => {
    localStorage.setItem("task", task);
    localStorage.setItem("dueDate", dueDate);
    localStorage.setItem("priority", priority);
  }, [task, dueDate, priority]);

  const handleAddTask = () => {
    if (!task.trim()) return;  // Avoid adding empty tasks
    const newTask = {
      id: Date.now(),
      text: task,
      dueDate,
      priority,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTask("");  // Clear input fields
    setDueDate("");
    setPriority("low");
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setTask(taskToEdit.text);
    setDueDate(taskToEdit.dueDate);
    setPriority(taskToEdit.priority);
    setTasks(tasks.filter((task) => task.id !== taskId));  // Remove old task for editing
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const totalTasks = tasks.length;
  const completionPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  const renderTasksByPriority = (priorityLevel, color) => {
    return tasks
      .filter((task) => task.priority === priorityLevel)
      .map((task) => (
        <div key={task.id} className={`task ${task.completed ? "completed" : ""}`} style={{ backgroundColor: color }}>
          <div className="task-details">
            <span>{task.text}</span> | Due: {task.dueDate}
          </div>
          <div className="task-buttons">
            <button onClick={() => handleCompleteTask(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => handleEditTask(task.id)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        </div>
      ));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="input-section">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${completionPercentage}%` }}>
          {Math.floor(completionPercentage)}%
        </div>
      </div>

      <div className="task-columns">
        <div className="column">
          <h2>High Priority</h2>
          {renderTasksByPriority("high", "red")}
        </div>
        <div className="column">
          <h2>Medium Priority</h2>
          {renderTasksByPriority("medium", "blue")}
        </div>
        <div className="column">
          <h2>Low Priority</h2>
          {renderTasksByPriority("low", "yellow")}
        </div>
      </div>
    </div>
  );
}

export default App;
