export interface RegisterRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  userId?: number;
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
}

export interface LoginErrorResponse {
  msg: string;
}

export interface User {
  userId: number;
  email: string;
  nickname: string;
  profile?: string;
  userType?: string;
  points?: number;
}

export interface UserResponse {
  success: boolean;
  message?: string;
  data: User;
}
