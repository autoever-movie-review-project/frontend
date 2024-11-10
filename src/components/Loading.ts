import styled, { keyframes } from 'styled-components';
import { theme } from 'styles/theme';

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${theme.colors.modalBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const LoadingCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #fff;
  border-top: 4px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;
