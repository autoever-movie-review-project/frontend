import * as S from './GameRoomList.style';
import gameconsole from 'assets/bazzi.webp';
export const GameRoomList = () => {
  return (
    <S.GameRoomListWrapper>
      {Array.from({ length: 6 }, (_, x: number) => (
        <S.GameRoomButton key={x}>
          <S.ButtonImageWrapper>
            <S.ButtonImage src={gameconsole} />
          </S.ButtonImageWrapper>
          <S.ButtonContentWarpper>
            <S.ButtonTitleWrapper>
              <S.RoomNumber>{String(x + 1).padStart(3, '0')}</S.RoomNumber>
              <S.RoomTitle>즐겁게 게임 한판해요</S.RoomTitle>
            </S.ButtonTitleWrapper>
            <S.RoomStatusWapper>
              <S.RoomStatus $isPlaying={false}>대기중</S.RoomStatus>
              <S.RoomHeadCount>3/8</S.RoomHeadCount>
            </S.RoomStatusWapper>
          </S.ButtonContentWarpper>
        </S.GameRoomButton>
      ))}
    </S.GameRoomListWrapper>
  );
};
