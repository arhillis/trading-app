import React from 'react';
import ReactDOM from 'react-dom/client';
import { StockProvider } from './stock-context';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StockProvider>
      <App />
    </StockProvider>    
  </React.StrictMode>
);
