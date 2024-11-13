import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  justify-content: space-between;
`;

const TrailerWrapper = styled.div`
  width: 45%;
  height: 400px;
`;

const ShortsWrapper = styled.div`
  width: 45%;
  height: 400px;
`;

const Title = styled.h1`
  width: 500px;
  height: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #ececec;
  margin-bottom: 20px;
`;

function MediaContainer() {
  return (
    <Container>
      <TrailerWrapper>
        <Title>예고편</Title>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/lQ2FIaPGVKY?loop=1&mute=1&autoplay=1"
        ></iframe>
      </TrailerWrapper>
      <ShortsWrapper>
        <Title>Shorts</Title>
        <iframe width="20%" height="100%" src="https://youtube.com/embed/9dXRiw2Q0b4?si=nJUYr-TsDaFMwlQz"></iframe>
      </ShortsWrapper>
    </Container>
  );
}

export default MediaContainer;
