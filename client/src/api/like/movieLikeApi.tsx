import { client } from 'api/client';

interface LikedMovie {
  movieId: number;
  mainImage: string;
}

interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export const fetchLikedMovies = async (page = 0) => {
  const response = await client.get<PaginatedResponse<LikedMovie>>(`/like/movies/?page=${page}`);
  return response.data;
};

export const addLikeMovie = async (movieId: number) => {
  const response = await client.post(`/like/movie/${movieId}`);
  return response.data;
};

export const deleteLikeMovie = async (likeMovieId: number) => {
  const response = await client.delete(`/like/${likeMovieId}/movie`);
  return response.data;
};
