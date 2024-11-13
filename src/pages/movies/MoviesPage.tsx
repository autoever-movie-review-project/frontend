import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

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
  margin-left: 50px;
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
  gap: 20px;
  width: 95%;
  height: 100%;
  padding: 20px;
`;

const CardWrapper = styled.div`
  width: 10%;
  height: 300px;
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  display: flex;
  align-items: center;
  gap: 20px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  color: white;
  text-align: center;
  padding: 10px;
`;

const initData = {
  movieId: 0,
  mainImg: '',
  backdropImg: '',
  title: '제목',
  genre: '장르',
  director: '디렉터',
  releaseDate: '',
  rating: 0,
};

const MoviesPage: React.FC = () => {
  const location = useLocation();
  const searchData = location.state?.searchData || '';
  const [movies, setMovies] = useState([initData]);

  useEffect(() => {
    if (searchData) {
      const fetchMovies = async () => {
        try {
          const response = await axios.get('http://localhost:5173/api/movie/search', {
            params: { title: searchData, genre: searchData },
          });
          setMovies(response.data);
          console.log(response.data);
        } catch (error) {
          setMovies([]);
          console.log('영화 데이터를 불러오지 못했습니다.', error);
        }
      };
      // fetchMovies();
    }
  }, [searchData]);

  return (
    <Container>
      {searchData ? (
        <>
          <TextWrapper>
            <Text>"{searchData}" 에 대한 검색 결과 입니다</Text>
          </TextWrapper>
          <ContentsContainer>
            {movies.map((movie) => (
              <CardWrapper key={movie.movieId}>
                <CardImage src={movie.mainImg} alt={movie.title} />
                <CardTitle>{movie.title}</CardTitle>
              </CardWrapper>
            ))}
          </ContentsContainer>
        </>
      ) : (
        <TextWrapper>
          <Text>검색어를 입력 해 주세요 !!</Text>
        </TextWrapper>
      )}
    </Container>
  );
};

export default MoviesPage;
