import axios from 'axios';
import { getCookie, removeCookie, setCookie } from 'util/cookieUtil';

export const client = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// axios 요청을 보내기 전에 쿠키에 accessToken이 있는지 확인하여 없으면 에러를 반환합니다.
client.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Axios 인터셉터: Access Token 확인');
    }
    return config;
  },
  (error) => {
    console.log('Axios 인터셉터: Access Token을 찾는데 실패했습니다.');
    return Promise.reject(error);
  }
);

// 서버로 부터 응답을 받은 후, 실제 데이터가 애플리케이션에 전달되기 전에 토큰의 만료 여부를 확인합니다.
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refreshToken은 httpOnly 쿠키로 자동 전송됨
        const response = await client.post('/user/reissue-token');

        // 새로운 accessToken을 쿠키에 저장
        const newAccessToken = response.data.accessToken;
        setCookie('accessToken', newAccessToken, 5); // 5분

        // 새로운 토큰으로 헤더 업데이트
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 실패했던 요청 재시도
        return client(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우
        removeCookie('accessToken');
        // 로그인 페이지로 리다이렉트
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const publicClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
});
