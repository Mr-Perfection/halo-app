import React from 'react';
import { Provider } from 'urql';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

// src
import graphQLClient from 'graphql/client';
import Copyright from 'components/molecules/Copyright';
import AppRoutes from 'Routes';
import theme from './theme';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Provider value={graphQLClient}>
          <AppRoutes />
        </Provider>
        <Copyright />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
