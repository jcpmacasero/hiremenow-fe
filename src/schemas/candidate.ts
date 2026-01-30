import { z } from 'zod';

const leadSourceSchema = z.enum(['website', 'facebook', 'instagram', 'referral', 'other']);

export const candidateCreateSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  first_name: z.string().max(100).optional(),
  last_name: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  source: leadSourceSchema.optional(),
});

export const candidateStageSchema = z.object({
  stage: z.string().min(1, 'Stage is required'),
  notes: z.string().max(2000).optional(),
});

export type CandidateFormValues = z.infer<typeof candidateCreateSchema>;
export type CandidateStageFormValues = z.infer<typeof candidateStageSchema>;
