import styled from 'styled-components';
import { theme } from 'styles/theme';
import Heart from 'assets/heart.svg?react';
import StarImg from 'assets/star.svg?react';
import StarHalfImg from 'assets/star-half.svg?react';
import Alert from 'assets/siren.svg?react';
import { RankType } from 'types/rank';

export const Card = styled.div`
  width: 275px;
  height: 330px;
  min-width: 200px;
  min-height: 250px;
  background-color: ${theme.colors.grayDark};
  border-radius: ${theme.borderRadius.xs};
  padding: 12px;
  color: white;
  position: relative;
`;

export const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StarGroup = styled.div`
  display: flex;
  align-items: center;
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

export const ReviewContainer = styled.div`
  position: relative;
`;

export const ReviewText = styled.p<{ $isBlurred?: boolean }>`
  display: block;
  height: 240px;
  margin-bottom: 15px;
  font-size: ${theme.fontSize.md};
  line-height: 22px;
  border-bottom: 0.5px solid ${theme.colors.grayLight};
  overflow: hidden;
  text-overflow: ellipsis;
  filter: ${(props) => (props.$isBlurred ? 'blur(4px)' : 'none')};
`;

export const SpoilerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 15px;
  /* background-color: rgba(31, 41, 55, 0.95); */
  /* backdrop-filter: blur(4px); */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  z-index: 1;
`;

export const SpoilerText = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.grayLight};
`;

export const RevealButton = styled.button`
  background: none;
  border: 1px solid ${theme.colors.grayLight};
  border-radius: ${theme.borderRadius.xs};
  padding: 6px 12px;
  color: ${theme.colors.grayLight};
  cursor: pointer;
  font-size: ${theme.fontSize.sm};

  &:hover {
    background-color: rgba(156, 163, 175, 0.1);
  }
`;

export const ReportButton = styled.button<{ $hasReported: boolean }>`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: ${(props) => (props.$hasReported ? 'default' : 'pointer')};
  opacity: ${(props) => (props.$hasReported ? 0.5 : 1)};
  margin-right: 4px;
`;

export const ReportIcon = styled(Alert)`
  width: 18px;
  height: 18px;
  color: ${theme.colors.grayLight};
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
  font-weight: ${theme.fontWeight.regular};
`;

export const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
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

export const Rank = styled.span<{ $rank?: RankType }>`
  display: flex;
  width: fit-content;
  font-size: 0.875rem;
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
  background-color: ${({ $rank }) => {
    switch ($rank) {
      case '마스터':
        return theme.colors.master;
      case '다이아':
        return theme.colors.diamond;
      case '골드':
        return theme.colors.gold;
      case '실버':
        return theme.colors.silver;
      case '브론즈':
      default:
        return theme.colors.bronze;
    }
  }};
`;
