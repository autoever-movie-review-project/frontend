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
    console.log('로그아웃 버튼 클릭');
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
                <S.LogoutButton onClick={handleLogoutButtonClick}></S.LogoutButton>
              </>
            )}
          </S.RightMenu>
        </S.MenuWrapper>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
}

export default Header;
