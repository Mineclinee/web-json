import React, { useState } from 'react';
import Card from './components/Card/Card';
import CardSlider from './components/CardSlider/CardSlider';
import Hero from './components/Hero/Hero';

const App: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const handlePersonSelect = (personName: string) => {
    setSelectedPerson(personName);
  };

  return (
    <main>
      <Hero />
      <CardSlider onPersonSelect={handlePersonSelect} />
      <Card selectedPerson={selectedPerson} />
    </main>
  );
};

export default App;
