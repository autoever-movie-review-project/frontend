import { client } from 'api/client';
import { RegisterRequest, RegisterResponse, LoginRequest, LoginSuccessResponse, LoginErrorResponse } from './auth';
import { removeCookie, setCookie } from 'util/cookieUtil';
import axios, { AxiosError } from 'axios';

export const authApi = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await client.post<RegisterResponse>('/user/signup', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<LoginSuccessResponse> => {
    try {
      const response = await client.post<LoginSuccessResponse>('/user/login', data);

      if (response.status === 201) {
        // Authorization 헤더에서 accessToken 추출
        const authHeader = response.headers['Authorization'];
        const accessToken = authHeader?.replace('Bearer ', '');

        if (accessToken) {
          // accessToken을 로컬에 저장 (refreshToken은 HttpOnly 쿠키로 자동 저장됨)
          setCookie('accessToken', accessToken, 1);
        }

        return response.data;
      }

      throw new Error('Login failed');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<LoginErrorResponse>;
        throw new Error(axiosError.response?.data.msg || '로그인에 실패했습니다.');
      }
      throw error;
    }
  },

  /**
   * import해서 사용하지 마시고 useAuth hook을 사용해서 로그아웃 처리를 진행해주세요.
   *  */
  logout: async (): Promise<void> => {
    try {
      await client.post('user/logout');
    } finally {
      removeCookie('accessToken');
      removeCookie('refreshToken');
    }
  },
};
