import './Hero.scss';

const Hero: React.FC = () => {
  return (
    <section className="bg flex-all-center hero">
      <div className="hero__main">
        <div className="hero__wrapper">
          <div className="hero__slide">
            <img
              className="hero__img"
              src="/Pushkin.jpg"
              alt="Александр Сергеевич Пушкин"
              aria-hidden={true}
            />
          </div>
        </div>
      </div>
      <div className="container hero__container">
        <h1 className="first__title title hero__title">
          Значимые имена и их след в истории
        </h1>
        <p className="first__subtitle subtitle hero__subtitle">
          Откройте для себя вдохновляющие истории выдающихся людей и их
          достижения.
        </p>
        <a className="first__link link hero__link" href="#persons">
          Перейти
        </a>
      </div>
    </section>
  );
};

export default Hero;
