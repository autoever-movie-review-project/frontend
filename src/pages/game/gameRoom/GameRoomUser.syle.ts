import styled from 'styled-components';

export const GameRoomUserWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 300px;
  border-radius: 10px;
  gap: 20px;
`;

export const ChatDisplayBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  width: 135px;
  height: 60px;
  padding: 0px 4px;
  background: #ffffff;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  word-break: keep-all;

  &::after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 10px 10px 0;
    border-color: #ffffff transparent;
    display: block;
    width: 0;
    z-index: 1;
    bottom: -10px;
    left: 57px;
  }
`;

export const UserInfoBox = styled.div`
  position: relative;
  width: 135px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  background: rgb(255, 255, 255, 0.1);
  padding: 10px 4px;
  box-sizing: border-box;
  box-shadow: 1px 3px 2px 2px rgb(0, 0, 0, 0.2);
`;

export const UserImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const UserImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

export const UserName = styled.span`
  color: #f2f2f2;
  font-size: 18px;
  margin-bottom: 12px;
`;

export const Score = styled.span`
  font-family: Galmuri11;
  font-size: 24px;
  color: #f2f2f2;
  letter-spacing: 2.2px;
`;
