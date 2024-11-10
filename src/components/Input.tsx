import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface StyledInputProps {
  error?: boolean;
  width?: string;
  height?: string;
}

const StyledInput = styled.input<StyledInputProps>`
  color: white;
  font-size: ${theme.fontSize.md};
  width: ${(props) => props.width || '300px'};
  height: ${(props) => props.height || '40px'};
  border: none;
  border-bottom: 2px solid ${theme.colors.neutral400};
  outline: none;
  background-color: transparent;
  font-weight: ${theme.fontWeight.regular};
  transition: border-color 0.3s ease;
  caret-color: transparent;
  &:focus {
    border-bottom: 2px solid ${(props) => (props.error ? theme.colors.error : theme.colors.primary)};
  }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  width?: string;
  height?: string;
  placeholder?: string;
  title?: string;
  error?: boolean;
}

export default forwardRef(function Input(
  { width, height, placeholder, title, error, ...rest }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div>
      {title && <p>{title}</p>}
      <StyledInput ref={ref} width={width} height={height} placeholder={placeholder} error={error} {...rest} />
    </div>
  );
});
