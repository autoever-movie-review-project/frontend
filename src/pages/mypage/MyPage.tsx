import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  background-color: #fff;
`;

const Layout = styled.div`
  display: flex;
`;

function MyPage() {
  return (
    <Background>
      <Layout>Test</Layout>
    </Background>
  );
}

export default MyPage;
