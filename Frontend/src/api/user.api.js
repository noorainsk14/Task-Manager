
import api from "./axios";



export const registerUser = (data) => api.post("/users/register", data);
export const loginUser = (data) => api.post("/users/login", data);
export const logoutUser = () => api.post("/users/logout");

export const getCurrentUser = () => api.get("/users/current-user");
export const getAllUsers = async () => {
  const res = await api.get("/users/all-users");
  return res.data.data;
};

