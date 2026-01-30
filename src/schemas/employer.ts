import { z } from 'zod';

export const employerCreateSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  company_id: z.string().min(1, 'Company is required'),
});

export type EmployerFormValues = z.infer<typeof employerCreateSchema>;
