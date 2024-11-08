import React from 'react';
import styled from 'styled-components';
import Input from './Input';
import Button from 'components/Button';

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

  p {
    font-weight: bold;
    padding-bottom: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
    margin-left: 60px;
  }
`;

const VerificationSection = styled.div`
  display: flex;
  gap: 10px;
`;

function RegisterPage() {
  return (
    <Background>
      <Layout>
        <p>환영해요! 회원가입을 위해 정보를 입력해주세요.</p>
        <form>
          <Input placeholder="이메일"></Input>
          <VerificationSection>
            <Input placeholder="이메일 인증 번호"></Input>
            <Button text="인증" width="50px" fontSize="17px" btnClick={() => {}}></Button>
          </VerificationSection>
          <Input placeholder="비밀번호"></Input>
          <Input placeholder="비밀번호 재입력"></Input>
          <Input placeholder="닉네임"></Input>
        </form>
        <Button text="회원가입" width="300px" btnClick={() => {}}></Button>
      </Layout>
    </Background>
  );
}

export default RegisterPage;
