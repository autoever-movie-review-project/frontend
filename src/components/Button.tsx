import React from 'react';
import styled from 'styled-components';

interface StyledButtonProps {
  width: string;
  disabled?: boolean;
  fontSize?: string;
}

const StyledButton = styled.div<StyledButtonProps>`
  width: ${({ width }) => (width ? `${width}` : '270px')};
  height: 36px;
  border-radius: 10px;
  padding: 1px;
  background: linear-gradient(0deg, #d43966 0%, #fe5489 50%, #ff8ba8 100%);
  transition: 0.2s;

  > div {
    background-color: #fe5489;
    border-radius: 10px;
    height: 34px;
    display: flex;
    justify-content: center;
    transition: 0.2s;
  }

  &:hover {
    background: linear-gradient(0deg, #ff8ba8 0%, #fe5489 50%, #d43966 100%);
    > div {
      background-color: #d43966;
    }
  }

  ${({ disabled }) =>
    disabled &&
    `background: #CBD5E1; > div {
      background-color: #CBD5E1;
      color: #94A3B8;
    }
    &:hover {
    background: #CBD5E1; > div {
      background-color: #CBD5E1;
      color: #94A3B8;
    }
  }
    `}

  cursor: ${({ disabled }) => (disabled ? `` : `pointer`)};
  color: #fff;
  font-family: Pretendard;
  font-size: ${({ fontSize }) => fontSize || '20px'};
  font-style: normal;
  font-weight: 700;
`;

const TextArea = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

interface ButtonProps {
  text: string;
  width: string;
  fontSize?: string;
  disabled?: boolean;
  btnClick: () => void;
}

function Button({ text, width, disabled, fontSize, btnClick, ...props }: ButtonProps) {
  return (
    <StyledButton onClick={disabled ? undefined : btnClick} width={width} fontSize={fontSize} {...props}>
      <div>
        <TextArea>{text}</TextArea>
      </div>
    </StyledButton>
  );
}

export default Button;
