import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { artworks, getLocaleTitle } from '../data/artworks';
import type { Locale } from '../data/artworks';
import ArtCard from '../components/ArtCard';
import './Gallery.css';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

type SortKey = 'titleAsc' | 'titleDesc' | 'yearAsc' | 'yearDesc';

// Pre-build a normalized index for locale-independent fields once at module load.
// This avoids repeated toLowerCase() calls on every keystroke.
const SEARCH_INDEX = artworks.map((a) => ({
  id: a.id,
  static: [a.titleOriginal, String(a.year), a.medium, a.size].join('\n').toLowerCase(),
}));

function useDebounce(value: string, delay = 250): string {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function Gallery() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;
  const [sortKey, setSortKey] = useState<SortKey>('yearDesc');
  const [query, setQuery] = useState('');

  // Debounce: input stays snappy; filter/sort only fires after user pauses typing
  const debouncedQuery = useDebounce(query);

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    // 1. Filter using pre-built index for static fields + runtime locale title
    const filtered = q
      ? artworks.filter((a, i) =>
          SEARCH_INDEX[i].static.includes(q) ||
          getLocaleTitle(a, locale).toLowerCase().includes(q)
        )
      : [...artworks];

    // 2. Sort filtered results
    switch (sortKey) {
      case 'titleAsc':
        return filtered.sort((a, b) =>
          getLocaleTitle(a, locale).localeCompare(getLocaleTitle(b, locale))
        );
      case 'titleDesc':
        return filtered.sort((a, b) =>
          getLocaleTitle(b, locale).localeCompare(getLocaleTitle(a, locale))
        );
      case 'yearAsc':
        return filtered.sort((a, b) => a.year - b.year);
      case 'yearDesc':
        return filtered.sort((a, b) => b.year - a.year);
      default:
        return filtered;
    }
  }, [debouncedQuery, sortKey, locale]);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(e.target.value as SortKey);
  }, []);

  return (
    <div className="gallery-page">
      <div className="container">
        {/* ─── Header ─────────────────────────────── */}
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

        {/* ─── Toolbar: Search + Sort on one line ──── */}
        <motion.div
          className="gallery-page__toolbar"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
        >
          <div className="gallery-page__search-wrap">
            <svg className="gallery-page__search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="gallery-page__search"
              type="search"
              placeholder={t('gallery.search')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={t('gallery.search')}
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                className="gallery-page__search-clear"
                onClick={() => setQuery('')}
                aria-label={t('gallery.searchClear')}
              >
                ×
              </button>
            )}
          </div>

          <div className="gallery-page__controls">
            <label className="gallery-page__sort-label" htmlFor="gallery-sort">
              {t('gallery.sortBy')}
            </label>
            <div className="gallery-page__select-wrap">
              <select
                id="gallery-sort"
                className="gallery-page__select"
                value={sortKey}
                onChange={handleSortChange}
                aria-label={t('gallery.sortBy')}
              >
                <option value="yearDesc">{t('gallery.sortOptions.yearDesc')}</option>
                <option value="yearAsc">{t('gallery.sortOptions.yearAsc')}</option>
                <option value="titleAsc">{t('gallery.sortOptions.titleAsc')}</option>
                <option value="titleDesc">{t('gallery.sortOptions.titleDesc')}</option>
              </select>
              <svg className="gallery-page__select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </motion.div>

        <div className="divider" />

        {/* ─── Grid ───────────────────────────────── */}
        {results.length === 0 ? (
          <motion.p className="gallery-page__empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {t('gallery.noResults')}
          </motion.p>
        ) : (
          <motion.ul
            className="gallery-page__grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
            role="list"
          >
            {results.map((artwork, i) => (
              <li key={artwork.id} role="listitem">
                <ArtCard artwork={artwork} index={i} priority={i < 3} />
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </div>
  );
}