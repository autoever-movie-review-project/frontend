import styled from 'styled-components';

export const ModalDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 99999;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 40%;
  height: 70%;
  transform: translate(-50%, -50%);
  background: #383838;
  border-radius: 10px;
  padding: 24px 24px;
  box-sizing: border-box;
  z-index: 99999;
`;

export const ModalHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.div`
  color: #f2f2f2;
  font-size: 24px;
`;

export const ModalCloseButton = styled.div`
  cursor: pointer;
`;
