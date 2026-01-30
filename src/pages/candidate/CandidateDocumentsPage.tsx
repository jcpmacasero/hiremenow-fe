import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { candidateApi, type DocumentItem } from '@/lib/api/candidate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function CandidateDocumentsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ['candidate-documents', page],
    queryFn: () => candidateApi.listDocuments(page, 10),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => candidateApi.deleteDocument(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['candidate-documents'] }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  const items: DocumentItem[] = data?.items ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Documents</h1>
        <p className="text-slate-600 mt-1">Upload and manage your documents (passport, certificates, etc.).</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your documents</CardTitle>
          <p className="text-sm text-slate-500">Upload via API or admin. Pending documents are reviewed by the agency.</p>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p className="text-slate-500 py-4">No documents yet. Use the API or ask the agency to upload documents for you.</p>
          ) : (
            <ul className="divide-y divide-slate-200">
              {items.map((doc) => (
                <li key={doc.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-medium text-slate-900">{doc.name}</span>
                    <span className="ml-2">
                      <Badge variant={doc.status === 'approved' ? 'default' : doc.status === 'rejected' ? 'destructive' : 'secondary'}>
                        {doc.status.replace(/_/g, ' ')}
                      </Badge>
                    </span>
                    <p className="text-sm text-slate-500 mt-0.5">{doc.type} · {doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : ''}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={doc.file_url.startsWith('http') ? doc.file_url : `${API_BASE.replace('/api/v1', '')}${doc.file_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-emerald-600 hover:underline"
                    >
                      View
                    </a>
                    {(doc.status === 'pending_review' || doc.status === 'rejected') && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteMutation.mutate(doc.id)}
                        disabled={deleteMutation.isPending}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
          {total > 10 && (
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                Previous
              </Button>
              <span className="py-2 text-sm text-slate-600">
                Page {page} of {Math.ceil(total / 10)}
              </span>
              <Button variant="outline" size="sm" disabled={page >= Math.ceil(total / 10)} onClick={() => setPage((p) => p + 1)}>
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
