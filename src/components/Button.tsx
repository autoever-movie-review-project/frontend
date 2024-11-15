import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from 'styles/theme';

interface ButtonStyleProps {
  width?: string;
  fontSize?: string;
  disabled?: boolean;
}

export interface ButtonProps extends ButtonStyleProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  children?: React.ReactNode;
}

const StyledButton = styled.button<ButtonStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || '270px'};
  height: 36px;
  border: 1px solid ${theme.colors.text};
  border-radius: 8px;
  padding: 12px;
  background-color: ${theme.colors.primary};
  color: white;
  font-size: ${({ fontSize }) => fontSize || '15px'};
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: ${theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${theme.colors.grayLight};
    cursor: not-allowed;
  }
`;

const Button = ({ text, width, fontSize, disabled = false, children, ...props }: ButtonProps) => {
  return (
    <StyledButton type="button" width={width} fontSize={fontSize} disabled={disabled} {...props}>
      {text}
      {children}
    </StyledButton>
  );
};

export default Button;
