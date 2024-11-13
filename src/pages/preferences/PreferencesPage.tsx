import React, { useState } from 'react';
import styled from 'styled-components';
import reload from 'assets/reload.svg';

import testimg from 'assets/temp.svg';

const Container = styled.div`
  width: 100vm;
  height: 100%;
  background-color: black;
  margin-top: 60px;
`;

const Wrapper = styled.div`
  width: 1100px;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  width: 600px;
  height: 50px;
  padding-top: 60px;
  margin-left: 200px;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #ececec;
  margin-bottom: 10px;
`;

const SubTitle = styled.p`
  font-size: 20px;
  color: #ececec;
`;

const ResetButton = styled.div`
  margin-top: 60px;
  width: 100px;
  height: 80px;
  cursor: pointer;
  display: flex;
  align-items: end;
  gap: 5px;
  p {
    color: #ececec;
    font-size: 20px;
    font-family: 500px;
  }
  img {
    width: 20px;
    height: 20px;
  }
`;

const PreferencesMovieWrapper = styled.div`
  width: 1100px;
  height: 100%;
  margin: 0 auto;
`;

const PreferencesMovie = styled.img`
  width: 300px;
  height: 420px;
`;

function PreferencesPage() {
  const [movieList, setMovieList] = useState([]);

  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>선호하는 영화 3가지를 선택해 주세요.</Title>
          <SubTitle>관련도 높은 영화를 추천해드릴 예정이에요!</SubTitle>
        </TitleWrapper>
        <ResetButton>
          <p>새로고침</p>
          <img src={reload} />
        </ResetButton>
      </Wrapper>
      <PreferencesMovieWrapper>
        <PreferencesMovie src={testimg} />
        <PreferencesMovie src={testimg} />
        <PreferencesMovie src={testimg} />
        <PreferencesMovie src={testimg} />
        <PreferencesMovie src={testimg} />
        <PreferencesMovie src={testimg} />
      </PreferencesMovieWrapper>
    </Container>
  );
}

export default PreferencesPage;
