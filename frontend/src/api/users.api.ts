import axios from './axios';

export const usersApi = {
  getAll: async (params = {}) => {
    const response = await axios.get('/users', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await axios.get(`/users/${id}`);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await axios.patch(`/users/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await axios.delete(`/users/${id}`);
    return response.data;
  }
};
