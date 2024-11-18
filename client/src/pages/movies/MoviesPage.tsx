import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Movie, MovieArray } from 'types/movie';
import Button from 'components/Button';
import { fetchSearchMovieList } from 'api/movie/movieApi';

const Container = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  margin-top: 80px;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextWrapper = styled.div`
  padding-top: 50px;
  margin-left: 100px;
  width: 100%;
  height: 100%;
  display: flex;
  margin-bottom: 50px;
`;

const Text = styled.h1`
  font-size: 40px;
  font-weight: bold;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  width: 95%;
  height: 100%;
  padding: 20px;
`;

const CardWrapper = styled.div`
  width: calc(100% / 7);
  height: 300px;
  background-color: #333;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 5px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const MoviesPage: React.FC = () => {
  const location = useLocation();
  const searchData = location.state?.searchData || '';
  const [movies, setMovies] = useState<MovieArray>();
  const navigate = useNavigate();

  const handleFetchSearchMovies = async () => {
    try {
      const fetchedMovies = await fetchSearchMovieList(searchData);
      setMovies(fetchedMovies);
      console.log(fetchedMovies);
    } catch (error) {
      console.error('검색 실패:', error);
    }
  };

  useEffect(() => {
    setMovies([]);
    if (searchData) handleFetchSearchMovies();
  }, [searchData]);

  const handleCardClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <Container>
      {searchData ? (
        <>
          <TextWrapper>
            <Text>"{searchData}" 에 대한 검색 결과 입니다</Text>
          </TextWrapper>
          <ContentsContainer>
            {movies &&
              movies.map((movie: Movie) => (
                <CardWrapper key={movie.movieId} onClick={() => handleCardClick(movie.movieId)}>
                  <CardImage src={movie.mainImg} alt={movie.title} />
                </CardWrapper>
              ))}
          </ContentsContainer>
        </>
      ) : (
        <TextWrapper>
          <Text>키워드를 입력해 주세요!</Text>
          <Text>이런 장르는 어떠신가요?</Text>
          <Button text={'ㅎㅇ'}>하이</Button>
        </TextWrapper>
      )}
    </Container>
  );
};

export default MoviesPage;
