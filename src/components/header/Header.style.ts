import styled, { css } from 'styled-components';
import { theme } from 'styles/theme';
import LogOut from 'assets/log-out.svg?react';

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 9999;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  //justify-content: space-between;
  padding: 0 60px;
  background-color: black;
  gap: 30px;
`;

export const HeaderLogo = styled.img`
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin: 10px;
`;

export const MenuWrapper = styled.div`
  width: calc(100% - 200px);
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const MenuContainer = styled.div`
  display: flex;
`;

export const MenuButton = styled.button<{ $active: boolean }>`
  display: flex;
  border: none;
  background: none;
  padding: 4px 1rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  color: ${theme.colors.grayLight};
  height: 50px;
  position: relative;

  &:hover {
    color: ${theme.colors.grayLight};
  }

  ${({ $active }) =>
    $active
      ? css`
          border-bottom: 2px solid white;
          color: #ececec;
          font-weight: bold;
          transition: transform 0.3s;
        `
      : css`
          &:hover::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 50%;
            border-bottom: 2px solid #84868d;
            transition: width 0.3s ease;
          }
        `}
`;

export const RightMenu = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 30px;
`;

export const MenuLogin = styled.button`
  display: flex;
  border: none;
  margin: 0 10px;
  width: 80px;
  height: 40px;
  padding: 6px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.grayLight};
  }
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #fff;
  font-size: ${theme.fontSize.lg};
`;

export const Profile = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  cursor: pointer;
`;

export const LogoutButton = styled(LogOut)`
  margin-left: 15px;
  color: white;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
