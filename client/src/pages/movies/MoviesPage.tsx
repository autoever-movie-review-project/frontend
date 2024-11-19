import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Movie } from 'types/movie';
import { fetchBoxOfficeMovieList, fetchSearchMovieList, fetchUpcomingMovieList } from 'api/movie/movieApi';
import BoxofficeSlider from 'pages/main/templates/BoxofficeSlider';
import Skeleton from 'components/Skeleton/Skeleton';
import { theme } from 'styles/theme';

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
  width: calc(100% - 160px);
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
  font-size: 30px;
  font-weight: ${theme.fontWeight.semibold};
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 35px;
  width: 90%;
  height: 100%;
  padding: 20px;
`;

const ContentsContainerSkeleton = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 35px;
  width: 90%;
  height: 100%;
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
  position: relative;

  &:hover .movie-info {
    opacity: 1;
  }
`;

const MovieInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px 0;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 9999;
`;

const MovieTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  width: 90%;
  color: #ffffff;
  padding: 10px;
`;

const MovieGenre = styled.p`
  font-size: 14px;
  color: #cccccc;
  width: 90%;
  line-height: 20px;
  padding: 10px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;

  /* &:hover {
    transform: scale(1.05);
    transition: 0.3s ease-in-out;
  } */
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
  width: 90%;
  height: 100%;
  h1 {
    font-weight: bold;
    color: #ececec;
    font-size: 28px;
    margin-bottom: 30px;
    margin-left: 50px;
  }
`;

const MovieCardSkeleton = styled(Skeleton)`
  width: calc(100% / 7);
  height: 300px;
  background-color: #333;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 20px; */
  border-radius: 5px;
`;

const genreList = ['액션', '드라마', '코미디', '스페셜', '다큐멘터리', '범죄', 'SF', '로맨스', '공포', '판타지'];

interface MoviesState {
  movies: Movie[];
  page: number;
  hasMore: boolean;
  loading: boolean;
}

const MoviesPage: React.FC = () => {
  const location = useLocation();
  const searchData = location.state?.searchData || '';
  const navigate = useNavigate();
  const [swiperData, setSwiperData] = useState<Array<Movie>>([]);
  const [refresh, setRefresh] = useState(false);

  const [state, setState] = useState<MoviesState>({
    movies: [],
    page: 0,
    hasMore: true,
    loading: false,
  });

  const observer = useRef<IntersectionObserver>();
  const lastMovieElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (state.loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && state.hasMore) {
          handleFetchSearchMovies(state.page + 1, false);
        }
      });

      if (node) observer.current.observe(node);
    },
    [state.loading, state.hasMore]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await fetchBoxOfficeMovieList();
        setSwiperData(resData);
      } catch (e) {
        console.error('인기 영화 리스트 불러오기 실패', e);
      }
    };
    fetchData();
  }, []);

  const handleFetchSearchMovies = async (page: number, isNewSearch: boolean = false) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));

      const fetchedMovies = await fetchSearchMovieList(searchData, page);

      const uniqueMovies = fetchedMovies.filter(
        (movie: Movie, index: number, self: Movie[]) => self.findIndex((m) => m.movieId === movie.movieId) === index
      );

      setState((prev) => ({
        movies: isNewSearch ? uniqueMovies : [...prev.movies, ...uniqueMovies],
        page: page,
        hasMore: uniqueMovies.length > 0,
        loading: false,
      }));
    } catch (error) {
      console.error('검색 실패:', error);
      setState((prev) => ({ ...prev, loading: false, hasMore: false }));
    }
  };

  // searchData가 변경될 때 데이터를 초기화하고 새로운 검색 시작
  useEffect(() => {
    if (searchData) {
      // 검색어가 변경되면 상태를 완전히 초기화
      setState({
        movies: [],
        page: 0,
        hasMore: true,
        loading: false,
      });
      window.scrollTo(0, 0);
      handleFetchSearchMovies(0, true);
    }
  }, [searchData, refresh]);

  const handleCardClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const handleTagClick = (title: string) => {
    if (!location.state?.searchData) {
      navigate(location.pathname, {
        state: { ...location.state, searchData: title },
        replace: true,
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
            <Text>"{searchData}"에 대한 검색 결과에요</Text>
          </TextWrapper>
          <ContentsContainer>
            {state.movies.map((movie: Movie, index: number) => {
              if (state.movies.length === index + 1) {
                return (
                  <CardWrapper
                    ref={lastMovieElementRef}
                    key={`${movie.movieId}-${index}`}
                    onClick={() => handleCardClick(movie.movieId)}
                  >
                    <CardImage src={movie.mainImg} alt={movie.title} />
                    <MovieInfo className="movie-info">
                      <MovieTitle>{movie.title}</MovieTitle>
                      <MovieGenre>{movie.genre.join(' / ')}</MovieGenre>
                      <MovieGenre>{movie.plot || movie.tagline || ''}</MovieGenre>
                    </MovieInfo>
                  </CardWrapper>
                );
              }

              return (
                <CardWrapper key={`${movie.movieId}-${index}`} onClick={() => handleCardClick(movie.movieId)}>
                  <CardImage src={movie.mainImg} alt={movie.title} />
                  <MovieInfo className="movie-info">
                    <MovieTitle>{movie.title}</MovieTitle>
                    <MovieGenre>{movie.genre.join(' / ')}</MovieGenre>
                    <MovieGenre>{movie.plot || movie.tagline || ''}</MovieGenre>
                  </MovieInfo>
                </CardWrapper>
              );
            })}
            {state.loading && (
              <>
                {[...Array(12)].map((_, index) => (
                  <MovieCardSkeleton key={index} animation="wave" />
                ))}
              </>
            )}
          </ContentsContainer>
        </>
      ) : (
        <>
          <SubTextWrapper>
            <SubText>이런 장르는 어떠세요?</SubText>
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
