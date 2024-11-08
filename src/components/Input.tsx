import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

const StyledInput = styled.input`
  color: white;
  font-size: ${theme.fontSize.md};
  width: ${(props) => props.width || '300px'};
  height: ${(props) => props.height || '40px'};
  border: none;
  border-bottom: 1.5px solid ${theme.colors.neutral400};
  outline: none;
  background-color: transparent;
  font-weight: ${theme.fontWeight.regular};
  transition: border-color 0.3s ease;
  caret-color: transparent;

  &:focus {
    border-bottom-color: ${theme.colors.primary};
  }
`;

interface InputProps {
  width?: string;
  height?: string;
  placeholder?: string;
  title?: string;
  type?: string;
}

function Input({ width, height, placeholder, title, ...props }: InputProps) {
  return (
    <div>
      <p>{title}</p>
      <StyledInput width={width} height={height} placeholder={placeholder} {...props} />
    </div>
  );
}

export default Input;
