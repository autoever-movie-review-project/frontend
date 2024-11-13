import axios from 'axios';
import { API_SERVER_HOST } from '../client';

const REST_API_KEY: string = '1e06d291e4149fbebab01d2b56a28306';
const REDIRECT_URI: string = 'http://localhost:5173/member/kakao';
const AUTH_CODE_PATH: string = 'https://kauth.kakao.com/oauth/authorize';
const ACCESS_TOKEN_URL: string = 'https://kauth.kakao.com/oauth/token';

interface KakaoTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

interface KakaoMemberResponse {
  id: number;
}

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
    const response = await axios.post<KakaoTokenResponse>(ACCESS_TOKEN_URL, params, header);
    return response.data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to get access token: ${error.message}`);
    }
    throw error;
  }
};

export const getMemberWithAccessToken = async (accessToken: string): Promise<KakaoMemberResponse> => {
  try {
    const response = await axios.get<KakaoMemberResponse>(
      `${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to get member info: ${error.message}`);
    }
    throw error;
  }
};
