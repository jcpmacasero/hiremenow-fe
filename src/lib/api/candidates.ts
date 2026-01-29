import api from '../api';
import type { Candidate, CandidateCreate, PaginatedResponse, LeadSource } from '@/types';

export const PIPELINE_STAGES = [
  'new',
  'contacted',
  'documents_pending',
  'documents_submitted',
  'interview_scheduled',
  'interview_completed',
  'offer_pending',
  'offer_accepted',
  'visa_processing',
  'deployed',
  'rejected',
  'withdrawn',
] as const;

export const STAGE_LABELS: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  documents_pending: 'Documents Pending',
  documents_submitted: 'Documents Submitted',
  interview_scheduled: 'Interview Scheduled',
  interview_completed: 'Interview Completed',
  offer_pending: 'Offer Pending',
  offer_accepted: 'Offer Accepted',
  visa_processing: 'Visa Processing',
  deployed: 'Deployed',
  rejected: 'Rejected',
  withdrawn: 'Withdrawn',
};

export interface CandidateFilters {
  page?: number;
  page_size?: number;
  stage?: string;
  source?: LeadSource;
  search?: string;
}

export const candidatesApi = {
  list: async (filters: CandidateFilters = {}): Promise<PaginatedResponse<Candidate>> => {
    const params = new URLSearchParams();
    if (filters.page) params.set('page', String(filters.page));
    if (filters.page_size) params.set('page_size', String(filters.page_size));
    if (filters.stage) params.set('stage', filters.stage);
    if (filters.source) params.set('source', filters.source);
    if (filters.search) params.set('search', filters.search);
    const response = await api.get(`/admin/candidates?${params}`);
    return response.data;
  },

  get: async (id: string): Promise<Candidate> => {
    const response = await api.get(`/admin/candidates/${id}`);
    return response.data;
  },

  create: async (data: CandidateCreate): Promise<Candidate> => {
    const response = await api.post('/admin/candidates', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CandidateCreate>): Promise<Candidate> => {
    const response = await api.patch(`/admin/candidates/${id}`, data);
    return response.data;
  },

  updateStage: async (id: string, stage: string, notes?: string): Promise<Candidate> => {
    const response = await api.patch(`/admin/candidates/${id}/stage`, { stage, notes });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/candidates/${id}`);
  },
};
