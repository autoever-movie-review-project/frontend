import * as S from './Game.style';
import bgImg from 'assets/gamebg.png';
import gametitle from 'assets/gametitle.svg';
import { GameRoomList } from './GameRoomList';

export const Game = () => {
  return (
    <S.GameWrapper $bgImg={bgImg}>
      <S.GameContainer>
        <S.GameHeader>
          <S.GameTitle src={gametitle} />
          <S.HeaderButtonWrapper>
            <S.QuickJoinButton>빠른입장</S.QuickJoinButton>
            <S.MakeRoomButton>방만들기</S.MakeRoomButton>
          </S.HeaderButtonWrapper>
        </S.GameHeader>

        <GameRoomList />
      </S.GameContainer>
    </S.GameWrapper>
  );
};
