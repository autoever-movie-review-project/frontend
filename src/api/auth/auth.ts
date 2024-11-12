export interface EmailRequest {
  email: string;
}

export interface RegisterRequest extends EmailRequest {
  password: string;
  nickname: string;
}

export interface CodeVerificationRequest extends EmailRequest {
  code: number;
}

export interface RegisterResponse {
  success: boolean;
  msg?: string;
}

export interface RegisterError {
  msg: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  nickname: string;
  profile: string;
  userType: 'ROLE_SOCIAL' | 'ROLE_USER';
  points: number;
  rankName: string;
  rankImg: string;
}

export interface LoginErrorResponse {
  msg: string;
}

export interface User {
  email: string;
  nickname: string;
  profile: string;
  points: number;
  rankName: string;
  rankImg: string;
}

export interface UserResponse extends User {
  success: boolean;
  msg?: string;
  data: User;
}
