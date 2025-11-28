import { useState } from "react";
import {
  createTaskApi,
  getMyTasksApi,
  getAllTasksApi,
  updateTaskStatusApi,
  updateTaskApi,
  deleteTaskApi,
} from "../api/task.api";
import { toast } from "react-hot-toast";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyTasks = async () => {
    setLoading(true);
    try {
      const res = await getMyTasksApi();
      setTasks(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTasks = async () => {
    setLoading(true);
    try {
      const res = await getAllTasksApi();
      setTasks(res.data.data || []);
    } catch (err) {
      console.log(err);

      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (payload) => {
    try {
      await createTaskApi(payload);
      toast.success("Task created");
    } catch (err) {
      toast.error("Create failed");
      throw err;
    }
  };

  const updateTask = async (id, data) => {
    try {
      const res = await updateTaskApi(id, data);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data.data : task))
      );
      toast.success("Task updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const updateStatus = async (id, data) => {
    try {
      await updateTaskStatusApi(id, data);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? { ...task, ...data } : task))
      );
      toast.success("Status updated");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTaskApi(id);
      setTasks((prev) => prev.filter((task) => task._id !== id)); // remove from UI
      toast.success("Task removed");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return {
    tasks,
    loading,
    fetchMyTasks,
    fetchAllTasks,
    createTask,
    updateStatus,
    removeTask,
    updateTask,
  };
}
