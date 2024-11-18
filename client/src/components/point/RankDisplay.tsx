import React from 'react';
import { ProgressBar } from './ProgressBar';
import { calculateRankProgress } from 'util/rankutil';
import styled from 'styled-components';

const RankBar = styled.div`
  text-align: center;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  position: relative;
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
        <p>
          다음 등급: {nextRank} (필요점수 : {pointsToNextRank} Point)
        </p>
      ) : (
        <p>{nickname} 님은 현재 최고 등급 입니다!!</p>
      )}
      <ProgressBar progress={progress} />
    </RankBar>
  );
};
