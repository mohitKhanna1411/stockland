import React, { useEffect } from 'react';

import './App.css';
import { Header, Footer } from './components/common';
import data from './data/data.json'
import { BarChart } from './components/charts';

const App = () => {

  useEffect(() => {
    console.log(data)
  }, [])
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <div><h1>Business Unit Occurences</h1><BarChart data={data} /></div>


      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
