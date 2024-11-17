import * as S from './GameRoomUser.syle';
import bazzi from 'assets/bazzi.webp';
import crown from 'assets/crown.png';

export const GameRoomUser = ({ roomManager }: { roomManager: boolean }) => {
  const chatContent = '느그 아부지 뭐하시노';
  return (
    <S.GameRoomUserWrapper>
      <S.ChatDisplayBox>{chatContent}</S.ChatDisplayBox>
      <S.UserInfoBox>
        {roomManager ? <img src={crown} /> : null}
        <S.UserImageWrapper>
          <S.UserImage src={bazzi} />
        </S.UserImageWrapper>
        <S.UserName>김영화</S.UserName>
        <S.Score>{String(100).padStart(4, '0')}점</S.Score>
      </S.UserInfoBox>
    </S.GameRoomUserWrapper>
  );
};
