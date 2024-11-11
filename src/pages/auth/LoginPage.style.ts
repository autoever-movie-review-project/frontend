import styled from 'styled-components';
import { theme } from 'styles/theme';
import { Link } from 'react-router-dom';
import Input, { InputProps } from '../../components/Input';

export const Background = styled.div`
  display: flex;
  justify-content: center;
  background-color: #000;
  width: 100%;
  min-height: 100vh;
`;

export const Layout = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  align-items: center;
`;

export const LoginSection = styled.div`
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
    gap: 20px;
  }
`;

export const LoginInput = styled(Input)`
  width: 300px;
  height: 40px;
  outline: none;
` as React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

export const UnableToLoginSection = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
  color: ${theme.colors.neutral50};
  gap: 5px;
`;

export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:focus,
  &:active {
    color: inherit;
    outline: none;
  }
`;

export const KakaoButton = styled.img`
  width: 300px;
  border-radius: 10px;
`;

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ErrorMessage = styled.p`
  color: ${theme.colors.error};
  font-size: 12px;
`;
