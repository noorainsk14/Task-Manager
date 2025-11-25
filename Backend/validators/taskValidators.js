import { body } from "express-validator";

export const createTaskValidator = [
  body("title").notEmpty().withMessage("Title is required"),

  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Invalid status"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),

  body("assignedTo").notEmpty().withMessage("assignedTo is required"),
];

export const updateTaskValidator = [
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Invalid status"),

  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
];
