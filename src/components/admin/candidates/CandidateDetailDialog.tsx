import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import type { Candidate } from '@/types';
import { STAGE_LABELS } from '@/lib/api/candidates';

interface CandidateDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidate: Candidate | null;
}

const SOURCE_LABELS: Record<string, string> = {
  website: 'Website',
  facebook: 'Facebook',
  instagram: 'Instagram',
  referral: 'Referral',
  other: 'Other',
};

const PASSPORT_STATUS_LABELS: Record<string, string> = {
  valid: 'Valid',
  expired: 'Expired',
  none: 'None',
  in_progress: 'In Progress',
};

export function CandidateDetailDialog({
  open,
  onOpenChange,
  candidate,
}: CandidateDetailDialogProps) {
  if (!candidate) return null;

  const fullName = `${candidate.first_name || ''} ${candidate.last_name || ''}`.trim() || 'No name';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Candidate Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500">Name</p>
              <p className="font-medium">{fullName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-medium">{candidate.user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500">Phone</p>
              <p className="font-medium">{candidate.phone || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Date of Birth</p>
              <p className="font-medium">
                {candidate.date_of_birth
                  ? new Date(candidate.date_of_birth).toLocaleDateString()
                  : '-'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500">Nationality</p>
              <p className="font-medium">{candidate.nationality || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Current Country</p>
              <p className="font-medium">{candidate.current_country || '-'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500">Passport Status</p>
              <Badge variant="outline">
                {PASSPORT_STATUS_LABELS[candidate.passport_status] || candidate.passport_status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-slate-500">Experience</p>
              <p className="font-medium">{candidate.experience_years} years</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500">Lead Source</p>
              <Badge variant="outline">
                {SOURCE_LABELS[candidate.source] || candidate.source}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-slate-500">Current Stage</p>
              <Badge className="bg-emerald-100 text-emerald-800">
                {STAGE_LABELS[candidate.current_stage] || candidate.current_stage}
              </Badge>
            </div>
          </div>

          {candidate.preferred_positions.length > 0 && (
            <div>
              <p className="text-sm text-slate-500 mb-2">Preferred Positions</p>
              <div className="flex flex-wrap gap-2">
                {candidate.preferred_positions.map((position, idx) => (
                  <Badge key={idx} variant="secondary">
                    {position}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {candidate.stage_notes && (
            <div>
              <p className="text-sm text-slate-500">Stage Notes</p>
              <p className="text-sm bg-slate-50 p-2 rounded">{candidate.stage_notes}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
            <div>
              <p className="text-sm text-slate-500">Created</p>
              <p className="text-sm">{new Date(candidate.created_at).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Stage Updated</p>
              <p className="text-sm">{new Date(candidate.stage_updated_at).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
