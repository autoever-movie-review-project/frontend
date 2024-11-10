import axios from 'axios';

export const API_SERVER_HOST = 'http://localhost:8081';
const prefix = `${API_SERVER_HOST}/api/signup`;

interface RegisterRequest {
  email: string;
  password: string;
  nickname: string;
}

interface RegisterResponse {
  success: boolean;
  message?: string;
  userId?: number;
}

/**
 * 회원가입 API를 호출하는 함수입니다.
 * @param registerData 회원가입에 필요한 데이터 (이메일, 비밀번호, 닉네임)
 * @returns API 호출 결과
 */
// export const registerMember = async (registerData: RegisterRequest): Promise<RegisterResponse> => {
//   try {
//     const response = await axios.post<RegisterResponse>(`${prefix}/api/user/signup`, registerData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
