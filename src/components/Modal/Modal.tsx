import * as S from './Modal.style';
import CloseImg from 'assets/x.svg?react';

export interface IModalProps {
  modalTitle?: string;
  closeModal: () => void;
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
}

export const Modal = ({ modalTitle, closeModal, children, width, height }: IModalProps) => {
  return (
    <div>
      <S.ModalDim />
      <S.ModalWrapper $width={width} $height={height}>
        <S.ModalHeader>
          <S.ModalTitle>{modalTitle}</S.ModalTitle>
          <S.ModalCloseButton onClick={closeModal}>
            <CloseImg width={32} height={32} />
          </S.ModalCloseButton>
        </S.ModalHeader>
        {children}
      </S.ModalWrapper>
    </div>
  );
};
