import type { ColumnDef } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Employer } from '@/types';

interface ColumnActions {
  onDelete: (employer: Employer) => void;
}

export function getColumns({ onDelete }: ColumnActions): ColumnDef<Employer>[] {
  return [
    {
      accessorKey: 'user.email',
      header: 'Email',
      cell: ({ row }) => (
        <span className="font-medium text-slate-900">
          {row.original.user.email}
        </span>
      ),
    },
    {
      accessorKey: 'company.name',
      header: 'Company',
      cell: ({ row }) => row.original.company.name,
    },
    {
      accessorKey: 'user.is_active',
      header: 'Status',
      cell: ({ row }) => (
        <Badge
          className={
            row.original.user.is_active
              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
              : 'bg-slate-100 text-slate-800 hover:bg-slate-100'
          }
        >
          {row.original.user.is_active ? 'Active' : 'Inactive'}
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
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(row.original)}
        >
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      ),
    },
  ];
}
