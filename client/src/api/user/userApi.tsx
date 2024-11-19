import { client } from 'api/client';
import { UpdateUserRequest } from './user';

export const userApi = {
  uploadProfileImage: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('images', file);

      const response = await client.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data; // { url: string }
    } catch (error) {
      console.error('프로필 이미지 업로드 실패:', error);
      throw error;
    }
  },

  updateProfile: async (data: UpdateUserRequest) => {
    const response = await client.put('/user/update-profile', {
      profile: data.profile,
    });
    return response.data;
  },

  updateUser: async (data: UpdateUserRequest) => {
    const response = await client.put('/user/update', {
      nickname: data.nickname,
    });
    return response.data;
  },

  updatePassword: async (data: UpdateUserRequest) => {
    const response = await client.put('/user/password', {
      password: data.newPassword,
    });
    return response.data;
  },
};
