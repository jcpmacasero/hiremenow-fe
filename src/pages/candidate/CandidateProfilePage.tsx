import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { candidateApi, type CandidateProfile } from '@/lib/api/candidate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CandidateProfilePage() {
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useQuery({
    queryKey: ['candidate-profile'],
    queryFn: () => candidateApi.getProfile(),
  });
  const [form, setForm] = useState<Partial<CandidateProfile>>({});

  const updateMutation = useMutation({
    mutationFn: (data: Partial<CandidateProfile>) => candidateApi.updateProfile(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['candidate-profile'] }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(form);
  };

  if (isLoading || !profile) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  const current = { ...profile, ...form };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
      <p className="text-slate-600 mt-1">Update your personal and professional details.</p>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Personal information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first_name">First name</Label>
                <Input
                  id="first_name"
                  value={current.first_name ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, first_name: e.target.value || undefined }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last name</Label>
                <Input
                  id="last_name"
                  value={current.last_name ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, last_name: e.target.value || undefined }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email (read-only)</Label>
              <Input id="email" value={profile.user?.email ?? ''} disabled className="bg-slate-50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={current.phone ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value || undefined }))}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={current.nationality ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, nationality: e.target.value || undefined }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current_country">Current country</Label>
                <Input
                  id="current_country"
                  value={current.current_country ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, current_country: e.target.value || undefined }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Current stage (read-only)</Label>
              <Input value={current.current_stage ?? ''} disabled className="bg-slate-50 capitalize" />
            </div>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Saving...' : 'Save changes'}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
