import { FreeMode, Navigation, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import personsData from '../../utils/personsData';

import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/scrollbar';
import './CardSlider.scss';

const CardSlider: React.FC = () => {
  return (
    <Swiper
      modules={[FreeMode, Navigation, Scrollbar]}
      centeredSlides
      navigation
      height={300}
      slidesPerView={2}
      a11y={{
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
      }}
      spaceBetween={100}
      scrollbar={{
        hide: false,
        draggable: true,
        enabled: true,
      }}
      className="card-slider"
    >
      {personsData.map((person) => (
        <SwiperSlide>
          <div className="card-slider__container">
            <p className="card-slider__text">{person.fio}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CardSlider;
