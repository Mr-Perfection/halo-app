import React from 'react';
import { createRoot } from 'react-dom/client';
// src
import App from 'app/App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
