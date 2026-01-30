import { PageHeader } from '@/components/admin/PageHeader';
import { CompaniesTable } from '@/components/admin/companies/CompaniesTable';

export default function CompaniesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Companies"
        description="Manage client companies and agency partners"
      />
      <CompaniesTable />
    </div>
  );
}
