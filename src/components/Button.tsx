import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonStyleProps {
  width?: string;
  fontSize?: string;
  disabled?: boolean;
}

export interface ButtonProps extends ButtonStyleProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  children?: React.ReactNode;
}

const gradientStyles = css`
  background: linear-gradient(0deg, #d43966 0%, #fe5489 50%, #ff8ba8 100%);

  &:hover:not(:disabled) {
    background: linear-gradient(0deg, #ff8ba8 0%, #fe5489 50%, #d43966 100%);

    > div {
      background-color: #d43966;
    }
  }
`;

const disabledStyles = css`
  background: #cbd5e1;
  cursor: not-allowed;

  > div {
    background-color: #cbd5e1;
    color: #94a3b8;
  }

  &:hover {
    background: #cbd5e1;
    > div {
      background-color: #cbd5e1;
      color: #94a3b8;
    }
  }
`;

const StyledButton = styled.button<ButtonStyleProps>`
  width: ${({ width }) => width || '270px'};
  height: 36px;
  border: none;
  border-radius: 10px;
  padding: 1px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: Pretendard, sans-serif;
  font-size: ${({ fontSize }) => fontSize || '20px'};
  font-weight: 700;
  color: #fff;

  ${gradientStyles}
  ${({ disabled }) => disabled && disabledStyles}

  > div {
    background-color: #fe5489;
    border-radius: 9px;
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ease;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const Button = ({ text, width, fontSize, disabled = false, children, ...props }: ButtonProps) => {
  return (
    <StyledButton type="button" width={width} fontSize={fontSize} disabled={disabled} {...props}>
      <div>
        <ContentWrapper>
          {text}
          {children}
        </ContentWrapper>
      </div>
    </StyledButton>
  );
};

export default Button;
