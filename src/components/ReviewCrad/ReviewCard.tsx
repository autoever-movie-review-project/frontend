import React from 'react';
import { toast } from 'react-toastify';
import { useAuth } from 'hooks/useAuth';
import Profile from '../Profile';
import { User } from 'api/auth/auth';
import * as S from './ReviewCard.style';

type RankType = 'Master' | 'Diamond' | 'Gold' | 'Silver' | 'Bronze';

interface ReviewCardProps extends Omit<User, 'rankName'> {
  reviewid?: number;
  rating?: number;
  content?: string;
  likesCount?: number;
  isLiked?: boolean;
  rank?: RankType;
}

function ReviewCard({
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

  const renderStars = React.useMemo(() => {
    const stars = [];
    const fullStars = Math.floor(rating!);
    const hasHalfStar = rating! % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<S.Star key={i} $filled />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<S.HalfStar key={i} $filled />);
      }
    }
    return stars;
  }, [rating]);

  const handleLikeClick = React.useCallback(() => {
    if (!user?.data) {
      toast.warn('로그인이 필요한 서비스에요.', {
        autoClose: 2000,
      });
      return;
    }
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  }, [user, isLiked]);

  return (
    <S.Card>
      <S.StarsContainer>{renderStars}</S.StarsContainer>
      <S.ReviewText>{content}</S.ReviewText>
      <S.UserSection>
        <S.UserInfo>
          <Profile width="2.5rem" height="2.5rem" rank={rank} src={profile} />
          <S.UserDetails>
            <S.Nickname>{nickname}</S.Nickname>
            <S.Rank $rank={rank}>{rank}</S.Rank>
          </S.UserDetails>
        </S.UserInfo>
        <S.LikeButton onClick={handleLikeClick}>
          <S.HeartIcon $isLiked={isLiked} />
          <S.LikeCount>{likeCount}</S.LikeCount>
        </S.LikeButton>
      </S.UserSection>
    </S.Card>
  );
}

export default React.memo(ReviewCard);
