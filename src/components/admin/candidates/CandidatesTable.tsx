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
import { CandidateDialog } from './CandidateDialog';
import { CandidateDetailDialog } from './CandidateDetailDialog';
import { StageUpdateDialog } from './StageUpdateDialog';
import { getColumns } from './columns';
import {
  useCandidates,
  useCreateCandidate,
  useUpdateCandidateStage,
  useDeleteCandidate,
} from '@/hooks/use-candidates';
import { PIPELINE_STAGES, STAGE_LABELS } from '@/lib/api/candidates';
import type { CandidateFormValues, CandidateStageFormValues } from '@/schemas/candidate';
import type { Candidate, LeadSource } from '@/types';

const SOURCE_OPTIONS = [
  { value: 'website', label: 'Website' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'referral', label: 'Referral' },
  { value: 'other', label: 'Other' },
];

export function CandidatesTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('__all__');
  const [sourceFilter, setSourceFilter] = useState<string>('__all__');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [stageDialogOpen, setStageDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const { data, isLoading, error } = useCandidates({
    page,
    page_size: pageSize,
    search: search || undefined,
    stage: stageFilter !== '__all__' ? stageFilter : undefined,
    source: (sourceFilter !== '__all__' ? sourceFilter : undefined) as LeadSource | undefined,
  });
  const createMutation = useCreateCandidate();
  const updateStageMutation = useUpdateCandidateStage();
  const deleteMutation = useDeleteCandidate();

  const handleView = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setDetailDialogOpen(true);
  };

  const handleDelete = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setDeleteDialogOpen(true);
  };

  const handleStageUpdate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setStageDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async (formData: CandidateFormValues) => {
    await createMutation.mutateAsync(formData);
    handleDialogClose();
  };

  const handleStageSubmit = async (formData: CandidateStageFormValues) => {
    if (selectedCandidate) {
      await updateStageMutation.mutateAsync({
        id: selectedCandidate.id,
        stage: formData.stage,
        notes: formData.notes,
      });
      setStageDialogOpen(false);
      setSelectedCandidate(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedCandidate) {
      await deleteMutation.mutateAsync(selectedCandidate.id);
      setDeleteDialogOpen(false);
      setSelectedCandidate(null);
    }
  };

  const columns = useMemo(
    () => getColumns({
      onView: handleView,
      onDelete: handleDelete,
      onStageUpdate: handleStageUpdate,
    }),
    []
  );

  if (isLoading) {
    return <LoadingState message="Loading candidates..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load candidates</p>
      </div>
    );
  }

  const candidates = data?.items ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search candidates..."
          />
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Stages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All Stages</SelectItem>
              {PIPELINE_STAGES.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {STAGE_LABELS[stage] || stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Sources" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All Sources</SelectItem>
              {SOURCE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Candidate
        </Button>
      </div>

      {candidates.length === 0 ? (
        <EmptyState
          title="No candidates found"
          description={search || stageFilter !== '__all__' || sourceFilter !== '__all__' ? 'Try adjusting your filters' : 'Get started by adding a candidate'}
          action={
            !search && stageFilter === '__all__' && sourceFilter === '__all__' && (
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Candidate
              </Button>
            )
          }
        />
      ) : (
        <>
          <DataTable columns={columns} data={candidates} />
          <DataTablePagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}

      <CandidateDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending}
      />

      <CandidateDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        candidate={selectedCandidate}
      />

      <StageUpdateDialog
        open={stageDialogOpen}
        onOpenChange={setStageDialogOpen}
        candidate={selectedCandidate}
        onSubmit={handleStageSubmit}
        isLoading={updateStageMutation.isPending}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Delete Candidate"
        description="Are you sure you want to delete this candidate? This action cannot be undone."
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
