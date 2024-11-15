export interface ReviewRequest {
  userId: number;
  movieId: number;
  content: string;
  rating: number;
}

export interface ReviewResponse {
  reviewId: number;
  user: {
    userId: number;
    username: string;
  };
  movie: {
    movieId: number;
    title: string;
  };
  content: string;
  likesCount: number;
  rating: number;
}
