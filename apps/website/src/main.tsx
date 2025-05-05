import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';

// On app startup, set default Axios Authorization header if a token is stored
const stored = localStorage.getItem('warden');
if (stored) {
  try {
    const { token } = JSON.parse(stored);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } catch {
    // If parsing fails, ignore
  }
}

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
