import React from 'react';
import VideoSlider from './templates/VideoSlider';
import * as S from './MainPage.style';
import BoxofficeSlider from './templates/BoxofficeSlider';

function MainPage() {
  return (
    <>
      <S.ContentsWrapper>
        <S.VideoSliderWrapper>
          <VideoSlider />
        </S.VideoSliderWrapper>
        <S.BoxofficeSliderWrapper>
          <S.BoxofficeTitleWrapper>
            <h1>실시간 인기 영화</h1>
          </S.BoxofficeTitleWrapper>
          <BoxofficeSlider />
        </S.BoxofficeSliderWrapper>
      </S.ContentsWrapper>
    </>
  );
}

export default MainPage;
