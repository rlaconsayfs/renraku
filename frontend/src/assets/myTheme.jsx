import { createTheme } from '@mui/material';

const myTheme = createTheme({
  palette: {
    primary: {
      main: '#cac0b9',
    },
    secondary: {
      main: '#d8d0cb',
    },
    accent:{
      main: '#7a685c',
      contrastText: '#ffffff',
    },
    background: {
      main: '#e9e5e2',
    }
  },
  typography: {
    fontFamily: [
      'Quicksand',
      'sans-serif',
    ].join(','),
  }
});

export default myTheme;