import React from 'react';
import styled from 'styled-components';
import testactor from 'assets/testactor.svg';

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
  color: #ececec;
  margin-bottom: 20px;
`;

const ActorList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ActorItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 20%;
  margin-bottom: 20px;
`;

const ActorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ActorName = styled.span`
  font-size: 16px;
  color: #ececec;
`;

const ActorContainer: React.FC<ActorContainerProps> = ({ actors }) => {
  return (
    <Container>
      <Title>출연진</Title>
      <ActorList>
        {actors.map((actor, index) => (
          <ActorItem key={index}>
            <ActorImage src={actor.src || testactor} alt={actor.name} />
            <ActorName>{actor.name}</ActorName>
          </ActorItem>
        ))}
      </ActorList>
    </Container>
  );
};

export default ActorContainer;
