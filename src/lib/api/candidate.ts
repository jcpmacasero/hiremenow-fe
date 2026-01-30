import api from '../api';

export interface CandidateProfile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  date_of_birth: string | null;
  nationality: string | null;
  current_country: string | null;
  passport_status: string;
  passport_expiry: string | null;
  preferred_positions: string[];
  experience_years: number;
  photo_url: string | null;
  resume_url: string | null;
  source: string;
  referral_code: string | null;
  current_stage: string;
  stage_notes: string | null;
  stage_updated_at: string;
  created_at: string;
  updated_at: string;
  user: { id: string; email: string; is_active: boolean };
}

export interface ProgressResponse {
  current_stage: string;
  stage_notes: string | null;
  stage_updated_at: string;
  requirements: string[];
}

export interface DocumentItem {
  id: string;
  candidate_id: string;
  type: string;
  name: string;
  file_url: string;
  file_size: number | null;
  mime_type: string | null;
  status: string;
  rejection_reason: string | null;
  uploaded_at: string;
  reviewed_at: string | null;
}

export interface JobMatchItem {
  id: string;
  candidate_id: string;
  job_id: string;
  match_score: number;
  match_reasons: string[];
  status: string;
  suggested_at: string;
  confirmed_at: string | null;
  rejected_reason: string | null;
  notes: string | null;
  job?: { id: string; title: string; slug: string; country: string; status: string; total_slots: number; filled_slots: number; available_slots: number };
}

export const candidateApi = {
  getProfile: () => api.get<CandidateProfile>('/candidate/profile').then((r) => r.data),
  updateProfile: (data: Partial<CandidateProfile>) =>
    api.put<CandidateProfile>('/candidate/profile', data).then((r) => r.data),
  getProgress: () => api.get<ProgressResponse>('/candidate/progress').then((r) => r.data),
  listDocuments: (page = 1, pageSize = 20) =>
    api.get<{ items: DocumentItem[]; total: number; page: number; page_size: number }>('/candidate/documents', {
      params: { page, page_size: pageSize },
    }).then((r) => r.data),
  uploadDocument: (formData: FormData) =>
    api.post<DocumentItem>('/candidate/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data),
  deleteDocument: (id: string) => api.delete(`/candidate/documents/${id}`),
  listJobs: (page = 1, pageSize = 20) =>
    api.get<{ items: unknown[]; total: number; page: number; page_size: number }>('/candidate/jobs', {
      params: { page, page_size: pageSize },
    }).then((r) => r.data),
  listMatches: (page = 1, pageSize = 20, status?: string) =>
    api
      .get<{ items: JobMatchItem[]; total: number; page: number; page_size: number }>('/candidate/jobs/matches', {
        params: { page, page_size: pageSize, status },
      })
      .then((r) => r.data),
  getJob: (jobId: string) => api.get(`/candidate/jobs/${jobId}`).then((r) => r.data),
  expressInterest: (jobId: string, interested: boolean) =>
    api.post(`/candidate/jobs/${jobId}/interest`, { interested }).then((r) => r.data),
};
