import React from 'react';
import * as S from './Header.style';
import logo from 'assets/logo.jpg';

function Header() {
  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <S.HeaderLogo src={logo}></S.HeaderLogo>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
}

export default Header;
