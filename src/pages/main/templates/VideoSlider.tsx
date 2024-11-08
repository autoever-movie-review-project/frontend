import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

function VideoSlider() {
  return (
    <Swiper
      centeredSlides={true} // 가운데 정렬
      slidesPerView={1} // 한 슬라이드에 보여줄 갯수
      spaceBetween={0} // 슬라이드 간 거리
      loop={true} // 슬라이드 반복 여부
      autoplay={{ delay: 5000 }} // 자동 슬라이드 시간
      navigation // 이동 화살표
      pagination={{
        clickable: true,
      }} // pager 여부
      modules={[Pagination, Navigation, Autoplay]} // Swiper 모듈 적용
      style={{ width: '100%', height: 'calc(100vh - 80px)' }}
    >
      <SwiperSlide style={{ height: '100%' }}>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/lQ2FIaPGVKY?loop=1&mute=1&autoplay=1"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </SwiperSlide>
      <SwiperSlide style={{ height: '100%' }}>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/lQ2FIaPGVKY?loop=1&mute=1&autoplay=1"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </SwiperSlide>
      <SwiperSlide style={{ height: '100%' }}>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/lQ2FIaPGVKY?loop=1&mute=1&autoplay=1"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </SwiperSlide>
    </Swiper>
  );
}

export default VideoSlider;
