import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  justify-content: space-between;
  gap: 20px;
`;

const TrailerWrapper = styled.div`
  width: 50%;
  height: 400px;
`;

const ShortsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 400px;
`;

const ShortsPlayer = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 9 / 16;
  display: flex;
  gap: 12px;
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    object-fit: cover;
  }
`;

const Title = styled.h1`
  width: 500px;
  height: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #ececec;
  margin-bottom: 20px;
`;

function MediaContainer({ trailerId, shorts }: { trailerId: string; shorts: Array<string> }) {
  return (
    <Container>
      <TrailerWrapper>
        <Title>예고편</Title>
        {trailerId !== 'fail' ? (
          <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${trailerId}?loop=1`}></iframe>
        ) : (
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/lQ2FIaPGVKY?loop=1&mute=1&"></iframe>
        )}
      </TrailerWrapper>
      <ShortsWrapper>
        <Title># Shorts</Title>
        <ShortsPlayer>
          {shorts.map((shortId, index) => (
            <div key={index}>
              <iframe
                src={`https://www.youtube.com/embed/${shortId}?theme=dark&autoplay=0&autohide=0&cc_load_policy=1&modestbranding=1&fs=0&showinfo=0&rel=0&iv_load_policy=3&mute=0&loop=1`}
                allow="encrypted-media"
                title="Shorts"
              ></iframe>
            </div>
          ))}
        </ShortsPlayer>
      </ShortsWrapper>
    </Container>
  );
}
export default MediaContainer;
