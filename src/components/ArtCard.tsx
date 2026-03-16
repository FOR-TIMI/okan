import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Artwork } from '../data/artworks';
import './ArtCard.css';

interface Props {
  artwork: Artwork;
  index?: number;
}

export default function ArtCard({ artwork, index = 0 }: Props) {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'ca_en' | 'ca_fr';
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.article
      className="art-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link to={`/art/${artwork.slug}`} className="art-card__link">
        <div className="art-card__image-wrap">
          <div className={`art-card__blur ${loaded ? 'art-card__blur--hidden' : ''}`} />
          <motion.img
            className="art-card__img"
            src={artwork.image}
            alt={artwork.title[lang]}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <div className="art-card__overlay">
            <span className="art-card__overlay-text">View work →</span>
          </div>
        </div>

        <div className="art-card__meta">
          <h3 className="art-card__title">
            {artwork.title[lang]}
            <span className="art-card__title-line" />
          </h3>
          <div className="art-card__sub">
            <span>{artwork.artist}</span>
            <span className="art-card__year">{artwork.year}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
