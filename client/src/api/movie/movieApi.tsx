import { client } from 'api/client';
import axios, { AxiosResponse } from 'axios';
import { Movie } from 'types/movie';

//영화 상세정보 가져오기
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

//박스오피스 순위리스트 Get (interface:BoxOfficeListResDto)
export const fetchBoxOfficeMovieList = async () => {
  try {
    const response = await client.get('/movie/box-office');
    return response.data;
  } catch (error) {
    console.error('박스오피스 영화 리스트 호출 실패:', error);
    throw error;
  }
};

//인기 영화리스트 Get
export const fetchPopularMovieList = async (page: number = 0) => {
  try {
    const response = await client.get(`/movie/popular?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('인기 영화 리스트 호출 실패:', error);
    throw error;
  }
};

//개봉 예정 영화 리스트 Get
export const fetchUpcomingMovieList = async () => {
  try {
    const response = await client.get('/movie/upcoming');
    return response.data;
  } catch (error) {
    console.error('개봉 예정 영화 호출 실패:', error);
    throw error;
  }
};

//영화 검색 결과 Get
// export const fetchSearchMovieList = async (searchData: string) => {
//   try {
//     const response = await client.get('/movie/search', {
//       params: { keyword: searchData },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('검색 API 호출 실패: ', error);
//     throw error;
//   }
// };

export const fetchSearchMovieList = async (keyword: string, page: number) => {
  const response = await client.get('/movie/search', {
    params: { keyword: keyword, page: page },
  });
  return response.data; // data에는 movies 목록만 반환됨
};

interface MovieRequestBody {
  movieIds: number[];
}

//선호 영화 3가지 보내기
export const fetchPostPreferencesMovieList = async (movieIds: number[]): Promise<any> => {
  const requestBody: MovieRequestBody = { movieIds };

  try {
    const response = await client.post('/recommendation', requestBody);
    return response.data;
  } catch (e) {
    console.error('선호 영화 보내기 실패: ', e);
    throw new Error('선호 영화 보내기 실패');
  }
};

export const fetchPreferencesMovieList = async () => {
  try {
    const response = await client.get('/recommendation');
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

//리뷰 많은순 영화
export const fetchHotMovieList = async () => {
  try {
    const response = await client.get('/movie/top-reviewed');
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
