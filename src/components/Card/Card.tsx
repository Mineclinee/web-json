// import React, { useEffect, useState } from 'react';
// import { Person } from '../../types/Person';
// import { Wiki } from '../../types/Wiki';
// import personsData from '../../utils/personsData';
// import { createYouTubeLink } from '../../utils/youtubeLink';
// import Loader from '../Loader/Loader';
// import SortByProfession from '../SortingsByProfession/SortByProfession';
// import WikipediaIcon from '../SvgIcons/WikipediaIcon';
// import YoutubeIcon from '../SvgIcons/YoutubeIcon';
// import './Card.scss';

// type CardProps = {
//   selectedPerson: string | null;
// };

// const Card: React.FC<CardProps> = ({ selectedPerson }) => {
//   const [data, setData] = useState<Person[]>([]);
//   const [wikiData, setWikiData] = useState<Record<string, Wiki>>({});
//   const [loadingCount, setLoadingCount] = useState<number>(0);
//   const [selectedProfession, setSelectedProfession] = useState<string>('');
//   const totalPersons = personsData.length;

//   const professions = [
//     ...new Set(personsData.map((person) => person.prof.trim())),
//   ].sort((a, b) => a.localeCompare(b));

//   useEffect(() => {
//     const savedProfession = localStorage.getItem('selectedProfession');
//     if (savedProfession) {
//       setSelectedProfession(savedProfession);
//     }
//     setData(personsData);
//   }, []);

//   const handleProfessionChange = (profession: string) => {
//     setSelectedProfession(profession);

//     if (profession) {
//       localStorage.setItem('selectedProfession', profession);
//     } else {
//       localStorage.removeItem('selectedProfession');
//     }
//   };

//   const fetchWikipediaData = async (name: string) => {
//     const url = `https://ru.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&exintro&explaintext&generator=search&gsrsearch=intitle:${encodeURIComponent(
//       name
//     )}&gsrlimit=1&redirects=1&piprop=thumbnail&pithumbsize=350&pilimit=1&origin=*`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       const pages = data.query?.pages;

//       if (pages) {
//         const pageKey = Object.keys(pages)[0];
//         const pageData = pages[pageKey];

//         return {
//           title: pageData.title,
//           extract: pageData.extract,
//           imageUrl:
//             pageData.thumbnail?.source ||
//             'https://quickstraightteeth.net/wp-content/uploads/2020/09/avatar-placeholder.png',
//         };
//       }
//     } catch (error) {
//       console.error(`Error fetching data for ${name}:`, error);
//     }

//     return null;
//   };

//   useEffect(() => {
//     setData(personsData);
//     let count = 0;

//     const loadWikiData = async () => {
//       const storedData = localStorage.getItem('wikiData');
//       let newWikiData: Record<string, Wiki> = storedData
//         ? JSON.parse(storedData)
//         : {};

//       if (Object.keys(newWikiData).length === personsData.length) {
//         setWikiData(newWikiData);
//         return;
//       }

//       for (const person of personsData) {
//         if (!newWikiData[person.fio]) {
//           const fetchedData = await fetchWikipediaData(person.fio);
//           if (fetchedData) {
//             newWikiData[person.fio] = fetchedData;
//           }
//         }
//         count++;
//         setLoadingCount(count);
//       }

//       setWikiData(newWikiData);
//       localStorage.setItem('wikiData', JSON.stringify(newWikiData));
//     };

//     loadWikiData();
//   }, []);

//   const filteredData = selectedProfession
//     ? data.filter((person) => person.prof === selectedProfession)
//     : data;

//   const selectedPersonData = selectedPerson
//     ? data.find((person) => person.fio === selectedPerson)
//     : null;

//   return (
//     <section id="persons" className="card">
//       <div className="container">
//         {localStorage.getItem('wikiData') && !selectedPersonData && (
//           <SortByProfession
//             professions={professions}
//             onChange={handleProfessionChange}
//             selectedProfession={selectedProfession}
//           />
//         )}
//         <ul className="cards">
//           {localStorage.getItem('wikiData') ? (
//             selectedPersonData ? (
//               <li className="grid card__container" key={selectedPersonData.fio}>
//                 <div className="card__content">
//                   <div className="subtitle card__subtitle">
//                     <div className="card__links">
//                       <a
//                         className="card__link"
//                         href={selectedPersonData.wiki}
//                         target="_blank"
//                         rel="noreferrer"
//                       >
//                         <WikipediaIcon />
//                       </a>
//                       <a
//                         className="card__link"
//                         href={createYouTubeLink(
//                           selectedPersonData.jt,
//                           selectedPersonData.mn
//                         )}
//                         target="_blank"
//                         rel="noreferrer"
//                       >
//                         <YoutubeIcon />
//                       </a>
//                     </div>
//                     <p>
//                       {selectedPersonData.db} — {selectedPersonData.dd}
//                     </p>
//                   </div>
//                   <h2 className="title card__title">
//                     {selectedPersonData.fio}
//                   </h2>
//                   <p className="text card__text">
//                     {wikiData[selectedPersonData.fio]
//                       ? wikiData[selectedPersonData.fio].extract
//                       : 'Описание недоступно.'}
//                   </p>
//                 </div>
//                 <div className="card__right">
//                   {wikiData[selectedPersonData.fio] &&
//                     wikiData[selectedPersonData.fio].imageUrl && (
//                       <img
//                         className="card__img"
//                         src={wikiData[selectedPersonData.fio].imageUrl}
//                         alt={selectedPersonData.fio}
//                       />
//                     )}
//                 </div>
//               </li>
//             ) : (
//               filteredData.map((person) => (
//                 <li className="grid card__container" key={person.fio}>
//                   <div className="card__content">
//                     <div className="subtitle card__subtitle">
//                       <div className="card__links">
//                         <a
//                           className="card__link"
//                           href={person.wiki}
//                           target="_blank"
//                           rel="noreferrer"
//                         >
//                           <WikipediaIcon />
//                         </a>
//                         <a
//                           className="card__link"
//                           href={createYouTubeLink(person.jt, person.mn)}
//                           target="_blank"
//                           rel="noreferrer"
//                         >
//                           <YoutubeIcon />
//                         </a>
//                       </div>
//                       <p>
//                         {person.db} — {person.dd}
//                       </p>
//                     </div>
//                     <h2 className="title card__title">{person.fio}</h2>
//                     <p className="text card__text">
//                       {wikiData[person.fio]
//                         ? wikiData[person.fio].extract
//                         : 'Описание недоступно.'}
//                     </p>
//                   </div>
//                   <div className="card__right">
//                     {wikiData[person.fio] && wikiData[person.fio].imageUrl && (
//                       <img
//                         className="card__img"
//                         src={wikiData[person.fio].imageUrl}
//                         alt={person.fio}
//                       />
//                     )}
//                   </div>
//                 </li>
//               ))
//             )
//           ) : (
//             <Loader loadingCount={loadingCount} totalPersons={totalPersons} />
//           )}
//         </ul>
//       </div>
//     </section>
//   );
// };

// export default Card;

import React, { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { Wiki } from '../../types/Wiki';
import personsData from '../../utils/personsData';
import { createYouTubeLink } from '../../utils/youtubeLink';
import Loader from '../Loader/Loader';
import SortByProfession from '../SortingsByProfession/SortByProfession';
import WikipediaIcon from '../SvgIcons/WikipediaIcon';
import YoutubeIcon from '../SvgIcons/YoutubeIcon';
import './Card.scss';

interface CardProps {
  selectedPerson: string | null;
}

const Card: React.FC<CardProps> = ({ selectedPerson }) => {
  const [data, setData] = useState<Person[]>([]);
  const [wikiData, setWikiData] = useState<Record<string, Wiki>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCount, setLoadingCount] = useState<number>(0);
  const [selectedProfession, setSelectedProfession] = useState<string>('');
  const [totalPersons, setTotalPersons] = useState<number>(personsData.length);

  const professions = [
    ...new Set(personsData.map((person) => person.prof.trim())),
  ].sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    const savedProfession = localStorage.getItem('selectedProfession');
    if (savedProfession) {
      setSelectedProfession(savedProfession);
    }
    setData(personsData);
  }, []);

  const handleProfessionChange = (profession: string) => {
    setSelectedProfession(profession);

    if (profession) {
      localStorage.setItem('selectedProfession', profession);
    } else {
      localStorage.removeItem('selectedProfession');
    }
  };

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
    const loadWikiData = async () => {
      setLoading(true);
      setLoadingCount(0);
      const storedData = localStorage.getItem('wikiData');
      let newWikiData: Record<string, Wiki> = storedData
        ? JSON.parse(storedData)
        : {};

      if (selectedPerson) {
        if (!newWikiData[selectedPerson]) {
          const fetchedData = await fetchWikipediaData(selectedPerson);
          if (fetchedData) {
            newWikiData[selectedPerson] = fetchedData;
            setLoadingCount(1);
          }
        }
        setTotalPersons(1);
      } else {
        for (const person of personsData) {
          if (!newWikiData[person.fio]) {
            const fetchedData = await fetchWikipediaData(person.fio);
            if (fetchedData) {
              newWikiData[person.fio] = fetchedData;
            }
          }
          setLoadingCount((prevCount) => prevCount + 1);
        }
        setTotalPersons(personsData.length);
      }

      setWikiData(newWikiData);
      localStorage.setItem('wikiData', JSON.stringify(newWikiData));
      setLoading(false);
    };

    loadWikiData();
  }, [selectedPerson]);

  const filteredData = selectedProfession
    ? data.filter((person) => person.prof === selectedProfession)
    : data;

  const selectedPersonData = selectedPerson
    ? data.find((person) => person.fio === selectedPerson)
    : null;

  return (
    <section id="persons" className="card">
      <div className="container">
        {localStorage.getItem('wikiData') &&
          !selectedPersonData &&
          !loading && (
            <SortByProfession
              professions={professions}
              onChange={handleProfessionChange}
              selectedProfession={selectedProfession}
            />
          )}
        <ul className="cards">
          {loading ? (
            <Loader loadingCount={loadingCount} totalPersons={totalPersons} />
          ) : selectedPersonData ? (
            <li className="grid card__container" key={selectedPersonData.fio}>
              <div className="card__content">
                <div className="subtitle card__subtitle">
                  <div className="card__links">
                    <a
                      className="card__link"
                      href={selectedPersonData.wiki}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <WikipediaIcon />
                    </a>
                    <a
                      className="card__link"
                      href={createYouTubeLink(
                        selectedPersonData.jt,
                        selectedPersonData.mn
                      )}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <YoutubeIcon />
                    </a>
                  </div>
                  <p>
                    {selectedPersonData.db} — {selectedPersonData.dd}
                  </p>
                </div>
                <h2 className="title card__title">{selectedPersonData.fio}</h2>
                <p className="text card__text">
                  {wikiData[selectedPersonData.fio]
                    ? wikiData[selectedPersonData.fio].extract
                    : 'Описание недоступно.'}
                </p>
              </div>
              <div className="card__right">
                {wikiData[selectedPersonData.fio] &&
                  wikiData[selectedPersonData.fio].imageUrl && (
                    <img
                      className="card__img"
                      src={wikiData[selectedPersonData.fio].imageUrl}
                      alt={selectedPersonData.fio}
                    />
                  )}
              </div>
            </li>
          ) : (
            filteredData.map((person) => (
              <li className="grid card__container" key={person.fio}>
                <div className="card__content">
                  <div className="subtitle card__subtitle">
                    <div className="card__links">
                      <a
                        className="card__link"
                        href={person.wiki}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <WikipediaIcon />
                      </a>
                      <a
                        className="card__link"
                        href={createYouTubeLink(person.jt, person.mn)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <YoutubeIcon />
                      </a>
                    </div>
                    <p>
                      {person.db} — {person.dd}
                    </p>
                  </div>
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
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
};

export default Card;
