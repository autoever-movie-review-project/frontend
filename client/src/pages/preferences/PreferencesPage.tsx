import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import reload from 'assets/reload.svg';
import testimg from 'assets/temp.svg';
import { theme } from 'styles/theme';
import { client } from 'api/client';
import { useNavigate } from 'react-router-dom';
import { Movie } from 'types/movie';

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
  margin-bottom: 30px;
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

const CompleteButton = styled.button`
  width: 300px;
  height: 50px;
  display: flex;
  justify-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${theme.colors.primary};
  color: #ececec;
  font-size: 20px;
`;

//더미
const initialMovies: Movie[] = [
  {
    movieId: 1,
    mainImg: testimg,
    backdropImg: 'assets/backdrop1.jpg',
    title: 'Movie Title 1',
    genre: ['Drama', 'Adventure'],
    directorName: ['Director 1'],
    actorName: ['Actor 1', 'Actor 2'],
    actorImg: ['assets/actor1.jpg', 'assets/actor2.jpg'],
    releaseDate: '2024-11-11',
    rating: 8.5,
    ageRating: 'PG-13',
    runtime: 120,
    language: 'en',
    reviewCount: 100,
    plot: 'This is the plot for Movie Title 1.',
    tagline: '코미디',
  },
  {
    movieId: 2,
    mainImg: testimg,
    backdropImg: 'assets/backdrop1.jpg',
    title: 'Movie Title 1',
    genre: ['Drama', 'Adventure'],
    directorName: ['Director 1'],
    actorName: ['Actor 1', 'Actor 2'],
    actorImg: ['assets/actor1.jpg', 'assets/actor2.jpg'],
    releaseDate: '2024-11-11',
    rating: 8.5,
    ageRating: 'PG-13',
    runtime: 120,
    language: 'en',
    reviewCount: 100,
    plot: 'This is the plot for Movie Title 1.',
    tagline: '코미디',
  },
  {
    movieId: 3,
    mainImg: testimg,
    backdropImg: 'assets/backdrop1.jpg',
    title: 'Movie Title 1',
    genre: ['Drama', 'Adventure'],
    directorName: ['Director 1'],
    actorName: ['Actor 1', 'Actor 2'],
    actorImg: ['assets/actor1.jpg', 'assets/actor2.jpg'],
    releaseDate: '2024-11-11',
    rating: 8.5,
    ageRating: 'PG-13',
    runtime: 120,
    language: 'en',
    reviewCount: 100,
    plot: 'This is the plot for Movie Title 1.',
    tagline: '코미디',
  },
];

function PreferencesPage() {
  const [movieList, setMovieList] = useState(initialMovies);
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const response = await client.get<Movie[]>('api url');
      setMovieList(response.data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      throw error;
    }
  };

  //초기 랜덤 데이터 fetch
  useEffect(() => {
    fetchMovies();
  }, []);

  // 잘되나 확인
  useEffect(() => {
    console.log('선택된 영화 : ', selectedMovies);
  }, [selectedMovies]);

  const handleResetButtonClick = () => {
    setSelectedMovies([]);
    fetchMovies();
  };

  const handleMovieClick = (movie: Movie) => {
    if (selectedMovies.some((selected) => selected.movieId === movie.movieId)) {
      setSelectedMovies(selectedMovies.filter((selected) => selected.movieId !== movie.movieId));
    } else {
      if (selectedMovies.length < 3) {
        setSelectedMovies([...selectedMovies, movie]);
      }
    }
  };

  function checkMovie(movieId: number) {
    return selectedMovies.some((movie) => movie.movieId === movieId);
  }

  const handleCompleteButtonClick = async () => {
    //await post선호영화 3개보내는 axios
    navigate('/');
  };

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
            <PreferencesMovieWrapper
              key={index}
              $active={checkMovie(movie.movieId)}
              onClick={() => handleMovieClick(movie)}
            >
              <PreferencesMovie src={movie.mainImg} alt="movie" />
            </PreferencesMovieWrapper>
          ))}
        </PreferencesMovieContainer>
        <CompleteButton onClick={handleCompleteButtonClick}>제출하기</CompleteButton>
      </Container>
    </Layout>
  );
}

export default PreferencesPage;
