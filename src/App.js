import React from 'react';

import './App.css';
import { Header, Footer } from './components/common';
import BarChart from './components/BarChart';

import SplitPane from 'react-split-pane';

const App = () => {
  return (
    <div className="App">
      <header>
        <Header />
      </header>

      {/* <div className="grid-left_side"></div>
      
      <div className="grid-right_side"></div> */}
      <SplitPane split="vertical" defaultSize={200} primary="second">
        <SplitPane split="horizontal" defaultSize={200} primary="second">
          <div > <h1> Bar Chart 1</h1>  <header className="App-header">
            <BarChart data={data} />
          </header></div>
          <div> <h1> Bar Chart 2</h1>
            <header className="App-header">
              <BarChart data={data} />
            </header>
          </div>
        </SplitPane>
        <div> <h1> Bar Chart 2</h1>
          <header className="App-header">
            <BarChart data={data} />
          </header>
        </div>
      </SplitPane>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
