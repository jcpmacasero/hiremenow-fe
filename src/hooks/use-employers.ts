import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employersApi, type EmployerFilters } from '@/lib/api/employers';
import type { EmployerCreate } from '@/types';

export const employerKeys = {
  all: ['employers'] as const,
  lists: () => [...employerKeys.all, 'list'] as const,
  list: (filters: EmployerFilters) => [...employerKeys.lists(), filters] as const,
  details: () => [...employerKeys.all, 'detail'] as const,
  detail: (id: string) => [...employerKeys.details(), id] as const,
};

export function useEmployers(filters: EmployerFilters = {}) {
  return useQuery({
    queryKey: employerKeys.list(filters),
    queryFn: () => employersApi.list(filters),
  });
}

export function useEmployer(id: string) {
  return useQuery({
    queryKey: employerKeys.detail(id),
    queryFn: () => employersApi.get(id),
    enabled: !!id,
  });
}

export function useCreateEmployer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EmployerCreate) => employersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employerKeys.lists() });
    },
  });
}

export function useDeleteEmployer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => employersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employerKeys.lists() });
    },
  });
}
