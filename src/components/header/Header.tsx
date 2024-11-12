import React from 'react';
import * as S from './Header.style';
import logo from 'assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import profile from 'assets/default-profile.png';
import { toast } from 'react-toastify';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

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
      window.location.reload();
    } catch (error) {
      console.error('로그아웃 실패:', error);
      toast.error('서버와 통신하는데 실패했습니다.');
    }
  };

  const handleUserProfileClick = () => {
    navigate('/mypage');
  };

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
          {!user?.data && <S.MenuLogin onClick={() => handleLoginButtonClick()}>로그인</S.MenuLogin>}
          {user?.data && (
            <S.UserProfile>
              <S.Profile src={profile} onClick={handleUserProfileClick}></S.Profile>
              {user?.data.nickname}
              <S.LogoutButton onClick={handleLogoutButtonClick}></S.LogoutButton>
            </S.UserProfile>
          )}
        </S.MenuWrapper>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
}

export default Header;
