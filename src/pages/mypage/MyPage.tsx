import React, { useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import Profile from 'components/Profile';
import DefaultProfile from 'assets/default-profile.png';
import * as S from './MyPage.style';
import ReviewCard from 'components/ReviewCard';
import { useNavigate } from 'react-router-dom';

function MyPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<'reviews' | 'movies' | 'likes'>('reviews');

  const handleMenuClick = (menu: 'reviews' | 'movies' | 'likes') => {
    setActiveMenu(menu);
  };

  return (
    <S.Background>
      <S.Layout>
        <h1>마이페이지</h1>
        <S.UserProfileSection>
          <Profile width="110px" height="110px" src={DefaultProfile} rank={user?.data.rankName} />
          <S.UserDatails>
            <S.RankSection>
              <S.RankIcon>등급 아이콘</S.RankIcon>
              <S.UserType>{user?.data.rankName}</S.UserType>
            </S.RankSection>
            <S.Nickname>{user?.data.nickname}</S.Nickname>
            <S.Email>{user?.data.email}</S.Email>
          </S.UserDatails>
        </S.UserProfileSection>
        <S.ProfileEditButton>
          <S.EditIcon />
          프로필 편집
        </S.ProfileEditButton>
        <S.MenuBar>
          <S.MenuBarItem $active={activeMenu === 'reviews'} onClick={() => handleMenuClick('reviews')}>
            <S.MenuBarItemText>
              <p>0</p>내 리뷰
            </S.MenuBarItemText>
          </S.MenuBarItem>
          <span>|</span>
          <S.MenuBarItem $active={activeMenu === 'movies'} onClick={() => handleMenuClick('movies')}>
            <S.MenuBarItemText>
              <p>0</p>찜한 영화
            </S.MenuBarItemText>
          </S.MenuBarItem>
          <span>|</span>
          <S.MenuBarItem $active={activeMenu === 'likes'} onClick={() => handleMenuClick('likes')}>
            <S.MenuBarItemText>
              <p>0</p>좋아요한 리뷰
            </S.MenuBarItemText>
          </S.MenuBarItem>
        </S.MenuBar>
        {activeMenu === 'reviews' && (
          <>
            <h2>내가 작성한 리뷰</h2>
            <S.MyReviewSection>
              <ReviewCard
                content="그럭저럭 볼만해요."
                nickname={user?.data.nickname}
                rating={3.5}
                userType={user?.data.rankName}
                profile={DefaultProfile}
              />
              <ReviewCard
                content="인생 영화입니다."
                nickname={user?.data.nickname}
                rating={5}
                userType={user?.data.rankName}
                profile={DefaultProfile}
              />
              <ReviewCard
                content="퉤"
                nickname={user?.data.nickname}
                rating={0.5}
                userType={user?.data.rankName}
                profile={DefaultProfile}
              />
            </S.MyReviewSection>
          </>
        )}
        {activeMenu === 'movies' && (
          <>
            <h2>찜한 영화</h2>
            <S.LikedMovieSection>
              <img src="https://picsum.photos/seed/1/200/300"></img>
              <img src="https://picsum.photos/seed/2/200/300"></img>
              <img src="https://picsum.photos/seed/3/200/300"></img>
            </S.LikedMovieSection>
          </>
        )}
        {activeMenu === 'likes' && (
          <>
            <h2>좋아요한 리뷰</h2>
            <>
              <S.MyReviewSection>
                <ReviewCard
                  content="그럭저럭 볼만해요."
                  nickname={'빈빈'}
                  rating={3.5}
                  userType={'Silver'}
                  profile={DefaultProfile}
                />
                <ReviewCard
                  content="인생 영화입니다."
                  nickname={'한성용'}
                  rating={5}
                  userType={'Gold'}
                  profile={DefaultProfile}
                />
                <ReviewCard
                  content="퉤"
                  nickname={'대상연'}
                  rating={0.5}
                  userType={'Master'}
                  profile={DefaultProfile}
                />
              </S.MyReviewSection>
            </>
          </>
        )}
      </S.Layout>
    </S.Background>
  );
}

export default MyPage;
