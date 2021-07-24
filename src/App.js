import React, { useEffect, useState } from 'react';

import './App.css';
import { Header, Footer } from './components/common';
import jsonData from './data/data.json'
import { BarChart, StackedBarChart, PieChart, AreaChart, LineChart } from './components/charts';
import { findOcc, sanitizeData, transformStackedData, findConditionalOcc, topN } from './utils/helpers';

const App = () => {
  const [barChartDataBU, setBarChartDataBU] = useState([]);
  const [barChartDataPT, setBarChartDataPT] = useState([]);
  const [barChartDataCT, setBarChartDataCT] = useState([]);
  const [barChartDataR, setBarChartDataR] = useState([]);
  const [barChartDataS, setBarChartDataS] = useState([]);
  const [barChartDataCl, setBarChartDataCl] = useState([]);

  const [barChartDataPositive, setBarChartDataPositive] = useState([]);
  const [barChartDataNegative, setBarChartDataNegative] = useState([]);

  const [stackedBarChartDataCT, setStackedBarChartDataCT] = useState([]);
  const [stackedBarChartDataBU, setStackedBarChartDataBU] = useState([]);
  const [stackedBarChartDataPT, setStackedBarChartDataPT] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [areaChartData, setAreaChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);

  useEffect(() => {
    const data = sanitizeData(jsonData)
    setStackedBarChartDataCT(transformStackedData(data, 'Classification Type', 'Sentiment'))
    setStackedBarChartDataBU(transformStackedData(data, 'Business Unit', 'Sentiment'))
    setStackedBarChartDataPT(transformStackedData(data, 'Post Type', 'Sentiment'))

    // console.log(transformStackedData(data, 'Sentiment', 'Topic'))
    setBarChartDataPositive(topN(findConditionalOcc(data, 'Topic', 'Sentiment', 'Positive'), 5))
    setBarChartDataNegative(topN(findConditionalOcc(data, 'Topic', 'Sentiment', 'Negative'), 5))

    console.log(findOcc(data, 'Topic'))
    setBarChartDataBU(findOcc(data, 'Business Unit'))
    setBarChartDataPT(findOcc(data, 'Post Type'))
    setBarChartDataCT(findOcc(data, 'Case Type'))
    setBarChartDataR(findOcc(data, 'Region'))
    setBarChartDataS(findOcc(data, 'Sentiment'))
    setBarChartDataCl(findOcc(data, 'Classification Type'))
    setPieChartData(findOcc(data, 'Sentiment'))
    setAreaChartData(transformStackedData(data, 'Published Date', 'Business Unit'))
    setLineChartData(findOcc(data, 'Published Date'))

  }, [])
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <div><h1>Sentiment Occurences</h1><BarChart data={barChartDataS} xKey={'Sentiment'} yKey={'occurrence'} /></div>
      <div><h1>Post Volume by Sentiment</h1><PieChart data={pieChartData} /></div>

      <div><h1>Social Sentiment by Classification Type</h1><StackedBarChart data={stackedBarChartDataCT} mainKey={'Classification Type'} /></div>
      <div><h1>Social Sentiment by Business Unit</h1><StackedBarChart data={stackedBarChartDataBU} mainKey={'Business Unit'} /></div>
      <div><h1>Post Type by Sentiment</h1><StackedBarChart data={stackedBarChartDataPT} mainKey={'Post Type'} /></div>

      <div><h1>Top 5 Topics Among Positive Sentiment</h1><BarChart data={barChartDataPositive} xKey={'Topic'} yKey={'occurrence'} /></div>
      <div><h1>Top 5 Topics Among Negative Sentiment</h1><BarChart data={barChartDataNegative} xKey={'Topic'} yKey={'occurrence'} /></div>



      <div><h1>Posts everyday - 2021</h1><LineChart data={lineChartData} /></div>




      <div><h1>Business Unit Occurences</h1><BarChart data={barChartDataBU} xKey={'Business Unit'} yKey={'occurrence'} /></div>
      <div><h1>Post type Occurences</h1><BarChart data={barChartDataPT} xKey={'Post Type'} yKey={'occurrence'} /></div>
      <div><h1>Case type Occurences</h1><BarChart data={barChartDataCT} xKey={'Case Type'} yKey={'occurrence'} /></div>
      <div><h1>Region Occurences</h1><BarChart data={barChartDataR} xKey={'Region'} yKey={'occurrence'} /></div>
      <div><h1>Classification Type Occurences</h1><BarChart data={barChartDataCl} xKey={'Classification Type'} yKey={'occurrence'} /></div>
      <div><h1>Area Chart</h1><AreaChart data={areaChartData} /></div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
