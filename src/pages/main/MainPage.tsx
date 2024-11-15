import React, { useEffect, useState } from 'react';
import VideoSlider from './templates/VideoSlider';
import * as S from './MainPage.style';
import BoxofficeSlider from './templates/BoxofficeSlider';
import MovieSwiperSlide from './templates/MovieSwiperSlide';
import temp from 'assets/cardtemp.jpg';
import boxofficetemp from 'assets/temp.svg';
import { useAuth } from 'hooks/useAuth';
import Movie from 'models/movie.model';
import axios from 'axios';

const movieAPI = [
  { apiUrl: 'getapi1', title: '개봉 예정 영화' }, // 개봉 예정 영화
  { apiUrl: 'getapi2', title: '인생 영화' }, // 인생 영화
  { apiUrl: 'getapi3', title: '사용자 맞춤 추천 영화' }, // 추천 영화 `${user ? user : '빈빈'}님을 위한 추천 영화
  { apiUrl: 'getapi4', title: '유저들이 주목하는 실시간 인기 영화' }, // 인기 영화
];

function MainPage() {
  const { user } = useAuth();
  const [swiperData, setSwiperData] = useState<Array<{ title: string; movies: Movie[] }>>([
    {
      title: '개봉 예정 영화',
      movies: [
        {
          title: 'ㅇㅇ',
          movieId: 0,
          tagline: '',
          plot: '',
          backdropImg: '',
          mainImg: boxofficetemp,
          releaseDate: new Date(),
          rating: 0,
          language: '',
          runtime: 0,
          ageRating: '',
          reviewCount: 0,
          directorName: [],
          actorName: [],
          actorImg: [],
          genre: [],
        },
      ],
    },
    {
      title: '인생 영화',
      movies: [
        {
          title: 'ㅇㅇ',
          movieId: 0,
          tagline: '',
          plot: '',
          backdropImg: '',
          mainImg: boxofficetemp,
          releaseDate: new Date(),
          rating: 0,
          language: '',
          runtime: 0,
          ageRating: '',
          reviewCount: 0,
          directorName: [],
          actorName: [],
          actorImg: [],
          genre: [],
        },
      ],
    },
    {
      title: '사용자 맞춤 추천 영화',
      movies: [
        {
          title: 'ㅇㅇ',
          movieId: 0,
          tagline: '',
          plot: '',
          backdropImg: '',
          mainImg: boxofficetemp,
          releaseDate: new Date(),
          rating: 0,
          language: '',
          runtime: 0,
          ageRating: '',
          reviewCount: 0,
          directorName: [],
          actorName: [],
          actorImg: [],
          genre: [],
        },
      ],
    },
    {
      title: '유저들이 주목하는 실시간 인기 영화',
      movies: [
        {
          title: 'ㅇㅇ',
          movieId: 0,
          tagline: '',
          plot: '',
          backdropImg: '',
          mainImg: boxofficetemp,
          releaseDate: new Date(),
          rating: 0,
          language: '',
          runtime: 0,
          ageRating: '',
          reviewCount: 0,
          directorName: [],
          actorName: [],
          actorImg: [],
          genre: [],
        },
      ],
    },
  ]);

  // useEffect(() => { MovieSwiperSlide 4개 주제 목록 받아오기
  //   Promise.all(
  //     movieAPI.map(async (api) => {
  //       const response = await axios.get(api.apiUrl); // 각 API에서 영화 데이터를 받아옴
  //       return { title: api.title, movies: response.data }; // title과 movies를 함께 반환
  //     })
  //   ).then((responses) => {
  //     setSwiperData(responses); // title과 movies를 가진 배열로 상태 업데이트
  //   });
  // }, []);

  useEffect(() => {
    //박스 오피스 순위 axios
  }, []);

  return (
    <>
      <S.ContentsContainer>
        <S.VideoSliderWrapper>
          <VideoSlider />
        </S.VideoSliderWrapper>
        <S.Container>
          <S.BoxofficeSliderWrapper>
            <BoxofficeSlider title="박스 오피스 순위" movies={swiperData[0].movies} />
          </S.BoxofficeSliderWrapper>

          {swiperData.map((item, index) => (
            <S.MovieSwiperWrapper key={index}>
              <MovieSwiperSlide title={item.title} movies={item.movies} />
              {/*movieData={item.movieData} */}
            </S.MovieSwiperWrapper>
          ))}
        </S.Container>
      </S.ContentsContainer>
      <S.Footer></S.Footer>
    </>
  );
}

export default MainPage;
