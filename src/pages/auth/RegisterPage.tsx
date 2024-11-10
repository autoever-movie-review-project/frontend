import React from 'react';
import Button from 'components/Button';
import { useForm } from 'react-hook-form';
import type { RegisterError, RegisterRequest } from 'api/auth/auth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi } from 'api/auth/authApi';
import { toast } from 'react-toastify';
import * as S from './RegisterPage.style';
import * as L from '../../components/Loading';
import { AxiosError } from 'axios';

interface FormData extends RegisterRequest {
  code: string;
  passwordConfirm: string;
}

function RegisterPage() {
  const navigate = useNavigate();

  const { mutate: register, isPending } = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      if (data.success) {
        toast.success('환영합니다!');
        navigate('/login');
      }
    },
    onError: (error: AxiosError<RegisterError>) => {
      toast.error(error.response?.data?.message || '회원가입 중 오류가 발생했어요.');
    },
  });

  const {
    register: formRegister,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  /**
   * 회원가입 양식을 제출할 때 실행되는 함수입니다.
   * @param data 사용자가 입력한 회원가입 정보
   */
  const onSubmit = async (data: FormData) => {
    register(data);
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
    <S.Background>
      {isPending && (
        <L.LoadingOverlay>
          <L.LoadingCircle />
        </L.LoadingOverlay>
      )}
      <S.Layout>
        <h1>환영합니다! 회원가입을 위해 정보를 입력해주세요.</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.StyledInput
            title="이메일"
            {...formRegister('email', {
              required: { value: true, message: '이메일을 입력해주세요.' },
              pattern: {
                value: /^\S+@\S+$/i,
                message: '이메일 형식이 올바르지 않습니다',
              },
            })}
          />
          {errors.email && <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>}
          <S.VerificationSection>
            <S.StyledInput
              title="인증번호"
              {...formRegister('code', {
                required: '인증번호를 입력해주세요.',
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: '6자리 인증번호를 입력해주세요.',
                },
              })}
            />
            <S.VerificationButton text="인증" width="50px" fontSize="17px" onClick={onCodeSubmit} />
          </S.VerificationSection>
          {errors.code && <S.ErrorMessage>{errors.code.message}</S.ErrorMessage>}
          <S.StyledInput
            title="비밀번호"
            type="password"
            {...formRegister('password', {
              required: { value: true, message: '비밀번호를 입력해주세요.' },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,18}$/,
                message: '영문, 숫자, 특수문자 포함 6~18글자 비밀번호를 입력해주세요. ',
              },
            })}
          />
          {errors.password && <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>}
          <S.StyledInput
            title="비밀번호 재입력"
            type="password"
            {...formRegister('passwordConfirm', {
              required: '비밀번호를 입력해주세요.',
              validate: (value) => value === getValues('password') || '비밀번호를 확인해주세요.',
            })}
          />
          {errors.passwordConfirm && <S.ErrorMessage>{errors.passwordConfirm.message}</S.ErrorMessage>}
          <S.StyledInput
            title="닉네임"
            type="nickname"
            {...formRegister('nickname', {
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
          {errors.nickname && <S.ErrorMessage>{errors.nickname.message}</S.ErrorMessage>}
        </form>
        <Button text="회원가입" width="300px" onClick={handleSubmit(onSubmit)} />
      </S.Layout>
    </S.Background>
  );
}

export default RegisterPage;
