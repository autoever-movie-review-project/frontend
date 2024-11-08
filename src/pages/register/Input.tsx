import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

const StyledInput = styled.input`
  width: ${(props) => props.width || '300px'};
  height: ${(props) => props.height || '40px'};
  border: none;
  border-bottom: 2px solid ${theme.colors.neutral400};
  outline: none;
  background-color: transparent;
  caret-color: ${theme.colors.primaryLight};
  font-weight: ${theme.fontWeight.regular};

  :focus {
    border-bottom-color: 2px solid ${theme.colors.primary} !important;
  }
`;

interface InputProps {
  width?: string;
  height?: string;
  placeholder?: string;
}

function Input({ width, height, placeholder }: InputProps) {
  return (
    <div>
      <StyledInput width={width} height={height} placeholder={placeholder} />
    </div>
  );
}

export default Input;
