import darkScrollbar from '@mui/material/darkScrollbar';
import createTheme from '@mui/material/styles/createTheme';

const theme = createTheme({
  breakpoints: {
    // same as tailwind breakpoints
    values: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...darkScrollbar(),
          background: `linear-gradient(0deg, rgba(10, 10, 10, 0.2), rgba(10, 10, 10, 0.2)),
                       linear-gradient(131.55deg, #1B1B1B 0%, #14151F 88.91%)`,
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    text: { primary: '#FFFFFF4D' },
  },
  typography: {
    fontFamily: 'Quicksand, sans-serif',
  },
});
console.log(theme);

export default theme;
