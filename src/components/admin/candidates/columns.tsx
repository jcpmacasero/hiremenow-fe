import type { ColumnDef } from '@tanstack/react-table';
import { Eye, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Candidate } from '@/types';
import { STAGE_LABELS } from '@/lib/api/candidates';

interface ColumnActions {
  onView: (candidate: Candidate) => void;
  onDelete: (candidate: Candidate) => void;
  onStageUpdate: (candidate: Candidate) => void;
}

const SOURCE_LABELS: Record<string, string> = {
  website: 'Website',
  facebook: 'Facebook',
  instagram: 'Instagram',
  referral: 'Referral',
  other: 'Other',
};

const STAGE_BADGE_CLASSES: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-sky-100 text-sky-800',
  documents_pending: 'bg-yellow-100 text-yellow-800',
  documents_submitted: 'bg-amber-100 text-amber-800',
  interview_scheduled: 'bg-purple-100 text-purple-800',
  interview_completed: 'bg-violet-100 text-violet-800',
  offer_pending: 'bg-orange-100 text-orange-800',
  offer_accepted: 'bg-emerald-100 text-emerald-800',
  visa_processing: 'bg-cyan-100 text-cyan-800',
  deployed: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  withdrawn: 'bg-slate-100 text-slate-800',
};

export function getColumns({ onView, onDelete, onStageUpdate }: ColumnActions): ColumnDef<Candidate>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        const firstName = row.original.first_name || '';
        const lastName = row.original.last_name || '';
        const fullName = `${firstName} ${lastName}`.trim() || 'No name';
        return (
          <div>
            <div className="font-medium text-slate-900">{fullName}</div>
            <div className="text-sm text-slate-500">{row.original.user.email}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => row.original.phone || '-',
    },
    {
      accessorKey: 'source',
      header: 'Source',
      cell: ({ row }) => (
        <Badge variant="outline">
          {SOURCE_LABELS[row.original.source] || row.original.source}
        </Badge>
      ),
    },
    {
      accessorKey: 'current_stage',
      header: 'Stage',
      cell: ({ row }) => (
        <Badge className={`${STAGE_BADGE_CLASSES[row.original.current_stage] || 'bg-slate-100 text-slate-800'} hover:opacity-90`}>
          {STAGE_LABELS[row.original.current_stage] || row.original.current_stage}
        </Badge>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Created',
      cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onStageUpdate(row.original)}
            title="Update Stage"
          >
            <ArrowRight className="h-4 w-4 text-emerald-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView(row.original)}
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(row.original)}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];
}
