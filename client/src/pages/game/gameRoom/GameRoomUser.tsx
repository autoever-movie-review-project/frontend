import * as S from './GameRoomUser.syle';
import bazzi from 'assets/bazzi.webp';
import crown from 'assets/crown.png';
import { useEffect, useState } from 'react';

interface IGameRoomUserProps {
  roomManager: boolean;
  message: string;
  isReady: boolean;
}

export const GameRoomUser = ({ roomManager, message, isReady }: IGameRoomUserProps) => {
  const [chatMessage, setChatMessage] = useState(message);

  useEffect(() => {
    setTimeout(() => {
      setChatMessage('');
    }, 3000);
  }, []);

  return (
    <S.GameRoomUserWrapper>
      {chatMessage ? <S.ChatDisplayBox>{chatMessage}</S.ChatDisplayBox> : <S.Blank />}
      <S.UserInfoBox>
        {roomManager ? <img src={crown} /> : null}
        <S.UserImageWrapper>
          <S.UserImage src={bazzi} />
        </S.UserImageWrapper>
        <S.UserName>김영화</S.UserName>
        <S.Score>{String(100).padStart(4, '0')}점</S.Score>
      </S.UserInfoBox>
      <S.Ready>{isReady ? 'Ready' : null}</S.Ready>
    </S.GameRoomUserWrapper>
  );
};
