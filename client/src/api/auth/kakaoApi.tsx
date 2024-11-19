import axios from 'axios';

const REST_API_KEY: string = `${import.meta.env.VITE_KAKAO_API_KEY}`;
export const REDIRECT_URI: string = `${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;
const AUTH_CODE_PATH: string = 'https://kauth.kakao.com/oauth/authorize';

interface KakaoLoginResponse {
  userId: number;
  email: string;
  nickname: string;
  profile: string | null;
  points: number;
  rankName: string;
  rankImg: string | null;
}

export const getKakaoLoginLink = (): string => {
  return `${AUTH_CODE_PATH}?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
};

export const handleKakaoLogin = async (code: string): Promise<KakaoLoginResponse> => {
  const response = await axios.get<KakaoLoginResponse>(`${REDIRECT_URI}?code=${code}`);
  return response.data;
};
