import styled from 'styled-components';
//import { theme } from 'styles/theme';

export const ContentsContainer = styled.div`
  width: 100vm;
  height: 100%;
  background-color: black;
`;

export const VideoSliderWrapper = styled.div`
  background-color: black;
  margin-top: 60px;
  width: 100%;
  height: calc(100vm-80px);
  /* padding-top: 30px; */
  padding-bottom: 50px;
`;

export const Container = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
`;

export const BoxofficeSliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 40px;
  h1 {
    font-weight: bold;
    color: #ececec;
    font-size: 28px;
    margin-bottom: 30px;
  }
`;

export const MovieSwiperWrapper = styled.div`
  width: 100%;
  height: 100%;
  h1 {
    font-weight: bold;
    color: #ececec;
    font-size: 28px;
    margin-bottom: 15px;
  }
  padding-bottom: 60px;
`;

export const Footer = styled.footer`
  width: 100%;
  height: 200px;
  background-color: black;
`;
