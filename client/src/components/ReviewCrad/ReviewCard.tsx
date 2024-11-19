import { memo, useCallback, useState } from 'react';
import * as S from './ReviewCard.style';
import { RankType } from 'types/rank';
import Profile from 'components/Profile';
import { deleteReview } from 'api/review/reviewApi';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDeleteReviewLike, fetchPostReviewLike } from 'api/like/reviewLikeApi';

interface ReviewCardProps {
  reviewId?: number;
  userId?: number; // 리뷰 작성자의 userId
  currentUserId?: number; // 현재 로그인한 사용자 ID
  movieId?: number;
  mainImg?: string;
  rating: number;
  content: string;
  likesCount?: number;
  liked?: boolean;
  profile?: string;
  nickname?: string;
  rank?: RankType;
  spoilerCount?: number;
  onSpoilerReport?: (reviewId: number) => void;
}

const ReviewCard = ({
  reviewId = 0,
  movieId,
  mainImg,
  userId,
  currentUserId,
  rating,
  content,
  likesCount = 0,
  liked: initialIsLiked = false,
  profile,
  nickname,
  rank,
  spoilerCount = 0,
  onSpoilerReport,
}: ReviewCardProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(likesCount);
  const [isBlurred, setIsBlurred] = useState(spoilerCount >= 5);
  const [reportCount, setReportCount] = useState(spoilerCount);
  const [hasReported, setHasReported] = useState(false);

  const isMyReview = userId === currentUserId;

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<S.Star key={i} $filled />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<S.HalfStar key={i} $filled />);
      } else {
        stars.push(<S.Star key={i} />);
      }
    }
    return stars;
  };

  const handleLikeClick = useCallback(
    async (reviewId: number) => {
      try {
        if (isLiked) {
          // 좋아요 취소
          await fetchDeleteReviewLike(reviewId);
          setIsLiked(false);
          setLikeCount((prev) => prev - 1);
        } else {
          // 좋아요
          await fetchPostReviewLike(reviewId);
          setIsLiked(true);
          setLikeCount((prev) => prev + 1);
        }
      } catch (error) {
        console.error('좋아요 처리 중 오류 발생:', error);
      }
    },
    [isLiked]
  );

  const handleSpoilerReport = useCallback(() => {
    if (!hasReported) {
      const newCount = reportCount + 1;
      setReportCount(newCount);
      setIsBlurred(newCount >= 5);
      setHasReported(true);
      onSpoilerReport?.(reviewId);
    }
  }, [hasReported, reportCount, reviewId, onSpoilerReport]);

  const handleRevealContent = () => {
    setIsBlurred(false);
  };

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', movieId] });
      queryClient.invalidateQueries({ queryKey: ['myReviews'] }); // 삭제 시 내 리뷰도 같이 갱신
      toast.success('리뷰를 삭제했어요.');
    },
    onError: () => {
      toast.error('리뷰를 삭제하지 못했어요.');
    },
  });

  const handleReviewDelete = (reviewId: number) => {
    if (window.confirm('정말 삭제하실 건가요?')) {
      deleteMutation.mutate(reviewId);
    } else {
      return;
    }
  };

  return (
    <S.Card>
      <S.StarsContainer>
        <S.StarGroup>{renderStars()}</S.StarGroup>
        {!isMyReview ? (
          <S.ReportButton
            onClick={handleSpoilerReport}
            $hasReported={hasReported}
            title={hasReported ? '이미 신고한 리뷰에요.' : '스포일러 신고하기'}
          >
            <S.ReportIcon />
          </S.ReportButton>
        ) : (
          <S.XIcon onClick={() => handleReviewDelete(reviewId)}></S.XIcon>
        )}
      </S.StarsContainer>
      <S.ReviewContainer>
        {isBlurred && (
          <S.SpoilerOverlay>
            <S.SpoilerText>스포일러가 포함된 리뷰에요</S.SpoilerText>
            <S.RevealButton onClick={handleRevealContent}>리뷰 보기</S.RevealButton>
          </S.SpoilerOverlay>
        )}
        <S.Poster src={mainImg} />
        <S.ReviewText $isBlurred={isBlurred}>{content}</S.ReviewText>
      </S.ReviewContainer>
      <S.UserSection>
        <S.UserInfo>
          <Profile width="45px" height="45px"></Profile>
          <S.UserDetails>
            <S.Nickname>{nickname}</S.Nickname>
            <S.Rank $rank={rank}>{rank}</S.Rank>
          </S.UserDetails>
        </S.UserInfo>
        <S.LikeButton onClick={() => handleLikeClick(reviewId)}>
          <S.HeartIcon $isLiked={isLiked} />
          <S.LikeCount>{likeCount}</S.LikeCount>
        </S.LikeButton>
      </S.UserSection>
    </S.Card>
  );
};

export default memo(ReviewCard);
