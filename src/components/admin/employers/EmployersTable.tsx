import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DataTable } from '@/components/admin/DataTable';
import { DataTablePagination } from '@/components/admin/DataTablePagination';
import { SearchInput } from '@/components/admin/SearchInput';
import { LoadingState } from '@/components/admin/LoadingState';
import { EmptyState } from '@/components/admin/EmptyState';
import { DeleteDialog } from '@/components/admin/DeleteDialog';
import { EmployerDialog } from './EmployerDialog';
import { getColumns } from './columns';
import {
  useEmployers,
  useCreateEmployer,
  useDeleteEmployer,
} from '@/hooks/use-employers';
import { useCompanies } from '@/hooks/use-companies';
import type { EmployerFormValues } from '@/schemas/employer';
import type { Employer } from '@/types';

export function EmployersTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [companyFilter, setCompanyFilter] = useState<string>('__all__');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState<Employer | null>(null);

  const { data, isLoading, error } = useEmployers({
    page,
    page_size: pageSize,
    search: search || undefined,
    company_id: companyFilter !== '__all__' ? companyFilter : undefined,
  });
  const { data: companiesData } = useCompanies({ page_size: 100 });
  const createMutation = useCreateEmployer();
  const deleteMutation = useDeleteEmployer();

  const handleDelete = (employer: Employer) => {
    setSelectedEmployer(employer);
    setDeleteDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async (formData: EmployerFormValues) => {
    await createMutation.mutateAsync(formData);
    handleDialogClose();
  };

  const handleConfirmDelete = async () => {
    if (selectedEmployer) {
      await deleteMutation.mutateAsync(selectedEmployer.id);
      setDeleteDialogOpen(false);
      setSelectedEmployer(null);
    }
  };

  const columns = useMemo(
    () => getColumns({ onDelete: handleDelete }),
    []
  );

  if (isLoading) {
    return <LoadingState message="Loading employers..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load employers</p>
      </div>
    );
  }

  const employers = data?.items ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search employers..."
          />
          <Select value={companyFilter} onValueChange={setCompanyFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Companies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All Companies</SelectItem>
              {companiesData?.items.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Employer
        </Button>
      </div>

      {employers.length === 0 ? (
        <EmptyState
          title="No employers found"
          description={search || companyFilter !== '__all__' ? 'Try adjusting your filters' : 'Get started by adding an employer'}
          action={
            !search && companyFilter === '__all__' && (
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Employer
              </Button>
            )
          }
        />
      ) : (
        <>
          <DataTable columns={columns} data={employers} />
          <DataTablePagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}

      <EmployerDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Delete Employer"
        description={`Are you sure you want to delete this employer? This action cannot be undone.`}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
