import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api' // match your server port
});

// Optionally attach token if available
api.interceptors.request.use(config => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
