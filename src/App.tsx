import React, { useEffect, useState } from 'react';
import Hero from './components/Hero/Hero';
import Loader from './components/Loader/Loader';
import WikipediaIcon from './components/SvgIcons/WikipediaIcon';
import YoutubeIcon from './components/SvgIcons/YoutubeIcon';
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
      const storedData = localStorage.getItem('wikiData');
      let newWikiData: Record<string, Wiki> = storedData
        ? JSON.parse(storedData)
        : {};

      if (Object.keys(newWikiData).length === personsData.length) {
        setWikiData(newWikiData);
        setLoading(false);
        return;
      }

      for (const person of personsData) {
        if (!newWikiData[person.fio]) {
          const fetchedData = await fetchWikipediaData(person.fio);
          if (fetchedData) {
            newWikiData[person.fio] = fetchedData;
          }
        }
        count++;
        setLoadingCount(count);
      }

      setWikiData(newWikiData);
      localStorage.setItem('wikiData', JSON.stringify(newWikiData));
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
      <Hero />

      <section id="persons" className="second bg flex-all-center persons">
        {localStorage.getItem('wikiData') ? (
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
                    <WikipediaIcon />
                  </a>
                  <a
                    href={createYouTubeLink(person.jt, person.mn)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <YoutubeIcon />
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
          <Loader loadingCount={loadingCount} totalPersons={totalPersons} />
        )}
      </section>
    </>
  );
};

export default App;
