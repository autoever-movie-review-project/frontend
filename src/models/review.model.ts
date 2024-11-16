export interface ReviewRequest {
  userId: number;
  movieId: number;
  content: string;
  rating: number;
}

export interface ReviewResponse {
  reviewId: number;
  userId: number;
  nickname: string;
  profile: string;
  rankImg: string;
  content: string;
  likesCount: number;
  rating: number;
  createdAt: string;
  modifiedAt: string;
}

export type ReviewResponseArray = ReviewResponse[];
