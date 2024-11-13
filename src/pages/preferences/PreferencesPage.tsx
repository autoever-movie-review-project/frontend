import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vm;
  height: 100vh;
  background-color: black;
`;

const PreferencesMovieWrapper = styled.div`
  width: 90%;
  height: 100%;
`;

const PreferencesMovie = styled.image``;

function PreferencesPage() {
  return (
    <Container>
      <PreferencesMovieWrapper>
        <PreferencesMovie></PreferencesMovie>
      </PreferencesMovieWrapper>
    </Container>
  );
}

export default PreferencesPage;
