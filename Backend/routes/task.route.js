import express from "express";
import {
  createTask,
  getMyTasks,
  getAllTasks,
  updateTask,
  updateTaskStatus,
  deleteTask
} from "../controllers/task.controller.js";

import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

import {
  createTaskValidator,
  updateTaskValidator
} from "../validators/taskValidators.js";

import validationErrorHandler from "../middlewares/validationErrorHandler.js";

const router = express.Router();

/* ---------------------------------------------------------
   PUBLIC HEALTH CHECK ROUTE
   (Prevents Render from hitting protected admin routes)
--------------------------------------------------------- */
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task API running"
  });
});

/* ---------------------------------------------------------
   ADMIN ROUTES
--------------------------------------------------------- */

// Admin: create task
router.post(
  "/",
  verifyAccessToken,
  authorizeRoles("admin"),
  createTaskValidator,
  validationErrorHandler,
  createTask
);

// Admin: get all tasks (changed from "/" → "/all")
router.get(
  "/all",
  verifyAccessToken,
  authorizeRoles("admin"),
  getAllTasks
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

// Admin: delete task
router.delete(
  "/:id",
  verifyAccessToken,
  authorizeRoles("admin"),
  deleteTask
);

/* ---------------------------------------------------------
   USER ROUTES
--------------------------------------------------------- */

// User: get only his tasks
router.get(
  "/my",
  verifyAccessToken,
  getMyTasks
);

// User/Admin: update only status
router.patch(
  "/:id/status",
  verifyAccessToken,
  updateTaskStatus
);

export default router;
