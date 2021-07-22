import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontSize: '50px',
    fontFamily: 'SpaceGrotesk',
    fontWeight: 'bold'
  },
  logo: {
    height: '50px'
  },
  navBar: {
    maxHeight: '70px'
  }
}));

export default useStyles;
