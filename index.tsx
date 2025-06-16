
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
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.053 1.805.248 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.168.422.362 1.057.415 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.053 1.17-.248 1.805-.415 2.227a3.486 3.486 0 01-.896 1.382c-.42.419-.819.679-1.381.896-.422.168-1.057.362-2.227.415-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.053-1.805-.248-2.227-.415a3.492 3.492 0 01-1.382-.896 3.492 3.492 0 01-.896-1.381c-.168-.422-.362-1.057-.415-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.053-1.17.248-1.805.415-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.168 1.057-.362 2.227-.415A48.627 48.627 0 0112 2.163zm0 1.623c-3.143 0-3.485.011-4.694.068-1.077.049-1.646.226-1.995.367-.406.164-.72.358-1.036.673-.318.318-.51.63-.673 1.036-.14.349-.318.918-.367 1.995-.057 1.209-.068 1.551-.068 4.694s.011 3.485.068 4.694c.049 1.077.226 1.646.367 1.995.164.406.358.72.673 1.036.318.318.63.51 1.036.673.349.14.918.318 1.995.367 1.209.057 1.551.068 4.694.068s3.485-.011 4.694-.068c1.077-.049 1.646-.226 1.995-.367.406-.164.72-.358 1.036-.673.318-.318.51-.63.673-1.036.14-.349.318-.918.367-1.995.057-1.209.068-1.551.068-4.694s-.011-3.485-.068-4.694c-.049-1.077-.226-1.646-.367-1.995-.164-.406-.358-.72-.673-1.036-.318-.318-.63-.51-1.036-.673-.349-.14-.918-.318-1.995-.367A46.777 46.777 0 0012 3.786zm0 4.262A4.015 4.015 0 1012 12a4.015 4.015 0 000-3.952zm0 6.648A2.633 2.633 0 1112 9.42a2.633 2.633 0 010 5.274zm4.908-7.925a.962.962 0 100-1.924.962.962 0 000 1.924z" />
  </svg>
);


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    document.title = getPageTitle(currentPage);
    window.scrollTo(0, 0); // Scroll to top on page change
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'lineup':
        return <LineupPage />;
      case 'schedule':
        return <SchedulePage />;
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
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-event-background">
      <div className="w-full flex flex-col flex-grow overflow-x-hidden"> {/* Prevent horizontal scroll */}
        <motion.header 
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-gradient-to-r from-event-blue-dark via-event-blue to-event-blue-light/90 text-white p-4 sm:p-5 md:p-6 flex flex-col items-center shadow-header sticky top-0 z-header">
          <div className="text-center mb-3 sm:mb-4 md:mb-5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-shadow-custom">BYTF 2026</h1>
              <p className="text-sm sm:text-base lg:text-lg font-medium text-event-blue-extralight opacity-95 mt-1">Batam Youth &amp; Tourism Festival</p>
          </div>
          <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
        </motion.header>
        
        <AnimatePresence mode="wait">
          <motion.main
            key={currentPage} 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="page-container" // Use custom class from index.html for consistent padding
          >
            {renderPage()}
          </motion.main>
        </AnimatePresence>
        
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="text-center w-full p-6 sm:p-8 md:p-10 bg-gray-800 text-gray-400 text-sm"
        >
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-white mb-3">Dapatkan Update Terbaru!</h4>
              <p className="text-sm text-gray-300 mb-4 max-w-lg mx-auto">
                Daftarkan email Anda untuk mendapatkan berita eksklusif, pengumuman lineup, dan penawaran tiket spesial langsung ke inbox Anda.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Alamat email Anda" 
                  className="flex-grow p-3 rounded-md text-sm bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-event-accent focus:border-event-accent outline-none placeholder-gray-400"
                  disabled 
                />
                <button 
                  type="submit" 
                  className="bg-event-accent hover:bg-event-accent-dark text-white font-semibold p-3 rounded-md text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  Daftar (Segera Hadir)
                </button>
              </form>
               <p className="text-xs text-gray-500 mt-3">(Fitur pendaftaran email akan segera tersedia)</p>
            </div>
            <div className="mb-6 flex justify-center space-x-5">
                <a href="https://instagram.com/bytf.official" target="_blank" rel="noopener noreferrer" aria-label="BYTF Instagram" className="text-gray-400 hover:text-event-accent transition-colors duration-200">
                    <InstagramIcon className="h-7 w-7" />
                </a>
                {/* Add other social icons here, e.g., Facebook, Twitter, TikTok */}
                {/* 
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="BYTF Facebook" className="text-gray-400 hover:text-event-accent transition-colors duration-200">
                    <FacebookIcon className="h-7 w-7" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="BYTF TikTok" className="text-gray-400 hover:text-event-accent transition-colors duration-200">
                    <TikTokIcon className="h-7 w-7" />
                </a>
                */}
            </div>
            <p className="mb-1 text-gray-300">&copy; {new Date().getFullYear()} BYTF Organizing Committee. All rights reserved.</p>
            <p className="text-xs">Website bytfest.org (Placeholder)</p>
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
