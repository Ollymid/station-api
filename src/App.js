import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TrainTimes from './components/TrainTimes';
import LineStatus from './components/LineStatus';

function App() {
  return (
    <div>
      <Header />
      <LineStatus/>
      <TrainTimes />
      <Footer />
    </div>
  );
}

export default App;
