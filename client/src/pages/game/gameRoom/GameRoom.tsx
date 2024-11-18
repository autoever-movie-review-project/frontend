import { GameLobbyContainer, GameLobbyWrapper } from '../gameLobby/GameLobby.style';
import * as S from './GameRoom.style';
import bgImg from 'assets/gamebg.png';
import { GameRoomUser } from './GameRoomUser';
import { useState } from 'react';
import { Timer } from './Timer';

export const GameRoom = () => {
  const [chatInput, setChatInput] = useState('');
  const [isPlayingGame, setIsPlayingGame] = useState(false);

  const handleChatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };

  const sendMessage = () => {
    // TODO: 소켓 메시지 전송기능 구현
    setChatInput('');
  };

  const handleSendMessageButtonClick = () => {
    sendMessage();
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    sendMessage();
  };

  const isRoomManager = (): boolean => {
    // TODO: 방장ID와 자신의 ID 가 같은지 확인
    return true;
  };

  const handleGameStartClick = () => {
    // TODO: 게임 시작 기능 구현
    setIsPlayingGame(true);
  };

  const handleGameReadyClick = () => {
    // TODO: 게임 준비 기능 구현
  };

  const roomManager = isRoomManager();
  return (
    <GameLobbyWrapper $bgImg={bgImg}>
      <GameLobbyContainer>
        {!isPlayingGame ? (
          <S.GameStartButtonWrapper>
            <S.GameStartButton
              $isAllReady={false}
              disabled={false}
              onClick={roomManager ? handleGameStartClick : handleGameReadyClick}
            >
              {roomManager ? '게임시작' : '게임준비'}
            </S.GameStartButton>
            <S.GameRoomExitButton>나가기</S.GameRoomExitButton>
          </S.GameStartButtonWrapper>
        ) : (
          <S.QuizBoardWrapper>
            <S.QuizBoard>
              <S.QuizNumber>{2}번째 문제</S.QuizNumber>
              <S.QuizMovieTitle>{`영화 제목 <친구>`}</S.QuizMovieTitle>
              <S.QuizTitle>{`ㄴㄱ ㅇㅂㅈ ㅁㅎㅅㄴ`}</S.QuizTitle>
            </S.QuizBoard>
            <Timer />
          </S.QuizBoardWrapper>
        )}
        <S.GameRoomUserContainer>
          {Array.from({ length: 4 }, (_, idx) => (
            <GameRoomUser key={idx} roomManager={roomManager}></GameRoomUser>
          ))}
        </S.GameRoomUserContainer>

        <S.ChatInputWrapper>
          <S.ChatInput onChange={handleChatInputChange} onKeyDown={handleEnterKeyDown} value={chatInput} />
          <S.SendButton onClick={handleSendMessageButtonClick}>전송</S.SendButton>
        </S.ChatInputWrapper>
      </GameLobbyContainer>
    </GameLobbyWrapper>
  );
};
