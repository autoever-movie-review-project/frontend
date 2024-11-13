import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import reload from 'assets/reload.svg';

import testimg from 'assets/temp.svg';

const Layout = styled.div`
  width: 100vm;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: black;
`;

const Container = styled.div`
  width: 1100px;
  height: 100%;
  background-color: black;
  margin-top: 60px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  margin-bottom: 20px;
`;

const TitleWrapper = styled.div`
  width: 600px;
  height: 50px;
  padding-top: 60px;
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

const PreferencesMovieContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  width: 1100px;
  height: 100%;
  margin: 0 auto;
`;

const PreferencesMovie = styled.img`
  width: 300px;
  height: 420px;
`;

function PreferencesPage() {
  const [movieList, setMovieList] = useState();
  const [selectedMovieList, setSelectedMovieList] = useState();

  useEffect(() => {
    //랜덤영화 9개 get axios
  }, []);

  useEffect(() => {
    //선택된영화 상태 setSelectedMovieList 관리
  }, []);

  const handleResetButtonClick = () => {
    //랜덤영화리셋
  };

  const handleCheckImage = () => {
    // boolean css관리, useEffect
  };

  return (
    <Layout>
      <Container>
        <Wrapper>
          <TitleWrapper>
            <Title>선호하는 영화 3가지를 선택해 주세요.</Title>
            <SubTitle>관련도 높은 영화를 추천해드릴 예정이에요!</SubTitle>
          </TitleWrapper>
          <ResetButton onClick={() => handleResetButtonClick()}>
            <p>새로고침</p>
            <img src={reload} />
          </ResetButton>
        </Wrapper>
        <PreferencesMovieContainer>
          <PreferencesMovie src={testimg} onClick={() => handleCheckImage()} />
          <PreferencesMovie src={testimg} />
          <PreferencesMovie src={testimg} />
          <PreferencesMovie src={testimg} />
          <PreferencesMovie src={testimg} />
          <PreferencesMovie src={testimg} />
        </PreferencesMovieContainer>
      </Container>
    </Layout>
  );
}

export default PreferencesPage;
