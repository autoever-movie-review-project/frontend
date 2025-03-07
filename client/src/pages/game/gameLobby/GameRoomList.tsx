import { useGameRoomListQuery, useJoinGameRoomMutation } from 'hooks/useGame';
import * as S from './GameRoomList.style';
import gameconsole from 'assets/bazzi.webp';
import { socket } from 'socket';
import { useNavigate } from 'react-router-dom';

export const GameRoomList = () => {
  const { data } = useGameRoomListQuery();
  const joinGameRoomMutation = useJoinGameRoomMutation();

  const navigate = useNavigate();

  const handleJoinRoomClick = (gameId: number) => {
    joinGameRoomMutation.mutate(gameId, {
      onSuccess: () => {
        navigate(`/gameroom/${gameId}`);
        socket.emit('gameRoomUpdate');
        socket.emit('joinGameRoom', gameId);
      },
    });
  };

  if (data) {
    return (
      <S.GameRoomListWrapper>
        {data.content.map((roomInfo) => (
          <S.GameRoomButton key={roomInfo.id} onClick={() => handleJoinRoomClick(roomInfo.id)}>
            <S.ButtonImageWrapper>
              <S.ButtonImage src={gameconsole} />
            </S.ButtonImageWrapper>
            <S.ButtonContentWarpper>
              <S.ButtonTitleWrapper>
                <S.RoomNumber>{String(roomInfo.id).padStart(3, '0')}</S.RoomNumber>
                <S.RoomTitle>{roomInfo.title}</S.RoomTitle>
              </S.ButtonTitleWrapper>
              <S.RoomStatusWapper>
                <S.RoomStatus $isPlaying={roomInfo.status}>
                  {roomInfo.status === 'WAITING' ? '대기중' : '게임중'}
                </S.RoomStatus>
                <S.RoomHeadCount>{`${roomInfo.playerCount} / ${roomInfo.maxPlayer}`}</S.RoomHeadCount>
              </S.RoomStatusWapper>
            </S.ButtonContentWarpper>
          </S.GameRoomButton>
        ))}
      </S.GameRoomListWrapper>
    );
  }
};
