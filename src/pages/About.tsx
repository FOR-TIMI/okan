import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './About.css';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="container">
        <div className="about-page__layout">
          {/* Text */}
          <div className="about-page__text">
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {t('about.eyebrow')}
            </motion.span>

            <motion.h1
              className="about-page__title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              {t('about.title')}
            </motion.h1>

            {[t('about.body1'), t('about.body2'), t('about.body3')].map((para, i) => (
              <motion.p
                key={i}
                className="about-page__para"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.12, ease: EASE }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Visual accent */}
          <motion.div
            className="about-page__visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
          >
            <div className="about-page__sigil">
              <span>O</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
