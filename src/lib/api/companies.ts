import api from '../api';
import type { Company, CompanyCreate, PaginatedResponse } from '@/types';

export interface CompanyFilters {
  page?: number;
  page_size?: number;
  is_active?: boolean;
  search?: string;
}

export const companiesApi = {
  list: async (filters: CompanyFilters = {}): Promise<PaginatedResponse<Company>> => {
    const params = new URLSearchParams();
    if (filters.page) params.set('page', String(filters.page));
    if (filters.page_size) params.set('page_size', String(filters.page_size));
    if (filters.is_active !== undefined) params.set('is_active', String(filters.is_active));
    if (filters.search) params.set('search', filters.search);
    const response = await api.get(`/admin/companies?${params}`);
    return response.data;
  },

  get: async (id: string): Promise<Company> => {
    const response = await api.get(`/admin/companies/${id}`);
    return response.data;
  },

  create: async (data: CompanyCreate): Promise<Company> => {
    const response = await api.post('/admin/companies', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CompanyCreate>): Promise<Company> => {
    const response = await api.patch(`/admin/companies/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/companies/${id}`);
  },
};
