const mongoose = require('mongoose');
const moment = require('moment');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: Boolean, default: false },
  created_at: { type: String, default: () => moment().format('YYYY-MM-DD HH:mm:ss') }
});



const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
