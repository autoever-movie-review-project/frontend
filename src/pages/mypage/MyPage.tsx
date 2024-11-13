import { useAuth } from 'hooks/useAuth';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

const Background = styled.div`
  background-color: #fff;
`;

const Layout = styled.div`
  margin-top: 80px;
  display: flex;
`;

const UserProfileSection = styled.div`
  display: flex;
`;

const Profile = styled.div`
  width: 100px;
  height: 100px;
  fill: ${theme.colors.diamond};
  border-radius: 100px;
`;

const UserDetails = styled.div``;

function MyPage() {
  const { user } = useAuth();

  return (
    <Background>
      <Layout>
        <h1>프로필</h1>
        <UserProfileSection>
          <Profile />
          <UserDetails></UserDetails>
        </UserProfileSection>
      </Layout>
    </Background>
  );
}

export default MyPage;
