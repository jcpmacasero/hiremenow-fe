import { z } from 'zod';

const workModeSchema = z.enum(['onsite', 'accommodation_provided']);
const jobTypeSchema = z.enum(['full_time', 'part_time', 'contract', 'seasonal']);
const salaryPeriodSchema = z.enum(['hourly', 'monthly']);

export const jobCreateSchema = z.object({
  title: z.string().min(1, 'Job title is required').max(200),
  description: z.string().min(1, 'Description is required').max(10000),
  company_id: z.string().min(1, 'Company is required'),
  country: z.string().min(1, 'Country is required').max(100),
  city: z.string().max(100).optional(),
  category: z.string().max(100).optional(),
  work_mode: workModeSchema.optional(),
  job_type: jobTypeSchema.optional(),
  salary_min: z.coerce.number().min(0).optional(),
  salary_max: z.coerce.number().min(0).optional(),
  salary_currency: z.string().max(3).optional(),
  salary_period: salaryPeriodSchema.optional(),
  benefits: z.array(z.string()).optional(),
  total_slots: z.coerce.number().min(1).optional(),
  deadline: z.string().optional(),
  start_date: z.string().optional(),
});

export type JobFormValues = z.infer<typeof jobCreateSchema>;
