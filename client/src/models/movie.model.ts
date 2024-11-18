export interface Movie {
  movieId: number; // 영화 ID
  title: string; // 번역된 제목
  tagline: string; // 영화 명언(대표 문구)
  plot: string; // 줄거리
  backdropImg: string; // 배경 이미지 URL
  mainImg: string; // 메인 포스터 이미지 URL
  releaseDate: Date; // 개봉일
  rating: number; // 평점
  language: string; // 원본 언어
  runtime: number; // 러닝타임
  ageRating: string; // 관람 등급
  reviewCount: number; // 리뷰 수
  directorName: Array<string>; //MovieDirectors 감독
  actorName: Array<string>; // MovieActors 출연진
  actorImg: Array<string>; // 출연진 이미지 url
  genre: Array<string>; //MovieGenres 영화 장르
}

export type MovieArray = Movie[];

export interface BoxOfficeListResDto {
  movieId: number;
  rank: string; // 순위
  audience: string; //관객수 number?
  mainImg: string;
  rating: number;
  title: string;
  genre: Array<string>;
  ageRating: string;
  tagline: string;
}
