import { RankType } from 'types/rank';

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

export interface User {
  userId?: number;
  email?: string;
  nickname?: string;
  profile?: string;
  points?: number;
  rankName?: RankType;
  rankImg?: string;
}

export interface LoginSuccessResponse extends User {
  userType: 'ROLE_SOCIAL' | 'ROLE_USER';
}
