import React, { useEffect, useState } from 'react';
import Card from './components/Card/Card';
import CardSlider from './components/CardSlider/CardSlider';
import Hero from './components/Hero/Hero';

const App: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<'single' | 'all'>('single');

  useEffect(() => {
    const savedPerson = localStorage.getItem('selectedPerson');
    const savedMode = localStorage.getItem('displayMode');

    if (savedPerson) {
      setSelectedPerson(savedPerson);
    }

    if (savedMode) {
      setDisplayMode(savedMode as 'single' | 'all');
    }
  }, []);

  const handlePersonSelect = (personName: string) => {
    setSelectedPerson(personName);
    setDisplayMode('single');
    localStorage.setItem('selectedPerson', personName);
    localStorage.setItem('displayMode', 'single');
  };

  const handleLoadAll = () => {
    setDisplayMode('all');
    setSelectedPerson(null);
    localStorage.removeItem('selectedPerson');
    localStorage.setItem('displayMode', 'all');
  };

  const handleReturnToSelection = () => {
    setDisplayMode('single');
    setSelectedPerson(null);
    localStorage.removeItem('selectedPerson');
    localStorage.setItem('displayMode', 'single');
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
