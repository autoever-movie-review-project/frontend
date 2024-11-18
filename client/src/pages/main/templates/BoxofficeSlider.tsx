import styled from 'styled-components';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useRef, useState } from 'react';
import { theme } from 'styles/theme';
import { Swiper as SwiperType } from 'swiper';
import { NavigationOptions } from 'swiper/types';
import { useNavigate } from 'react-router-dom';
import { Movie } from 'types/movie';
import testImg from 'assets/temp.svg';

const SwiperContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;

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
    transform: translateY(-50%);
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

const SlideContent = styled.div`
  display: flex;
  width: 100%;
  height: 240px;
  background: black;
  align-items: flex-end;
  position: relative;
`;

const Image = styled.img`
  width: 180px;
  height: 240px;
  object-fit: cover;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: 0.3s ease-in-out;
    opacity: 0.8;
  }
`;

const Ranking = styled.div`
  width: 20%;
  height: 240px;
  color: #ffffffbf;
  font-size: 80px;
  display: flex;
  align-items: end;
  justify-content: end;
  border-radius: 5px;
  font-weight: 900;
  letter-spacing: -5px;
  padding-right: 4px;
`;

interface MovieSwiperSlideProps {
  title: string;
  movies: Movie[];
}

function BoxofficeSlider({ title, movies }: MovieSwiperSlideProps) {
  const navigate = useNavigate();
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

  const handleCardClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <>
      <h1>{title}</h1>
      <SwiperContainer>
        <Swiper
          slidesPerView={6}
          spaceBetween={0}
          loop={false}
          navigation
          modules={[Pagination, Navigation, Autoplay]}
          onSwiper={handleSwiper}
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={index} style={{ minWidth: '270px' }}>
              <SlideContent>
                <Ranking>{index + 1}</Ranking>
                <Image src={testImg} alt={`${index}번째 영화`} onClick={() => handleCardClick(movie.movieId)} />
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

export default BoxofficeSlider;
