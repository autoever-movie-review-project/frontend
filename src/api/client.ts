import axios from 'axios';
import { getCookie, removeCookie } from 'util/cookieUtil';

export const API_SERVER_HOST = 'http://localhost:8081';
const prefix = `${API_SERVER_HOST}/api`;

export const client = axios.create({
  baseURL: prefix,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * axios 요청을 보내기 전에 쿠키에 accessToken이 있는지 확인하여 없으면 에러를 반환합니다.
 */
client.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 서버로 부터 응답을 받은 후, 실제 데이터가 애플리케이션에 전달되기 전에
 * 토큰의 만료 여부를 확인합니다.
 */
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // 토큰이 만료된 경우
      removeCookie('accessToken');
      // refreshToken을 사용해서 accessToken을 다시 받아오는 로직 필요
    }
    return Promise.reject(error);
  }
);
