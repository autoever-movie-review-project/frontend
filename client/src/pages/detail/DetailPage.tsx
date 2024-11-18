import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import DetailMovieInfo from './templates/DetailMovieInfo';
import MediaContainer from './templates/MediaContainer';
import ActorContainer from './templates/ActorContainer';
import ReviewCard from 'components/ReviewCard';
import { useModal } from 'hooks/useModal';
import { Modal } from 'components/Modal/Modal';
import ReviewRating from './templates/ReviewRating';
import { useParams } from 'react-router-dom';
import { fetchReviewsByMovieId } from 'api/review/reviewApi';
import { ReviewResponseArray } from 'types/review';
import { useQuery } from '@tanstack/react-query';
import { movieApi } from 'api/movie/movieApi';
import { youtubeApi } from 'api/youtube/youtubeApi';
import * as S from './templates/DetailMovieInfo.style';
import Skeleton from 'components/Skeleton/Skeleton';

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
  const [reviews, setReviews] = useState<ReviewResponseArray>([]); // 리뷰 데이터
  const { openModal, closeModal, isModalOpen } = useModal(); // 리뷰모달 hook
  const [rating, setRating] = useState(0); // 리뷰별점 post용
  const [reviewContent, setReviewContent] = useState(''); // 리뷰내용 post용
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
    trailerId,
    shorts,
    error: youtubeError,
    isLoading: youtubeLoading,
  } = youtubeApi.useYoutube(movie?.title || '');

  const getImageUrl = (path: string) => {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : '/default-image.jpg'; // 기본 이미지 경로 지정
  };

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewData = await fetchReviewsByMovieId(numericMovieId);
        setReviews(reviewData);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    getReviews();
  }, [movieId]);

  const submitReview = () => {
    if (reviewContent === '') {
      alert('리뷰를 입력해주세요.');
    } else if (rating < 1) {
      alert('별점을 등록해주세요.');
    } else {
      // 리뷰 post axios (userId, movieId, content, rating)
    }
    console.log('리뷰 제출:', { movieId, rating, reviewContent });

    close();
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
        <DetailMovieInfo openModal={openModal} isLoading={isLoading} movie={movie} />
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
        {reviews.map((review) => (
          <div key={review.reviewId}>
            <ReviewCard
              reviewid={review.reviewId}
              rating={review.rating}
              content={review.content}
              likesCount={review.likesCount}
              nickname={review.nickname}
              rank={review.rankImg as 'Silver' | 'Master' | 'Diamond' | 'Gold' | 'Bronze'}
              profile={review.profile}
              isLiked={false}
            />
          </div>
        ))}
        <ReviewCard
          reviewid={0}
          rating={3.5}
          content={'임시내용'}
          likesCount={3}
          nickname={'임시닉'}
          rank={'Silver'}
          profile={'string'}
          isLiked={true}
        />
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
