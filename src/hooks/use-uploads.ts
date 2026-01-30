import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadsApi } from '@/lib/api/uploads';
import { candidateKeys } from './use-candidates';

export function useUploadPhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ candidateId, file }: { candidateId: string; file: File }) =>
      uploadsApi.uploadPhoto(candidateId, file),
    onSuccess: (_, { candidateId }) => {
      queryClient.invalidateQueries({ queryKey: candidateKeys.detail(candidateId) });
      queryClient.invalidateQueries({ queryKey: candidateKeys.lists() });
    },
  });
}

export function useUploadResume() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ candidateId, file }: { candidateId: string; file: File }) =>
      uploadsApi.uploadResume(candidateId, file),
    onSuccess: (_, { candidateId }) => {
      queryClient.invalidateQueries({ queryKey: candidateKeys.detail(candidateId) });
      queryClient.invalidateQueries({ queryKey: candidateKeys.lists() });
    },
  });
}

export function useDeletePhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (candidateId: string) => uploadsApi.deletePhoto(candidateId),
    onSuccess: (_, candidateId) => {
      queryClient.invalidateQueries({ queryKey: candidateKeys.detail(candidateId) });
      queryClient.invalidateQueries({ queryKey: candidateKeys.lists() });
    },
  });
}

export function useDeleteResume() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (candidateId: string) => uploadsApi.deleteResume(candidateId),
    onSuccess: (_, candidateId) => {
      queryClient.invalidateQueries({ queryKey: candidateKeys.detail(candidateId) });
      queryClient.invalidateQueries({ queryKey: candidateKeys.lists() });
    },
  });
}
