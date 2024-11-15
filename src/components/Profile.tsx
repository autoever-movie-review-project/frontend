import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import DefaultProfile from 'assets/default-profile.png';

type RankType = 'Master' | 'Diamond' | 'Gold' | 'Silver' | 'Bronze';

interface ProfileProps {
  width?: string;
  height?: string;
  rank?: RankType;
  src?: string;
}

const rankColors: Record<RankType, string> = {
  Master: theme.colors.master,
  Diamond: theme.colors.diamond,
  Gold: theme.colors.gold,
  Silver: theme.colors.silver,
  Bronze: theme.colors.bronze,
};

const ProfileWrap = styled.div<ProfileProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || '100px'};
  height: ${(props) => props.height || '100px'};
  border-radius: 9999px;
  background-color: ${(props) => (props.rank ? rankColors[props.rank] : rankColors.Bronze)};
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  border-radius: 9999px;
`;

function Profile({ width, height, rank = 'Bronze', src = DefaultProfile }: ProfileProps) {
  return (
    <ProfileWrap width={width} height={height} rank={rank}>
      <ProfileImage
        src={src || DefaultProfile}
        alt={`${rank || 'Bronze'}`}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src = DefaultProfile;
        }}
      />
    </ProfileWrap>
  );
}

export default Profile;
