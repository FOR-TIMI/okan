import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCA from './locales/en-CA.json';
import frCA from './locales/fr-CA.json';

const savedLang = localStorage.getItem('lang') || 'en-CA';

i18n.use(initReactI18next).init({
  resources: {
    'en-CA': { translation: enCA },
    'fr-CA': { translation: frCA },
  },
  lng: savedLang,
  fallbackLng: 'en-CA',
  interpolation: { escapeValue: false },
});

export default i18n;