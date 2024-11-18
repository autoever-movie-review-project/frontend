import { useGameRoomListQuery } from 'hooks/useGame';
import * as S from './GameRoomList.style';
import gameconsole from 'assets/bazzi.webp';

export const GameRoomList = () => {
  const { data } = useGameRoomListQuery();

  if (data) {
    return (
      <S.GameRoomListWrapper>
        {data.content.map((roomInfo) => (
          <S.GameRoomButton key={roomInfo.id}>
            <S.ButtonImageWrapper>
              <S.ButtonImage src={gameconsole} />
            </S.ButtonImageWrapper>
            <S.ButtonContentWarpper>
              <S.ButtonTitleWrapper>
                <S.RoomNumber>{String(roomInfo.id).padStart(3, '0')}</S.RoomNumber>
                <S.RoomTitle>{roomInfo.title}</S.RoomTitle>
              </S.ButtonTitleWrapper>
              <S.RoomStatusWapper>
                <S.RoomStatus $isPlaying={roomInfo.status}>대기중</S.RoomStatus>
                <S.RoomHeadCount>3/8</S.RoomHeadCount>
              </S.RoomStatusWapper>
            </S.ButtonContentWarpper>
          </S.GameRoomButton>
        ))}
      </S.GameRoomListWrapper>
    );
  }
};
