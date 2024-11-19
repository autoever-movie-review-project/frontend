import styled from 'styled-components';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import test from 'assets/capa.webm';
import video2 from 'assets/videoImpa.webm';
import video3 from 'assets/videoGladiator.webm';
import { theme } from 'styles/theme';
import marvel from 'assets/marvel.svg';
import mission from 'assets/missionimp.png';
import gladiator from 'assets/gladiator.webp';
import Button from 'components/Button';

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

function VideoSlider() {
  const handleVideoButtonClick = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: 'smooth',
    });
  };

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
          <Button text="더보기" width="100px" onClick={() => handleVideoButtonClick()}></Button>
        </ContentsText>
      </SwiperSlide>
      <SwiperSlide style={{ height: '100%', position: 'relative' }}>
        <video width="100%" height="100%" loop muted autoPlay draggable={false}>
          <source src={video2} type="video/webm" />
        </video>
        <ContentsText>
          <img src={mission} />
          <Button text="더보기" width="100px" onClick={() => handleVideoButtonClick()}></Button>
        </ContentsText>
      </SwiperSlide>
      <SwiperSlide style={{ height: '100%', position: 'relative' }}>
        <video width="100%" height="100%" loop muted autoPlay draggable={false}>
          <source src={video3} type="video/webm" />
        </video>
        <ContentsText>
          <img src={gladiator} />
          <Button text="더보기" width="100px" onClick={() => handleVideoButtonClick()}></Button>
        </ContentsText>
      </SwiperSlide>
    </StyledSwiper>
  );
}

export default VideoSlider;
