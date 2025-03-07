import styled from 'styled-components';
import { theme } from 'styles/theme';
import Pen from 'assets/pen.svg?react';
import Question from 'assets/question.svg?react';
import BronzeIcon from 'assets/bronze.png';
import SilverIcon from 'assets/silver.png';
import GoldIcon from 'assets/gold.png';
import DiamondIcon from 'assets/diamond.png';
import MasterIcon from 'assets/master.png';
import { IModalProps, Modal } from 'components/Modal/Modal';

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
  width: 63%;
  margin-top: 100px;
  margin-bottom: 40px;
  color: #fff;

  h1 {
    color: #fff;
    font-size: ${theme.fontSize.h3};
    font-weight: ${theme.fontWeight.bold};
    margin-bottom: 30px;
  }

  h2 {
    color: #fff;
    font-size: ${theme.fontSize.h3};
    font-weight: ${theme.fontWeight.bold};
    margin-bottom: 20px;
  }
`;

export const UserProfileSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    gap: 10px;
    width: 180px;
  }
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
  align-items: center;
  gap: 5px;
`;

export const RankBarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const rankImages = {
  'bronze.png': BronzeIcon,
  'silver.png': SilverIcon,
  'gold.png': GoldIcon,
  'diamond.png': DiamondIcon,
  'master.png': MasterIcon,
};

type RankImageType = keyof typeof rankImages;

interface RankIconProps {
  rankImg?: string;
  alt?: string;
}

export const RankIcon = styled.img.attrs<RankIconProps>(({ rankImg, alt }) => ({
  src: rankImages[rankImg as RankImageType] || rankImages['bronze.png'],
  alt: alt || '등급 아이콘',
}))`
  width: 24px;
  height: 24px;

  @media screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
  }

  @media screen and (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
`;

interface RankProps {
  $rank?: string;
}

export const Rank = styled.span<RankProps>`
  display: flex;
  width: auto;
  font-size: 0.875rem;
  padding: 0.125rem 0.5rem;
  border-radius: 10px;

  ${({ $rank }) => {
    switch ($rank) {
      case '마스터':
        return `background-color: ${theme.colors.master}`;
      case '다이아':
        return `background-color: ${theme.colors.diamond};`;
      case '골드':
        return `background-color: ${theme.colors.gold};`;
      case '실버':
        return `background-color: ${theme.colors.silver};`;
      case '브론즈':
        return `background-color: ${theme.colors.bronze};`;
      default:
        return `background-color: ${theme.colors.bronze};`;
    }
  }}
`;

export const Nickname = styled.div`
  font-size: ${theme.fontSize.h2};
  font-weight: ${theme.fontWeight.bold};

  span {
    color: ${theme.colors.grayLight};
  }
`;

export const Email = styled.div`
  color: ${theme.colors.grayLight};
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
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #1f2123;
  }

  &:active {
    transform: scale(0.95);
    transform: 0.3s ease;
  }
`;

export const EditIcon = styled(Pen)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export const MenuBar = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  align-items: center;
  background-color: ${theme.colors.grayDark};
  border-radius: ${theme.borderRadius.xs};
  height: 40px;
  margin-bottom: 70px;

  @media screen and (max-width: 768px) {
    padding: 20px;
    height: 30px;
    margin-bottom: 40px;
  }
  @media screen and (max-width: 480px) {
    padding: 15px;
    height: 25px;
    margin-bottom: 30px;
  }
`;

interface MenuBarItemProps {
  $active: boolean;
}

export const MenuBarItem = styled.li<MenuBarItemProps>`
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

  &:hover {
    color: ${theme.colors.primary};
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
    padding: 0px;
  }
  @media screen and (max-width: 480px) {
    font-size: 14px;
    /* padding: 15px 10px; */
    white-space: nowrap;
  }
`;

export const MenuBarItemText = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  gap: 8px;

  p {
    font-size: 24px;
    font-weight: ${theme.fontWeight.regular};

    @media screen and (max-width: 768px) {
      font-size: 20px;
    }
    @media screen and (max-width: 480px) {
      font-size: 10px;
    }
  }

  @media screen and (max-width: 768px) {
    gap: 6px;
  }
  @media screen and (max-width: 480px) {
    gap: 4px;
  }
`;

export const LikedMovieSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  padding-bottom: 20px;
`;

export const MyReviewSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const QuestionIcon = styled(Question)`
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    fill: #1f2123;
  }
`;

export const RankInfoSection = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

export const RankInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export const RankInfoModal = styled(Modal)<IModalProps>`
  display: flex;
`;

export const LikedMovieItem = styled.div`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const MovieImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;

export const PointHistorySection = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TotalPoints = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 1rem;
  border-radius: 8px;
`;

export const PointHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  max-height: 150px;
`;

export const PointHistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

export const HistoryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Description = styled.span`
  font-size: 0.9rem;
  color: ${theme.colors.text};
`;

export const CreatedAt = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

export const Points = styled.span<{ $isPositive: boolean }>`
  font-weight: bold;
  color: ${({ $isPositive }) => ($isPositive ? '#2ecc71' : '#e74c3c')};
`;

export const PointInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;

  span {
    color: ${theme.colors.text};
    font-size: 1.2rem;
  }
`;

export const RankPercentage = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: ${theme.colors.text};

  span {
    color: ${theme.colors.primary};
    font-weight: bold;
    font-size: 1.1rem;
  }
`;
