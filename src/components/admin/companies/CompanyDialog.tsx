import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { companyCreateSchema, type CompanyFormValues } from '@/schemas/company';
import type { Company } from '@/types';

interface CompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  company?: Company | null;
  onSubmit: (data: CompanyFormValues) => void;
  isLoading?: boolean;
}

export function CompanyDialog({
  open,
  onOpenChange,
  company,
  onSubmit,
  isLoading,
}: CompanyDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companyCreateSchema),
    defaultValues: {
      name: '',
      description: '',
      logo_url: '',
      website: '',
      location: '',
      industry: '',
      is_agency_owned: false,
    },
  });

  useEffect(() => {
    if (open) {
      if (company) {
        reset({
          name: company.name,
          description: company.description || '',
          logo_url: company.logo_url || '',
          website: company.website || '',
          location: company.location || '',
          industry: company.industry || '',
          is_agency_owned: company.is_agency_owned,
        });
      } else {
        reset({
          name: '',
          description: '',
          logo_url: '',
          website: '',
          location: '',
          industry: '',
          is_agency_owned: false,
        });
      }
    }
  }, [open, company, reset]);

  const isAgencyOwned = watch('is_agency_owned');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {company ? 'Edit Company' : 'Add Company'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input id="name" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register('description')} rows={3} />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register('location')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" {...register('industry')} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" type="url" {...register('website')} placeholder="https://" />
            {errors.website && (
              <p className="text-sm text-red-600">{errors.website.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo_url">Logo URL</Label>
            <Input id="logo_url" type="url" {...register('logo_url')} placeholder="https://" />
            {errors.logo_url && (
              <p className="text-sm text-red-600">{errors.logo_url.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Company Type</Label>
            <Select
              value={isAgencyOwned ? 'agency' : 'external'}
              onValueChange={(value: string) => setValue('is_agency_owned', value === 'agency')}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="external">External Client</SelectItem>
                <SelectItem value="agency">Agency Owned</SelectItem>
              </SelectContent>
            </Select>
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
              {isLoading ? 'Saving...' : company ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
