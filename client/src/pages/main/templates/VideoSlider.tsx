import styled from 'styled-components';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import test from '../../../assets/capa.webm';
import { theme } from 'styles/theme';
import marvel from 'assets/marvel.svg';
const ContentsText = styled.div`
  position: absolute;
  top: 70%;
  left: 20%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  text-align: center;
  line-height: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 400px;
    height: 130px;
  }
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

const TextWrapper = styled.div`
  display: flex;
  text-align: center;
`;

function VideoSlider() {
  return (
    <StyledSwiper
      centeredSlides={true}
      touchRatio={0}
      slidesPerView={1}
      spaceBetween={0}
      loop={true}
      autoplay={{ delay: 60000, disableOnInteraction: false }}
      navigation
      modules={[Pagination, Navigation, Autoplay]}
      style={{ width: '100%', height: 'calc(100vh - 80px)' }}
    >
      <SwiperSlide style={{ height: '100%', position: 'relative' }}>
        <video width="100%" height="100%" loop muted autoPlay draggable={false}>
          <source src={test} type="video/webm" />
        </video>
        <ContentsText>
          <img src={marvel} />
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
          <img src={marvel} />
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
          <img src={marvel} />
        </ContentsText>
      </SwiperSlide>
    </StyledSwiper>
  );
}

export default VideoSlider;
