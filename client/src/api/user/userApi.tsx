import { client } from 'api/client';

export interface UpdateUserRequest {
  nickname?: string;
  profile?: string;
  newPassword?: string;
}

export interface UpdateUserResponse {
  profile: string;
  nickname: string;
}

export const userApi = {
  uploadProfileImage: async (file: File) => {
    const formData = new FormData();
    formData.append('images', file);

    const response = await client.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      url: response.data, // S3 URL 문자열
    };
  },

  updateUser: async (updateData: UpdateUserRequest): Promise<UpdateUserResponse> => {
    const response = await client.put<UpdateUserResponse>('/user/update', updateData);
    return response.data;
  },

  updatePassword: async (data: UpdateUserRequest) => {
    const response = await client.put('/user/password', {
      password: data.newPassword,
    });
    return response.data;
  },
};
