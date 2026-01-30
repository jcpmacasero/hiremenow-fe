import { PageHeader } from '@/components/admin/PageHeader';
import { JobsTable } from '@/components/admin/jobs/JobsTable';

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Jobs"
        description="Manage job listings and approve pending positions"
      />
      <JobsTable />
    </div>
  );
}
