import styled from 'styled-components';
import { theme } from 'styles/theme';

export const ContentsWrapper = styled.div`
  width: 100vm;
  height: 100%;
  background-color: black;
`;

export const VideoSliderWrapper = styled.div`
  background-color: black;
  margin-top: 80px;
  width: 100%;
  height: calc(100vm-80px);
  /* padding-top: 30px; */
  padding-bottom: 50px;
`;

export const BoxofficeSliderWrapper = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

export const BoxofficeTitleWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
  h1 {
    font-weight: bold;
    color: #ececec;
    font-size: 28px;
  }
`;
