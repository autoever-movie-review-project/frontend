import React from 'react';
import { toast } from 'react-toastify';
import { useAuth } from 'hooks/useAuth';
import { theme } from 'styles/theme';
import styled from 'styled-components';
import Heart from 'assets/heart.svg?react';
import StarImg from 'assets/star.svg?react';
import StarHalfImg from 'assets/star-half.svg?react';

export const Card = styled.div`
  width: 280px;
  height: 330px;
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

export const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100px;
  background-color: ${theme.colors.diamond};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
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

export const UserType = styled.span`
  display: flex;
  width: auto;
  font-size: 0.875rem;
  background-color: ${theme.colors.diamond};
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
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
  rating: number;
  content: string;
  likesCount: number;
  isLiked: boolean;
  profile: string;
  nickname: string;
  userType: string;
}

function ReviewCard({
  // reviewid,
  rating,
  content,
  likesCount = 0,
  isLiked: initialIsLiked = false,
  // profile,
  nickname = 'User',
  userType,
}: ReviewCardProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = React.useState(initialIsLiked);
  const [likeCount, setLikeCount] = React.useState(likesCount);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
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

  const userInitial = nickname?.charAt(0) || '?';

  return (
    <Card>
      <StarsContainer>{renderStars(rating)}</StarsContainer>
      <ReviewText>{content}</ReviewText>
      <UserSection>
        <UserInfo>
          <Avatar>{userInitial}</Avatar>
          <UserDetails>
            <Nickname>{nickname}</Nickname>
            {userType && <UserType>{userType}</UserType>}
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
