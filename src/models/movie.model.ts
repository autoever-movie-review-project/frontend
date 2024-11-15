import { ReviewResponse } from './review.model';
interface Movie {
  movieId: string; // 영화 ID
  tmdbId: string; // TMDB 영화 ID
  title: string; // 번역된 제목
  tagline: string; // 영화 명언(대표 문구)
  plot: string; // 줄거리
  popularity: number; // 인기 수치
  backdropImg: string; // 배경 이미지 URL
  mainImg: string; // 메인 포스터 이미지 URL
  releaseDate: Date; // 개봉일
  rating: number; // 평점
  voteCount: number; // 평점을 매긴 사람 수
  language: string; // 원본 언어
  runtime: number; // 러닝타임
  ageRating: string; // 관람 등급
  reviewCount: number; // 리뷰 수

  reviews: Array<ReviewResponse>; // 영화 리뷰

  movieGenres: Array<string>; //MovieGenres 영화 장르

  movieActors: Array<string>; // MovieActors 출연진

  movieDirectors: Array<string>; //MovieDirectors 감독
}

export default Movie;
