import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Artwork, Locale } from '../data/artworks';
import { getLocaleTitle } from '../data/artworks';
import { galleryThumb } from '../utils/cloudinary';
import './ArtCard.css';

interface Props {
  artwork: Artwork;
  index?: number;
  priority?: boolean;
}

export default function ArtCard({ artwork, index = 0, priority = false }: Props) {
  const { i18n, t } = useTranslation();
  const locale = i18n.language as Locale;
  const [loaded, setLoaded] = useState(false);
  const title = getLocaleTitle(artwork, locale);
  const optimizedSrc = galleryThumb(artwork.image);

  return (
    <motion.article
      className="art-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        to={`/art/${artwork.slug}`}
        className="art-card__link"
        aria-label={`${t('artwork.viewWork')}: ${title}, ${artwork.year}`}
      >
        <div className="art-card__image-wrap">
          <div className={`art-card__skeleton ${loaded ? 'art-card__skeleton--hidden' : ''}`} aria-hidden="true" />
          <motion.img
            className={`art-card__img ${loaded ? 'art-card__img--loaded' : ''}`}
            src={optimizedSrc}
            alt={title}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setLoaded(true)}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <div className="art-card__overlay" aria-hidden="true">
            <span className="art-card__overlay-cta">{t('artwork.viewWork')} →</span>
          </div>
        </div>

        <div className="art-card__meta">
          <h3 className="art-card__title">{title}</h3>
          <span className="art-card__year">{artwork.year}</span>
        </div>
      </Link>
    </motion.article>
  );
}