import React from 'react';
import styled from 'styled-components';
import Input from '../../components/Input';
import Button from 'components/Button';
import { theme } from 'styles/theme';
import { useForm } from 'react-hook-form';
import { registerMember } from 'api/registerApi';

const Background = styled.div`
  display: flex;
  justify-content: center;
  background-color: #000;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
`;

const Layout = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: ${theme.fontSize.h3};
    font-weight: ${theme.fontWeight.header};
    padding-bottom: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    padding-bottom: 50px;
    margin-left: 60px;
  }

  p {
    margin-bottom: 7px;
  }
`;

const StyledInput = styled(Input)`
  margin-bottom: 10px;

  p {
    padding-top: 20px;
    padding-bottom: 10px;
  }
`;

const VerificationSection = styled.div`
  display: flex;
  position: relative;
`;

const VerificationButton = styled(Button)`
  position: relative;
  right: 52px;
  top: 22px;
`;

const ErrorMessage = styled.p`
  color: ${theme.colors.error};
  font-size: 12px;
`;

interface FormData {
  email: string;
  code: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

function RegisterPage() {
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  /**
   * 회원가입 양식을 제출할 때 실행되는 함수입니다.
   * @param data 사용자가 입력한 회원가입 정보
   */
  const onSubmit = async (data: FormData) => {
    try {
      // 필요한 데이터만 선택하여 API 호출
      const registerData = {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      };

      const response = await registerMember(registerData);

      if (response.success) {
        // 회원가입 성공 처리 (예: 로그인 페이지로 이동)
        console.log('회원가입 성공:', response);
      } else {
        // 회원가입 실패 처리
        console.error('회원가입 실패:', response.message);
      }
    } catch (error) {
      // 에러 처리
      console.error('회원가입 에러:', error);
    }
  };

  /**
   * 이메일 인증번호를 확인하는 함수입니다.
   * 인증번호 유효성을 검사한 후, 올바른 형식이면 서버로 확인 요청을 보냅니다.
   */
  const onCodeSubmit = async () => {
    const isCodeValid = await trigger('code');

    if (isCodeValid) {
      const codeValue = getValues('code');
      console.log({ code: codeValue });
      // API 호출로 DB에 인증코드 체크
    }
  };

  return (
    <Background>
      <Layout>
        <h1>환영합니다! 회원가입을 위해 정보를 입력해주세요.</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledInput
            title="이메일"
            {...register('email', {
              required: { value: true, message: '이메일을 입력해주세요.' },
              pattern: {
                value: /^\S+@\S+$/i,
                message: '이메일 형식이 올바르지 않습니다',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          <VerificationSection>
            <StyledInput
              title="인증번호"
              {...register('code', {
                required: '인증번호를 입력해주세요.',
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: '6자리 인증번호를 입력해주세요.',
                },
              })}
            />
            <VerificationButton text="인증" width="50px" fontSize="17px" btnClick={onCodeSubmit} />
          </VerificationSection>
          {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
          <StyledInput
            title="비밀번호"
            type="password"
            {...register('password', {
              required: { value: true, message: '비밀번호를 입력해주세요.' },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,18}$/,
                message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 해요.',
              },
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          <StyledInput
            title="비밀번호 재입력"
            type="password"
            {...register('passwordConfirm', {
              required: '비밀번호를 입력해주세요.',
              validate: (value) => value === getValues('password') || '비밀번호를 확인해주세요.',
            })}
          />
          {errors.passwordConfirm && <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>}
          <StyledInput
            title="닉네임"
            type="nickname"
            {...register('nickname', {
              required: '닉네임을 입력해주세요.',
              maxLength: {
                value: 12,
                message: '닉네임은 최대 12글자예요.',
              },
              pattern: {
                value: /^[가-힣a-zA-Z0-9]{1,12}$/,
                message: '닉네임은 한글, 영문, 숫자만 사용 가능해요.',
              },
            })}
          />
          {errors.nickname && <ErrorMessage>{errors.nickname.message}</ErrorMessage>}
        </form>
        <Button text="회원가입" width="300px" btnClick={handleSubmit(onSubmit)} />
      </Layout>
    </Background>
  );
}

export default RegisterPage;
