import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

// Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import Dashboard from "../pages/Admin/Dashboard";
import CreateTask from "../pages/Admin/CreateTask";
import AdminTasks from "../pages/Tasks/AdminTasks";
import MyTasks from "../pages/Tasks/MyTasks";
import UpdateTask from "@/pages/Admin/UpdateTask";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Tasks */}
      <Route
        path="/tasks/my"
        element={
          <ProtectedRoute>
            <MyTasks />
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin: Create Task */}
      <Route
        path="/admin/create-task"
        element={
          <ProtectedRoute role="admin">
            <CreateTask />
          </ProtectedRoute>
        }
      />

      {/* Admin: All Tasks */}
      <Route
        path="/admin/tasks"
        element={
          <ProtectedRoute role="admin">
            <AdminTasks />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/tasks/update/:id"
        element={
          <ProtectedRoute role="admin">
            <UpdateTask />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
