import api from "./axios";

export const createTask = (data) => api.post("/tasks", data);
export const getMyTasks = () => api.get("/tasks/my");
export const getAllTasks = () => api.get("/tasks");
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const updateTaskStatus = (id, data) => api.patch(`/tasks/${id}/status`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
