import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginRequest, LoginSuccessResponse, User } from 'api/auth/auth';
import { authApi } from 'api/auth/authApi';
import { client } from 'api/client';
import { getCookie } from 'util/cookieUtil';

/**
 * 인증 관련 기능을 제공하는 커스텀 훅입니다.
 */
export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const token = getCookie('accessToken');
      if (!token) return null;

      try {
        const response = await client.get<User>('/user/', {
          headers: { authorization: `Bearer ${token}` },
        });
        return response;
      } catch (error) {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  const loginMutation = useMutation<LoginSuccessResponse, Error, LoginRequest>({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      queryClient.setQueryData(['user'], response);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.removeQueries({ queryKey: ['user'], exact: true });
    },
  });

  // 전체 로딩 상태 계산
  const isLoading = isUserLoading || loginMutation.isPending;

  return {
    user,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading, // 전체 로딩 상태
    isUserLoading, // 유저 정보 로딩 상태
    isLoginLoading: loginMutation.isPending, // 로그인 로딩 상태
    error: loginMutation.error || logoutMutation.error,
  };
};
