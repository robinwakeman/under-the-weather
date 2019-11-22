import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Crate a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: red.A400,
    },
    background:{
      default: '#fff',
      white: '#ffffff,'
    },
  },
  typography: {
    body1: {
      fontSize: 14,
    },
  },
  overrides: {
    MuiFab: {
      root: {
        position: 'fixed',
        bottom: '4rem',
        right: '20%'
      }
    }
  }
});

export default theme;