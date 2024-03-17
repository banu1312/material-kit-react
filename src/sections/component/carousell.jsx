/* eslint-disable import/no-extraneous-dependencies */
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Scrollbar, Navigation, Pagination } from 'swiper/modules';

export default function Carousell(){
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      <SwiperSlide style={{ maxHeight:500 }}>
        <img src="assets/background/dumy.jpg" alt="a" className='object-cover object-center !w-full' style={{ maxHeight:500 }}/>
      </SwiperSlide>
      <SwiperSlide style={{ maxHeight:500 }}>
        <img src="assets/background/dumy.jpg" alt="b" className='object-cover object-center !w-full' style={{ maxHeight:500 }}/>
      </SwiperSlide>
      <SwiperSlide style={{ maxHeight:500 }}>
        <img src="assets/background/dumy.jpg" alt="c" className='object-cover object-center !w-full' style={{ maxHeight:500 }}/>
      </SwiperSlide>
      <SwiperSlide style={{ maxHeight:500 }}>
        <img src="assets/background/dumy.jpg" alt="d" className='object-cover object-center !w-full' style={{ maxHeight:500 }}/>
      </SwiperSlide>
    </Swiper>
  );
};
