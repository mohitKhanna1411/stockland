import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    display: 'grid',
    placeItems: 'center'
  },
  text: {
    padding: '0',
    margin: '0',
    color: 'white'
  }
}));

export default useStyles;
