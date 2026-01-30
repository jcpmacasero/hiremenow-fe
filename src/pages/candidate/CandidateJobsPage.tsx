import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { candidateApi, type JobMatchItem } from '@/lib/api/candidate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function CandidateJobsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['candidate-matches'],
    queryFn: () => candidateApi.listMatches(1, 50),
  });
  const expressMutation = useMutation({
    mutationFn: ({ jobId, interested }: { jobId: string; interested: boolean }) =>
      candidateApi.expressInterest(jobId, interested),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['candidate-matches'] }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  const items: JobMatchItem[] = data?.items ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Job matches</h1>
        <p className="text-slate-600 mt-1">Jobs we’ve matched you with. Express interest to move forward.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your matches</CardTitle>
          <p className="text-sm text-slate-500">{data?.total ?? 0} match(es) in total</p>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p className="text-slate-500 py-4">No job matches yet. Complete your profile and pipeline steps; we’ll suggest jobs when they’re available.</p>
          ) : (
            <ul className="divide-y divide-slate-200 space-y-4">
              {items.map((m) => (
                <li key={m.id} className="py-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <Link to={`/candidate/jobs/${m.job_id}`} className="font-medium text-slate-900 hover:text-emerald-600">
                        {m.job?.title ?? 'Job'}
                      </Link>
                      <p className="text-sm text-slate-500 mt-0.5">
                        Match score: {m.match_score}% · {m.match_reasons?.join(', ') ?? ''}
                      </p>
                      <Badge className="mt-2 capitalize">{m.status.replace(/_/g, ' ')}</Badge>
                    </div>
                    {(m.status === 'suggested' || m.status === 'candidate_interested') && (
                      <Button
                        size="sm"
                        variant={m.status === 'candidate_interested' ? 'outline' : 'default'}
                        onClick={() => expressMutation.mutate({ jobId: m.job_id, interested: m.status !== 'candidate_interested' })}
                        disabled={expressMutation.isPending}
                      >
                        {m.status === 'candidate_interested' ? 'Withdraw interest' : 'Express interest'}
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
