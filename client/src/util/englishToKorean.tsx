// rankToKorean.ts
export const rankToKorean = (rank: string) => {
  switch (rank) {
    case 'Master':
      return '마스터';
    case 'Diamond':
      return '다이아몬드';
    case 'Gold':
      return '골드';
    case 'Silver':
      return '실버';
    default:
      return '브론즈';
  }
};
