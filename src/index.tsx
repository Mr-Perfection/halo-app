import React from 'react';
import { Provider } from 'urql';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

// src
import graphQLClient from 'graphql/client';
import Copyright from 'molecules/Copyright';
import AppRoutes from 'Routes';
import theme from './theme';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <Provider value={graphQLClient}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <Copyright />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
