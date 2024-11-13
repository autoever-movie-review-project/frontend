import styled from 'styled-components';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import test from '../../../assets/capa.webm';
import { theme } from 'styles/theme';

const ContentsText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 60px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  text-align: center;
  line-height: normal;
`;

const StyledSwiper = styled(Swiper)`
  .swiper-button-next,
  .swiper-button-prev {
    color: ${theme.colors.neutral500};
    opacity: 0;
  }

  &:hover .swiper-button-prev,
  &:hover .swiper-button-next {
    opacity: 1;
  }
`;

function VideoSlider() {
  return (
    <StyledSwiper
      centeredSlides={true}
      slidesPerView={1}
      spaceBetween={0}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      modules={[Pagination, Navigation, Autoplay]}
      style={{ width: '100%', height: 'calc(100vh - 80px)' }}
    >
      <SwiperSlide style={{ height: '100%', position: 'relative' }}>
        <video width="100%" height="100%" loop muted autoPlay>
          <source src={test} type="video/webm" />
        </video>
        <ContentsText>
          영화 리뷰를 무제한으로
          <br />
          안녕하세요
        </ContentsText>
      </SwiperSlide>
      <SwiperSlide style={{ height: '100%', position: 'relative' }}>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/lQ2FIaPGVKY?loop=1&mute=1&autoplay=1"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <ContentsText>
          영화 리뷰를 무제한으로
          <br />
          안녕하세요
        </ContentsText>
      </SwiperSlide>
      <SwiperSlide style={{ height: '100%', position: 'relative' }}>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/lQ2FIaPGVKY?loop=1&mute=1&autoplay=1"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <ContentsText>영화 리뷰를 무제한으로</ContentsText>
      </SwiperSlide>
    </StyledSwiper>
  );
}

export default VideoSlider;
