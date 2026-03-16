import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { artworks } from '../data/artworks';
import './Gallery.css';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function Gallery() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'ca_en' | 'ca_fr';
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return artworks;
    const q = query.toLowerCase();
    return artworks.filter(
      (a) =>
        a.title[lang].toLowerCase().includes(q) ||
        a.artist.toLowerCase().includes(q) ||
        a.medium[lang].toLowerCase().includes(q) ||
        String(a.year).includes(q)
    );
  }, [query, lang]);

  return (
    <div className="gallery-page">
      <div className="container">
        {/* Header */}
        <div className="gallery-page__header">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {t('gallery.eyebrow')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            {t('gallery.title')}
          </motion.h1>
        </div>

        {/* Search */}
        <motion.div
          className="gallery-page__search-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
        >
          <input
            className="gallery-page__search"
            type="search"
            placeholder={t('gallery.search')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t('gallery.search')}
          />
          <svg className="gallery-page__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </motion.div>

        {/* Column headers */}
        <motion.div
          className="gallery-page__cols"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <span>{t('gallery.columns.title')}</span>
          <span>{t('gallery.columns.year')}</span>
          <span className="gallery-page__col-medium">{t('gallery.columns.medium')}</span>
        </motion.div>

        <div className="divider" />

        {/* Rows */}
        {filtered.length === 0 ? (
          <motion.p
            className="gallery-page__empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {t('gallery.noResults')}
          </motion.p>
        ) : (
          <ul className="gallery-page__list">
            {filtered.map((artwork, i) => (
              <motion.li
                key={artwork.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.06, ease: EASE }}
              >
                <Link to={`/art/${artwork.slug}`} className="gallery-page__row">
                  <div className="gallery-page__row-left">
                    <div className="gallery-page__thumb-wrap">
                      <img
                        className="gallery-page__thumb"
                        src={artwork.image}
                        alt={artwork.title[lang]}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="gallery-page__row-info">
                      <span className="gallery-page__row-title">{artwork.title[lang]}</span>
                      <span className="gallery-page__row-artist">{artwork.artist}</span>
                    </div>
                  </div>
                  <span className="gallery-page__row-year">{artwork.year}</span>
                  <span className="gallery-page__row-medium gallery-page__col-medium">
                    {artwork.medium[lang]}
                  </span>
                  <span className="gallery-page__row-arrow">→</span>
                </Link>
                <div className="divider" />
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
