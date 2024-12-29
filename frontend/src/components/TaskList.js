import React from 'react';

const TaskList = ({ tasks, onDelete, onEdit }) => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Task List</h2>

      {/* Pending Tasks Section */}
      <div className="pending-tasks mb-5">
        <h3 className="text-danger">Pending Tasks</h3>
        <div className="row">
          {tasks
            .filter((task) => !task.status) // Filter for pending tasks
            .map((task) => (
              <div key={task._id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <p className="card-text">Created: {task.created_at}</p>
                    <button className="btn btn-danger">Status: Pending</button> {/* Red button for Pending */}
                    <div className="d-flex justify-content-between mt-3">
                      <button className="btn btn-primary" onClick={() => onEdit(task)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => onDelete(task._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Completed Tasks Section */}
      <div className="completed-tasks">
        <h3 className="text-success">Completed Tasks</h3>
        <div className="row">
          {tasks
            .filter((task) => task.status) // Filter for completed tasks
            .map((task) => (
              <div key={task._id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <p className="card-text">Created: {task.created_at}</p>
                    <button className="btn btn-success">Status: Completed</button> {/* Green button for Completed */}
                    <div className="d-flex justify-content-between mt-3">
                      <button className="btn btn-primary" onClick={() => onEdit(task)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => onDelete(task._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
