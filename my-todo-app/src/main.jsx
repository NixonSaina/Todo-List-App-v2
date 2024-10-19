import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Render the React app into the DOM, as usual
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
