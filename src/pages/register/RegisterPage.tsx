import React from 'react';
import styled from 'styled-components';
import Input from '../../components/Input';
import Button from 'components/Button';
import { theme } from 'styles/theme';

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

  p {
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    padding-bottom: 50px;
    margin-left: 60px;
  }
`;

const VerificationSection = styled.div`
  display: flex;
  position: relative;
  gap: 10px;
`;

const StyledButton = styled(Button)`
  position: relative;
  right: 60px;
  top: 43px;
`;

function RegisterPage() {
  return (
    <Background>
      <Layout>
        <h1>환영합니다! 회원가입을 위해 정보를 입력해주세요.</h1>
        <form>
          <Input title="이메일"></Input>
          <VerificationSection>
            <Input title="인증번호"></Input>
            <StyledButton text="인증" width="50px" fontSize="17px" btnClick={() => {}}></StyledButton>
          </VerificationSection>
          <Input title="비밀번호"></Input>
          <Input title="비밀번호 재입력"></Input>
          <Input title="닉네임"></Input>
        </form>
        <Button text="회원가입" width="300px" btnClick={() => {}}></Button>
      </Layout>
    </Background>
  );
}

export default RegisterPage;
