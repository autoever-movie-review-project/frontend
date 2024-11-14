import React from 'react';
import { toast } from 'react-toastify';
import { useAuth } from 'hooks/useAuth';
import { theme } from 'styles/theme';
import styled from 'styled-components';
import Heart from 'assets/heart.svg?react';
import StarImg from 'assets/star.svg?react';
import StarHalfImg from 'assets/star-half.svg?react';
import Profile from './Profile';
import { rankToKorean } from 'util/englishToKorean';
import DefaultProfile from 'assets/default-profile.png';

interface RankProps {
  $rank: string;
}

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

export const Rank = styled.span<RankProps>`
  display: flex;
  width: auto;
  font-size: 0.875rem;
  padding: 0.125rem 0.5rem;
  border-radius: 10px;

  ${({ $rank }) => {
    switch ($rank.toLowerCase()) {
      case 'master':
        return `background-color: ${theme.colors.master}`;
      case 'diamond':
        return `background-color: ${theme.colors.diamond};`;
      case 'gold':
        return `background-color: ${theme.colors.gold};`;
      case 'silver':
        return `background-color: ${theme.colors.silver};`;
      case 'bronze':
        return `background-color: ${theme.colors.bronze};`;
      default:
        return `background-color: ${theme.colors.bronze};`;
    }
  }}
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
  transition: all 0.2s ease-in-out;

  path {
    fill: ${(props) => (props.$isLiked ? '#EF4444' : 'none')};
    stroke: ${(props) => (props.$isLiked ? '#EF4444' : '#9CA3AF')};
  }
`;

export const LikeCount = styled.span`
  color: #9ca3af;
`;

interface ReviewCardProps {
  reviewid?: number;
  rating: number | undefined;
  content: string | undefined;
  likesCount: number | undefined;
  isLiked: boolean | undefined;
  profile: string | undefined;
  nickname: string | undefined;
  rank: 'Master' | 'Diamond' | 'Gold' | 'Silver' | 'Bronze';
}

function ReviewCard({
  // reviewid,
  rating,
  content,
  likesCount = 0,
  isLiked: initialIsLiked = false,
  profile,
  nickname = '사용자',
  rank,
}: ReviewCardProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = React.useState(initialIsLiked);
  const [likeCount, setLikeCount] = React.useState(likesCount);

  const renderStars = (rating: number | undefined) => {
    const stars = [];
    const fullStars = typeof rating === 'number' ? Math.floor(rating) : null;
    const hasHalfStar = typeof rating === 'number' ? rating % 1 >= 0.5 : null;

    for (let i = 0; i < 5; i++) {
      if (fullStars && i < fullStars) {
        stars.push(<Star key={i} $filled></Star>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<HalfStar key={i} $filled></HalfStar>);
      } else {
        continue;
      }
    }
    return stars;
  };

  const handleLikeClick = () => {
    if (!user) {
      toast.warn('로그인이 필요한 서비스입니다.');
      return;
    }
    // 좋아요 토글 처리
  };

  return (
    <Card>
      <StarsContainer>{renderStars(rating)}</StarsContainer>
      <ReviewText>{content}</ReviewText>
      <UserSection>
        <UserInfo>
          <Profile width="2.5rem" height="2.5rem" rank={rank} src={DefaultProfile}></Profile>
          <UserDetails>
            <Nickname>{nickname}</Nickname>
            {rank && <Rank $rank={rank}>{rank}</Rank>}
          </UserDetails>
        </UserInfo>
        <LikeButton onClick={handleLikeClick} disabled={!user} aria-label={isLiked ? '좋아요 취소' : '좋아요'}>
          <HeartIcon $isLiked={isLiked} />
          <LikeCount>{likeCount}</LikeCount>
        </LikeButton>
      </UserSection>
    </Card>
  );
}

export default ReviewCard;
