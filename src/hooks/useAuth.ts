import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserResponse } from 'api/auth/auth';
import { authApi } from 'api/auth/authApi';
import { client } from 'api/client';
import { getCookie } from 'util/cookieUtil';

/**
 * 인증 관련 기능을 제공하는 커스텀 훅입니다.
 * 사용자 정보 조회, 인증 상태 확인, 로그아웃 기능을 제공합니다.
 *
 * @returns {Object} 인증 관련 상태와 함수들을 포함한 객체
 * @property {User | null} user - 현재 로그인한 사용자 정보
 * @property {boolean} isLoading - 사용자 정보 로딩 상태
 * @property {boolean} isAuthenticated - 사용자 인증 여부
 * @property {() => void} logout - 로그아웃 함수
 *
 * @example
 * ```tsx
 * function Header() {
 *   const { user, isAuthenticated, logout } = useAuth();
 *
 *   if (isAuthenticated) {
 *     return (
 *       <div>
 *         <span>Welcome, {user.nickname}!</span>
 *         <button onClick={logout}>Logout</button>
 *       </div>
 *     );
 *   }
 *   return <Link to="/login">Login</Link>;
 * }
 * ```
 */
export const useAuth = () => {
  const queryClient = useQueryClient();

  /**
   * 현재 로그인한 사용자의 정보를 조회하는 쿼리입니다.
   * accessToken이 있는 경우에만 API를 호출하며,
   * 토큰이 없거나 API 호출이 실패하면 null을 반환합니다.
   */
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const token = getCookie('accessToken');
      if (!token) return null;

      try {
        const response = await client.get<UserResponse>('/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.data;
      } catch (error) {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 데이터를 5분간 신선한 상태로 유지
  });

  /**
   * 로그아웃 처리를 위한 뮤테이션입니다.
   * 로그아웃 성공 시 user 쿼리 데이터를 null로 초기화합니다.
   * authApi 대신 이 mutation을 사용하세요.
   */
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout: logoutMutation.mutate,
  };
};
