import styled, { keyframes } from 'styled-components';
import { theme } from 'styles/theme';
import { calculateRankProgress } from 'util/rankutil';

const fillAnimation = keyframes<{ $progress: number }>`
  from {
    width: 0%;
  }
  to {
    width: ${(props) => props.$progress}%;
  }
`;

const shimmerAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${theme.colors.grayLight};
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Progress = styled.div<{ $progress: number }>`
  width: ${(props) => props.$progress}%;
  height: 100%;
  background: ${({ theme }) => `linear-gradient(
    90deg,
    ${theme.colors.primaryLight} 0%,
    ${theme.colors.primary} 50%,
    ${theme.colors.primaryDark} 100%
  )`};
  border-radius: 10px;
  transition: width 1s ease;
  animation: ${fillAnimation} 1s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: ${shimmerAnimation} 2s infinite;
  }
`;

const ProgressLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

const RankInfo = styled.p`
  color: ${theme.colors.text};
  font-size: 14px;
  margin: 0;
  padding: 5px 0;

  span {
    font-weight: bold;
    color: ${theme.colors.primary};
  }
`;

export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <ProgressBarContainer>
      <Progress $progress={progress} />
      <ProgressLabel>{progress}%</ProgressLabel>
    </ProgressBarContainer>
  );
};

// RankDisplay 컴포넌트도 약간 수정
const RankBar = styled.div`
  text-align: center;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  position: relative;
  padding: 15px;
  background: ${theme.colors.grayDark};
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

type RankDisplayProps = {
  points: number;
  nickname: string;
};

export const RankDisplay: React.FC<RankDisplayProps> = ({ points, nickname }) => {
  const { currentRank, nextRank, pointsToNextRank, progress } = calculateRankProgress(points);

  return (
    <RankBar>
      {nextRank ? (
        <RankInfo>
          다음 등급: <span>{nextRank}</span>
          <br />
          필요점수: <span>{pointsToNextRank} Point</span>
        </RankInfo>
      ) : (
        <RankInfo>
          <span>{nickname}</span> 님은 현재 최고 등급입니다!!
        </RankInfo>
      )}
      <ProgressBar progress={progress} />
    </RankBar>
  );
};
