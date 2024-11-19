import styled, { css, keyframes } from 'styled-components';

export const QuizBoardWrapper = styled.div`
  width: 80%;
  height: 180px;
  display: flex;
  flex-direction: column;
  padding: 4px;
  margin-bottom: 40px;
  box-sizing: border-box;
`;

export const QuizBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: black;
  width: 100%;
  padding: 20px 0;
  border-radius: 5px;
  border: 2px solid lightgrey;
`;

export const QuizNumber = styled.span`
  font-family: Galmuri11;
  font-size: 18px;
  color: white;
  margin-bottom: 20px;
`;

export const QuizMovieTitle = styled.span`
  font-family: Galmuri11;
  font-size: 24px;
  color: white;
  margin-bottom: 10px;
`;

export const QuizTitle = styled.span`
  font-family: Galmuri11;
  font-size: 32px;
  color: white;
`;

export const GameRoomUserContainer = styled.span`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 40px;
`;

export const ChatInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 70%;
`;

export const ChatInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #f2f2f2;
  border-radius: 20px;
  padding: 2px 20px;
  overflow: hidden;
  font-size: 18px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

export const SendButton = styled.button`
  position: absolute;
  right: 0;
  width: 80px;
  height: 90%;
  background: lightgray;
  border-radius: 20px;
  margin-right: 2px;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const GameStartButtonWrapper = styled.div`
  width: 80%;
  height: 220px;
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
`;

export const GameStartButton = styled.button<{ $isAllReady: boolean }>`
  width: 200px;
  height: 60px;
  border-radius: 5px;
  font-family: Galmuri11;
  font-size: 24px;
  background: lightgray;
  cursor: auto;

  ${({ $isAllReady }) =>
    $isAllReady &&
    css`
      background: #ffd8e1;
      cursor: pointer;
      animation: ${glowing} 0.7s infinite alternate;
      transition: border-color 0.3s ease-in-out;

      &:hover {
        filter: brightness(0.9);
      }
    `}
`;

const glowing = keyframes`
  from {
    border-color: #ff0000;
    box-shadow: 0 0 20px 10px #ff0000;
  }
  to {
    border-color: #ff0000;
    box-shadow: 0 0 10px 4px #ff0000;
  }
`;

export const GameRoomExitButton = styled.button`
  width: 200px;
  height: 60px;
  border-radius: 5px;
  font-family: Galmuri11;
  font-size: 24px;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const GameReadyButton = styled.button``;
