const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});


// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
const createTask = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    res.status(400);
    throw new Error("Task title is required");
  }

  if (title.trim().length < 3) {
    res.status(400);
    throw new Error("Title must be at least 3 characters long");
  }

  const task = await Task.create({ title: title.trim() });

  res.status(201).json({
    success: true,
    data: task,
  });
});



// @desc    Toggle task completed status
// @route   PATCH /api/tasks/:id
// @access  Public
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // If body provides completed explicitly, use it; otherwise toggle
  const completed =
    req.body.completed !== undefined ? req.body.completed : !task.completed;

  // Allow title update if provided
  if (req.body.title !== undefined) {
    const newTitle = req.body.title.trim();
    if (newTitle.length < 3) {
      res.status(400);
      throw new Error("Title must be at least 3 characters long");
    }
    task.title = newTitle;
  }

  task.completed = completed;
  const updatedTask = await task.save();

  res.status(200).json({
    success: true,
    data: updatedTask,
  });
});



// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    data: { id: req.params.id },
    message: "Task deleted successfully",
  });
});



module.exports = { getTasks, createTask, updateTask, deleteTask };
