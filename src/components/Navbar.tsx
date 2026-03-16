import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import './Navbar.css';

interface Props {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

export default function Navbar({ theme, onThemeToggle }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/about', label: t('nav.about') },
  ];

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          Okan<span className="navbar__logo-dot">.</span>
        </Link>

        <ul className="navbar__links">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`navbar__link ${location.pathname === to ? 'navbar__link--active' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar__controls">
          <LanguageSwitcher />
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>

        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="navbar__mobile"
        initial={false}
        animate={menuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ overflow: 'hidden' }}
      >
        <div className="navbar__mobile-inner">
          {links.map(({ to, label }, i) => (
            <motion.div
              key={to}
              initial={{ opacity: 0, x: -20 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
            >
              <Link
                to={to}
                className={`navbar__mobile-link ${location.pathname === to ? 'navbar__mobile-link--active' : ''}`}
              >
                {label}
              </Link>
            </motion.div>
          ))}
          <div className="navbar__mobile-controls">
            <LanguageSwitcher />
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
