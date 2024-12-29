import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.log(error));
  }, [tasks]);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleDeleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => console.log(error));
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
    setSelectedTask(null);
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Task Manager</h1>
      {selectedTask ? (
        <EditTaskForm task={selectedTask} onUpdate={handleUpdateTask} />
      ) : (
        <AddTaskForm onAdd={handleAddTask} />
      )}
      <TaskList tasks={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />
    </div>
  );
};

export default App;
