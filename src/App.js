import React, { useEffect } from 'react';

import './App.css';
import { Header, Footer } from './components/common';
import data from './data/data.json'
import { BarChart } from './components/charts';
// import * as d3 from 'd3'
import SplitPane from 'react-split-pane';

const App = () => {

  // const [loading, setLoading] = React.useState(true);

  // d3.json("https://sob7yipykh.execute-api.ap-southeast-2.amazonaws.com/data-insights-sample-data").then((d) => {
  //   setLoading(false);
  // });
  // return () => undefined;
  useEffect(() => {
    console.log(data)
  }, [])
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <div className="grid-left_side"></div>
      <article>
        {/* <SplitPane split="vertical" defaultSize={200} primary="second">
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
        </SplitPane> */}
        <BarChart data={data} />
      </article>
      <div className="grid-right_side"></div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
