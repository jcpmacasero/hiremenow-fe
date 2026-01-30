import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { User, FileText, Briefcase, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { candidateApi, type ProgressResponse, type CandidateProfile } from '@/lib/api/candidate';

export default function CandidateDashboardPage() {
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['candidate-profile'],
    queryFn: () => candidateApi.getProfile(),
  });
  const { data: progress, isLoading: progressLoading } = useQuery({
    queryKey: ['candidate-progress'],
    queryFn: () => candidateApi.getProgress(),
  });
  const { data: matchesData } = useQuery({
    queryKey: ['candidate-matches'],
    queryFn: () => candidateApi.listMatches(1, 5),
  });

  const isLoading = profileLoading || progressLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  const name = [profile?.first_name, profile?.last_name].filter(Boolean).join(' ') || 'Candidate';
  const stage = (progress as ProgressResponse)?.current_stage ?? 'lead';
  const matchCount = matchesData?.total ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, {name}</h1>
        <p className="text-slate-600 mt-1">Here’s your recruitment progress at a glance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Current stage</CardTitle>
            <div className="rounded-lg p-2 bg-emerald-50">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-slate-900 capitalize">{stage.replace(/_/g, ' ')}</div>
            <p className="text-xs text-slate-500 mt-1">Pipeline progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Job matches</CardTitle>
            <div className="rounded-lg p-2 bg-blue-50">
              <Briefcase className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-slate-900">{matchCount}</div>
            <Link to="/candidate/jobs" className="text-xs text-emerald-600 hover:underline mt-1 block">
              View matches
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Profile</CardTitle>
            <div className="rounded-lg p-2 bg-amber-50">
              <User className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <Link to="/candidate/profile" className="text-sm font-medium text-emerald-600 hover:underline">
              Edit profile
            </Link>
            <p className="text-xs text-slate-500 mt-1">Keep your details up to date</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Documents</CardTitle>
            <div className="rounded-lg p-2 bg-purple-50">
              <FileText className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <Link to="/candidate/documents" className="text-sm font-medium text-emerald-600 hover:underline">
              Upload documents
            </Link>
            <p className="text-xs text-slate-500 mt-1">Passport, certificates, etc.</p>
          </CardContent>
        </Card>
      </div>

      {matchesData?.items?.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Recent job matches</CardTitle>
            <p className="text-sm text-slate-500">Jobs we’ve matched you with</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {matchesData.items.slice(0, 5).map((m: { id: string; job?: { title: string }; match_score: number; status: string }) => (
                <li key={m.id} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                  <span className="font-medium text-slate-900">{m.job?.title ?? 'Job'}</span>
                  <span className="text-sm text-slate-500">
                    Score: {m.match_score}% · {m.status.replace(/_/g, ' ')}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              to="/candidate/jobs"
              className="inline-block mt-4 text-sm font-medium text-emerald-600 hover:underline"
            >
              View all matches →
            </Link>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
