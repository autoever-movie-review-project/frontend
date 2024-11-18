import styled, { css } from 'styled-components';

export const GameRoomListWrapper = styled.div`
  display: grid;
  flex-grow: 1;
  grid-template-columns: 1fr 1fr;
  align-content: start;
  gap: 10px;
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

export const GameRoomButton = styled.button`
  display: flex;
  width: 100%;
  height: 100px;
  padding: 10px;
  margin: 0;
  border: none;
  border-radius: 5px;
  gap: 12px;
`;

export const ButtonImageWrapper = styled.div`
  background: lightgrey;
  padding: 10px;
  border-radius: 10px;
`;

export const ButtonImage = styled.img`
  aspect-ratio: 1 / 1;
  width: 60px;
`;

export const ButtonContentWarpper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  gap: 10px;
`;

export const ButtonTitleWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const RoomNumber = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

export const RoomTitle = styled.span`
  font-size: 18px;
`;

export const RoomStatusWapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RoomStatus = styled.span<{ $isPlaying: boolean }>`
  font-family: Galmuri11;
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(180deg, #00ff04 0%, #20703a 87.5%, #000 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  ${({ $isPlaying }) =>
    $isPlaying &&
    css`
      background: linear-gradient(180deg, #fe5489 0%, #872d49 94.74%);
    `}

  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const RoomHeadCount = styled.span`
  font-family: Galmuri11;
  font-size: 16px;
`;
