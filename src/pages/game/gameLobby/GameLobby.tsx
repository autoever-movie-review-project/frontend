import * as S from './GameLobby.style';
import bgImg from 'assets/gamebg.png';
import gametitle from 'assets/gametitle.svg';
import { GameRoomList } from './GameRoomList';

export const GameLobby = () => {
  return (
    <S.GameLobbyWrapper $bgImg={bgImg}>
      <S.GameLobbyContainer>
        <S.GameLobbyHeader>
          <S.GameLobbyTitle src={gametitle} />
          <S.HeaderButtonWrapper>
            <S.QuickJoinButton>빠른입장</S.QuickJoinButton>
            <S.MakeRoomButton>방만들기</S.MakeRoomButton>
          </S.HeaderButtonWrapper>
        </S.GameLobbyHeader>

        <GameRoomList />
      </S.GameLobbyContainer>
    </S.GameLobbyWrapper>
  );
};
