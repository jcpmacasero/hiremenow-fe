import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { employerApi } from '@/lib/api/employer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export default function EmployerJobNewPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: company } = useQuery({
    queryKey: ['employer-company'],
    queryFn: () => employerApi.getCompany(),
  });
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    country: '',
    city: '',
    work_mode: 'onsite',
    job_type: 'full_time',
    salary_min: '',
    salary_max: '',
    salary_currency: 'EUR',
    salary_period: 'monthly',
    benefits: [] as string[],
    requirements: {} as Record<string, unknown>,
    total_slots: 1,
    deadline: '',
    start_date: '',
  });

  const createMutation = useMutation({
    mutationFn: () =>
      employerApi.createJob({
        company_id: company!.id,
        title: form.title,
        description: form.description,
        category: form.category || undefined,
        country: form.country,
        city: form.city || undefined,
        work_mode: form.work_mode,
        job_type: form.job_type,
        salary_min: form.salary_min ? Number(form.salary_min) : undefined,
        salary_max: form.salary_max ? Number(form.salary_max) : undefined,
        salary_currency: form.salary_currency,
        salary_period: form.salary_period,
        benefits: form.benefits,
        requirements: form.requirements,
        total_slots: form.total_slots,
        deadline: form.deadline || undefined,
        start_date: form.start_date || undefined,
      }),
    onSuccess: (job) => {
      queryClient.invalidateQueries({ queryKey: ['employer-jobs'] });
      navigate(`/employer/jobs/${job.id}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate();
  };

  if (!company) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">New job</h1>
      <p className="text-slate-600 mt-1">Create a job posting for {company.name}. Submit for admin approval when ready.</p>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Job details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={4}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={form.country}
                  onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Work mode</Label>
                <Select value={form.work_mode} onValueChange={(v) => setForm((f) => ({ ...f, work_mode: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="accommodation_provided">Accommodation provided</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Job type</Label>
                <Select value={form.job_type} onValueChange={(v) => setForm((f) => ({ ...f, job_type: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full_time">Full time</SelectItem>
                    <SelectItem value="part_time">Part time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="seasonal">Seasonal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="salary_min">Salary min</Label>
                <Input
                  id="salary_min"
                  type="number"
                  value={form.salary_min}
                  onChange={(e) => setForm((f) => ({ ...f, salary_min: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary_max">Salary max</Label>
                <Input
                  id="salary_max"
                  type="number"
                  value={form.salary_max}
                  onChange={(e) => setForm((f) => ({ ...f, salary_max: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="total_slots">Total slots</Label>
                <Input
                  id="total_slots"
                  type="number"
                  min={1}
                  value={form.total_slots}
                  onChange={(e) => setForm((f) => ({ ...f, total_slots: parseInt(e.target.value, 10) || 1 }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Creating...' : 'Create job'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/employer/jobs')}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
