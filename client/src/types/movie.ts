export interface Movie {
  movieId: number;
  mainImg: string; // 메인 포스터
  backdropImg: string; // 배경 포스터
  title: string; // 영화제목
  genre: string[]; // 장르
  directorName: string[]; // 감독이름
  actorName: string[]; // 배우이름
  actorImg: string[]; // 배우프로필
  releaseDate: string; // 개봉일 (YYYY-MM-DD)
  rating: number; // 평점
  ageRating: string; // 관람등급
  runtime: number; // 러닝타임
  language: 'en' | 'ko'; // 언어
  reviewCount: number; // 리뷰수
  plot: string; // 줄거리
  tagline: string; // 영화 대표 문구
}

export interface Actor {
  actorName: string;
  actorImg: string;
}
