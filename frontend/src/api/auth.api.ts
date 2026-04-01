import axios from './axios';

export const authApi = {
  login: async (email, password) => {
    const response = await axios.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (name, email, password) => {
    const response = await axios.post('/auth/register', { name, email, password });
    return response.data;
  },
  
  logout: async () => {
    const response = await axios.post('/auth/logout');
    return response.data;
  },
  
  getMe: async () => {
    const response = await axios.get('/auth/me');
    return response.data;
  },
  
  refresh: async () => {
    const response = await axios.post('/auth/refresh');
    return response.data;
  }
};
