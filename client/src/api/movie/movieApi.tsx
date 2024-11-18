import axios, { AxiosResponse } from 'axios';
import { client } from 'api/client';
import { Movie } from 'types/movie';

export const movieApi = {
  getMovieDetail: async (movieId: number): Promise<Movie> => {
    try {
      const response: AxiosResponse<Movie> = await client.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // 에러 처리
        if (error.response?.status === 404) {
          throw new Error('영화를 찾을 수 없습니다.');
        }
        if (error.response?.status === 401) {
          throw new Error('인증이 필요합니다.');
        }
        throw new Error('영화 정보를 불러오는데 실패했습니다.');
      }
      throw error;
    }
  },
};
