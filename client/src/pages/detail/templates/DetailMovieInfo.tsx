import { useState } from 'react';
import { theme } from 'styles/theme';
import Pen from 'assets/pen.svg?react';
import Headphones from 'assets/headphones.svg?react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import MoviePlayer from './MusicPlayer';
import * as S from './DetailMovieInfo.style';
import { Movie } from 'types/movie';
import Skeleton from 'components/Skeleton/Skeleton';

interface DetailMovieInfoProps {
  openModal: () => void;
  isLoading: boolean;
  movie: Movie;
  onLikeClick: () => void;
  isLiking: boolean;
}

const ratingData = [
  { rating: '1점', count: 89, 비율: 3 },
  { rating: '2점', count: 156, 비율: 6 },
  { rating: '3점', count: 421, 비율: 15 },
  { rating: '4점', count: 856, 비율: 31 },
  { rating: '5점', count: 1245, 비율: 45 },
];

function DetailMovieInfo({ openModal, isLoading, movie, onLikeClick, isLiking }: DetailMovieInfoProps) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  const getYear = (date: string) => new Date(date).getFullYear();

  const convertToFiveStarRating = (rating: number) => {
    if (rating === 0.0) {
      return '평점 없음';
    } else {
      return (rating / 2).toFixed(1);
    }
  };

  const handleMusicPlay = () => setShowPlayer(true);

  const handleLikeButton = () => {
    if (!isLiking) {
      onLikeClick();
    }
  };

  if (isLoading)
    return (
      <S.Container>
        <S.MovieDetailWrapper>
          <S.MovieInfoContainerSkeleton>
            <Skeleton animation="pulse" width="auto" height={60}></Skeleton>
            <Skeleton animation="pulse" width="auto" height={60}></Skeleton>
            <Skeleton animation="pulse" width="auto" height={160}></Skeleton>
            <Skeleton animation="pulse" width="auto" height={90}></Skeleton>
          </S.MovieInfoContainerSkeleton>
          <S.RatingDistribution>
            <Skeleton animation="pulse" width={300} height={300}></Skeleton>
          </S.RatingDistribution>
          <S.MovieImageWrapperSkeleton>
            <Skeleton animation="pulse" width={270} height={390}></Skeleton>
          </S.MovieImageWrapperSkeleton>
        </S.MovieDetailWrapper>
      </S.Container>
    );

  return (
    <S.Container>
      <S.MovieDetailWrapper $backdrop={movie.backdropImg}>
        <S.MovieInfoContainer>
          <S.MovieTitle>{movie.title}</S.MovieTitle>
          <S.MovieInfoWrapper>
            <S.AgeRating>{movie.ageRating}</S.AgeRating>
            <S.Division>ㆍ</S.Division>
            <S.Year>{getYear(movie.releaseDate)}</S.Year>
            <S.Division>ㆍ</S.Division>
            <S.RunningTime>
              {movie.runtime ? `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분` : '미정'}
            </S.RunningTime>
            <S.Division>ㆍ</S.Division>
            <S.Genre>{movie.genre[0] ?? '장르 미정'}</S.Genre>
          </S.MovieInfoWrapper>
          <S.MoviePlot>{movie.plot}</S.MoviePlot>
          <S.ReviewSection>
            <S.Rating>
              {movie.rating !== 0.0 && <S.Star>⭐</S.Star>}
              {convertToFiveStarRating(movie.rating)}
            </S.Rating>
            <S.ButtonBackground>
              <S.LikeButton onClick={handleLikeButton}>
                <S.Heart $clicked={movie.liked} />
                좋아요
              </S.LikeButton>
            </S.ButtonBackground>
            <S.ButtonBackground>
              <S.ReviewWriteButton onClick={openModal}>
                <Pen />
                리뷰 작성
              </S.ReviewWriteButton>
            </S.ButtonBackground>
          </S.ReviewSection>
        </S.MovieInfoContainer>
        {/* <S.RatingDistribution>
          <BarChart width={300} height={300} data={ratingData}>
            <XAxis dataKey="rating" tickLine={false} axisLine={false} tick={{ fill: theme.colors.text }} />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: theme.colors.grayDark, opacity: '0.5' }}
              formatter={(value) => `${value}%`}
              contentStyle={{
                backgroundColor: theme.colors.grayDark,
                border: 'none',
                borderRadius: '4px',
                padding: '10px',
              }}
              labelStyle={{ color: theme.colors.text }}
            />
            <Bar
              dataKey="비율"
              activeBar={{ fill: theme.colors.primaryDark }}
              fill={theme.colors.primary}
              barSize={45}
            />
          </BarChart>
        </S.RatingDistribution> */}
        <S.MovieImageWrapper
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setCursorPosition({
              x: e.clientX - rect.left - 23,
              y: e.clientY - rect.top - 23,
            });
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={handleMusicPlay}
        >
          <img src={movie.mainImg} alt={movie.title} />
          {isHovering && (
            <S.CustomCursor
              $isVisible={isHovering}
              style={{
                left: `${cursorPosition.x}px`,
                top: `${cursorPosition.y}px`,
              }}
            >
              <S.StyledHeadphones>
                <Headphones color="white" />
              </S.StyledHeadphones>
            </S.CustomCursor>
          )}
        </S.MovieImageWrapper>
      </S.MovieDetailWrapper>
      {showPlayer && <MoviePlayer movieTitle={movie.title} onClose={() => setShowPlayer(false)} />}
    </S.Container>
  );
}

export default DetailMovieInfo;
