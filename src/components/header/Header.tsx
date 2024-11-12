import React, { useEffect } from 'react';
import * as S from './Header.style';
import logo from 'assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import profile from 'assets/default-profile.png';
import { LogOut } from 'lucide-react';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const handleNavMenuClick = (path: string) => {
    navigate(path);
  };

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  const handleLoginButtonClick = () => {
    //로그인페이지로
    navigate('/login');
  };

  const handleLogoutButtonClick = () => {
    logout();
    navigate('/');
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
          {!isAuthenticated && <S.MenuLogin onClick={() => handleLoginButtonClick()}>로그인</S.MenuLogin>}
          {isAuthenticated && (
            <S.UserProfile>
              <S.Profile src={profile}></S.Profile>
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
