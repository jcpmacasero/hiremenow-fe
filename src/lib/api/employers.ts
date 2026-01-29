import api from '../api';
import type { Employer, EmployerCreate, PaginatedResponse } from '@/types';

export interface EmployerFilters {
  page?: number;
  page_size?: number;
  company_id?: string;
  search?: string;
}

export const employersApi = {
  list: async (filters: EmployerFilters = {}): Promise<PaginatedResponse<Employer>> => {
    const params = new URLSearchParams();
    if (filters.page) params.set('page', String(filters.page));
    if (filters.page_size) params.set('page_size', String(filters.page_size));
    if (filters.company_id) params.set('company_id', filters.company_id);
    if (filters.search) params.set('search', filters.search);
    const response = await api.get(`/admin/employers?${params}`);
    return response.data;
  },

  get: async (id: string): Promise<Employer> => {
    const response = await api.get(`/admin/employers/${id}`);
    return response.data;
  },

  create: async (data: EmployerCreate): Promise<Employer> => {
    const response = await api.post('/admin/employers', data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/employers/${id}`);
  },
};
