import { z } from 'zod';

export const companyCreateSchema = z.object({
  name: z.string().min(1, 'Company name is required').max(200),
  description: z.string().max(2000).optional(),
  logo_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  location: z.string().max(200).optional(),
  industry: z.string().max(100).optional(),
  is_agency_owned: z.boolean().optional(),
});

export type CompanyFormValues = z.infer<typeof companyCreateSchema>;
