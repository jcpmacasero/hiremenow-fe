import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Building2, Briefcase, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { employerApi } from '@/lib/api/employer';

export default function EmployerDashboardPage() {
  const { data: company, isLoading: companyLoading } = useQuery({
    queryKey: ['employer-company'],
    queryFn: () => employerApi.getCompany(),
  });
  const { data: jobsData, isLoading: jobsLoading } = useQuery({
    queryKey: ['employer-jobs'],
    queryFn: () => employerApi.listJobs(1, 100),
  });

  const isLoading = companyLoading || jobsLoading;
  const jobs = jobsData?.items ?? [];
  const activeCount = jobs.filter((j: { status: string }) => j.status === 'active').length;
  const pendingCount = jobs.filter((j: { status: string }) => j.status === 'pending_approval').length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Employer dashboard</h1>
        <p className="text-slate-600 mt-1">{company?.name ?? 'Your company'}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Company</CardTitle>
            <div className="rounded-lg p-2 bg-emerald-50">
              <Building2 className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <Link to="/employer/company" className="text-sm font-medium text-emerald-600 hover:underline">
              Edit company
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Active jobs</CardTitle>
            <div className="rounded-lg p-2 bg-blue-50">
              <Briefcase className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{activeCount}</div>
            <Link to="/employer/jobs?status=active" className="text-xs text-emerald-600 hover:underline mt-1 block">
              View jobs
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Pending approval</CardTitle>
            <div className="rounded-lg p-2 bg-amber-50">
              <UserCheck className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{pendingCount}</div>
            <Link to="/employer/jobs?status=pending_approval" className="text-xs text-emerald-600 hover:underline mt-1 block">
              View jobs
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent jobs</CardTitle>
          <p className="text-sm text-slate-500">Your job postings</p>
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <p className="text-slate-500 py-4">No jobs yet. <Link to="/employer/jobs/new" className="text-emerald-600 hover:underline">Create a job</Link>.</p>
          ) : (
            <ul className="divide-y divide-slate-200 space-y-2">
              {jobs.slice(0, 5).map((j: { id: string; title: string; status: string }) => (
                <li key={j.id} className="py-2 flex justify-between items-center">
                  <Link to={`/employer/jobs/${j.id}`} className="font-medium text-slate-900 hover:text-emerald-600">
                    {j.title}
                  </Link>
                  <span className="text-sm text-slate-500 capitalize">{j.status.replace(/_/g, ' ')}</span>
                </li>
              ))}
            </ul>
          )}
          <Link to="/employer/jobs" className="inline-block mt-4 text-sm font-medium text-emerald-600 hover:underline">
            View all jobs
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
