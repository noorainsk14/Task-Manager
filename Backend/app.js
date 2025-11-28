import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// Parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// PUBLIC health check route for Render
app.get("/", (req, res) => {
  res.status(200).send("Backend is running");
});

// Import routes
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";

// Route declaration
app.use("/api/v1/users", userRouter); // public + protected
app.use("/api/v1/tasks", taskRouter); // protected inside router

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler — keep this LAST
import errorHandler from "./middlewares/errorHandler.js";
app.use(errorHandler);

export { app };
