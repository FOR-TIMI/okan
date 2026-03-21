import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LucideYoutube, LucideInstagram, LucideMail } from 'lucide-react';
import TikTokIcon from './TikTokIcon';
import './Footer.css';

const SOCIALS = [
  {
    href: 'https://www.instagram.com/okannnnnnnnnnnnnnnnnnnnnnnnnn',
    label: 'Instagram',
    icon: <LucideInstagram size={18} strokeWidth={1.5} />,
  },
  {
    href: 'https://www.youtube.com/@Seeokan',
    label: 'YouTube',
    icon: <LucideYoutube size={18} strokeWidth={1.5} />,
  },
  {
    href: 'https://www.tiktok.com/@okanarchive',
    label: 'TikTok',
    icon: <TikTokIcon size={18} />,
  },
  {
    href: 'mailto:letscontactfye@gmail.com',
    label: 'Email',
    icon: <LucideMail size={18} strokeWidth={1.5} />,
  },
];

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const navLinks = [
    { to: '/',        label: t('nav.home') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/about',   label: t('nav.about') },
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner container">

        {/* ── Top row: wordmark + socials ── */}
        <div className="footer__top">
          <span className="footer__wordmark">Okan</span>

          <div className="footer__socials" aria-label="Social links">
            {SOCIALS.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                className="footer__social-link"
                aria-label={label}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="footer__divider" aria-hidden="true" />

        {/* ── Bottom row: nav + copyright ── */}
        <div className="footer__bottom">
          <nav className="footer__nav" aria-label="Footer navigation">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className="footer__link">
                {label}
              </Link>
            ))}
          </nav>

          <span className="footer__copy">
            © {year} Okan. {t('footer.rights')}
          </span>
        </div>

      </div>
    </footer>
  );
}