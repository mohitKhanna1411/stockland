import React from 'react';

import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import useStyles from './styles';

/**
 * Header template from Material UI
 * https://material-ui.com/components/app-bar/#app-bar
 * @returns
 */
const Header = () => {
  const classes = useStyles();

  return (
    <section>
      <AppBar position="static">
        <Toolbar className={classes.navBar}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Stockland Charts
          </Typography>
        </Toolbar>
      </AppBar>
    </section>
  );
};

export default Header;
