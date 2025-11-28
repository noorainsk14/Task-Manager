import mongoose from "mongoose";
import Task from "../models/Task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ADMIN: Create task
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priority, assignedTo } = req.body;

  if (!title || !assignedTo) {
    throw new ApiError(400, "Title and assigned user are required.");
  }

  const task = await Task.create({
    title,
    description,
    dueDate,
    priority,
    assignedTo,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

// USER: Get my tasks
export const getMyTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user.id });

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "My tasks fetched successfully"));
});

// ADMIN: Get all tasks
export const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().populate("assignedTo", "username email");

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "All tasks fetched successfully"));
});

// ADMIN: Update entire task
export const updateTask = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    throw new ApiError(400, "Invalid task ID");

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!task) throw new ApiError(404, "Task not found");

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});

// USER + ADMIN: Update status only
export const updateTaskStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status) throw new ApiError(400, "Status is required");

  if (!mongoose.isValidObjectId(req.params.id))
    throw new ApiError(400, "Invalid task ID");

  const task = await Task.findById(req.params.id);
  if (!task) throw new ApiError(404, "Task not found");

  // Access control
  if (task.assignedTo.toString() !== req.user.id && req.user.role !== "admin") {
    throw new ApiError(403, "Not allowed to update status of this task");
  }

  task.status = status;
  await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task status updated"));
});

// ADMIN: Delete task
export const deleteTask = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    throw new ApiError(400, "Invalid task ID");

  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) throw new ApiError(404, "Task not found");

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Task deleted successfully"));
});
