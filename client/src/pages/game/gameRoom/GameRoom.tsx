import { GameLobbyContainer, GameLobbyWrapper } from '../gameLobby/GameLobby.style';
import * as S from './GameRoom.style';
import bgImg from 'assets/gamebg.png';
import { GameRoomUser } from './GameRoomUser';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Timer } from './Timer';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from 'socket';
import { IReadyResponse, useExitGameRoom, useGameReadyMutation, useGameRoomDetailQuery } from 'hooks/useGame';

export const GameRoom = () => {
  const params = useParams();
  const gameId = Number(params.gameId);
  const { data } = useGameRoomDetailQuery(gameId || -1);
  const gameReadyMutation = useGameReadyMutation();
  const [readyList, setReadyList] = useState<IReadyResponse[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [recentChat, setRecentChat] = useState<{ userId: number; message: string }>({ userId: -1, message: '' });
  const userId = Number(localStorage.getItem('userId'));
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('joinRoom', gameId, userId);

    const handleChatMessage = (userId: number, message: string) => {
      setRecentChat({ userId, message });
    };

    const handleReady = (rList: IReadyResponse[]) => {
      setReadyList(rList);
    };

    socket.on('chatMessage', handleChatMessage);
    socket.on('ready', handleReady);

    return () => {
      socket.emit('leaveRoom', gameId);
      socket.off('joinRoom');
      socket.off('chatMessage', handleChatMessage);
      socket.off('ready', handleReady);
    };
  }, [gameId]);

  const handleChatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };

  const sendMessage = useCallback(() => {
    socket.emit('chatMessage', gameId, chatInput, userId);
    setChatInput('');
  }, [chatInput, gameId, userId]);

  const handleSendMessageButtonClick = useCallback(() => {
    sendMessage();
  }, [sendMessage]);

  const handleEnterKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') {
        return;
      }

      if (e.nativeEvent.isComposing === false) {
        sendMessage();
      }
    },
    [sendMessage]
  );

  const isRoomManager = useCallback((hostId: number, myId: number | undefined): boolean => {
    return myId === hostId;
  }, []);

  const handleGameStartClick = () => {};

  const handleGameReadyClick = useCallback(() => {
    gameReadyMutation.mutate(gameId, {
      onSuccess: (data) => {
        socket.emit('ready', gameId, data.data);
      },
    });
  }, [gameId, gameReadyMutation]);

  const handleExitClick = () => {
    useExitGameRoom().mutate(gameId);
    navigate('/game');
  };

  const renderedUserList = useMemo(() => {
    return data?.playerInfo.map((player) => (
      <GameRoomUser
        key={player.userId}
        nickName={player.nickname}
        profile={player.profile}
        roomManager={Number(player.userId) === data?.hostId}
        message={recentChat.userId === player.userId ? recentChat.message : ''}
        isReady={readyList.find((item) => item.userId === player.userId)?.isReady ?? false}
      />
    ));
  }, [data, readyList, recentChat]);

  if (data && userId) {
    const { hostId, status, playerCount } = data;
    const roomManager = isRoomManager(hostId, userId);
    const isAllReady = readyList.reduce((acc, curr) => (curr.isReady ? acc + 1 : acc), 0) - 1 === playerCount;
    return (
      <GameLobbyWrapper $bgImg={bgImg}>
        <GameLobbyContainer>
          {status === 'PLAYING' ? (
            <S.GameStartButtonWrapper>
              <S.GameStartButton
                $isAllReady={isAllReady}
                disabled={isAllReady}
                onClick={roomManager ? handleGameStartClick : handleGameReadyClick}
              >
                {roomManager ? '게임시작' : '게임준비'}
              </S.GameStartButton>
              <S.GameRoomExitButton onClick={handleExitClick}>나가기</S.GameRoomExitButton>
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
          <S.GameRoomUserContainer>{renderedUserList}</S.GameRoomUserContainer>

          <S.ChatInputWrapper>
            <S.ChatInput onChange={handleChatInputChange} onKeyDown={handleEnterKeyDown} value={chatInput} />
            <S.SendButton onClick={handleSendMessageButtonClick}>전송</S.SendButton>
          </S.ChatInputWrapper>
        </GameLobbyContainer>
      </GameLobbyWrapper>
    );
  }

  return null;
};
