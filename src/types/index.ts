export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
}

export interface Company {
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

export interface CompanyCreate {
  name: string;
  description?: string;
  logo_url?: string;
  website?: string;
  location?: string;
  industry?: string;
  is_agency_owned?: boolean;
}

export interface Employer {
  id: string;
  user_id: string;
  company_id: string;
  created_at: string;
  user: { id: string; email: string; is_active: boolean; };
  company: { id: string; name: string; slug: string; };
}

export interface EmployerCreate {
  email: string;
  password: string;
  company_id: string;
}

export type PassportStatus = 'valid' | 'expired' | 'none' | 'in_progress';
export type LeadSource = 'website' | 'facebook' | 'instagram' | 'referral' | 'other';

export interface Candidate {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  date_of_birth: string | null;
  nationality: string | null;
  current_country: string | null;
  passport_status: PassportStatus;
  passport_expiry: string | null;
  preferred_positions: string[];
  experience_years: number;
  photo_url: string | null;
  resume_url: string | null;
  source: LeadSource;
  referral_code: string | null;
  current_stage: string;
  stage_notes: string | null;
  stage_updated_at: string;
  created_at: string;
  updated_at: string;
  user: { id: string; email: string; is_active: boolean; };
}

export interface CandidateCreate {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  source?: LeadSource;
}

export type WorkMode = 'onsite' | 'accommodation_provided';
export type JobType = 'full_time' | 'part_time' | 'contract' | 'seasonal';
export type JobStatus = 'draft' | 'pending_approval' | 'active' | 'paused' | 'closed' | 'rejected';
export type SalaryPeriod = 'hourly' | 'monthly';

export interface Job {
  id: string;
  company_id: string;
  created_by: string | null;
  title: string;
  slug: string;
  description: string;
  category: string | null;
  country: string;
  city: string | null;
  work_mode: WorkMode;
  job_type: JobType;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  salary_period: SalaryPeriod;
  benefits: string[];
  requirements: Record<string, unknown>;
  total_slots: number;
  filled_slots: number;
  available_slots: number;
  status: JobStatus;
  rejection_reason: string | null;
  deadline: string | null;
  start_date: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  company: { id: string; name: string; slug: string; };
  creator: { id: string; email: string; } | null;
}

export interface JobCreate {
  title: string;
  description: string;
  company_id: string;
  country: string;
  city?: string;
  category?: string;
  work_mode?: WorkMode;
  job_type?: JobType;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  salary_period?: SalaryPeriod;
  benefits?: string[];
  total_slots?: number;
  deadline?: string;
  start_date?: string;
}

export interface DashboardStats {
  total_companies: number;
  total_employers: number;
  total_candidates: number;
  total_jobs: number;
  active_jobs: number;
  candidates_by_stage: Record<string, number>;
}

export interface UploadResponse {
  url: string;
  message: string;
}
