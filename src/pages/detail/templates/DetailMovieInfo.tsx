import styled from "styled-components";
import star from "assets/star.svg?react";
import like from "assets/redheart.svg";
import unlike from "assets/emptyheart.svg";
import kakaoshare from "assets/kakaoshare.svg";

import testimg from "assets/testimg.svg";
import { theme } from "styles/theme";

const MovieInfoContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 60px;
`;

const MovieDetailWrapper = styled.div`
  width: 100%;
`;

const MovieImageWrapper = styled.div`
  width: 550px;
  height: 300px;
  margin-top: 60px;
`;

const MovieTitle = styled.div`
  width: 200px;
  height: 60px;
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 10px;
  font-size: 40px;
  font-weight: bold;
  color: #ececec;
`;

const MovieInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  color: #babac1;
`;

const AgeRating = styled.div`
  display: flex;
  width: 40px;
  height: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #2e2f31;

  color: #ececec;
  text-align: center;
  font-size: 15px;
`;

const Division = styled.div`
  display: flex;
  width: 20px;
  height: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Rating = styled.div`
  width: 40px;
  img {
  }
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  color: #ececec;
  align-items: center;
`;

const Year = styled.div`
  width: 40px;
  display: flex;
  align-items: center;
`;

const RunningTime = styled.div`
  width: 70px;
  display: flex;
  align-items: center;
`;

const Genre = styled.div`
  width: 60px;
  display: flex;
  align-items: center;
`;

const MoviePlot = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  height: 80px;
  color: #84868d;
  font-size: 15px;
  line-height: 20px;
`;

const ButtonWrapper = styled.div`
  width: 500px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

const NormalButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const NormalButton = styled.button`
  border-radius: 5px;
  background: #5f5f5f;
  display: flex;
  width: 80px;
  height: 30px;
  justify-content: center;
  align-items: center;
  img {
    margin-right: 5px;
  }
  color: #ececec;
`;

const KaKaoButton = styled.button`
  display: flex;
  width: 140px;
  height: 30px;
  align-items: center;
  background: #fee500;
  border-radius: 5px;
`;

const Star = styled(star)`
  width: 18px;
  height: 18px;
  color: #fee500;
  fill: #fee500;
`;

function DetailMovieInfo() {
  return (
    <>
      <MovieDetailWrapper>
        <MovieInfoContainer>
          <MovieTitle>파일럿</MovieTitle> {/**/}
          <MovieInfoWrapper>
            <AgeRating>12</AgeRating>
            <Division>ㆍ</Division>
            <Rating>
              <Star />
              4.1
            </Rating>
            <Division>ㆍ</Division>
            <Year>2024</Year>
            <Division>ㆍ</Division>
            <RunningTime>1시간 51분</RunningTime>
            <Division>ㆍ</Division>
            <Genre>코미디</Genre>
          </MovieInfoWrapper>
          <MoviePlot>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo
            beatae iste tempora tempore, sit, eligendi eaque ullam facere error
            aliquam nostrum minus asperiores! Cum optio provident voluptate sed
            fugiat, temporibus est nam, qui tempora, quisquam quidem quibusdam
            minima amet deleniti.
          </MoviePlot>
        </MovieInfoContainer>
        <ButtonWrapper>
          <NormalButtonWrapper>
            <NormalButton>
              <img src={like} />
              3,452
            </NormalButton>
            <NormalButton>예매하기</NormalButton>
          </NormalButtonWrapper>
          <KaKaoButton>
            <img src={kakaoshare} />
          </KaKaoButton>
        </ButtonWrapper>
      </MovieDetailWrapper>
      <MovieImageWrapper>
        <img src={testimg} />
      </MovieImageWrapper>
    </>
  );
}

export default DetailMovieInfo;
