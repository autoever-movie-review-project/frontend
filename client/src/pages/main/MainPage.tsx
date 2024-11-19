import React, { useEffect, useState } from 'react';
import VideoSlider from './templates/VideoSlider';
import * as S from './MainPage.style';
import BoxofficeSlider from './templates/BoxofficeSlider';
import MovieSwiperSlide from './templates/MovieSwiperSlide';
import { useAuth } from 'hooks/useAuth';
import { Movie } from 'types/movie';
import { fetchBoxOfficeMovieList, fetchPopularMovieList, fetchUpcomingMovieList } from 'api/movie/movieApi';

function MainPage() {
  const { user } = useAuth();
  const [swiperData, setSwiperData] = useState<Array<{ title: string; movies: Movie[] }>>([]);
  const [boxOfficeMovies, setBoxOfficeMovies] = useState<Movie[]>([]); // 박스오피스 데이터 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all([
          fetchUpcomingMovieList(),
          fetchPopularMovieList(),
          fetchUpcomingMovieList(),
          fetchBoxOfficeMovieList(),
        ]);

        const transformedData = [
          { title: '개봉 예정 영화', movies: results[0] },
          { title: '인생 영화', movies: results[1] },
          { title: `${user ? user.data['nickname'] : '사용자'}님을 위한 추천 영화`, movies: results[2] },
          { title: '실시간 핫한 영화', movies: results[2] },
        ];
        setSwiperData(transformedData);
        console.log(results[0]);

        //박스오피스용
        setBoxOfficeMovies(results[3]);
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      <S.ContentsContainer>
        <S.VideoSliderWrapper>
          <VideoSlider />
        </S.VideoSliderWrapper>
        <S.Container>
          <S.BoxofficeSliderWrapper>
            <BoxofficeSlider title="박스 오피스 순위" movies={boxOfficeMovies} />
          </S.BoxofficeSliderWrapper>

          {swiperData.map((item, index) => (
            <S.MovieSwiperWrapper key={index}>
              <MovieSwiperSlide title={item.title} movies={item.movies} />
            </S.MovieSwiperWrapper>
          ))}
        </S.Container>
      </S.ContentsContainer>
      {/* <S.Footer></S.Footer> */}
    </>
  );
}

export default MainPage;
