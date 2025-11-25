import express from "express";
import { currentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import {verifyAccessToken} from "../middlewares/verifyAccessToken.js";

import {
  registerValidator,
  loginValidator
} from "../validators/authValidators.js";

import validationErrorHandler from "../middlewares/validationErrorHandler.js";

const router = express.Router();

// Register
router.post(
  "/register",
  registerValidator,
  validationErrorHandler,
  registerUser
);

// Login
router.post(
  "/login",
  loginValidator,
  validationErrorHandler,
  loginUser
);

router.post("/logout", verifyAccessToken, logoutUser);

// Get current logged-in user
router.get("/current-user", verifyAccessToken, currentUser);

export default router;
