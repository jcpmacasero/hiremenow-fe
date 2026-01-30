import { useQuery } from '@tanstack/react-query';
import { candidateApi } from '@/lib/api/candidate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CandidateProgressPage() {
  const { data: progress, isLoading } = useQuery({
    queryKey: ['candidate-progress'],
    queryFn: () => candidateApi.getProgress(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  const stage = progress?.current_stage ?? 'lead';
  const notes = progress?.stage_notes ?? null;
  const updatedAt = progress?.stage_updated_at ?? '';

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Pipeline progress</h1>
      <p className="text-slate-600 mt-1">Your current stage in the recruitment pipeline.</p>

      <Card>
        <CardHeader>
          <CardTitle className="capitalize">{stage.replace(/_/g, ' ')}</CardTitle>
          <p className="text-sm text-slate-500">
            Last updated: {updatedAt ? new Date(updatedAt).toLocaleDateString() : '—'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {notes && (
            <div>
              <h3 className="text-sm font-medium text-slate-700">Notes</h3>
              <p className="text-slate-600 mt-1">{notes}</p>
            </div>
          )}
          {progress?.requirements?.length ? (
            <div>
              <h3 className="text-sm font-medium text-slate-700">Requirements for this stage</h3>
              <ul className="list-disc list-inside text-slate-600 mt-1 space-y-1">
                {progress.requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-slate-500 text-sm">Complete the steps above to advance. We will notify you when your stage changes.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
