import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider } from 'urql';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

// src
import Routes from 'routes';
import theme from 'theme';
import graphQLClient from 'graphql/client';
import Copyright from 'components/molecules/Copyright';
import { store } from 'app/store';

// src

function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Provider value={graphQLClient}>
            <Routes />
          </Provider>
          <Copyright />
        </ThemeProvider>
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default App;
