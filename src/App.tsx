// import React, { useState } from 'react';
// import Card from './components/Card/Card';
// import CardSlider from './components/CardSlider/CardSlider';
// import Hero from './components/Hero/Hero';

// const App: React.FC = () => {
//   const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

//   const handlePersonSelect = (personName: string) => {
//     setSelectedPerson(personName);
//   };

//   return (
//     <main>
//       <Hero />
//       <CardSlider onPersonSelect={handlePersonSelect} />
//       <Card selectedPerson={selectedPerson} />
//     </main>
//   );
// };

// export default App;

import React, { useState } from 'react';
import Card from './components/Card/Card';
import CardSlider from './components/CardSlider/CardSlider';
import Hero from './components/Hero/Hero';

const App: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<'single' | 'all'>('single');

  const handlePersonSelect = (personName: string) => {
    setSelectedPerson(personName);
  };

  const handleLoadAll = () => {
    setDisplayMode('all');
    setSelectedPerson(null);
  };

  const handleReturnToSelection = () => {
    setDisplayMode('single');
    setSelectedPerson(null);
  };

  return (
    <main>
      <Hero />
      {displayMode === 'single' && (
        <>
          <CardSlider onPersonSelect={handlePersonSelect} />
          <button onClick={handleLoadAll}>Загрузить всех</button>
          {selectedPerson && <Card selectedPerson={selectedPerson} />}
        </>
      )}
      {displayMode === 'all' && (
        <>
          <button onClick={handleReturnToSelection}>
            Вернуться к выбору отдельной
          </button>
          <Card selectedPerson={null} />
        </>
      )}
    </main>
  );
};

export default App;
