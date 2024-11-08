import styled from 'styled-components';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import temp from 'assets/temp.svg';

const SlideContent = styled.div`
  display: flex;
  width: 100%;
  height: 240px;
  background: black;
  align-items: flex-end;
  position: relative; /* Position 설정을 통해 자식 요소의 절대 위치 지정 가능 */
`;

const Image = styled.img`
  width: 180px;
  height: 240px;
  object-fit: cover;
`;

const Ranking = styled.div`
  width: 100%;
  height: 240px;
  color: #ffffffbf;
  font-size: 80px;
  display: flex;
  align-items: end;
  justify-content: end;
  border-radius: 5px;
  font-weight: 900;
  letter-spacing: -5px;
`;

function BoxofficeSlider() {
  return (
    <Swiper
      centeredSlides={true}
      slidesPerView={6} // 슬라이드 개수 조정
      spaceBetween={0} // 슬라이드 간 거리
      loop={true}
      autoplay={{ delay: 5000 }}
      navigation
      modules={[Pagination, Navigation, Autoplay]}
      style={{ width: '100%', height: '300px' }}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <SwiperSlide key={i}>
          <SlideContent>
            <Ranking>{i + 1}</Ranking>
            <Image src={temp} alt={`${i + 1}번 사진`} />
          </SlideContent>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default BoxofficeSlider;

//TODO : 슬라이드 반복하지 않기
