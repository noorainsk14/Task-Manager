import express from "express";
import {
  createTask,
  getMyTasks,
  getAllTasks,
  updateTask,
  updateTaskStatus,
  deleteTask
} from "../controllers/task.controller.js";

import {verifyAccessToken} from "../middlewares/verifyAccessToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

import {
  createTaskValidator,
  updateTaskValidator
} from "../validators/taskValidators.js";

import validationErrorHandler from "../middlewares/validationErrorHandler.js";

const router = express.Router();

// Admin: create task
router.post(
  "/",
  verifyAccessToken,
  authorizeRoles("admin"),
  createTaskValidator,
  validationErrorHandler,
  createTask
);

// Admin: get all tasks
router.get(
  "/",
  verifyAccessToken,
  authorizeRoles("admin"),
  getAllTasks
);

// User: get only his tasks
router.get(
  "/my",
  verifyAccessToken,
  getMyTasks
);

// Admin: update full task (title, priority, etc)
router.put(
  "/:id",
  verifyAccessToken,
  authorizeRoles("admin"),
  updateTaskValidator,
  validationErrorHandler,
  updateTask
);

// User/Admin: update only status
router.patch(
  "/:id/status",
  verifyAccessToken,
  updateTaskStatus
);

// Admin: delete task
router.delete(
  "/:id",
  verifyAccessToken,
  authorizeRoles("admin"),
  deleteTask
);

export default router;
