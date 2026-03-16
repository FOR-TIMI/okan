import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__logo">Okan<span className="footer__dot">.</span></span>
            <p className="footer__tagline">{t('footer.tagline')}</p>
          </div>
          <nav className="footer__nav">
            <Link to="/" className="footer__link">Home</Link>
            <Link to="/gallery" className="footer__link">{t('nav.gallery')}</Link>
            <Link to="/about" className="footer__link">{t('nav.about')}</Link>
          </nav>
        </div>
        <div className="divider" />
        <div className="footer__bottom">
          <span className="footer__copy">© {year} Okan. {t('footer.rights')}</span>
        </div>
      </div>
    </footer>
  );
}
