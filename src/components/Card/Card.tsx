import { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { Wiki } from '../../types/Wiki';
import personsData from '../../utils/personsData';
import { createYouTubeLink } from '../../utils/youtubeLink';
import Loader from '../Loader/Loader';
import WikipediaIcon from '../SvgIcons/WikipediaIcon';
import YoutubeIcon from '../SvgIcons/YoutubeIcon';
import './Card.scss';

const Card: React.FC = () => {
  const [data, setData] = useState<Person[]>([]);
  const [wikiData, setWikiData] = useState<Record<string, Wiki>>({});
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
      const storedData = localStorage.getItem('wikiData');
      let newWikiData: Record<string, Wiki> = storedData
        ? JSON.parse(storedData)
        : {};

      if (Object.keys(newWikiData).length === personsData.length) {
        setWikiData(newWikiData);
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
    };

    loadWikiData();
  }, []);

  return (
    <section id="persons" className="bg card">
      {localStorage.getItem('wikiData') ? (
        data.map((person) => (
          <div className="container">
            <article key={person.fio} className="grid card__container">
              <div className="card__content">
                <p className="subtitle card__subtitle">
                  <a
                    href={person.wiki}
                    target="_blank"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <WikipediaIcon />
                  </a>
                  <a
                    href={createYouTubeLink(person.jt, person.mn)}
                    target="_blank"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <YoutubeIcon />
                  </a>
                  {person.db} — {person.dd}
                </p>
                <h2 className="title card__title">{person.fio}</h2>
                <p className="text card__text">
                  {wikiData[person.fio]
                    ? wikiData[person.fio].extract
                    : 'Описание недоступно.'}
                </p>
              </div>
              <div className="card__right">
                {wikiData[person.fio] && wikiData[person.fio].imageUrl && (
                  <img
                    className="card__img"
                    src={wikiData[person.fio].imageUrl}
                    alt={person.fio}
                  />
                )}
              </div>
            </article>
          </div>
        ))
      ) : (
        <Loader loadingCount={loadingCount} totalPersons={totalPersons} />
      )}
    </section>
  );
};

export default Card;
