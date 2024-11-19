import styled from 'styled-components';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { theme } from 'styles/theme';
import { useRef } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { NavigationOptions } from 'swiper/types';
import { useNavigate } from 'react-router-dom';
import { Movie } from 'types/movie';

const StyledSwiperSlide = styled(SwiperSlide)`
  width: 300px !important;
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

const SlideContent = styled.div`
  display: flex;
  width: 100%;
  height: 160px;
  background: black;
  position: relative;
  cursor: pointer;
  overflow: hidden;
`;

const Image = styled.img`
  width: 290px;
  height: 160px;
  object-fit: fill;
  transition: all 0.3s ease-in-out;
`;

const HoverInfo = styled.div`
  position: absolute;
  top: 0;
  left: -20px;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  gap: 10px;
  padding: 0 20px;
`;

const MovieTitle = styled.h3`
  color: white;
  font-size: 24px;
  text-align: center;
  font-weight: 600;
  word-break: keep-all;
  line-height: 1.2;
`;

const Rating = styled.div`
  color: ${theme.colors.primary};
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 5px;

  svg {
    color: ${theme.colors.primary};
  }
`;

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &:hover ${Image} {
    transform: scale(1.05);
    opacity: 0.5;
  }

  &:hover ${HoverInfo} {
    opacity: 1;
  }
`;

interface MovieSwiperSlideProps {
  title: string;
  movies: Movie[];
}

function MovieSwiperSlide(props: MovieSwiperSlideProps) {
  const { title, movies } = props;
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);

  const navigate = useNavigate();

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

  const convertToFiveStarRating = (rating: number) => {
    return rating === 0.0 ? '평점 없음' : (rating / 2).toFixed(1);
  };

  return (
    <>
      <h1>{title}</h1>
      <SwiperContainer>
        <Swiper
          slidesPerView={4.3}
          spaceBetween={20}
          loop={false}
          navigation
          modules={[Pagination, Navigation, Autoplay]}
          style={{ width: '100%', height: '160px' }}
          onSwiper={handleSwiper}
        >
          {movies.map((movie, index) => (
            <StyledSwiperSlide key={index}>
              <SlideContent onClick={() => handleCardClick(movie.movieId)}>
                <CardWrapper>
                  <Image src={movie.backdropImg} alt={`${index}번째 영화`} />
                  <HoverInfo>
                    <MovieTitle>{movie.title}</MovieTitle>
                    <Rating>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      {convertToFiveStarRating(movie.rating) || '평가 없음'}
                    </Rating>
                  </HoverInfo>
                </CardWrapper>
              </SlideContent>
            </StyledSwiperSlide>
          ))}
        </Swiper>
        <button ref={prevButtonRef} className="swiper-button-prev"></button>
        <button ref={nextButtonRef} className="swiper-button-next"></button>
      </SwiperContainer>
    </>
  );
}

export default MovieSwiperSlide;
