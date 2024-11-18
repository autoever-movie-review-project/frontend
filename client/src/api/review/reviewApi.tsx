import { client } from 'api/client';

// 영화별 리뷰 Get
export const fetchReviewsByMovieId = async (movieId: number) => {
  try {
    const response = await client.get(`/reviews/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const postReview = async ({
  movieId,
  rating,
  content,
}: {
  movieId: number;
  rating: number;
  content: string;
}) => {
  const response = await client.post('/api/reviews', {
    movieId,
    rating,
    content,
  });
  return response.data;
};
