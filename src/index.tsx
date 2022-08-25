import React from 'react';
import { Provider } from 'urql';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

// src
import { Signup } from 'pages/Auth';
import Login from 'pages/Auth/Login';
import graphQLClient from 'graphql/client';
import Copyright from 'molecules/Copyright';
import App from './App';
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
          <Routes>
            {/* TODO: Based on permissions, render root page to operator or dashboard. */}
            <Route path="/" element={<App />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <Copyright />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
