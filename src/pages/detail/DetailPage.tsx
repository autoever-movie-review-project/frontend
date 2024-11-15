import React from 'react';
import styled from 'styled-components';
import DetailMovieInfo from './templates/DetailMovieInfo';
import MediaContainer from './templates/MediaContainer';
import ActorContainer from './templates/ActorContainer';

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
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  height: 100%;
  margin-bottom: 80px;
`;

function DetailPage() {
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
      <Wrapper>
        <Title>리뷰</Title>
      </Wrapper>
    </Container>
  );
}

export default DetailPage;
