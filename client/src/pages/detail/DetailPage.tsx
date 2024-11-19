import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import DetailMovieInfo from './templates/DetailMovieInfo';
import MediaContainer from './templates/MediaContainer';
import ActorContainer from './templates/ActorContainer';
import ReviewCard from 'components/ReviewCrad/ReviewCard';
import { useModal } from 'hooks/useModal';
import { Modal } from 'components/Modal/Modal';
import ReviewRating from './templates/ReviewRating';
import { useParams } from 'react-router-dom';
import { fetchReviewsByMovieId, postReview } from 'api/review/reviewApi';
import { ReviewResponse } from 'types/review';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { movieApi } from 'api/movie/movieApi';
import { youtubeApi } from 'api/youtube/youtubeApi';
import * as S from './templates/DetailMovieInfo.style';
import Skeleton from 'components/Skeleton/Skeleton';
import { addLikeMovie, deleteLikeMovie } from 'api/like/movieLikeApi';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { fetchPlusPoint } from 'api/point/pointApi';
import { usePointStore } from 'store/point';

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  background-color: black;
`;

const Title = styled.h1`
  width: 500px;
  height: 20px;
  font-size: 24px;
  font-weight: 600;
  color: #ececec;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 100px;
`;

const ReviewTitleWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ReviewWrapper = styled.div`
  width: 90%;
  margin-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const ModalRatingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ececec;
  gap: 16px;
  h2 {
    text-align: center;
    font-size: 20px;
  }
`;

const ReviewTextArea = styled.textarea`
  width: 400px;
  justify-self: center;
  height: 250px;
  margin-top: 10px;
  font-size: 16px;
  color: #ececec;
  background-color: #272a30;
  border: none;
  line-height: 25px;
  border-radius: 10px;
  font-weight: 500;
  font-family: 'Pretendard';
  padding: 10px 15px;
  border: none;
  box-shadow: none;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const ReviewSubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 430px;
  border-radius: 10px;
  height: 50px;
  background-color: ${theme.colors.primary};
  color: #ececec;

  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
`;

function DetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const numericMovieId = Number(movieId);
  const { openModal, closeModal, isModalOpen } = useModal(); // 리뷰모달 hook
  const [rating, setRating] = useState(0); // 리뷰별점 post용
  const [reviewContent, setReviewContent] = useState(''); // 리뷰내용 post용

  const increPoint = usePointStore((state) => state.incrementCount);

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => movieApi.getMovieDetail(Number(movieId)),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
  });
  const {
    data: reviews = [], // 기본값을 빈 배열로 설정
    isLoading: isReviewsLoading,
    error: reviewsError,
  } = useQuery({
    queryKey: ['reviews', movieId],
    queryFn: () => fetchReviewsByMovieId(Number(movieId)),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
  });
  const {
    trailerId,
    shorts,
    error: youtubeError,
    isLoading: youtubeLoading,
  } = youtubeApi.useYoutube(movie?.title || '');

  const getImageUrl = (path: string) => {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : '/default-image.jpg'; // 기본 이미지 경로 지정
  };

  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: async (movieId: number) => {
      try {
        await addLikeMovie(movieId);
        return { isDelete: false };
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 409) {
          await deleteLikeMovie(movieId);
          return { isDelete: true };
        }
        throw error;
      }
    },
    onSuccess: (result) => {
      // 영화 정보 갱신
      queryClient.invalidateQueries({ queryKey: ['movie', movieId] });
      toast.success(result.isDelete ? '찜하기가 취소되었어요.' : '영화가 찜되었어요.');
    },
    onError: (error) => {
      console.error('영화 찜하기 실패:', error);
      toast.error('영화 찜하기에 실패했어요. 다시 시도해주세요.');
    },
  });

  const reviewMutation = useMutation({
    mutationFn: (reviewData: { movieId: number; rating: number; content: string }) => postReview(reviewData),
    onSuccess: async () => {
      try {
        // 리뷰 목록 갱신
        queryClient.invalidateQueries({ queryKey: ['reviews', movieId] });

        // 포인트 100점 추가
        await fetchPlusPoint({ points: 100, description: '리뷰 달기 성공!' });
        const beforePoint = localStorage.getItem('point');
        const newPoint = Number(beforePoint) + 100;
        localStorage.setItem('point', String(newPoint));
        increPoint(100);
        // 모달 닫기
        close();
      } catch (error) {
        console.error('포인트 추가 실패:', error);
        alert('포인트 지급에 실패했습니다. 다시 시도해주세요.');
      }
    },
    onError: (error) => {
      console.error('리뷰 작성 실패:', error);
      alert('리뷰 작성에 실패했습니다. 다시 시도해주세요.');
    },
  });
  const handleLikeClick = () => {
    likeMutation.mutate(numericMovieId);
  };

  const submitReview = () => {
    if (reviewContent === '') {
      alert('리뷰를 입력해주세요.');
      return;
    }
    if (rating < 1) {
      alert('별점을 등록해주세요.');
      return;
    }

    reviewMutation.mutate({
      movieId: numericMovieId,
      rating,
      content: reviewContent,
    });
  };
  const close = () => {
    setRating(0);
    setReviewContent('');
    closeModal();
  };

  if (error) return <div>오류가 발생했습니다. </div>;
  if (!movie) return <div>영화 정보를 찾을 수 없습니다.</div>;

  return (
    <Container>
      {isLoading && (
        <Container>
          <S.MovieDetailWrapper>
            <S.MovieInfoContainerSkeleton>
              <Skeleton animation="pulse" width="auto" height={60}></Skeleton>
              <Skeleton animation="pulse" width="auto" height={60}></Skeleton>
              <Skeleton animation="pulse" width="auto" height={160}></Skeleton>
              <Skeleton animation="pulse" width="auto" height={90}></Skeleton>
            </S.MovieInfoContainerSkeleton>
            <S.RatingDistribution>
              <Skeleton animation="pulse" width={300} height={300}></Skeleton>
            </S.RatingDistribution>
            <S.MovieImageWrapperSkeleton>
              <Skeleton animation="pulse" width={270} height={390}></Skeleton>
            </S.MovieImageWrapperSkeleton>
          </S.MovieDetailWrapper>
        </Container>
      )}
      <Wrapper>
        <DetailMovieInfo
          openModal={openModal}
          isLoading={isLoading}
          movie={movie}
          onLikeClick={handleLikeClick}
          isLiking={likeMutation.isPending}
        />
      </Wrapper>
      <Wrapper>
        <MediaContainer trailerId={trailerId} shorts={shorts} />
      </Wrapper>
      <Wrapper>
        <ActorContainer
          actors={movie.actorName.map((name, index) => ({
            name,
            src: getImageUrl(movie.actorImg[index]),
          }))}
        />
      </Wrapper>
      <ReviewTitleWrapper>
        <Title>리뷰</Title>
      </ReviewTitleWrapper>
      <ReviewWrapper>
        {reviews.map((review: ReviewResponse) => (
          <div key={review.reviewId}>
            <ReviewCard
              reviewId={review.reviewId}
              rating={review.rating}
              content={review.content}
              likesCount={review.likesCount}
              nickname={review.writerNickname}
              rank={review.rankImg as '마스터' | '다이아' | '골드' | '실버' | '브론즈'}
              profile={review.profile}
              liked={review.liked}
            />
          </div>
        ))}
      </ReviewWrapper>
      {isModalOpen && (
        <Modal modalTitle="리뷰 쓰기" closeModal={close} width="500px" height="600px">
          <ModalContainer>
            <ModalRatingWrapper>
              <h2>별점을 매겨주세요</h2>
              <ReviewRating count={5} value={rating} onChange={(value) => setRating(value)} />
              <ReviewTextArea
                placeholder="리뷰 내용을 작성하세요."
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />
              <ReviewSubmitButton onClick={submitReview}>리뷰 제출</ReviewSubmitButton>
            </ModalRatingWrapper>
          </ModalContainer>
        </Modal>
      )}
    </Container>
  );
}

export default DetailPage;
