import React, { useState } from 'react';
import styled from 'styled-components';
import DetailMovieInfo from './templates/DetailMovieInfo';
import MediaContainer from './templates/MediaContainer';
import ActorContainer from './templates/ActorContainer';
import ReviewCard from 'components/ReviewCard';
import { useModal } from 'hooks/useModal';
import { Modal } from 'components/Modal/Modal';
import ReviewRating from './templates/ReviewRating';
import { theme } from 'styles/theme';

const Container = styled.div`
  width: 100vm;
  height: 100%;

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

  //hover시 버튼 효과주기
  //선호영화 버튼 그림자때기..
`;

function DetailPage() {
  const [actorList, setActorList] = useState([]);
  //리뷰데이터 axios 받아오기
  const { openModal, closeModal, isModalOpen } = useModal();
  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState('');

  const submitReview = () => {
    if (reviewContent === '') {
      alert('리뷰를 입력해주세요.');
    } else if (rating < 1) {
      alert('별점을 등록해주세요.');
    } else {
      // 리뷰 post axios
    }
    console.log('리뷰 제출:', { rating, reviewContent });

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
        <MediaContainer />
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
        />
      </Wrapper>
      <ReviewTitleWrapper>
        <Title>리뷰</Title>
      </ReviewTitleWrapper>
      <ReviewWrapper>
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
        <ReviewCard
          reviewid={0}
          rating={3.5}
          content={'임시내용'}
          likesCount={3}
          nickname={'임시닉'}
          rank={'Diamond'}
          profile={'string'}
          isLiked={false}
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
