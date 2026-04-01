"import axios from './axios';

export const transactionsApi = {
  getAll: async (params = {}) => {
    const response = await axios.get('/transactions', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await axios.get(`/transactions/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await axios.post('/transactions', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await axios.patch(`/transactions/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await axios.delete(`/transactions/${id}`);
    return response.data;
  },
  
  getCategories: async () => {
    const response = await axios.get('/transactions/categories/list');
    return response.data;
  }
};
"