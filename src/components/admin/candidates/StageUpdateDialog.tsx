import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { candidateStageSchema, type CandidateStageFormValues } from '@/schemas/candidate';
import { PIPELINE_STAGES, STAGE_LABELS } from '@/lib/api/candidates';
import type { Candidate } from '@/types';

interface StageUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidate: Candidate | null;
  onSubmit: (data: CandidateStageFormValues) => void;
  isLoading?: boolean;
}

export function StageUpdateDialog({
  open,
  onOpenChange,
  candidate,
  onSubmit,
  isLoading,
}: StageUpdateDialogProps) {
  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm<CandidateStageFormValues>({
    resolver: zodResolver(candidateStageSchema),
    defaultValues: {
      stage: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (open && candidate) {
      reset({
        stage: candidate.current_stage,
        notes: '',
      });
    }
  }, [open, candidate, reset]);

  const stage = watch('stage');

  if (!candidate) return null;

  const fullName = `${candidate.first_name || ''} ${candidate.last_name || ''}`.trim() || candidate.user.email;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Pipeline Stage</DialogTitle>
          <DialogDescription>
            Update the stage for {fullName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Current Stage</Label>
            <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded">
              {STAGE_LABELS[candidate.current_stage] || candidate.current_stage}
            </p>
          </div>

          <div className="space-y-2">
            <Label>New Stage *</Label>
            <Select
              value={stage}
              onValueChange={(value: string) => setValue('stage', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select new stage" />
              </SelectTrigger>
              <SelectContent>
                {PIPELINE_STAGES.map((stageValue) => (
                  <SelectItem key={stageValue} value={stageValue}>
                    {STAGE_LABELS[stageValue] || stageValue}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.stage && (
              <p className="text-sm text-red-600">{errors.stage.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              rows={3}
              placeholder="Add notes about this stage change..."
            />
            {errors.notes && (
              <p className="text-sm text-red-600">{errors.notes.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Stage'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
