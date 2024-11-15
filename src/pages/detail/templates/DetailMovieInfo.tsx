import styled from 'styled-components';
import { theme } from 'styles/theme';
import { useEffect, useState } from 'react';
import EmptyHeartSrc from 'assets/empty-heart.svg?react';
import Pen from 'assets/pen.svg?react';
import Headphones from 'assets/headphones.svg?react';
import kakaoshare from 'assets/kakaoshare.svg?react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden; // 블러 효과가 컨테이너 밖으로 넘치지 않도록
  margin-bottom: 60px;
`;

const MovieInfoContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 60px;
  position: relative;
  z-index: 1;
`;

const getBackgroundImage = (backdropPath?: string) => {
  const baseUrl = 'https://image.tmdb.org/t/p/original';
  const gradient = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)';

  if (!backdropPath) return gradient;
  return `${gradient}, url(${baseUrl}${backdropPath})`;
};

const MovieDetailWrapper = styled.div<{ backdrop?: string }>`
  width: 100%;
  max-height: 80vh;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 70px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${(props) => getBackgroundImage(props.backdrop)};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(8px) brightness(0.4);
    z-index: -1;
  }

  z-index: 1;
`;

const CustomCursor = styled.div<{ isVisible: boolean }>`
  position: absolute;
  pointer-events: none;
  z-index: 100;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 8px;
  border-radius: 50%;
`;

const MovieImageWrapper = styled.div`
  width: 240px;
  height: 380px;
  margin-top: 40px;
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.3s ease;
  }

  &:hover {
    img {
      filter: brightness(0.7); // 호버 시 이미지를 약간 어둡게
    }

    ${CustomCursor} {
      opacity: 1;
    }
  }
`;

const MovieTitle = styled.div`
  width: 200px;
  height: 60px;
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 10px;
  font-size: 40px;
  font-weight: bold;
  color: #ececec;
`;

const MovieInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  color: #babac1;
  margin-bottom: 10px;
`;

const AgeRating = styled.div`
  display: flex;
  padding: 5px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.grayDark};
  color: ${theme.colors.text};
  text-align: center;
  font-size: 15px;
`;

const Division = styled.div`
  display: flex;
  width: 20px;
  height: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Rating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 10000px;
  gap: 5px;
  /* background-color: ${theme.colors.grayDark}; */
  font-size: 60px;
`;

const Year = styled.div`
  width: 40px;
  display: flex;
  align-items: center;
`;

const RunningTime = styled.div`
  width: 70px;
  display: flex;
  align-items: center;
`;

const Genre = styled.div`
  width: 60px;
  display: flex;
  align-items: center;
`;

const MoviePlot = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  height: 80px;
  color: #84868d;
  font-size: 15px;
  line-height: 20px;
`;

const Star = styled.div`
  color: yellow;
  font-size: 40px;
`;

const EmptyHeart = styled(EmptyHeartSrc)``;

const ReviewSection = styled.div`
  display: flex;
  color: ${theme.colors.text};
  justify-content: space-between;
  width: 500px;
`;

const ButtonBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 130px;
  /* background-color: ${theme.colors.grayDark}; */
  /* border: 2px solid ${theme.colors.grayLight}; */
  border-radius: 100px;
  transition: 0.2s all;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const LikeButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  svg {
    width: 30px;
    height: 30px;
  }
  white-space: nowrap;
  font-size: ${theme.fontSize.lg};
`;

const ReviewWriteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  svg {
    width: 30px;
    height: 30px;
  }
  white-space: nowrap;
  font-size: ${theme.fontSize.lg};
`;

const StyledHeadphones = styled.div`
  svg {
    width: 30px;
    height: 30px;
  }
`;

const RatingDistribution = styled.div`
  width: 33%;
  height: 300px;
  margin-top: 170px;
  color: ${theme.colors.text};
`;

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
  const [movieData, setMovieData] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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
          'https://api.themoviedb.org/3/search/movie?query=%EA%B8%B0%EC%83%9D%EC%B6%A9&include_adult=false&language=ko-KR&page=1',
          options
        );
        const searchData = await searchResponse.json();

        if (searchData.results && searchData.results[0]) {
          const movieId = searchData.results[0].id;
          const detailResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, options);
          const detailData = await detailResponse.json();
          console.log('Movie Detail Data:', detailData); // 들어온 데이터
          setMovieData(detailData);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchMovieData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (!movieData) return <div>영화 정보를 찾을 수 없습니다.</div>;

  // 연도 추출 함수
  const getYear = (date: string) => new Date(date).getFullYear();

  // 평점 변환 (10점 만점을 5점 만점으로)
  const getRating = (vote: number) => (vote / 2).toFixed(1);

  return (
    <Container>
      <MovieDetailWrapper backdrop={movieData?.backdrop_path || ''}>
        <MovieInfoContainer>
          <MovieTitle>{movieData.title}</MovieTitle>
          <MovieInfoWrapper>
            <AgeRating>12</AgeRating>
            <Division>ㆍ</Division>
            <Year>{getYear(movieData.release_date)}</Year>
            <Division>ㆍ</Division>
            <RunningTime>
              {movieData.runtime ? `${Math.floor(movieData.runtime / 60)}시간 ${movieData.runtime % 60}분` : '미정'}
            </RunningTime>
            <Division>ㆍ</Division>
            <Genre>{movieData.genres && movieData.genres.length > 0 ? movieData.genres[0].name : '장르 미정'}</Genre>
          </MovieInfoWrapper>
          <MoviePlot>{movieData.overview}</MoviePlot>
          <ReviewSection>
            <Rating>
              <Star>⭐</Star>
              {getRating(movieData.vote_average)}
            </Rating>
            <ButtonBackground>
              <LikeButton>
                <EmptyHeart />
                좋아요
              </LikeButton>
            </ButtonBackground>
            <ButtonBackground>
              <ReviewWriteButton>
                <Pen />
                리뷰 작성
              </ReviewWriteButton>
            </ButtonBackground>
          </ReviewSection>
        </MovieInfoContainer>
        <RatingDistribution>
          {/* <ResponsiveContainer width="100%" height="100%"> */}
          <BarChart width={400} height={300} data={ratingData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
            <XAxis dataKey="rating" tickLine={false} axisLine={false} tick={{ fill: theme.colors.text }} />
            <YAxis
              hide // Y축 숨기기
            />
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
              radius={[4, 4, 0, 0]} // 위쪽 모서리만 둥글게
              barSize={50} // 막대 두께
              // animationDuration={500}
            />
          </BarChart>
          {/* </ResponsiveContainer> */}
        </RatingDistribution>
        <MovieImageWrapper
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setCursorPosition({
              x: e.clientX - rect.left - 23,
              y: e.clientY - rect.top - 23,
            });
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => toast('🎧 OST가 재생돼요.', { autoClose: 2000 })}
        >
          <img
            src={movieData?.poster_path ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` : '포스터'}
            alt={movieData?.title}
          />
          {isHovering && (
            <CustomCursor
              isVisible={isHovering}
              style={{
                left: `${cursorPosition.x}px`,
                top: `${cursorPosition.y}px`,
              }}
            >
              <StyledHeadphones>
                <Headphones color="white" />
              </StyledHeadphones>
            </CustomCursor>
          )}
        </MovieImageWrapper>
      </MovieDetailWrapper>
    </Container>
  );
}

export default DetailMovieInfo;
