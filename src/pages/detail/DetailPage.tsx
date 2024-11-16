import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DetailMovieInfo from './templates/DetailMovieInfo';
import MediaContainer from './templates/MediaContainer';
import ActorContainer from './templates/ActorContainer';
import ReviewCard from 'components/ReviewCard';
import { useModal } from 'hooks/useModal';
import { Modal } from 'components/Modal/Modal';
import ReviewRating from './templates/ReviewRating';
import { theme } from 'styles/theme';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { fetchReviewsByMovieId } from 'api/review/reviewApi';
import { ReviewResponseArray } from 'models/review.model';

const Container = styled.div`
  width: 100vm;
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
  font-size: 20px;
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
  margin-bottom: 150px;
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
  margin: 0 auto;
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
  const { movieId } = useParams();
  const numericMovieId = Number(movieId);
  const [actorList, setActorList] = useState([]);
  const [reviews, setReviews] = useState<ReviewResponseArray>([]); // 리뷰 데이터
  const [movieDetails, setMovieDetails] = useState(null); //영화 디테일 데이터
  const { openModal, closeModal, isModalOpen } = useModal(); // 리뷰모달 hook
  const [rating, setRating] = useState(0); // 리뷰별점 post용
  const [reviewContent, setReviewContent] = useState(''); // 리뷰내용 post용
  const [trailerId, setTrailerId] = useState(''); // 유튜브 예고편 videoId값
  const [shorts, setShorts] = useState([]); // 쇼츠 3개 배열 videoId값

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`/api/movie/${movieId}`);
        setMovieDetails(response.data);
        setActorList(response.data.actors);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const getReviews = async () => {
      try {
        const reviewData = await fetchReviewsByMovieId(numericMovieId);
        setReviews(reviewData);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchMovieDetails();
    getReviews();
  }, [movieId]);

  // useEffect(() => {
  //   const fetchTrailer = async (movieTitle: string) => {
  //     try {
  //       const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
  //         params: {
  //           part: 'snippet',
  //           q: `${movieTitle} 예고편`,
  //           key: import.meta.env.VITE_YOUTUBE_API_KEY,
  //           type: 'video',
  //           maxResults: 1,
  //         },
  //       });
  //       const videoId = response.data.items[0]?.id.videoId;
  //       setTrailerId(videoId);
  //     } catch (error) {
  //       setTrailerId('fail');
  //       console.error('YouTube API Error:', error);
  //     }
  //   };

  //   fetchTrailer('파일럿'); //movieDetails.title
  // }, [[movieId]]);

  // useEffect(() => {
  //   const fetchShorts = async (movieTitle: string) => {
  //     try {
  //       const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
  //         params: {
  //           part: 'snippet',
  //           q: `${movieTitle} 쇼츠`,
  //           key: import.meta.env.VITE_YOUTUBE_API_KEY,
  //           type: 'video',
  //           maxResults: 3,
  //         },
  //       });
  //       const videoIds = response.data.items.map((item: { id: { videoId: string } }) => item.id.videoId);
  //       setShorts(videoIds);
  //     } catch (error) {
  //       console.error('YouTube API Error:', error);
  //       setShorts([]);
  //     }
  //   };

  //   fetchShorts('파일럿'); //movieDetails.title
  // }, [movieId]);

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

  return (
    <Container>
      <Wrapper>
        <DetailMovieInfo />
      </Wrapper>
      <Wrapper>
        <MediaContainer trailerId={trailerId} shorts={shorts} />
      </Wrapper>
      <Wrapper>
        <ActorContainer
          actors={[
            { src: 'image1.jpg', name: '김배우' },
            { src: 'image1.jpg', name: '김배우' },
            { src: 'image1.jpg', name: '김배우' },
            { src: 'image1.jpg', name: '김배우' },
            { src: 'image2.jpg', name: '이배우' }, //axios 배우리스트
          ]}
          //actors={actorList}
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
      <button onClick={openModal}>임시모달버튼..</button>
    </Container>
  );
}

export default DetailPage;
