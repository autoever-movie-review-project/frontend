import { useEffect, useState } from 'react';
import * as S from './Timer.style';

export const Timer = () => {
  const [leftTime, setLeftTime] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setLeftTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <S.LeftTimeBar>
      <S.LeftTimeSecondsDisplay>{leftTime || null}</S.LeftTimeSecondsDisplay>
    </S.LeftTimeBar>
  );
};
