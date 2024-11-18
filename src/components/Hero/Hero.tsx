const Hero: React.FC = () => {
  return (
    <section className="first bg flex-all-center hero">
      <div className="swiper-first hero__main">
        <div className="swiper-wrapper hero__wrapper">
          <div className="swiper-slide swiper-slide-active hero__slide">
            <img
              className="hero__img"
              src="/Pushkin.jpg"
              alt="team squad before the start"
            />
          </div>
        </div>
      </div>
      <div className="first__container container hero__container">
        <h2 className="first__title title hero__title">
          Значимые имена и их след в истории
        </h2>
        <span className="first__subtitle subtitle hero__subtitle">
          Откройте для себя вдохновляющие истории выдающихся людей и их
          достижения.
        </span>
        <a className="first__link link hiro__link" href="#persons">
          Перейти
        </a>
      </div>
    </section>
  );
};

export default Hero;
