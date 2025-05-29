import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Set a custom title
document.querySelector('title')?.setAttribute('data-default', 'SubsManager - Subscription Management Platform');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);