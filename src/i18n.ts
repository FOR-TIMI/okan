import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import caEn from './locales/ca_en.json';
import caFr from './locales/ca_fr.json';

const savedLang = localStorage.getItem('lang') || 'ca_en';

i18n.use(initReactI18next).init({
  resources: {
    ca_en: { translation: caEn },
    ca_fr: { translation: caFr },
  },
  lng: savedLang,
  fallbackLng: 'ca_en',
  interpolation: { escapeValue: false },
});

export default i18n;
