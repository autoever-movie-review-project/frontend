import React, { useEffect } from 'react';
import Button from 'components/Button';
import { useForm } from 'react-hook-form';
import KakaoImg from 'assets/kakao_login_large_wide.png';
import { getKakaoLoginLink } from 'api/auth/kakaoApi';
import { LoginRequest, LoginSuccessResponse } from 'api/auth/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { authApi } from 'api/auth/authApi';
import * as S from './LoginPage.style';
import * as L from '../../components/Loading';
import { toast } from 'react-toastify';
import logo from 'assets/logo.png';

const link = getKakaoLoginLink();

/**
 * 로그인 페이지 컴포넌트입니다.
 * 일반 로그인과 카카오 소셜 로그인을 제공합니다.
 */
function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  // 이미 로그인된 사용자는 홈페이지로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data: LoginSuccessResponse) => {
      console.log(data);
      toast.success('로그인이 완료되었습니다!');
      navigate('/');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  /**
   * 로그인 폼 제출을 처리하는 함수입니다.
   * @param {LoginRequest} data - 이메일과 비밀번호가 포함된 로그인 데이터
   */
  const onSubmit = (data: LoginRequest) => {
    login(data);
  };

  /**
   * 카카오 로그인 페이지로 리다이렉트하는 함수입니다.
   */
  const handleKakaoLogin = () => {
    window.location.href = link;
  };

  // Auth 상태 로딩 중일 때 로딩 화면 표시
  if (isLoading) {
    return (
      <L.LoadingOverlay>
        <L.LoadingCircle />
      </L.LoadingOverlay>
    );
  }

  return (
    <S.Background>
      {/* 로그인 요청 중일 때만 로딩 표시 */}
      {isLoginPending && (
        <L.LoadingOverlay>
          <L.LoadingCircle />
        </L.LoadingOverlay>
      )}
      <S.Layout>
        <S.LoginSection>
          <S.Logo src={logo}></S.Logo>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <S.LoginInput
              type="email"
              title="이메일"
              autoComplete="email"
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '올바른 이메일 형식이 아니에요.',
                },
              })}
            />
            {errors.email && <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>}
            <S.LoginInput
              type="password"
              title="비밀번호"
              autoComplete="current-password"
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 6,
                  message: '비밀번호는 최소 6자 이상이어야 해요.',
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,18}$/,
                  message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 해요.',
                },
              })}
            />
            {errors.password && <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>}
            <S.ButtonSection>
              <Button
                text={isLoginPending ? '로그인 중...' : '로그인'}
                width="300px"
                onClick={handleSubmit(onSubmit)}
              />
              <S.KakaoButton
                src={KakaoImg}
                onClick={handleKakaoLogin}
                alt="카카오 로그인"
                aria-label="카카오 계정으로 로그인"
              />
            </S.ButtonSection>
          </form>
          <S.UnableToLoginSection>
            <S.StyledLink to="/register">회원가입하기</S.StyledLink>
            <span> | </span>
            <p>비밀번호 재설정</p>
          </S.UnableToLoginSection>
        </S.LoginSection>
      </S.Layout>
    </S.Background>
  );
}

export default LoginPage;
