import api from "./axios";

export const createTaskApi = (data) => api.post("/tasks", data);
export const getMyTasksApi = () => api.get("/tasks/my");
export const getAllTasksApi = () => api.get("/tasks");
export const updateTaskApi = (id, data) => api.put(`/tasks/${id}`, data);
export const updateTaskStatusApi = (id, data) => api.patch(`/tasks/${id}/status`, data);
export const deleteTaskApi = (id) => api.delete(`/tasks/${id}`);
