import styled, { keyframes } from 'styled-components';

const decrease = keyframes`
  from {
    width:100%
  }
  to {
    width: 0%;
  }
`;

export const LeftTimeBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 24px;
  background: gray;
  animation: ${decrease} 30s linear;
  animation-fill-mode: forwards;
`;

export const LeftTimeSecondsDisplay = styled.p`
  position: absolute;
  right: 0;
  margin-right: 6px;
  font-family: Galmuri11;
  font-size: 14px;
`;
