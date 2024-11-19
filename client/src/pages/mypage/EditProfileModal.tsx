import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { User } from 'api/auth/auth';
import { AxiosResponse } from 'axios';
import Profile from 'components/Profile';
import * as S from './MyPage.style';
import { userApi } from 'api/user/userApi';
import { theme } from 'styles/theme';
import { useForm } from 'react-hook-form';
import { ModalPortal } from 'components/Modal/ModalPortal';
import { RankType } from 'types/rank';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px);
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div`
  background-color: #2d2d2d;
  padding: 32px;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  color: white;
  opacity: 0;
  animation: modalIn 0.3s ease forwards;

  @keyframes modalIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  padding: 4px;

  &:hover {
    opacity: 0.8;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 50%;

  &:hover > div {
    opacity: 1;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${theme.colors.grayLight};
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: none;
  background-color: #3d3d3d;
  color: white;

  &::placeholder {
    color: ${theme.colors.grayLight};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  padding: 12px;
  border-radius: 8px;
  border: none;
  background-color: ${theme.colors.primary};
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${theme.colors.grayLight};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: ${theme.colors.error};
  font-size: 12px;
  margin-top: 4px;
`;

const RankInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const UserEmail = styled.span`
  color: ${theme.colors.grayLight};
  font-size: 14px;
`;

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AxiosResponse<User, string | number> | null | undefined;
  onSubmit: (data: FormInputs) => Promise<void>;
}

export interface FormInputs {
  nickname?: string;
  currentPassword?: string;
  newPassword?: string;
  profile?: string;
}

const EditProfileModal = ({ isOpen, onClose, currentUser, onSubmit }: EditProfileModalProps) => {
  const [previewImage, setPreviewImage] = useState(currentUser?.data.profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      nickname: currentUser?.data.nickname || '',
      newPassword: '',
    },
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      // 5MB 제한
      toast.error('이미지 크기는 5MB 이하여야 해요.');
      return;
    }

    try {
      // 로딩 상태 표시
      toast.loading('이미지 업로드 중...');

      // 이미지 업로드 API 호출
      const response = await userApi.uploadProfileImage(file);

      // 성공 시 프리뷰 이미지 업데이트
      setPreviewImage(response.url);

      toast.dismiss();
      toast.success('프로필 사진이 변경되었어요.');
    } catch (error) {
      toast.dismiss();
      toast.error('프로필 사진을 변경하지 못했어요.');
      console.error('이미지 업로드 실패:', error);
    }
  };

  const onSubmitForm = async (data: FormInputs) => {
    try {
      const submitData: FormInputs = {
        profile: previewImage || currentUser?.data.profile,
        nickname: data.nickname,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };

      await onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error('프로필 수정 실패: ', error);
      toast.error('프로필을 수정하지 못했어요.');
    }
  };

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <Overlay>
        <ModalContainer>
          <CloseButton onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </CloseButton>
          <ProfileSection>
            <ProfileImageContainer onClick={handleImageClick}>
              <Profile width="100px" height="100px" rank={currentUser?.data?.rankName as RankType} src={previewImage} />
              <ImageOverlay>
                <span>수정하기</span>
              </ImageOverlay>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </ProfileImageContainer>
            {currentUser?.data.rankName && (
              <RankInfo>
                <S.RankIcon rankImg={currentUser.data.rankImg} />
                <S.Rank $rank={currentUser.data.rankName}>{currentUser.data.rankName}</S.Rank>
              </RankInfo>
            )}
            <UserInfo>
              <div>{currentUser?.data.nickname}</div>
              <UserEmail>{currentUser?.data.email}</UserEmail>
            </UserInfo>
          </ProfileSection>
          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <InputGroup>
              <Label>새 닉네임</Label>
              <Input
                {...register('nickname', {
                  required: '닉네임을 입력해주세요.',
                  pattern: {
                    value: /^[가-힣a-zA-Z0-9]{1,12}$/,
                    message: '닉네임은 한글, 영문, 숫자만 사용 가능해요.',
                  },
                  minLength: {
                    value: 2,
                    message: '닉네임은 2자 이상이어야 해요.',
                  },
                  maxLength: {
                    value: 12,
                    message: '닉네임은 12자 이하여야 해요.',
                  },
                })}
                placeholder="변경할 닉네임을 입력해주세요."
              />
              {errors.nickname && <ErrorMessage>{errors.nickname.message}</ErrorMessage>}
            </InputGroup>
            {/* <InputGroup>
          <Label>현재 비밀번호</Label>
          <Input
            type="password"
            {...register('currentPassword', {
              validate: (value) => value === user?.data.currentPassword || '현재 비밀번호가 일치하지 않습니다.',
            })}
            placeholder="현재 비밀번호를 입력해주세요."
          />
          {errors.currentPassword && <ErrorMessage>{errors.currentPassword.message}</ErrorMessage>}
        </InputGroup> */}
            <InputGroup>
              <Label>새 비밀번호</Label>
              <Input
                type="password"
                {...register('newPassword', {
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,18}$/,
                    message: '비밀번호는 영문, 숫자, 특수문자를 포함한 6-18자여야 해요.',
                  },
                  // validate: (value) =>
                  //   !watch('currentPassword') ||
                  //   value !== watch('currentPassword') ||
                  //   '새 비밀번호는 현재 비밀번호와 달라야 해요.',
                })}
                placeholder="새 비밀번호를 입력해주세요."
              />
              {errors.newPassword && <ErrorMessage>{errors.newPassword.message}</ErrorMessage>}
            </InputGroup>
            <SubmitButton type="submit">정보 수정</SubmitButton>
          </Form>
        </ModalContainer>
      </Overlay>
    </ModalPortal>
  );
};

export default EditProfileModal;
