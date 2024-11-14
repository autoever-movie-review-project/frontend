import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import DefaultProfile from 'assets/default-profile.png';

interface ProfileProps {
  width?: string;
  height?: string;
  rank: 'Master' | 'Diamond' | 'Gold' | 'Silver' | 'Bronze';
  src?: string;
}

const rankColors = {
  Master: `${theme.colors.master}`,
  Diamond: `${theme.colors.diamond}`,
  Gold: `${theme.colors.gold}`,
  Silver: `${theme.colors.silver}`,
  Bronze: `${theme.colors.bronze}`,
};

const ProfileWrap = styled.div<ProfileProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || '100px'};
  height: ${(props) => props.height || '100px'};
  border-radius: 9999px;
  background-color: ${(props) => rankColors[props.rank]};
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 90%;
  height: 90%;
`;

function Profile({ width, height, rank, src }: ProfileProps) {
  return (
    <ProfileWrap width={width} height={height} rank={rank}>
      <ProfileImage src={src} alt={DefaultProfile} />
    </ProfileWrap>
  );
}

export default Profile;
