import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Crate a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background:{
      default: '#e3e3e3',
      white: '#ffffff,'
    },
  },
  typography: {
    body1: {
      fontSize: 14,
    },
  },
});

export default theme;