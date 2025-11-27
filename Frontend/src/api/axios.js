import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-rho-five-63.vercel.app/api/v1",  
  withCredentials: true 
});

export default api;
