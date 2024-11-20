import React from 'react';
import Button from 'components/Button';
import { useForm } from 'react-hook-form';
import KakaoImg from 'assets/kakao_login_large_wide.png';
import { getKakaoLoginLink } from 'api/auth/kakaoApi';
import { LoginRequest } from 'api/auth/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import * as S from './LoginPage.style';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import logo from 'assets/logo.png';
import { usePointStore } from 'store/point';

const link = getKakaoLoginLink();

/**
 * 로그인 페이지 컴포넌트입니다.
 * 일반 로그인과 카카오 소셜 로그인을 제공합니다.
 */
function LoginPage() {
  const navigate = useNavigate();
  const { isLoginLoading, isLoading, login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  /**
   * 로그인 폼 제출을 처리하는 함수입니다.
   * @param {LoginRequest} data - 사용자가 입력한 이메일, 비밀번호입니다.
   */
  const onSubmit = async (data: LoginRequest) => {
    console.log('로그인 시도');
    await login(data, {
      onSuccess: (data) => {
        console.log(`로그인 성공: ${data.email}`);
        if (data.points !== undefined && data.points !== null) {
          localStorage.setItem('point', String(data.points));
          localStorage.setItem('rankName', String(data.rankName));
        } else localStorage.setItem('point', '0');
        if (localStorage.getItem('check') && localStorage.getItem('check') === String(data.userId)) navigate('/');
        else navigate('/preferences');
        toast.success(`${data.nickname}님 환영합니다!`);
      },
      onError: (error) => {
        console.log(error);
        toast.error('로그인에 실패했어요.');
      },
    });
  };

  /**
   * 카카오 로그인 페이지로 리다이렉트하는 함수입니다.
   */
  const handleKakaoLogin = () => {
    window.location.href = link;
  };

  return (
    <S.Background>
      {/* 로그인 요청 중일 때만 로딩 표시 */}
      {isLoginLoading && <Loading />}
      <S.Layout>
        <S.LoginSection>
          <S.Logo src={logo}></S.Logo>
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.LoginInput
              type="email"
              title="이메일"
              titleSize="13px"
              autoComplete="email"
              {...register('email', {
                required: '이메일을 입력해주세요.',
              })}
            />
            {errors.email && <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>}
            <S.LoginInput
              type="password"
              title="비밀번호"
              titleSize="13px"
              autoComplete="current-password"
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
              })}
            />
            {errors.password && <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>}
            <S.ButtonSection>
              <Button
                type="submit"
                text={isLoading ? '로그인 중...' : '로그인'}
                width="300px"
                fontSize="16px"
                onClick={handleSubmit(onSubmit)}
              />
              {/* <S.ImageWrapper>
                <S.KakaoButton
                  src={KakaoImg}
                  onClick={handleKakaoLogin}
                  alt="카카오 로그인"
                  aria-label="카카오 계정으로 로그인"
                />
              </S.ImageWrapper> */}
            </S.ButtonSection>
          </form>
          <S.UnableToLoginSection>
            <S.StyledLink to="/register">회원가입</S.StyledLink>
            <span> | </span>
            <p>비밀번호 재설정</p>
          </S.UnableToLoginSection>
        </S.LoginSection>
      </S.Layout>
    </S.Background>
  );
}

export default LoginPage;
