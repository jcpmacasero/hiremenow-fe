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
import { JobDialog } from './JobDialog';
import { getColumns } from './columns';
import {
  useJobs,
  useCreateJob,
  useUpdateJob,
  useDeleteJob,
} from '@/hooks/use-jobs';
import { useCompanies } from '@/hooks/use-companies';
import { JOB_STATUS_LABELS } from '@/lib/api/jobs';
import type { JobFormValues } from '@/schemas/job';
import type { Job, JobStatus } from '@/types';

export function JobsTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('__all__');
  const [companyFilter, setCompanyFilter] = useState<string>('__all__');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const { data, isLoading, error } = useJobs({
    page,
    page_size: pageSize,
    search: search || undefined,
    status: (statusFilter !== '__all__' ? statusFilter : undefined) as JobStatus | undefined,
    company_id: companyFilter !== '__all__' ? companyFilter : undefined,
  });
  const { data: companiesData } = useCompanies({ page_size: 100 });
  const createMutation = useCreateJob();
  const updateMutation = useUpdateJob();
  const deleteMutation = useDeleteJob();

  const handleEdit = (job: Job) => {
    setSelectedJob(job);
    setDialogOpen(true);
  };

  const handleDelete = (job: Job) => {
    setSelectedJob(job);
    setDeleteDialogOpen(true);
  };

  const handleApprove = async (job: Job) => {
    await updateMutation.mutateAsync({ id: job.id, data: { status: 'active' } });
  };

  const handleReject = async (job: Job) => {
    await updateMutation.mutateAsync({ id: job.id, data: { status: 'rejected' } });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedJob(null);
  };

  const handleSubmit = async (formData: JobFormValues) => {
    if (selectedJob) {
      await updateMutation.mutateAsync({ id: selectedJob.id, data: formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
    handleDialogClose();
  };

  const handleConfirmDelete = async () => {
    if (selectedJob) {
      await deleteMutation.mutateAsync(selectedJob.id);
      setDeleteDialogOpen(false);
      setSelectedJob(null);
    }
  };

  const columns = useMemo(
    () => getColumns({
      onEdit: handleEdit,
      onDelete: handleDelete,
      onApprove: handleApprove,
      onReject: handleReject,
    }),
    []
  );

  if (isLoading) {
    return <LoadingState message="Loading jobs..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load jobs</p>
      </div>
    );
  }

  const jobs = data?.items ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search jobs..."
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All Statuses</SelectItem>
              {Object.entries(JOB_STATUS_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={companyFilter} onValueChange={setCompanyFilter}>
            <SelectTrigger className="w-[180px]">
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
          Create Job
        </Button>
      </div>

      {jobs.length === 0 ? (
        <EmptyState
          title="No jobs found"
          description={search || statusFilter !== '__all__' || companyFilter !== '__all__' ? 'Try adjusting your filters' : 'Get started by creating a job'}
          action={
            !search && statusFilter === '__all__' && companyFilter === '__all__' && (
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Job
              </Button>
            )
          }
        />
      ) : (
        <>
          <DataTable columns={columns} data={jobs} />
          <DataTablePagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}

      <JobDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        job={selectedJob}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Delete Job"
        description={`Are you sure you want to delete "${selectedJob?.title}"? This action cannot be undone.`}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
