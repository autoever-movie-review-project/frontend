import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 60px;
  background-color: #000;
`;

export const HeaderLogo = styled.img`
  display: flex;
  align-items: center;
  width: 80px;
  height: 60px;
  cursor: pointer;
`;
