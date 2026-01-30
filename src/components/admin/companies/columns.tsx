import type { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Company } from '@/types';

interface ColumnActions {
  onEdit: (company: Company) => void;
  onDelete: (company: Company) => void;
}

export function getColumns({ onEdit, onDelete }: ColumnActions): ColumnDef<Company>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-slate-900">{row.original.name}</div>
          {row.original.industry && (
            <div className="text-sm text-slate-500">{row.original.industry}</div>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'location',
      header: 'Location',
      cell: ({ row }) => row.original.location || '-',
    },
    {
      accessorKey: 'is_agency_owned',
      header: 'Type',
      cell: ({ row }) => (
        <Badge variant={row.original.is_agency_owned ? 'default' : 'secondary'}>
          {row.original.is_agency_owned ? 'Agency' : 'External'}
        </Badge>
      ),
    },
    {
      accessorKey: 'is_active',
      header: 'Status',
      cell: ({ row }) => (
        <Badge
          className={
            row.original.is_active
              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
              : 'bg-slate-100 text-slate-800 hover:bg-slate-100'
          }
        >
          {row.original.is_active ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(row.original)}
          >
            <Pencil className="h-4 w-4" />
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
