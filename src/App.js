import React, { useEffect, useState } from 'react';

import './App.css';
import { Header, Footer } from './components/common';
import jsonData from './data/data.json'
import { BarChart, StackedBarChart } from './components/charts';
import { findOcc, uniqueKeyValues, sanitizeData, transformStackedData } from './utils/helpers';

const App = () => {
  // const [data, setData] = useState(jsonData);
  const [barChartDataBU, setBarChartDataBU] = useState([]);
  const [barChartDataPT, setBarChartDataPT] = useState([]);
  const [barChartDataCT, setBarChartDataCT] = useState([]);
  const [barChartDataR, setBarChartDataR] = useState([]);
  const [barChartDataS, setBarChartDataS] = useState([]);
  const [barChartDataCl, setBarChartDataCl] = useState([]);
  const [stackedBarChartData, setStackedBarChartData] = useState([]);
  // const [data, setData] = useState([]);

  useEffect(() => {
    const data = sanitizeData(jsonData)
    setBarChartDataBU(findOcc(data, 'Business Unit'))
    setBarChartDataPT(findOcc(data, 'Post Type'))
    setBarChartDataCT(findOcc(data, 'Case Type'))
    setBarChartDataR(findOcc(data, 'Region'))
    setBarChartDataS(findOcc(data, 'Sentiment'))
    setBarChartDataCl(findOcc(data, 'Classification Type'))
    setStackedBarChartData(transformStackedData(data, uniqueKeyValues(data, 'Business Unit'), uniqueKeyValues(data, 'Sentiment'), 'Sentiment'));
    // console.log(stackedBarChartData)
    // console.log(barChartDataCl)

  }, [])
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <div><h1>Business Unit Occurences</h1><BarChart data={barChartDataBU} xKey={'Business Unit'} yKey={'occurrence'} /></div>
      <div><h1>Post type Occurences</h1><BarChart data={barChartDataPT} xKey={'Post Type'} yKey={'occurrence'} /></div>
      <div><h1>Case type Occurences</h1><BarChart data={barChartDataCT} xKey={'Case Type'} yKey={'occurrence'} /></div>
      <div><h1>Region Occurences</h1><BarChart data={barChartDataR} xKey={'Region'} yKey={'occurrence'} /></div>
      <div><h1>Sentiment Occurences</h1><BarChart data={barChartDataS} xKey={'Sentiment'} yKey={'occurrence'} /></div>
      <div><h1>Classification Type Occurences</h1><BarChart data={barChartDataCl} xKey={'Classification Type'} yKey={'occurrence'} /></div>
      <div><h1>Stacked Bar Chart</h1><StackedBarChart data={stackedBarChartData} /></div>


      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
