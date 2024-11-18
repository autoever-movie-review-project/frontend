import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface Actor {
  src: string;
  name: string;
}

interface ActorContainerProps {
  actors: Actor[];
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  width: 500px;
  height: 20px;
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: 20px;
`;

const ActorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

const ActorItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  padding: 10px;
  border-bottom: 2px solid ${theme.colors.grayDark};
`;

const ActorImage = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  object-fit: cover;
`;

const ActorName = styled.span`
  font-size: 16px;
  color: ${theme.colors.text};
`;

function ActorContainer({ actors }: ActorContainerProps) {
  return (
    <Container>
      <Title>출연진</Title>
      <ActorList>
        {actors.map((actor, index) => (
          <ActorItem key={index}>
            <ActorImage src={actor.src} alt={actor.name} />
            <ActorName>{actor.name}</ActorName>
          </ActorItem>
        ))}
      </ActorList>
    </Container>
  );
}

export default ActorContainer;
