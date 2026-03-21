import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  artworks,
  getArtworkBySlug,
  getLocaleTitle,
  getOriginalTitleIfDistinct,
} from '../data/artworks';
import type { Locale } from '../data/artworks';
import { detailImage } from '../utils/cloudinary';
import './ArtDetail.css';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function ArtDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const locale = i18n.language as Locale;
  const [imgLoaded, setImgLoaded] = useState(false);

  const artwork = getArtworkBySlug(slug ?? '');
  const currentIndex = artworks.findIndex((a) => a.slug === slug);
  const prev = currentIndex > 0 ? artworks[currentIndex - 1] : null;
  const next = currentIndex < artworks.length - 1 ? artworks[currentIndex + 1] : null;

  // Keyboard navigation
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && prev) navigate(`/art/${prev.slug}`);
      if (e.key === 'ArrowRight' && next) navigate(`/art/${next.slug}`);
    },
    [prev, next, navigate]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  // Reset image load state on slug change
  useEffect(() => {
    setImgLoaded(false);
  }, [slug]);

  if (!artwork) {
    return (
      <div className="art-detail art-detail--not-found container">
        <h2>Work not found.</h2>
        <Link to="/gallery" className="art-detail__back">← {t('artwork.back')}</Link>
      </div>
    );
  }

  const title = getLocaleTitle(artwork, locale);
  const originalTitle = getOriginalTitleIfDistinct(artwork, locale);
  const optimizedSrc = detailImage(artwork.image);

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
          {/* ─── Back link ────────────────────────── */}
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
            {/* ─── Image ────────────────────────── */}
            <motion.div
              className="art-detail__image-wrap"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            >
              <div
                className={`art-detail__img-placeholder ${imgLoaded ? 'art-detail__img-placeholder--hidden' : ''}`}
                aria-hidden="true"
              />
              <img
                className={`art-detail__img ${imgLoaded ? 'art-detail__img--loaded' : ''}`}
                src={optimizedSrc}
                alt={title}
                decoding="async"
                onLoad={() => setImgLoaded(true)}
              />
            </motion.div>

            {/* ─── Info ──────────────────────────── */}
            <motion.div
              className="art-detail__info"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            >
              {/* Title */}
              <div className="art-detail__title-block">
                <h1 className="art-detail__title">{title}</h1>
                {originalTitle && (
                  <p className="art-detail__original-title">
                    <span className="art-detail__original-label">{t('artwork.originalTitle')}</span>
                    <em>{originalTitle}</em>
                  </p>
                )}
              </div>

              <div className="divider" />

              {/* Metadata */}
              <dl className="art-detail__meta">
                <div className="art-detail__meta-row">
                  <dt className="art-detail__meta-label">{t('artwork.year')}</dt>
                  <dd className="art-detail__meta-value">{artwork.year}</dd>
                </div>
                <div className="art-detail__meta-row">
                  <dt className="art-detail__meta-label">{t('artwork.medium')}</dt>
                  <dd className="art-detail__meta-value">{artwork.medium}</dd>
                </div>
                <div className="art-detail__meta-row">
                  <dt className="art-detail__meta-label">{t('artwork.size')}</dt>
                  <dd className="art-detail__meta-value">{artwork.size}</dd>
                </div>
              </dl>

              <div className="divider" />

              {/* Prev / Next navigation */}
              <nav className="art-detail__nav" aria-label="Artwork navigation">
                {prev ? (
                  <button
                    className="art-detail__nav-btn"
                    onClick={() => navigate(`/art/${prev.slug}`)}
                    aria-label={`${t('artwork.prev')}: ${getLocaleTitle(prev, locale)}`}
                  >
                    <span className="art-detail__nav-arrow" aria-hidden="true">←</span>
                    <span className="art-detail__nav-info">
                      <span className="art-detail__nav-dir">{t('artwork.prev')}</span>
                      <span className="art-detail__nav-name">{getLocaleTitle(prev, locale)}</span>
                    </span>
                  </button>
                ) : <div />}
                {next ? (
                  <button
                    className="art-detail__nav-btn art-detail__nav-btn--right"
                    onClick={() => navigate(`/art/${next.slug}`)}
                    aria-label={`${t('artwork.next')}: ${getLocaleTitle(next, locale)}`}
                  >
                    <span className="art-detail__nav-info art-detail__nav-info--right">
                      <span className="art-detail__nav-dir">{t('artwork.next')}</span>
                      <span className="art-detail__nav-name">{getLocaleTitle(next, locale)}</span>
                    </span>
                    <span className="art-detail__nav-arrow" aria-hidden="true">→</span>
                  </button>
                ) : <div />}
              </nav>

              {/* Keyboard hint */}
              <p className="art-detail__keyboard-hint" aria-hidden="true">
                ← → to navigate
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}