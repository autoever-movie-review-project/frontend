import React, { useState } from 'react';
import VideoSlider from './templates/VideoSlider';
import * as S from './MainPage.style';
import BoxofficeSlider from './templates/BoxofficeSlider';
import MovieSwiperSlide from './templates/MovieSwiperSlide';
import temp from 'assets/cardtemp.jpg';
import boxofficetemp from 'assets/temp.svg';
import { useAuth } from 'hooks/useAuth';

const movieAPI = [
  { apiUrl: 'getapi1' }, //개봉 예정 영화 API get방식 가져오기
  { apiUrl: 'getapi2' }, //인생 영화 API get방식 가져오기
  { apiUrl: 'getapi3' }, //추천 알고리즘 API get방식 가져오기
  { apiUrl: 'getapi4' }, //실시간 인기영화 API get방식 가져오기
];

function MainPage() {
  const { user } = useAuth();
  const [swiperData, setSwiperData] = useState<Array<{ title: string; images: string[] }>>([
    { title: '개봉 예정 영화', images: [temp, temp, temp, temp, temp, temp, temp] },
    { title: '인생 영화', images: [temp, temp, temp, temp, temp, temp, temp] },
    { title: `${user ? user : '빈빈'}님을 위한 추천 영화`, images: [temp, temp, temp, temp, temp, temp, temp] },
    { title: '유저들이 주목하는 실시간 인기 영화', images: [temp, temp, temp, temp, temp, temp, temp] },
  ]);

  return (
    <>
      <S.ContentsContainer>
        <S.VideoSliderWrapper>
          <VideoSlider />
        </S.VideoSliderWrapper>
        <S.Container>
          <S.BoxofficeSliderWrapper>
            <BoxofficeSlider
              title="박스 오피스 순위"
              images={[
                boxofficetemp,
                boxofficetemp,
                boxofficetemp,
                boxofficetemp,
                boxofficetemp,
                boxofficetemp,
                boxofficetemp,
                boxofficetemp,
                boxofficetemp,
                boxofficetemp,
                boxofficetemp,
              ]}
            />
          </S.BoxofficeSliderWrapper>

          {swiperData.map((item, index) => (
            <S.MovieSwiperWrapper key={index}>
              <MovieSwiperSlide title={item.title} images={item.images} />
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
