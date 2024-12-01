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
        <section id="persons" className="persons--single">
          <button
            className="card-slider__container btn"
            onClick={handleLoadAll}
          >
            Загрузить всех
          </button>
          <CardSlider onPersonSelect={handlePersonSelect} />
          {selectedPerson && <Card selectedPerson={selectedPerson} />}
        </section>
      )}
      {displayMode === 'all' && (
        <section id="persons" className="persons--all">
          <button
            className="card-slider__container btn"
            onClick={handleReturnToSelection}
          >
            Вернуться к выбору отдельной личности
          </button>
          <Card selectedPerson={null} />
        </section>
      )}
    </main>
  );
};

export default App;
