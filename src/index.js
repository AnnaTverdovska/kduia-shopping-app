// Modified 2026 by AnnaTverdovska. Original: IBM Skills Network shopping app template (Apache License 2.0).
import React from 'react';
import ReactDOM from 'react-dom/client';
// Fonts are served with the app (SIL Open Font License), not loaded from Google.
import '@fontsource-variable/archivo/wdth';
import '@fontsource-variable/martian-mono/wdth';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
