import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/User.model.js";
import { generateAccessToken } from "../utils/token.js";
import { accessCookieOptions } from "../utils/cookies.js";

// Register user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required.");
  }

  const userExists = await User.findOne({ email });
  if (userExists) throw new ApiError(409, "User already exists.");

  const user = await User.create({
    username,
    email,
    password,
    role: role || "user"
  });

  const userObj = user.toObject();
  delete userObj.password;

  return res
    .status(201)
    .json(new ApiResponse(201, userObj, "User registered successfully."));
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new ApiError(400, "Email & password are required.");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found.");

  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw new ApiError(401, "Invalid password.");

  const payload = { id: user._id, role: user.role, username: user.username };
  const accessToken = generateAccessToken(payload);

  res.cookie("accessToken", accessToken, accessCookieOptions());

  return res.status(200).json(
    new ApiResponse(
      200,
      { id: user._id, username: user.username, role: user.role },
      "Login successful."
    )
  );
});

// Logout
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", accessCookieOptions(true));
  return res.status(200).json(new ApiResponse(200, null, "Logged out"));
});

// Get current user
const currentUser = asyncHandler(async (req, res) => {
  if (!req.user) throw new ApiError(401, "Not authenticated");

  const user = await User.findById(req.user.id).select("-password");

  return res.status(200).json(new ApiResponse(200, user, "Current user"));
});

// Admin: get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, users, "All users fetched successfully."));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  getAllUsers
};
