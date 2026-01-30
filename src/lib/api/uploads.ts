import api from '../api';
import type { UploadResponse } from '@/types';

export const uploadsApi = {
  uploadPhoto: async (candidateId: string, file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(
      `/admin/uploads/candidates/${candidateId}/photo`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  },

  uploadResume: async (candidateId: string, file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(
      `/admin/uploads/candidates/${candidateId}/resume`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  },

  deletePhoto: async (candidateId: string): Promise<void> => {
    await api.delete(`/admin/uploads/candidates/${candidateId}/photo`);
  },

  deleteResume: async (candidateId: string): Promise<void> => {
    await api.delete(`/admin/uploads/candidates/${candidateId}/resume`);
  },
};
