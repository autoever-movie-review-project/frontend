import React, { useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useModal } from 'hooks/useModal';
import { userApi } from 'api/user/userApi';
import Profile from 'components/Profile';
import DefaultProfile from 'assets/default-profile.png';
import * as S from './MyPage.style';
import ReviewCard from 'components/ReviewCrad/ReviewCard';
import EditProfileModal, { FormInputs } from './EditProfileModal';
import { toast } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { UpdateUserRequest } from 'api/user/user';
import { client } from 'api/client';
import { AxiosError } from 'axios';
import { fetchMyReviews } from 'api/review/reviewApi';
import { fetchLikedMovies } from 'api/like/movieLikeApi';
import { useNavigate } from 'react-router-dom';
import { RankDisplay } from 'components/point/RankDisplay';
import { usePointStore } from 'store/point';
import { RankType } from 'types/rank';

interface MyReview {
  movieId: number;
  reviewId: number;
  userId: number;
  writerNickname: string;
  content: string;
  profile: string | null;
  likesCount: number;
  rating: number;
  createdAt: string;
  liked: boolean;
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
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

interface LikedReview {
  reviewId: number;
  userId: number;
  nickname: string;
  profile: string | null;
  rankName: string;
  rankImg: string | null;
  movieId: number;
  content: string;
  likesCount: number;
  rating: number;
}

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

function MyPage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { openModal, closeModal, isModalOpen } = useModal();
  const navigate = useNavigate();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'reviews' | 'movies' | 'likes'>('reviews');

  const point = usePointStore((state) => state.point);

  const getLikedReviews = async () => {
    const response = await client.get('/like/reviews/?page=0');
    return response.data;
  };

  const {
    data: myReviews = [], // 기본값을 빈 배열로 설정
    isLoading: isMyReviewsLoading,
    error: myReviewsError,
  } = useQuery<MyReview[]>({
    queryKey: ['myReviews'],
    queryFn: fetchMyReviews,
  });

  const {
    data: likedReviewsData,
    isLoading: isLikedReviewsLoading,
    error: likedReviewsError,
  } = useQuery<PaginatedResponse<LikedReview>>({
    queryKey: ['likedReviews'],
    queryFn: getLikedReviews,
  });

  const {
    data: likedMoviesData,
    isLoading: isLikedMoviesLoading,
    error: likedMoviesError,
  } = useQuery<PaginatedResponse<LikedMovie>>({
    queryKey: ['likedMovies'],
    queryFn: () => fetchLikedMovies(),
  });

  const likedMovies = likedMoviesData?.content || [];
  const likedMoviesCount = likedMoviesData?.totalElements || 0;

  const myReviewCount = myReviews?.length || 0;

  const likedReviews = likedReviewsData?.content || [];
  const likedReviewCount = likedReviewsData?.totalElements || 0;

  const handleMenuClick = (menu: 'reviews' | 'movies' | 'likes') => {
    setActiveMenu(menu);
  };

  const handleProfileUpdate = async (data: FormInputs) => {
    try {
      const updateData: UpdateUserRequest = {
        nickname: data.nickname,
        profile: data.profile || user?.data.profile || '',
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };

      await userApi.updateUser(updateData);
      if (updateData.newPassword) {
        await userApi.updatePassword(updateData);
      }

      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('프로필이 수정되었어요.');
      setEditModalOpen(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.msg || '프로필 수정 중 오류가 발생했어요.');
      }
    }
  };

  const handleProfileButtonClick = () => {
    if (!isModalOpen) {
      // 랭크 정보 모달이 열려있지 않을 때만
      setEditModalOpen(true);
    }
  };

  console.log(likedReviewsData);

  return (
    <S.Background>
      <S.Layout>
        <h1>마이페이지</h1>
        <S.UserProfileSection>
          <S.UserInfoContainer>
            <Profile width="110px" height="110px" src={DefaultProfile} rank={user?.data.rankName} />
            <S.UserDatails>
              <S.RankSection>
                <S.RankIcon rankImg={user?.data.rankImg}></S.RankIcon>
                <S.Rank $rank={user?.data.rankName}>{user?.data.rankName}</S.Rank>
                <S.QuestionIcon onClick={openModal} />
              </S.RankSection>
              <S.Nickname>{user?.data.nickname}</S.Nickname>
              <S.Email>{user?.data.email}</S.Email>
            </S.UserDatails>
          </S.UserInfoContainer>
          <S.RankBarContainer>
            <RankDisplay points={point} nickname={user?.data.nickname || '사용자'} />
            <S.QuestionIcon onClick={openModal} /> {/*다른 아이콘으로 점수 히스토리 모달열기*/}
          </S.RankBarContainer>
        </S.UserProfileSection>
        <S.ProfileEditButton onClick={handleProfileButtonClick}>
          <S.EditIcon />
          프로필 편집
        </S.ProfileEditButton>
        <S.MenuBar>
          <S.MenuBarItem $active={activeMenu === 'reviews'} onClick={() => handleMenuClick('reviews')}>
            <S.MenuBarItemText>
              <p>{myReviewCount}</p>내 리뷰
            </S.MenuBarItemText>
          </S.MenuBarItem>
          <span>|</span>
          <S.MenuBarItem $active={activeMenu === 'movies'} onClick={() => handleMenuClick('movies')}>
            <S.MenuBarItemText>
              <p>{likedMoviesCount}</p>찜한 영화
            </S.MenuBarItemText>
          </S.MenuBarItem>
          <span>|</span>
          <S.MenuBarItem $active={activeMenu === 'likes'} onClick={() => handleMenuClick('likes')}>
            <S.MenuBarItemText>
              <p>{likedReviewCount}</p>좋아요한 리뷰
            </S.MenuBarItemText>
          </S.MenuBarItem>
        </S.MenuBar>
        {activeMenu === 'reviews' && (
          <>
            <h2>내가 작성한 리뷰</h2>
            <S.MyReviewSection>
              {isMyReviewsLoading ? (
                <div>로딩 중...</div>
              ) : myReviewsError ? (
                <div>리뷰를 불러오는 중 오류가 발생했어요.</div>
              ) : myReviews.length > 0 ? (
                myReviews.map((review) => (
                  <ReviewCard
                    key={review.reviewId}
                    reviewId={review.reviewId}
                    content={review.content}
                    nickname={review.writerNickname}
                    rating={review.rating}
                    rank={user?.data.rankName}
                    profile={review.profile || DefaultProfile}
                    likesCount={review.likesCount}
                    liked={review.liked}
                  />
                ))
              ) : (
                <div>작성한 리뷰가 없어요.</div>
              )}
            </S.MyReviewSection>
          </>
        )}
        {activeMenu === 'movies' && (
          <>
            <h2>찜한 영화</h2>
            <S.LikedMovieSection>
              {isLikedMoviesLoading ? (
                <div>로딩 중...</div>
              ) : likedMoviesError ? (
                <div>찜한 영화를 불러오는 중 오류가 발생했습니다.</div>
              ) : likedMovies.length > 0 ? (
                likedMovies.map((movie) => (
                  <S.LikedMovieItem key={movie.movieId} onClick={() => navigate(`/movies/${movie.movieId}`)}>
                    <S.MovieImage src={movie.mainImage} alt="영화 포스터" />
                  </S.LikedMovieItem>
                ))
              ) : (
                <div>찜한 영화가 없어요.</div>
              )}
            </S.LikedMovieSection>
          </>
        )}
        {activeMenu === 'likes' && (
          <>
            <h2>좋아요한 리뷰</h2>
            <S.MyReviewSection>
              {isLikedReviewsLoading ? (
                <div>로딩 중...</div>
              ) : likedReviewsError ? (
                <div>리뷰를 불러오는 중 오류가 발생했어요.</div>
              ) : likedReviews.length > 0 ? (
                likedReviews.map((review) => (
                  <ReviewCard
                    key={review.reviewId}
                    reviewId={review.reviewId}
                    content={review.content}
                    nickname={review.nickname}
                    rating={review.rating}
                    rank={review.rankName as RankType}
                    profile={review.profile || DefaultProfile}
                    likesCount={review.likesCount}
                    liked={true}
                  />
                ))
              ) : (
                <div>좋아요한 리뷰가 없습니다.</div>
              )}
            </S.MyReviewSection>
          </>
        )}
      </S.Layout>
      {isModalOpen && (
        <S.RankInfoModal closeModal={closeModal} modalTitle="등급 소개" width="300px" height="350px">
          <S.RankInfoSection>
            <S.RankInfo>
              <S.RankIcon rankImg="bronze.png" />
              <S.Rank $rank="브론즈">브론즈</S.Rank>0 포인트 이상
            </S.RankInfo>
            <S.RankInfo>
              <S.RankIcon rankImg="silver.png" />
              <S.Rank $rank="실버">실버</S.Rank>1000 포인트 이상
            </S.RankInfo>
            <S.RankInfo>
              <S.RankIcon rankImg="gold.png" />
              <S.Rank $rank="골드">골드</S.Rank>2000 포인트 이상
            </S.RankInfo>
            <S.RankInfo>
              <S.RankIcon rankImg="diamond.png" />
              <S.Rank $rank="다이아">다이아</S.Rank>4000 포인트 이상
            </S.RankInfo>
            <S.RankInfo>
              <S.RankIcon rankImg="master.png" />
              <S.Rank $rank="마스터">마스터</S.Rank>7000 포인트 이상
            </S.RankInfo>
          </S.RankInfoSection>
        </S.RankInfoModal>
      )}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        currentUser={user}
        onSubmit={handleProfileUpdate}
      />
    </S.Background>
  );
}

export default MyPage;
