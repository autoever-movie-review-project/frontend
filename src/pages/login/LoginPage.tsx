import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import Button from 'components/Button';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import KakaoImg from 'assets/kakao_login_large_wide.png';

const Background = styled.div`
  background-color: #000;
  width: 100%;
  min-height: 100vh;
`;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.neutral100};
  margin-top: 100px;

  h1 {
    text-align: center;
    color: ${theme.colors.primary};
    font-size: ${theme.fontSize.h3};
    font-weight: ${theme.fontWeight.header};
  }

  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 30px 0 30px 0;
    gap: 10px;
  }
`;

const LoginInput = styled.input`
  width: 300px;
  height: 40px;
  border-radius: ${theme.borderRadius.xs};
  outline: none;
`;

const UnableToLoginSection = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
  color: ${theme.colors.neutral50};
  gap: 5px;
`;

const StyledLink = styled(Link)`
  color: inherit; /* 기본 색을 상속받거나 원하는 색으로 설정 */
  text-decoration: none; /* 링크 밑줄을 없애려면 이 속성 추가 */

  &:focus,
  &:active {
    color: inherit; /* 클릭 후에도 색이 변하지 않도록 설정 */
    outline: none; /* 포커스 시 나타나는 테두리 없애기 */
  }
`;

const KakaoButton = styled.img`
  width: 300px;
  border-radius: 10px;
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ErrorMessage = styled.p`
  color: ${theme.colors.error};
  font-size: 12px;
`;

interface FormData {
  email: string;
  password: string;
}

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<FormData>({
    mode: 'onSubmit', // 폼이 submit될 때만 validation
    reValidateMode: 'onSubmit', // 재검증도 submit될 때만
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // 로그인 로직 추가해야 함
  };

  return (
    <Background>
      <Layout>
        <LoginSection>
          <h1>Logo</h1>
          <form>
            <LoginInput
              type="email"
              placeholder="이메일을 입력해주세요."
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '올바른 이메일 형식이 아니에요.',
                },
              })}
            />
            {isSubmitted && errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            <LoginInput
              type="password"
              placeholder="비밀번호를 입력해주세요."
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
            {isSubmitted && errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </form>
          <UnableToLoginSection>
            <StyledLink to="/register">회원가입하기</StyledLink>
            <span> | </span>
            <p>비밀번호 재설정</p>
          </UnableToLoginSection>
          <ButtonSection>
            <Button text="로그인" width="300px" btnClick={handleSubmit(onSubmit)} />
            <KakaoButton src={KakaoImg} onClick={() => {}}></KakaoButton>
          </ButtonSection>
        </LoginSection>
      </Layout>
    </Background>
  );
}

export default LoginPage;
