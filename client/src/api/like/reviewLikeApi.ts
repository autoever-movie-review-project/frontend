import { client } from 'api/client';

//리뷰 좋아요
export const fetchPostReviewLike = async (reviewId: number) => {
  try {
    const response = await client.post(`/like/review/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error('리뷰 좋아요 에러 : ', error);
    throw error;
  }
};

//리뷰 좋아요 취소
export const fetchDeleteReviewLike = async (likeReviewId: number) => {
  try {
    const response = await client.delete(`/like/${likeReviewId}/review`);
    return response.data;
  } catch (error) {
    console.error('리뷰 좋아요 취소 에러 : ', error);
    throw error;
  }
};

//내가 좋아요 한 리뷰
export const fetchLikeReviewList = async (page: number) => {
  try {
    const response = await client.get('/like/reviews', { params: { page: page } });
    return response.data;
  } catch (error) {
    console.error('리뷰 좋아요 취소 에러 : ', error);
    throw error;
  }
};
