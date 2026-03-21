import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import OkanLogo from './OkanLogo';
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

  // Trap focus when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" aria-label="Okan — Home">
          <OkanLogo size={44} className="navbar__logo-img" />
        </Link>

        <ul className="navbar__links" role="list">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`navbar__link ${location.pathname === to ? 'navbar__link--active' : ''}`}
                aria-current={location.pathname === to ? 'page' : undefined}
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
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        id="mobile-menu"
        className="navbar__mobile"
        initial={false}
        animate={menuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ overflow: 'hidden' }}
        aria-hidden={!menuOpen}
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
                aria-current={location.pathname === to ? 'page' : undefined}
                tabIndex={menuOpen ? 0 : -1}
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