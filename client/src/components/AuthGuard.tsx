import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { toast } from 'react-toastify';

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean; // true: 인증 필요, false: 비인증 필요
}

export const AuthGuard = ({ children, requireAuth = true }: AuthGuardProps) => {
  const { user, isUserLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoading) {
      if (requireAuth && !user) {
        // 인증이 필요한데 로그인이 안된 경우
        toast('🍿 로그인 후 이용해주세요.', {
          // limit: 1, // 동시에 표시되는 토스트 메시지를 1개로 제한
          toastId: 'auth-required', // 동일한 ID를 가진 토스트는 중복 표시되지 않음
        });
        navigate('/login');
      } else if (!requireAuth && user) {
        // 비인증이 필요한데 로그인이 된 경우
        navigate('/');
      }
    }
  }, [user, isUserLoading, navigate, requireAuth]);

  // 로딩 중에는 아무것도 렌더링하지 않음
  if (isUserLoading) {
    return null;
  }

  // 조건에 맞는 경우에만 children 렌더링
  if ((requireAuth && user) || (!requireAuth && !user)) {
    return <>{children}</>;
  }

  return null;
};
