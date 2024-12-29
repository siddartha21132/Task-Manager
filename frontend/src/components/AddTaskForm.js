import React, { useState } from 'react';
import axios from 'axios';

const AddTaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      axios.post('http://localhost:5000/api/tasks', { title, description, status })
        .then(response => {
          onAdd(response.data);
          setTitle('');
          setDescription('');
        })
        .catch(error => console.log(error));
    } else {
      alert('Title is required');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Add New Task</h2>
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
        <button type="submit" className="btn btn-success w-100">
          <i className="bi bi-check-circle"></i> Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
