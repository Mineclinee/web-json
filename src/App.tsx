import React, { useEffect, useState } from 'react';
import { Person } from './types/Person';
import { Wiki } from './types/Wiki';
import personsData from './utils/personsData';

const App: React.FC = () => {
  const [data, setData] = useState<Person[]>([]);
  const [wikiData, setWikiData] = useState<Record<string, Wiki>>({});
  const [loading, setLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);
  const totalPersons = personsData.length;

  const fetchWikipediaData = async (name: string) => {
    const url = `https://ru.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&exintro&explaintext&generator=search&gsrsearch=intitle:${encodeURIComponent(
      name
    )}&gsrlimit=1&redirects=1&piprop=thumbnail&pithumbsize=350&pilimit=1&origin=*`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const pages = data.query?.pages;

      if (pages) {
        const pageKey = Object.keys(pages)[0];
        const pageData = pages[pageKey];

        return {
          title: pageData.title,
          extract: pageData.extract,
          imageUrl:
            pageData.thumbnail?.source ||
            'https://quickstraightteeth.net/wp-content/uploads/2020/09/avatar-placeholder.png',
        };
      }
    } catch (error) {
      console.error(`Error fetching data for ${name}:`, error);
    }

    return null;
  };

  useEffect(() => {
    setData(personsData);
    let count = 0;

    const loadWikiData = async () => {
      setLoading(true);
      const newWikiData: Record<string, Wiki> = {};
      for (const person of personsData) {
        const fetchedData = await fetchWikipediaData(person.fio);
        if (fetchedData) {
          newWikiData[person.fio] = fetchedData;
        }
        count++;
        setLoadingCount(count);
      }
      setWikiData(newWikiData);
      setLoading(false);
    };
    loadWikiData();
  }, []);

  const timeToSeconds = (time: string) => {
    const timeParts = time.split('.').map(Number);
    const minutes = timeParts[0];
    const seconds = timeParts.length > 1 ? timeParts[1] : 0;

    return minutes * 60 + seconds;
  };

  const createYouTubeLink = (videoId: string, startTime: string) => {
    const startSeconds = timeToSeconds(startTime);
    return `https://www.youtube.com/watch?v=${videoId}&t=${startSeconds}s`;
  };

  return (
    <>
      <section className="first bg flex-all-center hero">
        <div className="swiper-first hero__main">
          <div className="swiper-wrapper hero__wrapper">
            <div className="swiper-slide swiper-slide-active hero__slide">
              <img
                className="hero__img"
                src="https://cdn.culture.ru/images/4cd40749-8d88-5580-8384-fc78cdff6693"
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

      <section id="persons" className="second bg flex-all-center persons">
        {!loading && data.length > 0 ? (
          data.map((person) => (
            <div key={person.fio} className="second__container container grid">
              <div className="second__content">
                <span className="second__subtitle subtitle">
                  <a
                    href={person.wiki}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="#fff"
                    >
                      <path d="M24,4.656c0,0.087-0.027,0.165-0.08,0.236  c-0.055,0.07-0.112,0.106-0.177,0.106c-0.526,0.051-0.958,0.22-1.292,0.509c-0.336,0.287-0.68,0.838-1.036,1.649l-5.446,12.272  c-0.036,0.114-0.135,0.171-0.3,0.171c-0.129,0-0.228-0.057-0.3-0.171l-3.054-6.387l-3.512,6.387c-0.072,0.114-0.171,0.171-0.3,0.171  c-0.156,0-0.26-0.057-0.31-0.171L2.841,7.156C2.508,6.394,2.155,5.862,1.784,5.56C1.414,5.258,0.897,5.07,0.236,4.998  c-0.057,0-0.112-0.03-0.16-0.091C0.025,4.849,0,4.779,0,4.701c0-0.201,0.057-0.3,0.171-0.3c0.477,0,0.975,0.021,1.497,0.063  C2.151,4.509,2.607,4.53,3.033,4.53c0.435,0,0.948-0.021,1.539-0.065c0.618-0.042,1.167-0.063,1.644-0.063  c0.114,0,0.171,0.099,0.171,0.3c0,0.198-0.036,0.298-0.106,0.298C5.805,5.034,5.429,5.157,5.155,5.361  C4.88,5.568,4.743,5.839,4.743,6.174c0,0.171,0.057,0.384,0.171,0.64L9.336,16.8l2.51-4.741L9.507,7.156  c-0.42-0.874-0.766-1.44-1.036-1.693c-0.27-0.251-0.68-0.407-1.228-0.464c-0.051,0-0.097-0.03-0.144-0.091  c-0.046-0.059-0.07-0.129-0.07-0.207c0-0.201,0.049-0.3,0.15-0.3c0.477,0,0.914,0.021,1.313,0.063C8.876,4.509,9.285,4.53,9.72,4.53  c0.426,0,0.878-0.021,1.355-0.065c0.492-0.042,0.975-0.063,1.452-0.063c0.114,0,0.171,0.099,0.171,0.3  c0,0.198-0.034,0.298-0.106,0.298c-0.954,0.065-1.431,0.336-1.431,0.813c0,0.213,0.11,0.545,0.331,0.992l1.547,3.141l1.539-2.873  C14.793,6.666,14.9,6.324,14.9,6.045c0-0.654-0.477-1.003-1.431-1.047c-0.087,0-0.129-0.099-0.129-0.298  c0-0.072,0.021-0.139,0.063-0.203c0.044-0.065,0.087-0.097,0.129-0.097c0.342,0,0.762,0.021,1.26,0.063  c0.477,0.044,0.87,0.065,1.176,0.065c0.22,0,0.545-0.019,0.971-0.055c0.54-0.049,0.994-0.074,1.357-0.074  c0.084,0,0.127,0.084,0.127,0.255c0,0.228-0.078,0.342-0.234,0.342c-0.555,0.057-1.003,0.211-1.34,0.46  c-0.338,0.249-0.76,0.815-1.264,1.697l-2.052,3.793l2.778,5.659l4.101-9.537c0.141-0.348,0.213-0.669,0.213-0.96  c0-0.699-0.477-1.068-1.431-1.112c-0.087,0-0.129-0.099-0.129-0.298c0-0.201,0.063-0.3,0.192-0.3c0.348,0,0.762,0.021,1.239,0.063  c0.441,0.044,0.813,0.065,1.11,0.065c0.315,0,0.678-0.021,1.089-0.065c0.428-0.042,0.813-0.063,1.155-0.063  C23.949,4.401,24,4.485,24,4.656z" />
                    </svg>
                  </a>
                  <a
                    href={createYouTubeLink(person.jt, person.mn)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 24 24"
                      xmlSpace="preserve"
                      width="24"
                      height="24"
                      fill="#d90909"
                    >
                      <g id="XMLID_184_">
                        <path d="M23.498,6.186c-0.276-1.039-1.089-1.858-2.122-2.136C19.505,3.546,12,3.546,12,3.546s-7.505,0-9.377,0.504   C1.591,4.328,0.778,5.146,0.502,6.186C0,8.07,0,12,0,12s0,3.93,0.502,5.814c0.276,1.039,1.089,1.858,2.122,2.136   C4.495,20.454,12,20.454,12,20.454s7.505,0,9.377-0.504c1.032-0.278,1.845-1.096,2.122-2.136C24,15.93,24,12,24,12   S24,8.07,23.498,6.186z M9.546,15.569V8.431L15.818,12L9.546,15.569z" />
                      </g>
                    </svg>
                  </a>
                  {person.db} — {person.dd}
                </span>
                <h2 className="second__title title">{person.fio}</h2>
                <p className="second__text text">
                  {wikiData[person.fio]
                    ? wikiData[person.fio].extract
                    : 'Описание недоступно.'}
                </p>
              </div>
              <div className="second__slider-cards">
                {wikiData[person.fio] && wikiData[person.fio].imageUrl && (
                  <img
                    className="seconds__slider_cards-img"
                    src={wikiData[person.fio].imageUrl}
                    alt={person.fio}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="loader">
            <div className="loader__message">
              {loadingCount} / {totalPersons} загружено
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default App;
