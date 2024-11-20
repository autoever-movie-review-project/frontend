import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginRequest, LoginSuccessResponse, User } from 'api/auth/auth';
import { authApi } from 'api/auth/authApi';
import { client } from 'api/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCookie } from 'util/cookieUtil';

/**
 * 인증 관련 기능을 제공하는 커스텀 훅입니다.
 */
export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  // 카카오 로그인 후 리다이렉트 처리
  useEffect(() => {
    console.log('Current location:', location);
    console.log('Search params:', location.search);

    const searchParams = new URLSearchParams(location.search);
    const userDataStr = searchParams.get('user');
    console.log('User data from URL:', userDataStr);

    // 토큰 체크 추가
    const token = getCookie('accessToken');
    console.log('Current token:', token);

    if (userDataStr) {
      try {
        const userData = JSON.parse(decodeURIComponent(userDataStr));
        console.log('Parsed user data:', userData);
        queryClient.setQueryData(['user'], userData);
        navigate('/');
        toast.success(`${userData.nickname}님 환영합니다!`);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        navigate('/login');
      }
    } else if (token && !user) {
      // 토큰은 있지만 유저 데이터가 없는 경우 직접 fetch
      const fetchUserData = async () => {
        try {
          const response = await client.get<User>('/user', {
            headers: { authorization: `Bearer ${token}` },
          });
          queryClient.setQueryData(['user'], response.data);
          navigate('/');
          toast.success(`${response.data.nickname}님 환영합니다!`);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          navigate('/login');
        }
      };
      fetchUserData();
    }
  }, [location, queryClient, navigate, user]);

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
    user, // 현재 유저 정보
    isAuthenticated: !!user, // 로그인 여부
    login: loginMutation.mutate, // 로그인 함수
    logout: logoutMutation.mutateAsync, // 로그아웃 함수
    isLoading, // 전체 로딩 상태
    isUserLoading, // 유저 정보 로딩 상태
    isLoginLoading: loginMutation.isPending, // 로그인 로딩 상태
    error: loginMutation.error || logoutMutation.error, // 에러 상태
  };
};
