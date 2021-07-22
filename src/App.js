import React from 'react';

import './App.css';
import Grid from '@material-ui/core/Grid';
import { Header, Footer } from './components/common';

const App = () => {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      {/* <Grid>
        21345678o9
      </Grid> */}
      <div className="grid-left_side"></div>
      <article>
        tyng8o9o.ngbf0[-]
      </article>
      <div className="grid-right_side"></div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
