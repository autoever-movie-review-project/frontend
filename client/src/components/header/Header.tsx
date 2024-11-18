import React from 'react';
import * as S from './Header.style';
import logo from 'assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { toast } from 'react-toastify';
import Profile from 'components/Profile';
import DefaultProfile from 'assets/default-profile.png';
import SearchBar from 'components/searchbar/SearchBar';
import Button from 'components/Button';
import { useModal } from 'hooks/useModal';
import { Modal } from 'components/Modal/Modal';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleNavMenuClick = (path: string) => {
    navigate(path);
  };

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  const handleLoginButtonClick = () => {
    //로그인 페이지로
    navigate('/login');
  };

  const handleLogoutButtonClick = async () => {
    try {
      await logout();
      toast.success('로그아웃했어요.');
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      toast.error('서버와 통신하는데 실패했습니다.');
    }
  };

  const handleUserProfileClick = () => {
    navigate('/mypage');
  };

  // 회원가입 페이지에서는 보이지 헤더가 않습니다.
  if (location.pathname === '/register') {
    return null;
  }

  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <S.HeaderLogo src={logo} onClick={() => handleNavMenuClick('/')} />
        <S.MenuWrapper>
          <S.MenuContainer>
            <S.MenuButton $active={isCurrentPath('/')} onClick={() => handleNavMenuClick('/')}>
              Home
            </S.MenuButton>
            <S.MenuButton $active={isCurrentPath('/movies')} onClick={() => handleNavMenuClick('/movies')}>
              Movies
            </S.MenuButton>
            <S.MenuButton $active={isCurrentPath('/game')} onClick={() => handleNavMenuClick('/game')}>
              Game
            </S.MenuButton>
          </S.MenuContainer>
          <S.RightMenu>
            <SearchBar />
            {!user?.data && (
              <Button text="로그인" width="100px" fontSize="20px" onClick={() => handleLoginButtonClick()}></Button>
            )}
            {user?.data && (
              <>
                <S.ProfileWrapper>
                  <S.UserProfile onClick={handleUserProfileClick}>
                    <Profile width="45px" height="45px" rank={user?.data.rankName} src={DefaultProfile}></Profile>
                    <p>{user?.data.nickname}</p>
                  </S.UserProfile>
                </S.ProfileWrapper>
                <S.LogoutButton onClick={openModal}></S.LogoutButton>
              </>
            )}
          </S.RightMenu>
        </S.MenuWrapper>
      </S.HeaderContainer>
      {isModalOpen && (
        <Modal width="250px" height="200px" closeModal={closeModal}>
          <S.LogoutModalSection>
            로그아웃하실 건가요?
            <Button
              text="로그아웃"
              width="auto"
              fontSize="16px"
              onClick={() => {
                handleLogoutButtonClick();
                closeModal();
              }}
            ></Button>
          </S.LogoutModalSection>
        </Modal>
      )}
    </S.HeaderWrapper>
  );
}

export default Header;
