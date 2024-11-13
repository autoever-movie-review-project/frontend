import styled from 'styled-components';
import { theme } from 'styles/theme';
import Pen from 'assets/pen.svg?react';

interface MenuBarItemProps {
  $active: boolean;
}

export const Background = styled.div`
  display: flex;
  justify-content: center;
  background-color: #000;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-top: 80px;
  color: #fff;

  h1 {
    color: #fff;
    font-size: ${theme.fontSize.h3};
    font-weight: ${theme.fontWeight.bold};
    margin-bottom: 30px;
  }
`;

export const UserProfileSection = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
`;

export const UserDatails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 5px;
  margin-bottom: 10px;
`;

export const RankSection = styled.div`
  display: flex;
  gap: 5px;
`;

export const RankIcon = styled.div``;

export const UserType = styled.span`
  display: flex;
  width: auto;
  font-size: 0.875rem;
  background-color: ${theme.colors.bronze};
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
`;

export const Nickname = styled.div`
  font-size: ${theme.fontSize.h2};
  font-weight: ${theme.fontWeight.bold};
`;

export const Email = styled.div`
  color: ${theme.colors.neutral400};
  font-size: ${theme.fontSize.md};
`;

export const ProfileEditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.grayDark};
  border-radius: ${theme.borderRadius.xs};
  font-size: ${theme.fontSize.md};
  width: 100%;
  height: 50px;
  margin-bottom: 30px;
  cursor: pointer;

  &:hover {
    background-color: #1f2123;
  }
`;

export const EditIcon = styled(Pen)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export const MenuBar = styled.ul`
  display: flex;
  justify-content: center;
  justify-content: space-between;
  padding: 30px;
  align-items: center;
  background-color: ${theme.colors.grayDark};
  border-radius: ${theme.borderRadius.xs};
  height: 40px;
  margin-bottom: 40px;
`;

export const MenuBarItem = styled.li`
  width: 33.33%;
  font-size: 18px;
  cursor: pointer;
  padding: 30px;
  text-align: center;
  transition: all 0.1s ease-in-out;

  ${({ $active }) =>
    $active &&
    `
       font-weight: bold;
      color: ${theme.colors.primary};
    `}
`;

export const MenuBarItemText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MyReviewSection = styled.div`
  display: flex;
  gap: 10px;
`;
