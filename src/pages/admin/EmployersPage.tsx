import { PageHeader } from '@/components/admin/PageHeader';
import { EmployersTable } from '@/components/admin/employers/EmployersTable';

export default function EmployersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employers"
        description="Manage employer accounts and company associations"
      />
      <EmployersTable />
    </div>
  );
}
