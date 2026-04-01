"import axios from './axios';

export const dashboardApi = {
  getSummary: async (params = {}) => {
    const response = await axios.get('/dashboard/summary', { params });
    return response.data;
  },
  
  getMonthlyTrends: async (params = {}) => {
    const response = await axios.get('/dashboard/monthly-trends', { params });
    return response.data;
  },
  
  getCategoryBreakdown: async (params = {}) => {
    const response = await axios.get('/dashboard/category-breakdown', { params });
    return response.data;
  },
  
  getRecentActivity: async () => {
    const response = await axios.get('/dashboard/recent-activity');
    return response.data;
  },
  
  getWeeklySummary: async (params = {}) => {
    const response = await axios.get('/dashboard/weekly-summary', { params });
    return response.data;
  }
};
"