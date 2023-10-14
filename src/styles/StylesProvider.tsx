import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { FC, PropsWithChildren } from 'react';
import theme from './theme';

const StylesProvider: FC<PropsWithChildren> = ({ children }) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </StyledEngineProvider>
);

export default StylesProvider;
