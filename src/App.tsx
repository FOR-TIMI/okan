import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import './styles/global.css';

const Home = lazy(() => import('./pages/Home'));
const Gallery = lazy(() => import('./pages/Gallery'));
const ArtDetail = lazy(() => import('./pages/ArtDetail'));
const About = lazy(() => import('./pages/About'));

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

function PageFallback() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--accent)' }}
      >
        ·
      </motion.div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <Suspense fallback={<PageFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/art/:slug" element={<ArtDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <HashRouter>
      <div className="page-wrapper">
        <ScrollProgress />
        <Navbar theme={theme} onThemeToggle={toggle} />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
