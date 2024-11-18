import styled from 'styled-components';
import { theme } from 'styles/theme';
import EmptyHeart from 'assets/empty-heart.svg?react';

export const Container = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: 100%;
  margin: 0px calc(-50vw + 50%) 60px calc(-50vw + 50%);
`;

export const MovieInfoContainer = styled.div`
  width: 40%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  position: relative;
  z-index: 1;
`;

export const MovieInfoContainerSkeleton = styled(MovieInfoContainer)`
  margin-top: 80px;
  gap: 20px;
`;

export const getBackgroundImage = (backdropPath?: string) => {
  const baseUrl = 'https://image.tmdb.org/t/p/original';
  const gradient = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)';

  if (!backdropPath) return gradient;
  return `${gradient}, url(${baseUrl}${backdropPath})`;
};

export const MovieDetailWrapper = styled.div<{ $backdrop?: string }>`
  width: 100%;
  max-height: 90vh;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 10%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 100%;
    background-image: ${(props) => getBackgroundImage(props.$backdrop)};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(8px) brightness(0.4);
    z-index: -1;
  }

  z-index: 1;
`;

export const MovieTitle = styled.div`
  width: auto;
  height: 80px;
  display: flex;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
  color: #ececec;
  margin-bottom: 20px;
`;

export const MovieInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  color: #babac1;
  margin-bottom: 20px;
`;

export const AgeRating = styled.div`
  display: flex;
  padding: 0 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.grayDark};
  color: ${theme.colors.text};
  text-align: center;
  font-size: 15px;
`;

export const Division = styled.div`
  display: flex;
  width: 20px;
  height: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Rating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 10000px;
  gap: 5px;
  /* background-color: ${theme.colors.grayDark}; */
  font-size: 40px;
`;

export const Year = styled.div`
  width: 40px;
  display: flex;
  align-items: center;
`;

export const RunningTime = styled.div`
  width: auto;
  display: flex;
  align-items: center;
`;

export const Genre = styled.div`
  width: auto;
  display: flex;
  align-items: center;
`;

export const MoviePlot = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  color: #84868d;
  font-size: 15px;
  line-height: 20px;
  text-align: justify;
  text-justify: distribute;
`;

export const Star = styled.div`
  color: yellow;
  font-size: 35px;
`;

interface LikeButtonProps {
  $clicked: boolean;
}

export const Heart = styled(EmptyHeart)<LikeButtonProps>`
  path {
    fill: ${({ $clicked }) => ($clicked ? '#ff0000' : 'none')};
    stroke: ${({ $clicked }) => ($clicked ? '#ff0000' : 'white')};
    transition: 0.3s ease-in-out;
  }
  transition: all 0.3s ease;
`;

export const ReviewSection = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${theme.colors.text};
  margin: 0px 10px;
`;

export const ButtonBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: ${theme.colors.grayDark}; */
  /* border: 2px solid ${theme.colors.grayLight}; */
  border-radius: 100px;
  transition: 0.2s all;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

export const LikeButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  white-space: nowrap;
  font-size: ${theme.fontSize.lg};

  svg {
    width: 30px;
    height: 30px;
  }
`;

export const ReviewWriteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  svg {
    width: 30px;
    height: 30px;
  }
  white-space: nowrap;
  font-size: ${theme.fontSize.lg};
`;

export const RatingDistribution = styled.div`
  height: 300px;
  margin-top: 190px;
  color: ${theme.colors.text};
`;

export const CustomCursor = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  pointer-events: none;
  z-index: 100;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 8px;
  border-radius: 50%;
`;

export const MovieImageWrapper = styled.div`
  width: 270px;
  height: 390px;
  margin-top: 60px;
  margin-left: 30px;
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.3s ease;
  }

  &:hover {
    img {
      filter: brightness(0.7);
    }

    ${CustomCursor} {
      opacity: 1;
    }
  }
`;

export const MovieImageWrapperSkeleton = styled.div`
  margin-top: 70px;
`;

export const StyledHeadphones = styled.div`
  svg {
    width: 30px;
    height: 30px;
  }
`;
