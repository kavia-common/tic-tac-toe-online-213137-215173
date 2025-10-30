import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <main role="main" aria-label="Tic Tac Toe Game">
      <App />
    </main>
  </React.StrictMode>
);
