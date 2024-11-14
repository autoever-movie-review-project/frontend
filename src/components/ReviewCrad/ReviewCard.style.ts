import styled from 'styled-components';
import { theme } from 'styles/theme';
import Heart from 'assets/heart.svg?react';
import StarImg from 'assets/star.svg?react';
import StarHalfImg from 'assets/star-half.svg?react';

export const Card = styled.div`
  width: 275px;
  height: 330px;
  min-width: 200px;
  min-height: 250px;
  background-color: ${theme.colors.grayDark};
  border-radius: ${theme.borderRadius.xs};
  padding: 12px;
  color: white;
`;

export const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

export const Star = styled(StarImg)<{ $filled?: boolean }>`
  width: 20px;
  color: ${theme.colors.grayDark};
  fill: ${(props) => (props.$filled ? `${theme.colors.primaryDark}` : '#111')};
`;

export const HalfStar = styled(StarHalfImg)<{ $filled?: boolean }>`
  width: 20px;
  color: ${theme.colors.grayDark};
  fill: ${(props) => (props.$filled ? `${theme.colors.primaryDark}` : '#111')};
`;

export const ReviewText = styled.p`
  display: block;
  height: 240px;
  margin-bottom: 15px;
  font-size: ${theme.fontSize.md};
  line-height: 22px;
  border-bottom: 0.5px solid ${theme.colors.grayLight};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Nickname = styled.p`
  margin-left: 4px;
  font-weight: ${theme.fontWeight.regular};
`;

export const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
`;

export const HeartIcon = styled(Heart)<{ $isLiked: boolean }>`
  width: 20px;
  height: 20px;
  transition: all 0.3s ease-in-out;

  path {
    fill: ${(props) => (props.$isLiked ? '#EF4444' : 'none')};
    stroke: ${(props) => (props.$isLiked ? '#EF4444' : '#9CA3AF')};
  }
`;

export const LikeCount = styled.span`
  color: #9ca3af;
`;

type RankType = 'Master' | 'Diamond' | 'Gold' | 'Silver' | 'Bronze';

interface RankProps {
  $rank?: RankType;
}

export const Rank = styled.span<RankProps>`
  display: flex;
  width: auto;
  font-size: 0.875rem;
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
  background-color: ${({ $rank }) => {
    switch ($rank?.toLowerCase()) {
      case 'master':
        return theme.colors.master;
      case 'diamond':
        return theme.colors.diamond;
      case 'gold':
        return theme.colors.gold;
      case 'silver':
        return theme.colors.silver;
      case 'bronze':
      default:
        return theme.colors.bronze;
    }
  }};
`;
