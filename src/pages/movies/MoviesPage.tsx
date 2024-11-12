import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vm;
  height: 100px;
  color: white;
  margin-top: 80px;
  background-color: black;
`;

const TextWrapper = styled.div`
  padding-top: 50px;
  margin-left: 50px;
  width: 100%;
  height: 100%;
  display: flex;
`;

const Text = styled.h1`
  font-size: 40px;
`;

const initData = {
  movieId: 0,
  mainImg: '',
  backdropImg: '',
  title: '',
  genre: '',
  director: '',
  releaseDate: '',
  rating: 0,
};

const MoviesPage: React.FC = () => {
  const location = useLocation();
  const searchData = location.state?.searchData || '';
  const [movies, setMovies] = useState([initData]);

  useEffect(() => {
    if (searchData) {
      // axios 요청으로 검색어 전달
      const fetchMovies = async () => {
        try {
          console.log('gd');

          const response = await axios.get('/api/movie/search', {
            params: { title: searchData, genre: searchData },
          });
          setMovies(response.data);
        } catch (error) {
          setMovies([]);
          console.error('영화 데이터를 불러오지 못했습니다.', error);
        }
      };
      fetchMovies();
    }
  }, [searchData]);

  return (
    <Container>
      <TextWrapper>
        {searchData !== '' ? (
          <Text>"{searchData}"에 대한 검색 결과 입니다</Text>
        ) : (
          <Text>검색어를 입력 해 주세요 !!</Text>
        )}
      </TextWrapper>
    </Container>
  );
};

export default MoviesPage;
