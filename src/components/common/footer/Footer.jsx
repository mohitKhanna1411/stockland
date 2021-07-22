import React from 'react';

import useStyles from './styles';

const Footer = () => {
  const classes = useStyles();
  return (
    <section className={classes.footer}>
      <p className={classes.text}>Stockland © 2021</p>
      <p className={classes.text}>Made by Mohit with ❤️</p>
    </section>
  );
};

export default Footer;
