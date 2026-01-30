import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/admin/DataTable';
import { DataTablePagination } from '@/components/admin/DataTablePagination';
import { SearchInput } from '@/components/admin/SearchInput';
import { LoadingState } from '@/components/admin/LoadingState';
import { EmptyState } from '@/components/admin/EmptyState';
import { DeleteDialog } from '@/components/admin/DeleteDialog';
import { CompanyDialog } from './CompanyDialog';
import { getColumns } from './columns';
import {
  useCompanies,
  useCreateCompany,
  useUpdateCompany,
  useDeleteCompany,
} from '@/hooks/use-companies';
import type { CompanyFormValues } from '@/schemas/company';
import type { Company } from '@/types';

export function CompaniesTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const { data, isLoading, error } = useCompanies({ page, page_size: pageSize, search: search || undefined });
  const createMutation = useCreateCompany();
  const updateMutation = useUpdateCompany();
  const deleteMutation = useDeleteCompany();

  const handleEdit = (company: Company) => {
    setSelectedCompany(company);
    setDialogOpen(true);
  };

  const handleDelete = (company: Company) => {
    setSelectedCompany(company);
    setDeleteDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedCompany(null);
  };

  const handleSubmit = async (formData: CompanyFormValues) => {
    const cleanData = {
      ...formData,
      logo_url: formData.logo_url || undefined,
      website: formData.website || undefined,
    };

    if (selectedCompany) {
      await updateMutation.mutateAsync({ id: selectedCompany.id, data: cleanData });
    } else {
      await createMutation.mutateAsync(cleanData);
    }
    handleDialogClose();
  };

  const handleConfirmDelete = async () => {
    if (selectedCompany) {
      await deleteMutation.mutateAsync(selectedCompany.id);
      setDeleteDialogOpen(false);
      setSelectedCompany(null);
    }
  };

  const columns = useMemo(
    () => getColumns({ onEdit: handleEdit, onDelete: handleDelete }),
    []
  );

  if (isLoading) {
    return <LoadingState message="Loading companies..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load companies</p>
      </div>
    );
  }

  const companies = data?.items ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search companies..."
        />
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Company
        </Button>
      </div>

      {companies.length === 0 ? (
        <EmptyState
          title="No companies found"
          description={search ? 'Try adjusting your search' : 'Get started by adding a company'}
          action={
            !search && (
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Company
              </Button>
            )
          }
        />
      ) : (
        <>
          <DataTable columns={columns} data={companies} />
          <DataTablePagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}

      <CompanyDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        company={selectedCompany}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Delete Company"
        description={`Are you sure you want to delete "${selectedCompany?.name}"? This action cannot be undone.`}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
