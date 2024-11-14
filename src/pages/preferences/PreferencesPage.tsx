import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import reload from 'assets/reload.svg';
import testimg from 'assets/temp.svg';
import { theme } from 'styles/theme';

const Layout = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: black;
  padding-bottom: 30px;
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
    font-weight: 500;
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

const PreferencesMovieWrapper = styled.div<{ $active: boolean }>`
  width: 300px;
  height: 420px;
  cursor: pointer;
  border: 6px solid transparent;
  border-radius: 10px;
  ${({ $active }) =>
    $active &&
    css`
      border-color: ${theme.colors.primary};
    `}
`;

const PreferencesMovie = styled.img`
  width: 100%;
  height: 100%;
`;

interface Movie {
  movieId: number;
  title: string;
  genre: string;
  cast: string[];
  main_img: string;
}

function PreferencesPage() {
  const [movieList, setMovieList] = useState([testimg, testimg, testimg]);
  const [selectedMovieList, setSelectedMovieList] = useState([10]);

  useEffect(() => {
    // 첫 랜덤리스트 받아오기
  }, []);

  const handleResetButtonClick = () => {
    setSelectedMovieList([]);
    // 랜덤리스트 axios
  };

  const handleMovieClick = (index: number) => {
    if (selectedMovieList.includes(index)) {
      setSelectedMovieList(selectedMovieList.filter((item) => item !== index));
    } else {
      setSelectedMovieList([...selectedMovieList, index]);
    }
  };

  function checkMovie(index: number) {
    if (selectedMovieList.includes(index)) return true;
    else return false;
  }

  return (
    <Layout>
      <Container>
        <Wrapper>
          <TitleWrapper>
            <Title>선호하는 영화 3가지를 선택해 주세요.</Title>
            <SubTitle>관련도 높은 영화를 추천해드릴 예정이에요!</SubTitle>
          </TitleWrapper>
          <ResetButton onClick={handleResetButtonClick}>
            <p>새로고침</p>
            <img src={reload} alt="reload" />
          </ResetButton>
        </Wrapper>
        <PreferencesMovieContainer>
          {movieList.map((movie, index) => (
            <PreferencesMovieWrapper key={index} $active={checkMovie(index)} onClick={() => handleMovieClick(index)}>
              <PreferencesMovie src={movie} alt="movie" />
            </PreferencesMovieWrapper>
          ))}
        </PreferencesMovieContainer>
      </Container>
    </Layout>
  );
}

export default PreferencesPage;
