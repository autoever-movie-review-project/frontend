import { client } from 'api/client';

// 영화별 리뷰 Get
export const fetchReviewsByMovieId = async (movieId: number) => {
  try {
    const response = await client.get(`/review/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('영화별 리뷰 데이터 get 실패:', error);
    throw error;
  }
};

// 내가 쓴 리뷰 Get
export const fetchReviewByUser = async () => {
  try {
    const response = await client.get('/review/my');
    return response.data;
  } catch (error) {
    console.error('내가 쓴 리뷰 데이터 get 실패:', error);
  }
};

// 리뷰 Post
export const postReview = async ({
  movieId,
  rating,
  content,
}: {
  movieId: number;
  content: string;
  rating: number;
}) => {
  const response = await client.post('/review', {
    movieId,
    content,
    rating,
  });
  return response.data;
};
