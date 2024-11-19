import { GameLobbyContainer, GameLobbyWrapper } from '../gameLobby/GameLobby.style';
import * as S from './GameRoom.style';
import bgImg from 'assets/gamebg.png';
import { GameRoomUser } from './GameRoomUser';
import { useEffect, useState } from 'react';
import { Timer } from './Timer';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from 'socket';
import { IReadyResponse, useExitGameRoom, useGameReadyMutation, useGameRoomDetailQuery } from 'hooks/useGame';

export const GameRoom = () => {
  const params = useParams();
  const gameId = Number(params.gameId);
  const { data } = useGameRoomDetailQuery(gameId || -1);
  const [readyList, setReadyList] = useState<IReadyResponse[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [recentChat, setRecentChat] = useState({ userId: -1, message: '' });
  const userId = Number(localStorage.getItem('userId'));
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('joinRoom', gameId);

    const handleReady = (gameId: number) => {
      useGameReadyMutation().mutate(gameId, {
        onSuccess: (data) => {
          setReadyList(data.data);
        },
      });
    };

    const handleChatMessage = (userId: number, message: string) => {
      setRecentChat({ userId, message });
    };

    socket.on('chatMessage', handleChatMessage);
    socket.on('ready', handleReady);

    return () => {
      socket.emit('leaveRoom', gameId);
      socket.off('joinRoom');
      socket.off('chatMessage', handleChatMessage);
      socket.off('ready', handleReady);
    };
  }, []);

  const handleChatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };

  const sendMessage = () => {
    socket.emit('chatMessage', gameId, chatInput, userId);
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

  const isRoomManager = (hostId: number, myId: number | undefined): boolean => {
    return myId === hostId;
  };

  const handleGameStartClick = () => {
    // TODO: 게임 시작 기능 구현
  };

  const handleGameReadyClick = () => {
    socket.emit('ready', gameId, userId);

    useGameReadyMutation().mutate(gameId);
  };

  const handleExitClick = () => {
    useExitGameRoom().mutate(gameId);
    navigate('/game');
  };

  // const roomManager = true;
  // const isPlayingGame = false;
  // return (
  //   <GameLobbyWrapper $bgImg={bgImg}>
  //     <GameLobbyContainer>
  //       {!isPlayingGame ? (
  //         <S.GameStartButtonWrapper>
  //           <S.GameStartButton
  //             $isAllReady={false}
  //             disabled={false}
  //             onClick={roomManager ? handleGameStartClick : handleGameReadyClick}
  //           >
  //             {roomManager ? '게임시작' : '게임준비'}
  //           </S.GameStartButton>
  //           <S.GameRoomExitButton>나가기</S.GameRoomExitButton>
  //         </S.GameStartButtonWrapper>
  //       ) : (
  //         <S.QuizBoardWrapper>
  //           <S.QuizBoard>
  //             <S.QuizNumber>{2}번째 문제</S.QuizNumber>
  //             <S.QuizMovieTitle>{`영화 제목 <친구>`}</S.QuizMovieTitle>
  //             <S.QuizTitle>{`ㄴㄱ ㅇㅂㅈ ㅁㅎㅅㄴ`}</S.QuizTitle>
  //           </S.QuizBoard>
  //           <Timer />
  //         </S.QuizBoardWrapper>
  //       )}
  //       <S.GameRoomUserContainer>
  //         {Array.from({ length: 4 }, (_, idx) => (
  //           <GameRoomUser key={idx} roomManager={roomManager} isReady={true} message="true"></GameRoomUser>
  //         ))}
  //       </S.GameRoomUserContainer>

  //       <S.ChatInputWrapper>
  //         <S.ChatInput onChange={handleChatInputChange} onKeyDown={handleEnterKeyDown} value={chatInput} />
  //         <S.SendButton onClick={handleSendMessageButtonClick}>전송</S.SendButton>
  //       </S.ChatInputWrapper>
  //     </GameLobbyContainer>
  //   </GameLobbyWrapper>
  // );

  if (data && userId) {
    const { hostId, playerInfo, status, playerCount } = data;
    const roomManager = isRoomManager(hostId, userId);
    const isAllReady = readyList.reduce((acc, curr) => (curr.isReady ? acc + 1 : acc), 0) - 1 === playerCount;
    return (
      <GameLobbyWrapper $bgImg={bgImg}>
        <GameLobbyContainer>
          {!status ? (
            <S.GameStartButtonWrapper>
              <S.GameStartButton
                $isAllReady={isAllReady}
                disabled={!isAllReady}
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
          <S.GameRoomUserContainer>
            {playerInfo.map((player) => (
              <GameRoomUser
                key={player.userId}
                roomManager={Number(player.userId) === hostId}
                message={recentChat.userId === player.userId ? recentChat.message : ''}
                isReady={true}
              ></GameRoomUser>
            ))}
          </S.GameRoomUserContainer>

          <S.ChatInputWrapper>
            <S.ChatInput onChange={handleChatInputChange} onKeyDown={handleEnterKeyDown} value={chatInput} />
            <S.SendButton onClick={handleSendMessageButtonClick}>전송</S.SendButton>
          </S.ChatInputWrapper>
        </GameLobbyContainer>
      </GameLobbyWrapper>
    );
  }
};
