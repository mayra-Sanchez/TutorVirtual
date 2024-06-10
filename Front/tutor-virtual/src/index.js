// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/index';
import { LogginWrapper } from './Components/Context/LoginContext';
import './config/i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './config/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <LogginWrapper>
        <App />
      </LogginWrapper>
    </I18nextProvider>
  </React.StrictMode>
);
