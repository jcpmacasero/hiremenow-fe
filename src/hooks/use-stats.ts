import { useQuery } from '@tanstack/react-query';
import { statsApi } from '@/lib/api/stats';

export const statsKeys = {
  all: ['stats'] as const,
  dashboard: () => [...statsKeys.all, 'dashboard'] as const,
};

export function useDashboardStats() {
  return useQuery({
    queryKey: statsKeys.dashboard(),
    queryFn: () => statsApi.getDashboard(),
  });
}
