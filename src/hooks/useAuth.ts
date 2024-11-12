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

  const { data: user, isLoading } = useQuery({
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
      // response.data에서 user 정보를 가져와 캐시에 저장
      queryClient.setQueryData(['user'], response);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.removeQueries({ queryKey: ['user'], exact: true });
    },
  });

  return {
    user,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading,
    error: loginMutation.error || logoutMutation.error,
    isLoginLoading: loginMutation.isPending,
  };
};
