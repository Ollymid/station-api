import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TrainTimes from './components/TrainTimes';

function App() {
  return (
    <div>
      <Header />
      <TrainTimes />
      <Footer />
    </div>
  );
}

export default App;
