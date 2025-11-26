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

// Import routes
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";

// Import global error handler
import errorHandler from "./middlewares/errorHandler.js";

// Route declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

// Global error handler — keep this LAST
app.use(errorHandler);

export { app };
