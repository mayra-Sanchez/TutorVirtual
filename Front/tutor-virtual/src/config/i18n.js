// src/config/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './en-translation.json';
import frTranslation from './fr-translation.json';
import esTranslation from './es-translation.json';
import deTranslation from './de-translation.json';
import mdTranslation from './md-translation.json';
import hdTranslation from './hd-translation.json';
import ptTranslation from './pt-translation.json';
import rsTranslation from './rs-translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    fr: { translation: frTranslation },
    es: { translation: esTranslation },
    de: { translation: deTranslation },
    md: { translation: mdTranslation },
    hd: { translation: hdTranslation },
    pt: { translation: ptTranslation },
    rs: { translation: rsTranslation },
  },
  lng: localStorage.getItem('language') || 'es',
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;