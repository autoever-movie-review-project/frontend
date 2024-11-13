import React, { useState } from 'react';
import styled from 'styled-components';
import DetailMovieInfo from './templates/DetailMovieInfo';
import MediaContainer from './templates/MediaContainer';
import ActorContainer from './templates/ActorContainer';
import ReviewCard from 'components/ReviewCard';

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
  height: 100%;
  margin: 0 auto;
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

function DetailPage() {
  const [actorList, setActorList] = useState([]);
  //리뷰데이터 axios 받아오기

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
          userType={'Silver'}
        />
        <ReviewCard
          reviewid={0}
          rating={3.5}
          content={'임시내용'}
          likesCount={3}
          nickname={'임시닉'}
          userType={'Silver'}
        />{' '}
        <ReviewCard
          reviewid={0}
          rating={3.5}
          content={'임시내용'}
          likesCount={3}
          nickname={'임시닉'}
          userType={'Silver'}
        />{' '}
        <ReviewCard
          reviewid={0}
          rating={3.5}
          content={'임시내용'}
          likesCount={3}
          nickname={'임시닉'}
          userType={'Silver'}
        />{' '}
        <ReviewCard
          reviewid={0}
          rating={3.5}
          content={'임시내용'}
          likesCount={3}
          nickname={'임시닉'}
          userType={'Silver'}
        />
      </ReviewWrapper>
    </Container>
  );
}

export default DetailPage;
