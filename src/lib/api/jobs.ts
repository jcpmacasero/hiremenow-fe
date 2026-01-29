import api from '../api';
import type { Job, JobCreate, JobStatus, PaginatedResponse } from '@/types';

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  draft: 'Draft',
  pending_approval: 'Pending Approval',
  active: 'Active',
  paused: 'Paused',
  closed: 'Closed',
  rejected: 'Rejected',
};

export const JOB_STATUS_COLORS: Record<JobStatus, string> = {
  draft: 'gray',
  pending_approval: 'yellow',
  active: 'green',
  paused: 'orange',
  closed: 'red',
  rejected: 'red',
};

export interface JobFilters {
  page?: number;
  page_size?: number;
  company_id?: string;
  status?: JobStatus;
  country?: string;
  search?: string;
}

export const jobsApi = {
  list: async (filters: JobFilters = {}): Promise<PaginatedResponse<Job>> => {
    const params = new URLSearchParams();
    if (filters.page) params.set('page', String(filters.page));
    if (filters.page_size) params.set('page_size', String(filters.page_size));
    if (filters.company_id) params.set('company_id', filters.company_id);
    if (filters.status) params.set('status', filters.status);
    if (filters.country) params.set('country', filters.country);
    if (filters.search) params.set('search', filters.search);
    const response = await api.get(`/admin/jobs?${params}`);
    return response.data;
  },

  get: async (id: string): Promise<Job> => {
    const response = await api.get(`/admin/jobs/${id}`);
    return response.data;
  },

  create: async (data: JobCreate): Promise<Job> => {
    const response = await api.post('/admin/jobs', data);
    return response.data;
  },

  update: async (id: string, data: Partial<JobCreate & { status?: JobStatus }>): Promise<Job> => {
    const response = await api.patch(`/admin/jobs/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/jobs/${id}`);
  },
};
