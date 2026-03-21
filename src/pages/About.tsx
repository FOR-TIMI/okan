import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import OkanLogo from '../components/OkanLogo';
import './About.css';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="container">
        <div className="about-page__inner">


          <motion.div
            className="about-page__text"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            <span className="eyebrow">{t('about.eyebrow')}</span>
            <h1 className="about-page__name">{t('about.title')}</h1>

            <div className="about-page__body">
              <p>{t('about.body1')}</p>
              <p>{t('about.body2')}</p>
              <p>{t('about.body3')}</p>
            </div>
          </motion.div>

          <motion.div
            className="about-page__logo-wrap"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <OkanLogo size={500} className="about-page__logo" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}