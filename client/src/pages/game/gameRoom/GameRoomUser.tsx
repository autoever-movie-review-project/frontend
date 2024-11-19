import * as S from './GameRoomUser.syle';
import bazzi from 'assets/bazzi.webp';
import crown from 'assets/crown.png';
import { useEffect, useState } from 'react';

interface IGameRoomUserProps {
  nickName: string;
  profile: string;
  roomManager: boolean;
  message: string;
  isReady: boolean;
}

export const GameRoomUser = ({ nickName, profile, roomManager, message, isReady }: IGameRoomUserProps) => {
  const [chatMessage, setChatMessage] = useState('');

  useEffect(() => {
    if (message) {
      setChatMessage(message);
      const timer = setTimeout(() => {
        setChatMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <S.GameRoomUserWrapper>
      {chatMessage ? <S.ChatDisplayBox>{chatMessage}</S.ChatDisplayBox> : <S.Blank />}
      <S.UserInfoBox>
        {roomManager ? <img src={crown} alt="room manager" /> : null}
        <S.UserImageWrapper>
          <S.UserImage src={profile || bazzi} alt="user" />
        </S.UserImageWrapper>
        <S.UserName>{nickName}</S.UserName>
        <S.Score>{String(100).padStart(4, '0')}점</S.Score>
      </S.UserInfoBox>
      <S.Ready>{isReady ? 'Ready' : null}</S.Ready>
    </S.GameRoomUserWrapper>
  );
};
