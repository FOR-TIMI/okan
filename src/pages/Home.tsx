import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ArtCard from '../components/ArtCard';
import { getFeaturedArtworks } from '../data/artworks';
import './Home.css';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const wordVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const charVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

function AnimatedTitle({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <motion.h1
      className="hero__title"
      variants={wordVariants}
      initial="hidden"
      animate="visible"
    >
      {lines.map((line, li) => (
        <span key={li} className="hero__title-line">
          {line.split(' ').map((word, wi) => (
            <motion.span key={wi} variants={charVariants} className="hero__title-word">
              {word}
            </motion.span>
          ))}
          {li < lines.length - 1 && <br />}
        </span>
      ))}
    </motion.h1>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const featured = getFeaturedArtworks();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="home">
      {/* ─── HERO ──────────────────────────────────── */}
      <section className="hero" ref={heroRef}>
        <motion.div className="hero__bg-wrap" style={{ y: heroY }}>
          <div className="hero__bg" />
        </motion.div>

        <motion.div className="hero__content container" style={{ opacity: heroOpacity }}>
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            {t('hero.eyebrow')}
          </motion.span>

          <AnimatedTitle text={t('hero.title')} />

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
          >
            <Link to="/gallery" className="hero__cta">
              {t('hero.cta')}
              <span className="hero__cta-arrow">↗</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.div
            className="hero__scroll-line"
            animate={{ scaleY: [1, 0, 1], originY: 0 }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          />
          <span>{t('hero.scroll')}</span>
        </motion.div>
      </section>

      {/* ─── FEATURED ──────────────────────────────── */}
      <section className="section featured">
        <div className="container">
          <div className="featured__header">
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {t('featured.eyebrow')}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              {t('featured.title')}
            </motion.h2>
          </div>

          <div className="featured__grid">
            {featured.map((artwork, i) => (
              <ArtCard key={artwork.id} artwork={artwork} index={i} />
            ))}
          </div>

          <motion.div
            className="featured__footer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Link to="/gallery" className="btn-outline">
              {t('featured.viewAll')} →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
