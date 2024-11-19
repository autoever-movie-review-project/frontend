import { useEffect, useState } from 'react';
import * as S from './Timer.style';

interface ITimerProps {
  handleNextGame: () => void;
  gameRound: number;
}

export const Timer = ({ handleNextGame, gameRound }: ITimerProps) => {
  const [leftTime, setLeftTime] = useState(20);

  useEffect(() => {
    if (leftTime === 0) {
      if (gameRound <= 3) {
        handleNextGame();
      }
      // TODO: 모달창 열기
      return;
    }

    const timer = setInterval(() => {
      setLeftTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [leftTime]);

  useEffect(() => {
    setLeftTime(20);
  }, [gameRound]);

  return (
    <S.LeftTimeBar key={gameRound}>
      <S.LeftTimeSecondsDisplay>{leftTime || null}</S.LeftTimeSecondsDisplay>
    </S.LeftTimeBar>
  );
};
