import api from '../api';
import type { DashboardStats } from '@/types';

export const statsApi = {
  getDashboard: async (): Promise<DashboardStats> => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
};
