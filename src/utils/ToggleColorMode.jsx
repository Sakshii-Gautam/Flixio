import { createTheme, ThemeProvider } from '@mui/material';
import React, { createContext, useMemo, useState } from 'react';

export const ColorModeContext = createContext();

const ToggleColorMode = ({ children }) => {
  const [mode, setMode] = useState('dark');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
            xs_sm: 400,
            sm_md: 700,
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
