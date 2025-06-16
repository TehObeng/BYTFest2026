
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Page } from './types'; // Import Page type
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion

import Navbar from './Navbar'; // Import Navbar
import HomePage from './pages/HomePage'; // Import HomePage
import AboutPage from './pages/AboutPage'; // Import AboutPage
import QnaPage from './pages/QnaPage'; // Import QnaPage
import SchedulePage from './pages/SchedulePage'; // Import SchedulePage
import SponsorsPage from './pages/SponsorsPage'; // Import SponsorsPage
import ContactPage from './pages/ContactPage'; // Import ContactPage
import ScrollToTopButton from './ScrollToTopButton'; // Import ScrollToTopButton
import LineupPage from './pages/LineupPage'; // Import LineupPage
import TicketsPage from './pages/TicketsPage'; // Import TicketsPage
import GalleryPage from './pages/GalleryPage'; // Import GalleryPage
import VenueMapPage from './pages/VenueMapPage'; // Import VenueMapPage
import MerchandisePage from './pages/MerchandisePage'; // Import MerchandisePage

const getPageTitle = (pageKey: Page): string => {
  const baseTitle = "BYTF 2026";
  switch (pageKey) {
    case 'home':
      return `${baseTitle} | Home - Batam Youth & Tourism Festival`;
    case 'about':
      return `${baseTitle} | Tentang Kami`;
    case 'lineup':
      return `${baseTitle} | Lineup`;
    case 'schedule':
      return `${baseTitle} | Jadwal Acara`;
    case 'tickets':
      return `${baseTitle} | Tiket`;
    case 'gallery':
      return `${baseTitle} | Galeri`;
    case 'merchandise':
      return `${baseTitle} | Merchandise Resmi`;
    case 'venueMap':
      return `${baseTitle} | Peta Venue`;
    case 'sponsors':
      return `${baseTitle} | Sponsor`;
    case 'qna':
      return `${baseTitle} | Info & Q&A`;
    case 'contact':
      return `${baseTitle} | Kontak`;
    default:
      return baseTitle;
  }
};

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.053 1.805.248 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.168.422.362 1.057.415 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.053 1.17-.248 1.805-.415 2.227a3.486 3.486 0 01-.896 1.382c-.42.419-.819.679-1.381.896-.422.168-1.057.362-2.227.415-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.053-1.805-.248-2.227-.415a3.492 3.492 0 01-1.382-.896 3.492 3.492 0 01-.896-1.381c-.168-.422-.362-1.057-.415-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.053-1.17.248-1.805.415-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.168 1.057.362 2.227-.415A48.627 48.627 0 0112 2.163zm0 1.623c-3.143 0-3.485.011-4.694.068-1.077.049-1.646.226-1.995.367-.406.164-.72.358-1.036.673-.318.318-.51.63-.673 1.036-.14.349-.318.918-.367 1.995-.057 1.209-.068 1.551-.068 4.694s.011 3.485.068 4.694c.049 1.077.226 1.646.367 1.995.164.406.358.72.673 1.036.318.318.63.51 1.036.673.349.14.918.318 1.995.367 1.209.057 1.551.068 4.694.068s3.485-.011 4.694-.068c1.077-.049 1.646-.226 1.995-.367.406-.164.72-.358 1.036-.673.318-.318.51-.63.673-1.036.14-.349.318-.918-.367-1.995.057-1.209.068-1.551-.068-4.694s-.011-3.485-.068-4.694c-.049-1.077-.226-1.646-.367-1.995-.164-.406-.358-.72-.673-1.036-.318-.318-.63-.51-1.036-.673-.349-.14-.918-.318-1.995-.367A46.777 46.777 0 0012 3.786zm0 4.262A4.015 4.015 0 1012 12a4.015 4.015 0 000-3.952zm0 6.648A2.633 2.633 0 1112 9.42a2.633 2.633 0 010 5.274zm4.908-7.925a.962.962 0 100-1.924.962.962 0 000 1.924z" />
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.47.02-4.8-.73-6.16-2.73-1.7-2.45-1.7-5.77-.04-8.38.79-1.28 1.99-2.26 3.43-2.73.02-2.64-.01-5.28.01-7.92.01-2.17.01-4.34 0-6.51Z"/>
  </svg>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [targetArtistId, setTargetArtistId] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true); 

  useEffect(() => {
    // Simulate initial asset loading or app setup
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 200); // Short delay for initial paint/setup
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.title = getPageTitle(currentPage);
    window.scrollTo(0, 0); 
  }, [currentPage]);

  const handleNavigate = (page: Page, targetId?: string) => {
    setCurrentPage(page);
    if (page === 'lineup' && targetId) {
      setTargetArtistId(targetId);
    } else if (targetArtistId && page !== 'lineup') {
      setTargetArtistId(null);
    }
  };

  const clearTargetArtist = () => {
    setTargetArtistId(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'lineup':
        return <LineupPage targetArtistId={targetArtistId} onTargetArtistViewed={clearTargetArtist} onNavigate={handleNavigate} />;
      case 'schedule':
        return <SchedulePage onNavigate={handleNavigate} />;
      case 'tickets':
        return <TicketsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'merchandise':
        return <MerchandisePage />;
      case 'venueMap':
        return <VenueMapPage />;
      case 'sponsors':
        return <SponsorsPage />;
      case 'qna':
        return <QnaPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  if (isInitialLoading && !targetArtistId) { 
    return (
      <div className="fixed inset-0 bg-event-background flex flex-col items-center justify-center z-[200]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-event-accent"></div>
        <p className="mt-4 text-event-accent text-lg font-semibold">Memuat Festival...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-event-background bg-subtle-dots bg-dots-sm">
      <div className="w-full flex flex-col flex-grow overflow-x-hidden"> 
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-gradient-to-r from-event-blue-dark via-event-blue to-event-blue-light/95 text-white p-4 sm:p-5 md:p-6 flex flex-col items-center shadow-header sticky top-0 z-header">
          <div className="text-center mb-3 sm:mb-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-shadow-custom">BYTF 2026</h1>
              <p className="text-sm sm:text-base lg:text-lg font-medium text-event-blue-extralight opacity-90 mt-1">Batam Youth &amp; Tourism Festival</p>
          </div>
          <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
        </motion.header>
        
        <AnimatePresence mode="wait">
          <motion.main
            key={currentPage} 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="page-container"
          >
            {renderPage()}
          </motion.main>
        </AnimatePresence>
        
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="text-center w-full p-6 sm:p-8 md:p-10 bg-event-dark text-gray-400 text-sm"
        >
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1 text-left">
                <h4 className="text-lg font-semibold text-white mb-2.5">BYTF 2026</h4>
                <p className="text-xs text-gray-400 mb-3">
                    Batam Youth & Tourism Festival adalah perayaan semangat muda, kreativitas, dan pesona pariwisata Batam.
                </p>
                 <p className="text-xs text-gray-500">Website bytfest.org (Placeholder)</p>
            </div>

            <div className="md:col-span-1 text-left md:text-center">
              <h4 className="text-lg font-semibold text-white mb-3">Ikuti Kami</h4>
              <div className="flex justify-start md:justify-center space-x-4 mb-4">
                  <a href="https://instagram.com/bytf.official" target="_blank" rel="noopener noreferrer" aria-label="BYTF Instagram" 
                     className="text-gray-300 hover:text-event-accent-light transition-all duration-200 transform hover:scale-110 p-2 rounded-full hover:bg-white/10">
                      <InstagramIcon className="h-7 w-7" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="BYTF TikTok" 
                     className="text-gray-300 hover:text-event-accent-light transition-all duration-200 transform hover:scale-110 p-2 rounded-full hover:bg-white/10">
                      <TikTokIcon className="h-7 w-7" /> {/* Placeholder for TikTok */}
                  </a>
                  {/* Add other social icons with similar styling */}
              </div>
            </div>

            <div className="md:col-span-1 text-left md:text-right">
              <h4 className="text-lg font-semibold text-white mb-3">Langganan Update</h4>
              <p className="text-xs text-gray-400 mb-3">
                Dapatkan berita terbaru, pengumuman lineup, dan penawaran tiket spesial.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2.5">
                <input 
                  type="email" 
                  placeholder="Email Anda" 
                  className="flex-grow p-2.5 rounded-md text-xs bg-gray-700 text-white border border-gray-600 focus:ring-1 focus:ring-event-accent focus:border-event-accent outline-none placeholder-gray-500"
                  disabled 
                />
                <button 
                  type="submit" 
                  className="bg-event-accent hover:bg-event-accent-dark text-white font-semibold p-2.5 rounded-md text-xs transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled
                >
                  Daftar (Segera)
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center">
            <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} BYTF Organizing Committee. Hak Cipta Dilindungi.</p>
          </div>
        </motion.footer>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Root element not found');
}
