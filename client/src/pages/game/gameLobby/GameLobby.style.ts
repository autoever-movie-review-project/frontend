import styled from 'styled-components';

export const GameLobbyWrapper = styled.div<{ $bgImg: string }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  background: url(${({ $bgImg }) => $bgImg}) lightgray 0px 0px / 102.441% 100% no-repeat;
`;

export const GameLobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 78%;
  margin: auto;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.primaryLight};
`;

export const GameLobbyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

export const GameLobbyTitle = styled.img`
  display: flex;
  height: 80%;
`;

export const HeaderButtonWrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 5px;
`;

export const QuickJoinButton = styled.button`
  width: 277px;
  height: 73px;
  padding: 10px;
  flex-shrink: 0;
  flex-shrink: 0;
  border-radius: 10px;
  background: #ffd8e1;
  color: #303133;
  font-family: Galmuri11;
  font-size: 32px;
`;

export const MakeRoomButton = styled(QuickJoinButton)`
  width: 175px;
  height: 52px;
  font-size: 20px;
`;
