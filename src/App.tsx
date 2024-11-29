import React from 'react';
import Card from './components/Card/Card';
import Hero from './components/Hero/Hero';
import CardSlider from './components/CardSlider/CardSlider';

const App: React.FC = () => {
  return (
    <main>
      <Hero />
      <CardSlider />
      <Card />
    </main>
  );
};

export default App;
