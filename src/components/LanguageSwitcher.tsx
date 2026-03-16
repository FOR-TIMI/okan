import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === 'ca_fr';

  const toggle = () => {
    const next = isFr ? 'ca_en' : 'ca_fr';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  return (
    <button className="lang-switcher" onClick={toggle} aria-label="Switch language">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i18n.language}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="lang-switcher__label"
        >
          {isFr ? 'FR' : 'EN'}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
