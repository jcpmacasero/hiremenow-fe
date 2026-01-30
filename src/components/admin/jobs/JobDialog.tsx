import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { jobCreateSchema, type JobFormValues } from '@/schemas/job';
import { useCompanies } from '@/hooks/use-companies';
import type { Job } from '@/types';

interface JobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job?: Job | null;
  onSubmit: (data: JobFormValues) => void;
  isLoading?: boolean;
}

export function JobDialog({
  open,
  onOpenChange,
  job,
  onSubmit,
  isLoading,
}: JobDialogProps) {
  const { data: companiesData } = useCompanies({ page_size: 100 });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobCreateSchema),
    defaultValues: {
      title: '',
      description: '',
      company_id: '',
      country: '',
      city: '',
      category: '',
      work_mode: 'onsite',
      job_type: 'full_time',
      salary_min: undefined,
      salary_max: undefined,
      salary_currency: 'USD',
      salary_period: 'monthly',
      total_slots: 1,
    },
  });

  useEffect(() => {
    if (open) {
      if (job) {
        reset({
          title: job.title,
          description: job.description,
          company_id: job.company_id,
          country: job.country,
          city: job.city || '',
          category: job.category || '',
          work_mode: job.work_mode,
          job_type: job.job_type,
          salary_min: job.salary_min ?? undefined,
          salary_max: job.salary_max ?? undefined,
          salary_currency: job.salary_currency,
          salary_period: job.salary_period,
          total_slots: job.total_slots,
        });
      } else {
        reset({
          title: '',
          description: '',
          company_id: '',
          country: '',
          city: '',
          category: '',
          work_mode: 'onsite',
          job_type: 'full_time',
          salary_min: undefined,
          salary_max: undefined,
          salary_currency: 'USD',
          salary_period: 'monthly',
          total_slots: 1,
        });
      }
    }
  }, [open, job, reset]);

  const companyId = watch('company_id');
  const workMode = watch('work_mode');
  const jobType = watch('job_type');
  const salaryPeriod = watch('salary_period');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {job ? 'Edit Job' : 'Create Job'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" {...register('title')} />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Company *</Label>
            <Select
              value={companyId}
              onValueChange={(value: string) => setValue('company_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent>
                {companiesData?.items.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.company_id && (
              <p className="text-sm text-red-600">{errors.company_id.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" {...register('description')} rows={4} />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input id="country" {...register('country')} />
              {errors.country && (
                <p className="text-sm text-red-600">{errors.country.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" {...register('city')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Work Mode</Label>
              <Select
                value={workMode}
                onValueChange={(value: string) => setValue('work_mode', value as 'onsite' | 'accommodation_provided')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="onsite">Onsite</SelectItem>
                  <SelectItem value="accommodation_provided">Accommodation Provided</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Job Type</Label>
              <Select
                value={jobType}
                onValueChange={(value: string) => setValue('job_type', value as 'full_time' | 'part_time' | 'contract' | 'seasonal')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full_time">Full Time</SelectItem>
                  <SelectItem value="part_time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="seasonal">Seasonal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary_min">Salary Min</Label>
              <Input id="salary_min" type="number" {...register('salary_min')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary_max">Salary Max</Label>
              <Input id="salary_max" type="number" {...register('salary_max')} />
            </div>
            <div className="space-y-2">
              <Label>Period</Label>
              <Select
                value={salaryPeriod}
                onValueChange={(value: string) => setValue('salary_period', value as 'hourly' | 'monthly')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" {...register('category')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total_slots">Total Slots</Label>
              <Input id="total_slots" type="number" min="1" {...register('total_slots')} />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : job ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
