const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// GET all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new task
router.post('/tasks', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a task
router.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.status = req.body.status || task.status;
      await task.save();
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
        await Task.deleteOne({ _id: req.params.id });
      res.json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
