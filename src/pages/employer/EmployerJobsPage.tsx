import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { employerApi } from '@/lib/api/employer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function EmployerJobsPage() {
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') ?? undefined;
  const { data, isLoading } = useQuery({
    queryKey: ['employer-jobs', statusFilter],
    queryFn: () => employerApi.listJobs(1, 50, statusFilter),
  });

  const items = data?.items ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Jobs</h1>
          <p className="text-slate-600 mt-1">Manage your job postings.</p>
        </div>
        <Link to="/employer/jobs/new">
          <Button>New job</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job list</CardTitle>
          <p className="text-sm text-slate-500">{data?.total ?? 0} job(s)</p>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p className="text-slate-500 py-4">
              No jobs yet. <Link to="/employer/jobs/new" className="text-emerald-600 hover:underline">Create a job</Link> and submit for approval.
            </p>
          ) : (
            <ul className="divide-y divide-slate-200">
              {items.map((j: { id: string; title: string; status: string; country: string; total_slots: number; filled_slots: number }) => (
                <li key={j.id} className="py-4 flex justify-between items-center">
                  <div>
                    <Link to={`/employer/jobs/${j.id}`} className="font-medium text-slate-900 hover:text-emerald-600">
                      {j.title}
                    </Link>
                    <p className="text-sm text-slate-500 mt-0.5">{j.country} · {j.filled_slots}/{j.total_slots} slots</p>
                    <Badge className="mt-2 capitalize">{j.status.replace(/_/g, ' ')}</Badge>
                  </div>
                  <Link to={`/employer/jobs/${j.id}`}>
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
