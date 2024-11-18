import React from 'react';
import styled from 'styled-components';
import DetailMovieInfo from './templates/DetailMovieInfo';
import MediaContainer from './templates/MediaContainer';
import ActorContainer from './templates/ActorContainer';
import Loading from 'components/Loading';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { movieApi } from 'api/movie/movieApi';

const Container = styled.div`
  width: 100vm;
  height: 100%;
  margin-top: 80px;
  background-color: black;
`;

const Review = styled.h1`
  width: 500px;
  height: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #ececec;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  height: 100%;
  margin-bottom: 80px;
`;

function DetailPage() {
  const { movieId } = useParams<{ movieId: string }>();

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => movieApi.getMovieDetail(Number(movieId)),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
  });

  const getImageUrl = (path: string) => {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : '/default-image.jpg'; // 기본 이미지 경로 지정
  };

  if (isLoading) return <Loading />;
  if (error) return <div>오류가 발생했습니다. </div>;
  if (!movie) return <div>영화 정보를 찾을 수 없습니다.</div>;

  return (
    <Container>
      <Wrapper>
        <DetailMovieInfo movie={movie} />
      </Wrapper>
      <Wrapper>
        <MediaContainer movieTitle={movie.title} />
      </Wrapper>
      <Wrapper>
        <ActorContainer
          actors={movie.actorName.map((name, index) => ({
            name,
            src: getImageUrl(movie.actorImg[index]),
          }))}
        />
      </Wrapper>
      <Wrapper>
        <Review>리뷰 ({movie.reviewCount})</Review>
      </Wrapper>
    </Container>
  );
}

export default DetailPage;
