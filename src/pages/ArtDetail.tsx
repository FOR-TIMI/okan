import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { artworks, getArtworkBySlug } from '../data/artworks';
import './ArtDetail.css';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function ArtDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language as 'ca_en' | 'ca_fr';
  const [imgLoaded, setImgLoaded] = useState(false);

  const artwork = getArtworkBySlug(slug || '');
  const currentIndex = artworks.findIndex((a) => a.slug === slug);
  const prev = currentIndex > 0 ? artworks[currentIndex - 1] : null;
  const next = currentIndex < artworks.length - 1 ? artworks[currentIndex + 1] : null;

  if (!artwork) {
    return (
      <div className="art-detail art-detail--not-found container">
        <h2>Work not found.</h2>
        <Link to="/gallery" className="art-detail__back">← {t('artwork.back')}</Link>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slug}
        className="art-detail"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="container">
          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Link to="/gallery" className="art-detail__back">
              ← {t('artwork.back')}
            </Link>
          </motion.div>

          <div className="art-detail__layout">
            {/* Image */}
            <motion.div
              className="art-detail__image-wrap"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            >
              <div className={`art-detail__img-placeholder ${imgLoaded ? 'art-detail__img-placeholder--hidden' : ''}`} />
              <img
                className={`art-detail__img ${imgLoaded ? 'art-detail__img--loaded' : ''}`}
                src={artwork.image}
                alt={artwork.title[lang]}
                decoding="async"
                onLoad={() => setImgLoaded(true)}
              />
            </motion.div>

            {/* Info */}
            <motion.div
              className="art-detail__info"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            >
              <span className="eyebrow">{artwork.artist}</span>
              <h1 className="art-detail__title">{artwork.title[lang]}</h1>

              <div className="art-detail__meta">
                <div className="art-detail__meta-row">
                  <span className="art-detail__meta-label">{t('artwork.year')}</span>
                  <span className="art-detail__meta-value">{artwork.year}</span>
                </div>
                <div className="art-detail__meta-row">
                  <span className="art-detail__meta-label">{t('artwork.medium')}</span>
                  <span className="art-detail__meta-value">{artwork.medium[lang]}</span>
                </div>
                <div className="art-detail__meta-row">
                  <span className="art-detail__meta-label">{t('artwork.dimensions')}</span>
                  <span className="art-detail__meta-value">{artwork.dimensions}</span>
                </div>
              </div>

              <div className="divider" />

              <div className="art-detail__desc-section">
                <span className="art-detail__desc-label">{t('artwork.description')}</span>
                <p className="art-detail__desc">{artwork.description[lang]}</p>
              </div>

              {/* Prev / Next */}
              <div className="art-detail__nav">
                {prev ? (
                  <button className="art-detail__nav-btn" onClick={() => navigate(`/art/${prev.slug}`)}>
                    <span className="art-detail__nav-arrow">←</span>
                    <span className="art-detail__nav-info">
                      <span className="art-detail__nav-dir">{t('artwork.prev')}</span>
                      <span className="art-detail__nav-name">{prev.title[lang]}</span>
                    </span>
                  </button>
                ) : <div />}
                {next ? (
                  <button className="art-detail__nav-btn art-detail__nav-btn--right" onClick={() => navigate(`/art/${next.slug}`)}>
                    <span className="art-detail__nav-info art-detail__nav-info--right">
                      <span className="art-detail__nav-dir">{t('artwork.next')}</span>
                      <span className="art-detail__nav-name">{next.title[lang]}</span>
                    </span>
                    <span className="art-detail__nav-arrow">→</span>
                  </button>
                ) : <div />}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
