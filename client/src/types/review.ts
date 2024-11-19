export interface ReviewRequest {
  userId: number;
  movieId: number;
  content: string;
  rating: number;
}

export interface ReviewResponse {
  reviewId: number;
  userId: number;
  writerNickname: string;
  profile: string;
  rankImg: string;
  rankName: string;
  content: string;
  likesCount: number;
  rating: number;
  createdAt: string;
  liked: boolean;
  modifiedAt: string;
  mainImg: string;
}

export type ReviewResponseArray = ReviewResponse[];
