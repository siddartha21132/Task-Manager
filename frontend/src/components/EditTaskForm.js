import React, { useState } from 'react';
import axios from 'axios';

const EditTaskForm = ({ task, onUpdate }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/tasks/${task._id}`, { title, description, status })
      .then(response => onUpdate(response.data))
      .catch(error => console.log(error));
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <div className="mb-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            placeholder="Task Title"
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            placeholder="Task Description"
            rows="4"
          />
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            checked={status}
            onChange={() => setStatus(!status)}
            className="form-check-input"
            id="completedCheckbox"
          />
          <label className="form-check-label" htmlFor="completedCheckbox">
            Completed
          </label>
        </div>
        <button type="submit" className="btn btn-warning w-100">
          <i className="bi bi-pencil-fill"></i> Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTaskForm;
