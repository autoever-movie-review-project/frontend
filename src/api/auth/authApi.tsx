import { client } from 'api/client';
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginSuccessResponse,
  CodeVerificationRequest,
  EmailRequest,
} from './auth';
import { getCookie, removeCookie, setCookie } from 'util/cookieUtil';
import axios from 'axios';

export const authApi = {
  checkExistingEmail: async (data: EmailRequest) => {
    const response = await client.get(`/user/check-login-email?email=${data.email}`);
    return response.data;
  },

  sendVerificationCode: async (data: EmailRequest) => {
    const response = await client.post(`/user/send-email-code?email=${data.email}`);
    return response.data;
  },

  verifyCode: async (data: CodeVerificationRequest) => {
    const response = await client.post('/user/check-email-code', {
      email: data.email,
      code: data.code,
    });
    return response.data;
  },

  register: async (data: RegisterRequest) => {
    const response = await client.post<RegisterResponse>('/user/signup', {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    });
    return response.data;
  },

  login: async (data: LoginRequest): Promise<LoginSuccessResponse> => {
    try {
      const response = await client.post<LoginSuccessResponse>('/user/login', {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        // Authorization 헤더에서 accessToken 추출
        const authHeader = response.headers['authorization'];
        const accessToken = authHeader?.replace('Bearer ', '');

        // accessToken이 존재하면 쿠키에 저장 (refreshToken은 HttpOnly 쿠키로 자동 저장됨)
        if (accessToken) {
          setCookie('accessToken', accessToken, 5);
        }

        return response.data;
      }

      throw new Error('Login failed');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }
      throw error;
    }
  },

  /**
   * 이 API를 import해서 사용하지 마시고 useAuth mutation을 사용해서 로그아웃 처리를 진행해주세요.
   *  */
  logout: async (): Promise<void> => {
    console.log('로그아웃 시도');
    try {
      const token = getCookie('accessToken');
      const response = await client.post('/user/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      removeCookie('accessToken', '/');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }
      throw error;
    }
  },
};
