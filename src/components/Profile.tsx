import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import default_profile from 'assets/default-profile.png';

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
  border-radius: 100px;
  background-color: ${(props) => rankColors[props.rank]};
  overflow: hidden;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 85%;
  height: 85%;
`;

function Profile({ width, height, rank, src }: ProfileProps) {
  return (
    <ProfileWrap width={width} height={height} rank={rank}>
      <ProfileImage src={src} alt={default_profile} />
    </ProfileWrap>
  );
}

export default Profile;
