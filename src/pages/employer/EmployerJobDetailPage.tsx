import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { employerApi } from '@/lib/api/employer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function EmployerJobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: job, isLoading } = useQuery({
    queryKey: ['employer-job', id],
    queryFn: () => employerApi.getJob(id!),
    enabled: !!id,
  });
  const { data: matchesData } = useQuery({
    queryKey: ['employer-job-matches', id],
    queryFn: () => employerApi.listJobMatches(id!, 1, 20),
    enabled: !!id,
  });
  const submitMutation = useMutation({
    mutationFn: () => employerApi.submitJob(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employer-job', id] });
      queryClient.invalidateQueries({ queryKey: ['employer-jobs'] });
    },
  });

  if (isLoading || !job) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  const canEdit = job.status === 'draft' || job.status === 'rejected';
  const canSubmit = job.status === 'draft' || job.status === 'rejected';
  const matches = matchesData?.items ?? [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
          <p className="text-slate-600 mt-1">{job.country}{job.city ? ` · ${job.city}` : ''}</p>
          <Badge className="mt-2 capitalize">{job.status.replace(/_/g, ' ')}</Badge>
        </div>
        <div className="flex gap-2">
          {canSubmit && (
            <Button onClick={() => submitMutation.mutate()} disabled={submitMutation.isPending}>
              Submit for approval
            </Button>
          )}
          {canEdit && (
            <Link to={`/employer/jobs/${id}/edit`}>
              <Button variant="outline">Edit</Button>
            </Link>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job details</CardTitle>
          <p className="text-sm text-slate-500">Slots: {job.filled_slots}/{job.total_slots} filled</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-slate-700">Description</h3>
            <p className="text-slate-600 mt-1 whitespace-pre-wrap">{job.description}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-slate-700">Category</h3>
              <p className="text-slate-600 mt-1">{job.category ?? '—'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-700">Job type</h3>
              <p className="text-slate-600 mt-1 capitalize">{job.job_type?.replace(/_/g, ' ') ?? '—'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-700">Salary</h3>
              <p className="text-slate-600 mt-1">
                {job.salary_min != null || job.salary_max != null
                  ? `${job.salary_min ?? '?'} - ${job.salary_max ?? '?'} ${job.salary_currency} / ${job.salary_period}`
                  : '—'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Matches</CardTitle>
          <p className="text-sm text-slate-500">Candidates matched to this job (by admin).</p>
        </CardHeader>
        <CardContent>
          {matches.length === 0 ? (
            <p className="text-slate-500 py-4">No matches yet. Admin can generate matches from the admin panel.</p>
          ) : (
            <ul className="divide-y divide-slate-200">
              {matches.map((m: { id: string; candidate?: { first_name: string | null; last_name: string | null }; match_score: number; status: string }) => (
                <li key={m.id} className="py-3 flex justify-between items-center">
                  <span className="font-medium text-slate-900">
                    {m.candidate?.first_name ?? ''} {m.candidate?.last_name ?? ''}
                  </span>
                  <span className="text-sm text-slate-500">
                    Score: {m.match_score}% · <span className="capitalize">{m.status.replace(/_/g, ' ')}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Button variant="outline" onClick={() => navigate('/employer/jobs')}>
        Back to jobs
      </Button>
    </div>
  );
}
