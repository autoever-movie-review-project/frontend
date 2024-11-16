import { theme } from 'styles/theme';
import { useEffect, useState } from 'react';
import Pen from 'assets/pen.svg?react';
import Headphones from 'assets/headphones.svg?react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import MoviePlayer from './MusicPlayer';
import * as S from './DetailMovieInfo.style';
import Skeleton from 'components/Skeleton/Skeleton';

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  vote_average: number;
  runtime: number;
  genres: Genre[];
  poster_path: string;
  backdrop_path: string;
}

const ratingData = [
  { rating: '1점', count: 89, 비율: 3 },
  { rating: '2점', count: 156, 비율: 6 },
  { rating: '3점', count: 421, 비율: 15 },
  { rating: '4점', count: 856, 비율: 31 },
  { rating: '5점', count: 1245, 비율: 45 },
];

function DetailMovieInfo() {
  const [isLiked, setIsLiked] = useState(false);
  const [movieData, setMovieData] = useState<Movie | null>(null);
  const [movieLoading, setMovieLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWY2OTE4Yzc5NzRiMGFiYzAyNGRmMTlhOTc4MjcxNSIsIm5iZiI6MTczMTY0ODYwMC4yMjY1ODczLCJzdWIiOiI2NzI5ZDdjYzQyYmVjNDk4Nzc4MDNiOTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ENHHf8AZSC4-cDnr-PJyXx1blfABuUrlcFss4ATW1z8',
        },
      };

      try {
        // 먼저 영화 검색
        const searchResponse = await fetch(
          'https://api.themoviedb.org/3/search/movie?query=%EC%98%AC%EB%93%9C%EB%B3%B4%EC%9D%B4&include_adult=false&language=ko-KR&page=1',
          options
        );
        const searchData = await searchResponse.json();

        if (searchData.results && searchData.results[0]) {
          const movieId = searchData.results[0].id;
          const detailResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, options);
          const detailData = await detailResponse.json();
          console.log('영화 정보:', detailData);
          setMovieData(detailData);
        }
        setMovieLoading(false);
      } catch (err) {
        console.error(err);
        setMovieLoading(false);
      }
    };

    fetchMovieData();
  }, []);

  if (!movieData) return <div>영화 정보를 찾을 수 없습니다.</div>;

  // 연도를 추출하는 함수입니다.
  const getYear = (date: string) => new Date(date).getFullYear();

  // 평점 10점 만점을 5점 만점으로 변환합니다.
  const getRating = (vote: number) => (vote / 2).toFixed(1);

  const handleMusicPlay = async () => {
    setShowPlayer(true);
  };

  const handleLikeButton = () => {
    setIsLiked(!isLiked);
    // 영화 찜하는 API를 호출해야 합니다.
  };

  // 영화 정보 로딩 시 보여지는 스켈레톤 컴포넌트입니다.
  if (movieLoading)
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
      <S.MovieDetailWrapper $backdrop={movieData?.backdrop_path || ''}>
        <S.MovieInfoContainer>
          <S.MovieTitle>{movieData.title}</S.MovieTitle>
          <S.MovieInfoWrapper>
            <S.AgeRating>12</S.AgeRating>
            <S.Division>ㆍ</S.Division>
            <S.Year>{getYear(movieData.release_date)}</S.Year>
            <S.Division>ㆍ</S.Division>
            <S.RunningTime>
              {movieData.runtime ? `${Math.floor(movieData.runtime / 60)}시간 ${movieData.runtime % 60}분` : '미정'}
            </S.RunningTime>
            <S.Division>ㆍ</S.Division>
            <S.Genre>
              {movieData.genres && movieData.genres.length > 0 ? movieData.genres[0].name : '장르 미정'}
            </S.Genre>
          </S.MovieInfoWrapper>
          <S.MoviePlot>{movieData.overview}</S.MoviePlot>
          <S.ReviewSection>
            <S.Rating>
              <S.Star>⭐</S.Star>
              {getRating(movieData.vote_average)}
            </S.Rating>
            <S.ButtonBackground>
              <S.LikeButton onClick={handleLikeButton}>
                <S.Heart $clicked={isLiked} />
                좋아요
              </S.LikeButton>
            </S.ButtonBackground>
            <S.ButtonBackground>
              <S.ReviewWriteButton>
                <Pen />
                리뷰 작성
              </S.ReviewWriteButton>
            </S.ButtonBackground>
          </S.ReviewSection>
        </S.MovieInfoContainer>
        <S.RatingDistribution>
          <BarChart width={300} height={300} data={ratingData}>
            <XAxis dataKey="rating" tickLine={false} axisLine={false} tick={{ fill: theme.colors.text }} />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: `${theme.colors.grayDark}`, opacity: '0.5' }}
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
              activeBar={{ fill: `${theme.colors.primaryDark}` }}
              fill={theme.colors.primary}
              barSize={45}
            />
          </BarChart>
        </S.RatingDistribution>
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
          <img
            src={movieData?.poster_path ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` : '포스터'}
            alt={movieData?.title}
          />
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
      {showPlayer && <MoviePlayer movieTitle={movieData?.title || ''} onClose={() => setShowPlayer(false)} />}
    </S.Container>
  );
}

export default DetailMovieInfo;
