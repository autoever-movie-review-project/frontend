import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface ButtonStyleProps {
  width?: string;
  height?: string;
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
  height: ${({ height }) => height || '36px'};
  /* border: 1px solid ${theme.colors.text}; */
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

const Button = ({ text, width, height, fontSize, disabled = false, children, ...props }: ButtonProps) => {
  return (
    <StyledButton type="button" width={width} height={height} fontSize={fontSize} disabled={disabled} {...props}>
      {text}
      {children}
    </StyledButton>
  );
};

export default Button;
