import React from 'react';
import { FreeMode, Navigation, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import personsData from '../../utils/personsData';

import 'swiper/swiper-bundle.css';
import './CardSlider.scss';

type CardSliderProps = {
  onPersonSelect: (personName: string) => void;
};

const CardSlider: React.FC<CardSliderProps> = ({ onPersonSelect }) => {
  const handlePersonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const text = e.currentTarget.querySelector('.card-slider__text');

    if (text) {
      const personName = text.innerHTML;
      onPersonSelect(personName);
    }
  };

  const sortedPersonsData = [...personsData].sort((a, b) =>
    a.fio.localeCompare(b.fio)
  );

  return (
    <Swiper
      modules={[FreeMode, Navigation, Scrollbar]}
      navigation
      height={500}
      slidesPerView={5}
      slidesPerGroup={5}
      a11y={{
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
      }}
      spaceBetween={70}
      scrollbar={{
        hide: false,
        draggable: true,
        enabled: true,
      }}
      className="card-slider"
      breakpoints={{
        300: {
          slidesPerView: 'auto',
          slidesPerGroup: 1,
          scrollbar: {
            hide: true,
          },
          centeredSlides: true,
        },
        600: {
          slidesPerView: 2,
          spaceBetween: 2,
          slidesPerGroup: 2,
        },
        1100: {
          slidesPerView: 3,

          slidesPerGroup: 3,
        },
        1500: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
      }}
    >
      {sortedPersonsData.map((person) => (
        <SwiperSlide key={person.fio}>
          <div className="card-slider__container" onClick={handlePersonClick}>
            <p className="card-slider__text">{person.fio}</p>
            <span className="card-slider__prof">{person.prof}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CardSlider;
