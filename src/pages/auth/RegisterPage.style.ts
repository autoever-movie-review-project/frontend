import { theme } from 'styles/theme';
import styled from 'styled-components';
import Input from '../../components/Input';
import Button, { ButtonProps } from 'components/Button';

export const Background = styled.div`
  display: flex;
  justify-content: center;
  background-color: #000;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
`;

export const Layout = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: ${theme.fontSize.h3};
    font-weight: ${theme.fontWeight.header};
    padding-bottom: 60px;
  }

  form {
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
    margin-left: 100px;
  }

  p {
    margin-bottom: 5px;
  }
`;

export const StyledInput = styled(Input)`
  margin-bottom: 14px;

  p {
    padding-top: 20px;
    padding-bottom: 10px;
  }
`;

export const VerificationSection = styled.div`
  display: flex;
  position: relative;
`;

export const VerificationCodeSendButton = styled(Button)`
  position: relative;
  right: 90px;
  top: 22px;
` as React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLInputElement>>;

export const VerificationButton = styled(Button)`
  position: relative;
  right: 52px;
  top: 22px;
` as React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLInputElement>>;

export const ErrorMessage = styled.p`
  color: ${theme.colors.error};
  font-size: 12px;
`;
