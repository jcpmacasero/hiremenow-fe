import api from '../api';

export interface CompanyInfo {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  website: string | null;
  location: string | null;
  industry: string | null;
  is_agency_owned: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobItem {
  id: string;
  company_id: string;
  title: string;
  slug: string;
  description: string;
  category: string | null;
  country: string;
  city: string | null;
  work_mode: string;
  job_type: string;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  salary_period: string;
  benefits: string[];
  requirements: Record<string, unknown>;
  total_slots: number;
  filled_slots: number;
  available_slots: number;
  status: string;
  rejection_reason: string | null;
  deadline: string | null;
  start_date: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  company?: { id: string; name: string; slug: string };
}

export interface JobMatchItem {
  id: string;
  candidate_id: string;
  job_id: string;
  match_score: number;
  match_reasons: string[];
  status: string;
  suggested_at: string;
  candidate?: { id: string; first_name: string | null; last_name: string | null; current_stage: string };
  job?: JobItem;
}

export const employerApi = {
  getCompany: () => api.get<CompanyInfo>('/employer/company').then((r) => r.data),
  updateCompany: (data: Partial<CompanyInfo>) =>
    api.put<CompanyInfo>('/employer/company', data).then((r) => r.data),
  listJobs: (page = 1, pageSize = 20, status?: string) =>
    api
      .get<{ items: JobItem[]; total: number; page: number; page_size: number }>('/employer/jobs', {
        params: { page, page_size: pageSize, status },
      })
      .then((r) => r.data),
  getJob: (jobId: string) => api.get<JobItem>(`/employer/jobs/${jobId}`).then((r) => r.data),
  createJob: (data: Record<string, unknown>) =>
    api.post<JobItem>('/employer/jobs', data).then((r) => r.data),
  updateJob: (jobId: string, data: Record<string, unknown>) =>
    api.patch<JobItem>(`/employer/jobs/${jobId}`, data).then((r) => r.data),
  submitJob: (jobId: string) => api.post<JobItem>(`/employer/jobs/${jobId}/submit`).then((r) => r.data),
  listJobMatches: (jobId: string, page = 1, pageSize = 20) =>
    api
      .get<{ items: JobMatchItem[]; total: number; page: number; page_size: number }>(
        `/employer/jobs/${jobId}/matches`,
        { params: { page, page_size: pageSize } }
      )
      .then((r) => r.data),
};
