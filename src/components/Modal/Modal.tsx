import * as S from './Modal.style';
import CloseImg from 'assets/x.svg?react';

interface IModalProps {
  modalTitle?: string;
  closeModal: () => void;
  children: React.ReactNode;
}

export const Modal = ({ modalTitle, closeModal, children }: IModalProps) => {
  return (
    <div>
      <S.ModalDim />
      <S.ModalWrapper>
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
