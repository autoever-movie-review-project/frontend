import { Cookies } from 'react-cookie';

const cookies = new Cookies();

interface CookieOptions {
  expires: Date;
  path: string;
}

/**
 * 쿠키를 설정합니다.
 * @param name - 쿠키 이름 (예: 'accessToken' 또는 'refreshToken')
 * @param value - 쿠키 값
 * @param days - 쿠키 만료 기간 (일)
 */
export const setCookie = (name: string, value: string, days: number): void => {
  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + days);

  const options: CookieOptions = {
    expires: expires,
    path: '/',
  };

  cookies.set(name, value, options);
};

/**
 * 쿠키 값을 가져옵니다.
 * @param name - 가져올 쿠키의 이름
 * @returns 쿠키 값 또는 undefined
 */
export const getCookie = (name: string): string | undefined => {
  return cookies.get(name);
};

/**
 * 쿠키를 제거합니다.
 * @param name - 제거할 쿠키의 이름
 * @param path - 쿠키 경로 (기본값: '/')
 */
export const removeCookie = (name: string, path: string = '/'): void => {
  cookies.remove(name, { path });
};
