import axios, { AxiosResponse } from 'axios';
// import { API_SERVER_HOST } from './todoApi';

const REST_API_KEY: string = '1e06d291e4149fbebab01d2b56a28306';
const REDIRECT_URI: string = 'http://localhost:5173/user/kakao';
const AUTH_CODE_PATH: string = 'https://kauth.kakao.com/oauth/authorize';
const ACCESS_TOKEN_URL: string = 'https://kauth.kakao.com/oauth/token';

interface KakaoTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  refresh_token_expires_in: number;
}

// interface User {
//   id: number;
// }

export const getKakaoLoginLink = (): string => {
  const kakaoURL: string = `${AUTH_CODE_PATH}?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  return kakaoURL;
};

export const getAccessToken = async (authCode: string): Promise<string> => {
  const header = {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  };

  const params = {
    grant_type: 'authorization_code',
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code: authCode,
  };

  try {
    const res: AxiosResponse<KakaoTokenResponse> = await axios.post(ACCESS_TOKEN_URL, params, header);
    const accessToken: string = res.data.access_token;
    return accessToken;
  } catch (error) {
    console.error('Failed to get access token:', error);
    throw error;
  }
};

// export const getMemberWithAccessToken = async (accessToken: string): Promise<User> => {
//   try {
//     const res: AxiosResponse<User> = await axios.get(`${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`);
//     return res.data;
//   } catch (error) {
//     console.error('Failed to get member info:', error);
//     throw error;
//   }
// };
