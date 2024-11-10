import styled from 'styled-components';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { theme } from 'styles/theme';
import { useRef } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { NavigationOptions } from 'swiper/types';

const SlideContent = styled.div`
  display: flex;
  width: 100%;
  height: 160px;
  background: black;
  position: relative;
`;

const Image = styled.img`
  width: 290px;
  height: 160px;
  object-fit: fill;
`;

const SwiperContainer = styled.div`
  position: relative;

  .swiper-button-prev.swiper-button-disabled {
    color: black;
  }
  .swiper-button-next.swiper-button-disabled {
    color: black;
  }

  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    top: 50%;
    z-index: 10;
    color: ${theme.colors.neutral500};
    cursor: pointer;
    background-color: black;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .swiper-button-prev {
    left: -40px;
  }

  .swiper-button-next {
    right: -40px;
  }

  &:hover .swiper-button-prev,
  &:hover .swiper-button-next {
    opacity: 1;
  }
`;

interface MovieSwiperSlideProps {
  title: string;
  images: string[];
}

function MovieSwiperSlide(props: MovieSwiperSlideProps) {
  const { title, images } = props;
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleSwiper = (swiper: SwiperType) => {
    if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
      const navigation = swiper.params.navigation as NavigationOptions;
      navigation.nextEl = nextButtonRef.current;
      navigation.prevEl = prevButtonRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  };

  return (
    <>
      <h1>{title}</h1>
      <SwiperContainer>
        <Swiper
          slidesPerView={6}
          spaceBetween={40}
          loop={false}
          navigation
          modules={[Pagination, Navigation, Autoplay]}
          style={{ width: '100%', height: '160px' }}
          onSwiper={handleSwiper}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <SlideContent>
                <Image src={image} alt={`${index}번째 영화`} />
              </SlideContent>
            </SwiperSlide>
          ))}
        </Swiper>
        <button ref={prevButtonRef} className="swiper-button-prev"></button>
        <button ref={nextButtonRef} className="swiper-button-next"></button>
      </SwiperContainer>
    </>
  );
}

export default MovieSwiperSlide;
