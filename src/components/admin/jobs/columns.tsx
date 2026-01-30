import type { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Job, JobStatus } from '@/types';
import { JOB_STATUS_LABELS } from '@/lib/api/jobs';

interface ColumnActions {
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
  onApprove: (job: Job) => void;
  onReject: (job: Job) => void;
}

const STATUS_BADGE_CLASSES: Record<JobStatus, string> = {
  draft: 'bg-slate-100 text-slate-800 hover:bg-slate-100',
  pending_approval: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  active: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100',
  paused: 'bg-orange-100 text-orange-800 hover:bg-orange-100',
  closed: 'bg-slate-100 text-slate-800 hover:bg-slate-100',
  rejected: 'bg-red-100 text-red-800 hover:bg-red-100',
};

export function getColumns({ onEdit, onDelete, onApprove, onReject }: ColumnActions): ColumnDef<Job>[] {
  return [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-slate-900">{row.original.title}</div>
          <div className="text-sm text-slate-500">{row.original.company.name}</div>
        </div>
      ),
    },
    {
      accessorKey: 'location',
      header: 'Location',
      cell: ({ row }) => (
        <span>
          {row.original.city ? `${row.original.city}, ` : ''}{row.original.country}
        </span>
      ),
    },
    {
      accessorKey: 'slots',
      header: 'Slots',
      cell: ({ row }) => (
        <span>
          {row.original.filled_slots}/{row.original.total_slots}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge className={STATUS_BADGE_CLASSES[row.original.status]}>
          {JOB_STATUS_LABELS[row.original.status]}
        </Badge>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const job = row.original;
        const isPending = job.status === 'pending_approval';

        return (
          <div className="flex items-center gap-1">
            {isPending && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onApprove(job)}
                  title="Approve"
                >
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onReject(job)}
                  title="Reject"
                >
                  <XCircle className="h-4 w-4 text-red-600" />
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(job)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(job)}
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        );
      },
    },
  ];
}
