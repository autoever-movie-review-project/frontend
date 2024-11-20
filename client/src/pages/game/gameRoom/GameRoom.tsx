import { GameLobbyContainer, GameLobbyWrapper } from '../gameLobby/GameLobby.style';
import * as S from './GameRoom.style';
import bgImg from 'assets/gamebg.png';
import { GameRoomUser } from './GameRoomUser';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Timer } from './Timer';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from 'socket';
import {
  IReadyResponse,
  useExitGameRoom,
  useGameReadyMutation,
  useGameRoomDetailQuery,
  useGameStartMutation,
} from 'hooks/useGame';
import { IProblem } from '../movieQuotes';
import { useModal } from 'hooks/useModal';
import { Modal } from 'components/Modal/Modal';
import { fetchPlusPoint } from 'api/point/pointApi';

interface IGameScore {
  [key: number]: number;
}

export const GameRoom = () => {
  const params = useParams();
  const gameId = Number(params.gameId);
  const { data, refetch } = useGameRoomDetailQuery(gameId || -1);
  const gameReadyMutation = useGameReadyMutation();
  const gameStartMutation = useGameStartMutation();
  const exitGameRoom = useExitGameRoom();
  const [readyList, setReadyList] = useState<IReadyResponse[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [recentChat, setRecentChat] = useState<{ userId: number; message: string }>({ userId: -1, message: '' });
  const [gameRound, setGameRound] = useState(0);
  const [gameList, setGameList] = useState<IProblem[]>([
    {
      title: '친구',
      quote: 'ㄴㄱ ㄱㄹ ㅎㅇㅇ',
      answer: '니가 가라 하와이',
    },
    {
      title: '범죄와의 전쟁',
      quote:
        'ㄴㄱ ㅇㅁ ㄴㄱ ㅅㅈㅇㄹ ㅇㅁ ㅇㅈㄲㄷ, ㅇㅇ? ㄱㅇ ㅂ ㅁㄱ ㅇㅇ? ㅆㅇㄴㄷ ㄱㅇ ㄱㄱ ㅇ! ㅁ, ㅇ ㄱㅅㄲㅇ. ㄷ ㅎㅇ',
      answer:
        '내가 인마 느그 서장이랑 인마 어저께도, 으이? 같이 밥 묵고 으이? 싸우나도 같이 가고 으! 마, 이 개새끼야. 다 했어',
    },
    {
      title: '박하사탕',
      quote: 'ㄴ ㄷㅅ ㄷㅇㄱㄹ',
      answer: '나 다시 돌아갈래',
    },
    {
      title: '변호인',
      quote: 'ㄷㅎㅁㄱ ㅈㄱㅇ ㄱㅁㅇ ㅇㄱ, ㅁㄷ ㄱㄹㅇ ㄱㅁㅇㄹㅂㅌ ㄴㅇㄷ',
      answer: '대한민국 주권은 국민에 있고, 모든 권력은 국민으로부터 나온다',
    },
    {
      title: '베테랑',
      quote: 'ㅇㅇㄱ ㅇㄴ',
      answer: '어이가 없네',
    },
  ]);
  const [gameScore, setGameScore] = useState<IGameScore>({});
  const { isModalOpen, openModal, closeModal } = useModal();
  const userId = Number(localStorage.getItem('userId'));
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('joinRoom', gameId, userId);

    const handleScore = (gameScore: IGameScore) => {
      setGameScore(gameScore);
    };

    const handleJoinGameRoom = () => {
      console.log('데이터 새로 고침');
      refetch();
    };

    const handleGameStart = () => {
      console.log('게임시작 데이터 새로 고침');
      refetch();
    };

    const handleChatMessage = (userId: number, message: string) => {
      setRecentChat({ userId, message });

      if (gameList[gameRound].answer === message) {
        let updatedScore = {};
        setGameScore((prevGameScore) => {
          updatedScore = {
            ...prevGameScore,
            [userId]: (prevGameScore[userId] || 0) + 100,
          };
          return updatedScore;
        });

        socket.emit('score', gameId, updatedScore);
        handleNextGame();
      }
    };

    const handleReady = (rList: IReadyResponse[]) => {
      setReadyList(rList);
    };

    socket.on('chatMessage', handleChatMessage);
    socket.on('ready', handleReady);
    socket.on('gameStart', handleGameStart);
    socket.on('joinGameRoom', handleJoinGameRoom);
    socket.on('score', handleScore);

    return () => {
      socket.emit('leaveRoom', gameId);
      socket.off('joinRoom');
      socket.off('chatMessage', handleChatMessage);
      socket.off('ready', handleReady);
      socket.off('gameStart', handleGameStart);
      socket.off('joinGameRoom', handleJoinGameRoom);
      socket.off('score', handleScore);
    };
  }, [gameId, gameRound]);

  useEffect(() => {
    if (data?.playerInfo) {
      const initialScores = data.playerInfo.reduce((acc: Record<number, number>, player) => {
        acc[player.userId] = 0;
        return acc;
      }, {});
      setGameScore(initialScores);
    }
  }, [data]);

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

  const handleGameStartClick = () => {
    gameStartMutation.mutate(gameId, {
      onSuccess: () => {
        socket.emit('gameRoomUpdate');
        socket.emit('gameStart', gameId);
        // const gamelist = getGameProblemList();
        // console.log(gamelist);
        // setGameList(gamelist);
      },
    });
  };

  const handleGameReadyClick = useCallback(() => {
    gameReadyMutation.mutate(gameId, {
      onSuccess: (data) => {
        socket.emit('ready', gameId, data.data);
      },
    });
  }, [gameId, gameReadyMutation]);

  const handleExitClick = () => {
    socket.emit('gameRoomUpdate');
    exitGameRoom.mutate(gameId, {
      onSuccess: () => {
        navigate('/game');
      },
    });
  };

  const handleNextGame = useCallback(() => {
    if (gameRound >= 4) {
      openModal();
      return;
    }
    setGameRound((prevRound) => prevRound + 1);
  }, [gameRound]);

  const winnerPoint = async (highestScore: number) => {
    if (highestScore === userId) {
      await fetchPlusPoint({ points: 500, description: '초성게임 우승!' });
    }
  };

  const findHighestScorer = () => {
    let highestUserId: number | null = null;
    let highestScore = -Infinity;

    for (const [userId, score] of Object.entries(gameScore)) {
      if (score > highestScore) {
        highestScore = score;
        highestUserId = Number(userId);
      }
    }

    winnerPoint(highestScore);
    const nickname = data?.playerInfo.find((player) => player.userId === highestUserId)?.nickname;

    return nickname;
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
        score={gameScore[player.userId]}
      />
    ));
  }, [data, readyList, recentChat, gameScore]);

  if (data && userId) {
    const { hostId, status, playerCount } = data;
    const roomManager = isRoomManager(hostId, userId);
    const isAllReady = readyList.reduce((acc, curr) => (curr.isReady ? acc + 1 : acc), 0) === playerCount - 1;
    console.log(isAllReady);
    return (
      <GameLobbyWrapper $bgImg={bgImg}>
        <GameLobbyContainer>
          {status === 'WAITING' ? (
            <S.GameStartButtonWrapper>
              <S.GameStartButton
                $isAllReady={roomManager && isAllReady}
                disabled={(roomManager && !isAllReady) || false}
                onClick={roomManager ? handleGameStartClick : handleGameReadyClick}
              >
                {roomManager ? '게임시작' : '게임준비'}
              </S.GameStartButton>
              <S.GameRoomExitButton onClick={handleExitClick}>나가기</S.GameRoomExitButton>
            </S.GameStartButtonWrapper>
          ) : (
            <S.QuizBoardWrapper>
              <S.QuizBoard>
                <S.QuizNumber>{gameRound + 1}번째 문제</S.QuizNumber>
                <S.QuizMovieTitle>{`영화 제목 <${gameList[gameRound].title}>`}</S.QuizMovieTitle>
                <S.QuizTitle>{gameList[gameRound].quote}</S.QuizTitle>
              </S.QuizBoard>
              <Timer handleNextGame={handleNextGame} gameRound={gameRound} />
            </S.QuizBoardWrapper>
          )}
          <S.GameRoomUserContainer>{renderedUserList}</S.GameRoomUserContainer>

          <S.ChatInputWrapper>
            <S.ChatInput onChange={handleChatInputChange} onKeyDown={handleEnterKeyDown} value={chatInput} />
            <S.SendButton onClick={handleSendMessageButtonClick}>전송</S.SendButton>
          </S.ChatInputWrapper>
        </GameLobbyContainer>
        {isModalOpen && (
          <Modal closeModal={closeModal} modalTitle="우승자">
            <S.Winner>{findHighestScorer()}</S.Winner>
          </Modal>
        )}
      </GameLobbyWrapper>
    );
  }

  return null;
};
