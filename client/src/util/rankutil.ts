import { RANKS } from 'types/rank';

export const calculateRankProgress = (points: number) => {
  const currentRank = RANKS.find(
    (rank, index) => points >= rank.minPoints && (index === RANKS.length - 1 || points < RANKS[index + 1].minPoints)
  );

  const nextRank = RANKS.find((rank) => points < rank.minPoints);

  const currentRankMinPoints = currentRank ? currentRank.minPoints : 0;
  const nextRankMinPoints = nextRank ? nextRank.minPoints : currentRankMinPoints;

  // 진행률 계산 후 소수점 처리
  const progress =
    nextRankMinPoints - currentRankMinPoints > 0
      ? Number((((points - currentRankMinPoints) / (nextRankMinPoints - currentRankMinPoints)) * 100).toFixed(1))
      : 100;

  return {
    currentRank: currentRank?.name || 'Bronze',
    nextRank: nextRank?.name || null,
    pointsToNextRank: nextRank ? nextRankMinPoints - points : 0,
    progress: Math.min(progress, 100),
  };
};
