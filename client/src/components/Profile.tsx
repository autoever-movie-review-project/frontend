import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import DefaultProfile from 'assets/default-profile.png';
import { RankType } from 'types/rank';

interface ProfileProps {
  width?: string;
  height?: string;
  rank?: RankType;
  src?: string;
}

const rankColors: Record<RankType, string> = {
  마스터: theme.colors.master,
  다이아: theme.colors.diamond,
  골드: theme.colors.gold,
  실버: theme.colors.silver,
  브론즈: theme.colors.bronze,
};

const ProfileWrap = styled.div<ProfileProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || '100px'};
  height: ${(props) => props.height || '100px'};
  border-radius: 9999px;
  background-color: ${(props) => (props.rank ? rankColors[props.rank] : rankColors.브론즈)};
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  border-radius: 9999px;
`;

function Profile({ width, height, rank = '브론즈', src = DefaultProfile }: ProfileProps) {
  return (
    <ProfileWrap width={width} height={height} rank={rank}>
      <ProfileImage
        src={src || DefaultProfile}
        alt={`${rank || '브론즈'}`}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src = DefaultProfile;
        }}
      />
    </ProfileWrap>
  );
}

export default Profile;
