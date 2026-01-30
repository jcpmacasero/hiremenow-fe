import { PageHeader } from '@/components/admin/PageHeader';
import { CandidatesTable } from '@/components/admin/candidates/CandidatesTable';

export default function CandidatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Candidates"
        description="Manage candidate pipeline and track progress through stages"
      />
      <CandidatesTable />
    </div>
  );
}
