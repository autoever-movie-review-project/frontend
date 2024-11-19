export type RankType = '마스터' | '다이아' | '골드' | '실버' | '브론즈';

export const RANKS = [
  { name: '브론즈', minPoints: 0 },
  { name: '실버', minPoints: 1000 },
  { name: '골드', minPoints: 2000 },
  { name: '다이아', minPoints: 4000 },
  { name: '마스터', minPoints: 7000 },
];

export interface RankData {
  rankName: string;
  rankImg: string;
  points: number;
  rankPercent: number;
}
