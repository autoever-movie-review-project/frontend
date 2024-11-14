import React, { useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useModal } from 'hooks/useModal';
import Profile from 'components/Profile';
import DefaultProfile from 'assets/default-profile.png';
import * as S from './MyPage.style';
import ReviewCard from 'components/ReviewCrad/ReviewCard';

function MyPage() {
  const { user } = useAuth();
  const { openModal, closeModal, isModalOpen } = useModal();
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
              <S.RankIcon rankImg={user?.data.rankImg}></S.RankIcon>
              <S.Rank $rank={user?.data.rankName}>{user?.data.rankName}</S.Rank>
              <S.QuestionIcon onClick={openModal} />
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
                rank={user?.data.rankName}
                profile={DefaultProfile}
              />
              <ReviewCard
                content="인생 영화입니다."
                nickname={user?.data.nickname}
                rating={5}
                rank={user?.data.rankName}
                profile={DefaultProfile}
              />
              <ReviewCard
                content="퉤"
                nickname={user?.data.nickname}
                rating={0.5}
                rank={user?.data.rankName}
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
                  rank={'Silver'}
                  profile={DefaultProfile}
                />
                <ReviewCard
                  content="인생 영화입니다."
                  nickname={'한성용'}
                  rating={5}
                  rank={'Gold'}
                  profile={DefaultProfile}
                />
                <ReviewCard
                  content="별로인 거 같아요."
                  nickname={'대상연'}
                  rating={0.5}
                  rank={'Master'}
                  profile={DefaultProfile}
                />
              </S.MyReviewSection>
            </>
          </>
        )}
      </S.Layout>
      {isModalOpen && (
        <S.RankInfoModal closeModal={closeModal} modalTitle="등급 소개" width="300px" height="350px">
          <S.RankInfoSection>
            <S.RankInfo>
              <S.RankIcon rankImg="bronze.png" />
              <S.Rank $rank="Bronze">Bronze</S.Rank>0 포인트 이상
            </S.RankInfo>
            <S.RankInfo>
              <S.RankIcon rankImg="silver.png" />
              <S.Rank $rank="Silver">Silver</S.Rank>1000 포인트 이상
            </S.RankInfo>
            <S.RankInfo>
              <S.RankIcon rankImg="gold.png" />
              <S.Rank $rank="Gold">Gold</S.Rank>2000 포인트 이상
            </S.RankInfo>
            <S.RankInfo>
              <S.RankIcon rankImg="diamond.png" />
              <S.Rank $rank="Diamond">Diamond</S.Rank>4000 포인트 이상
            </S.RankInfo>
            <S.RankInfo>
              <S.RankIcon rankImg="master.png" />
              <S.Rank $rank="Master">Master</S.Rank>7000 포인트 이상
            </S.RankInfo>
          </S.RankInfoSection>
        </S.RankInfoModal>
      )}
    </S.Background>
  );
}

export default MyPage;
