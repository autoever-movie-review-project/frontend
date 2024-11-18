import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Movie, MovieArray } from 'types/movie';
import { fetchSearchMovieList, fetchUpcomingMovieList } from 'api/movie/movieApi';
import BoxofficeSlider from 'pages/main/templates/BoxofficeSlider';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  color: white;
  margin-top: 80px;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextWrapper = styled.div`
  padding-top: 40px;
  width: calc(100% - 100px);
  height: 60px;
  display: flex;
  /* margin-bottom: 50px; */
  gap: 20px;
`;
const SubTextWrapper = styled.div`
  padding-top: 40px;
  width: 100%;
  height: 60px;
  display: flex;
  /* margin-bottom: 50px; */
  justify-content: center;
  gap: 20px;
`;

const Text = styled.h1`
  font-size: 40px;
  font-weight: bold;
`;

const SubText = styled.p`
  font-size: 24px;
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

const TagButtonContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const TagButton = styled.button`
  min-width: 40px;
  padding: 0 14px;
  height: 40px;
  border-radius: 5px;
  background-color: #272a30;
  color: #ececec;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
  transition: 0.25s cubic-bezier(0, 0.5, 0.5, 1);
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-weight: 600;
  }
  &:hover {
    background-color: #4a4f5a;
    transition: 0.3;
  }
`;

const BoxofficeSliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  h1 {
    font-weight: bold;
    color: #ececec;
    font-size: 28px;
    margin-bottom: 30px;
    margin-left: 50px;
  }
`;

const genreList = ['액션', '드라마', '코미디', '스페셜', '다큐멘터리', '범죄', 'SF', '로맨스', '공포', '판타지'];

const MoviesPage: React.FC = () => {
  const location = useLocation();
  const searchData = location.state?.searchData || '';
  const [movies, setMovies] = useState<MovieArray>();
  const navigate = useNavigate();
  const [swiperData, setSwiperData] = useState<Array<Movie>>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await fetchUpcomingMovieList();
        setSwiperData(resData);
      } catch (e) {
        console.error('인기 영화 리스트 불러오기 실패', e);
      }
    };
    fetchData();
  }, []);

  const handleFetchSearchMovies = async () => {
    try {
      const fetchedMovies = await fetchSearchMovieList(searchData);

      // 중복 제거 (movieId 기준)
      const uniqueMovies = fetchedMovies.filter(
        (movie: Movie, index: number, self: MovieArray) => self.findIndex((m) => m.movieId === movie.movieId) === index
      );

      setMovies(uniqueMovies);
      console.log('중복 제거 후 데이터:', uniqueMovies);
    } catch (error) {
      console.error('검색 실패:', error);
    }
  };

  useEffect(() => {
    if (searchData) {
      setMovies([]);
      handleFetchSearchMovies();
    }
  }, [searchData, refresh]);

  const handleCardClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const handleTagClick = (title: string) => {
    if (!location.state?.searchData) {
      navigate(location.pathname, {
        state: { ...location.state, searchData: title },
        replace: true, // 브라우저 기록을 덮어씀
      });
    } else {
      location.state.searchData = title;
    }
    setRefresh(!refresh);
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
        <>
          <SubTextWrapper>
            <SubText>이런 장르는 어떠신가요?</SubText>
          </SubTextWrapper>
          <TagButtonContainer>
            {genreList.map((item: string, index) => (
              <div key={index}>
                <TagButton onClick={() => handleTagClick(item)}>
                  <p>{item}</p>
                </TagButton>
              </div>
            ))}
          </TagButtonContainer>
          <BoxofficeSliderWrapper>
            <BoxofficeSlider title={'현재 인기 많은 영화에요'} movies={swiperData} />
          </BoxofficeSliderWrapper>
        </>
      )}
    </Container>
  );
};

export default MoviesPage;
