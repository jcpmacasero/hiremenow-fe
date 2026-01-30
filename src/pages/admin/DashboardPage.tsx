import { Building2, Users, Briefcase, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/admin/PageHeader';
import { LoadingState } from '@/components/admin/LoadingState';
import { useDashboardStats } from '@/hooks/use-stats';
import { STAGE_LABELS } from '@/lib/api/candidates';

export default function DashboardPage() {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load dashboard stats</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Companies',
      value: stats?.total_companies ?? 0,
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Employers',
      value: stats?.total_employers ?? 0,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Candidates',
      value: stats?.total_candidates ?? 0,
      icon: UserCheck,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Jobs',
      value: stats?.total_jobs ?? 0,
      subtitle: `${stats?.active_jobs ?? 0} active`,
      icon: Briefcase,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const candidatesByStage = stats?.candidates_by_stage ?? {};

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your recruitment platform"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {stat.value.toLocaleString()}
              </div>
              {stat.subtitle && (
                <p className="text-xs text-slate-500 mt-1">{stat.subtitle}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">
            Candidates by Stage
          </CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(candidatesByStage).length === 0 ? (
            <p className="text-sm text-slate-500">No candidates yet</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(candidatesByStage).map(([stage, count]) => (
                <div
                  key={stage}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <span className="text-sm text-slate-600">
                    {STAGE_LABELS[stage] ?? stage}
                  </span>
                  <span className="font-semibold text-slate-900">{count}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
