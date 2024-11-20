import React, { useState } from 'react';
import Button from 'components/Button';
import { useForm } from 'react-hook-form';
import type { RegisterError, RegisterRequest } from 'api/auth/auth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi } from 'api/auth/authApi';
import { toast } from 'react-toastify';
import * as S from './RegisterPage.style';
import Loading from '../../components/Loading';
import { AxiosError } from 'axios';

interface RegisterFormData extends RegisterRequest {
  code: number;
  passwordConfirm: string;
}

function RegisterPage() {
  const navigate = useNavigate();
  const [isNotVerified, setVerified] = useState(true);

  const { mutate: register, isPending } = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      toast('🎉환영합니다!');
      localStorage.setItem('check', 'false');
      navigate('/login');
    },
    onError: (error: AxiosError<RegisterError>) => {
      toast.error(error.response?.data?.msg || '회원가입 중 오류가 발생했어요.');
    },
  });

  const {
    register: formRegister,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: 'onBlur',
  });

  /**
   * 회원가입 양식을 제출할 때 실행되는 함수입니다.
   * @param data 사용자가 입력한 회원가입 정보
   */
  const onSubmit = async (data: RegisterFormData) => {
    register(data);
  };

  /**
   * 이메일 인증번호를 확인하는 함수입니다.
   */
  const onCodeSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // 버튼 기본 동작 방지
    e.preventDefault();

    const isCodeValid = await trigger('code');
    const email = getValues('email');
    const code = getValues('code');

    if (isCodeValid) {
      try {
        await authApi.verifyCode({ email, code });
        setVerified(!isNotVerified);
        toast.success('이메일 인증이 완료되었어요.');
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.msg || '인증번호 확인 중 오류가 발생했어요.');
        }
      }
    }
  };

  /**
   * 이메일로 인증 번호를 전송하는 함수입니다.
   * 중복된 이메일인 경우, 인증번호를 전송하지 않습니다.
   */
  const onClickSendCodeButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const isEmailValid = await trigger('email');
    const email = getValues('email');

    if (isEmailValid) {
      console.log('인증번호 발송 시도');
      toast.success('인증번호를 요청하는 중이에요.');
      try {
        await authApi.checkExistingEmail({ email });
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data.msg || (
              <>
                이미 가입된 이메일이거나, <br /> 인증번호 발송중 오류가 발생했어요.
              </>
            )
          );
          return;
        }
      }

      try {
        await authApi.sendVerificationCode({ email });
        toast.success(
          <>
            인증번호가 발송되었어요.
            <br />
            메일함을 확인해주세요.
          </>
        );
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.msg || '인증번호 발송 중 오류가 발생했어요.');
        }
      }
    }
  };

  return (
    <S.Background>
      {isPending && <Loading></Loading>}
      <S.Layout>
        <h1>회원가입을 위한 정보를 입력해주세요.</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.VerificationSection>
            <S.StyledInput
              title="이메일"
              {...formRegister('email', {
                required: { value: true, message: '이메일을 입력해주세요.' },
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: '이메일 형식이 올바르지 않아요.',
                },
              })}
            />
            <S.VerificationCodeSendButton
              text="인증번호 발송"
              width="90px"
              fontSize="14px"
              onClick={onClickSendCodeButton}
            />
          </S.VerificationSection>
          {errors.email && <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>}
          <S.VerificationSection>
            <S.StyledInput
              title="인증번호"
              {...formRegister('code', {
                required: '인증번호를 입력해주세요.',
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: '인증번호 형식이 아니에요.',
                },
              })}
            />
            {isNotVerified && <S.VerificationButton text="인증" width="50px" fontSize="16px" onClick={onCodeSubmit} />}
          </S.VerificationSection>
          {errors.code && <S.ErrorMessage>{errors.code.message}</S.ErrorMessage>}
          <S.StyledInput
            title="비밀번호"
            type="password"
            {...formRegister('password', {
              required: { value: true, message: '비밀번호를 입력해주세요.' },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,18}$/,
                message: '영문, 숫자, 특수문자 포함 6~18글자 비밀번호를 입력해주세요.',
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
        <Button text="회원가입" width="300px" fontSize="16px" onClick={handleSubmit(onSubmit)} />
      </S.Layout>
    </S.Background>
  );
}

export default RegisterPage;
