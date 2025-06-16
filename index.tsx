import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Page } from './types'; // Import Page type
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion

import Navbar from './Navbar'; // Import Navbar
import HomePage from './HomePage'; // Import HomePage
import AboutPage from './AboutPage'; // Import AboutPage
import QnaPage from './QnaPage'; // Import QnaPage
import SchedulePage from './SchedulePage'; // Import SchedulePage
import SponsorsPage from './SponsorsPage'; // Import SponsorsPage
import ContactPage from './ContactPage'; // Import ContactPage
import ScrollToTopButton from './ScrollToTopButton'; // Import ScrollToTopButton
import LineupPage from './LineupPage'; // Import LineupPage
import TicketsPage from './TicketsPage'; // Import TicketsPage
import GalleryPage from './GalleryPage'; // Import GalleryPage
import VenueMapPage from './VenueMapPage'; // Import VenueMapPage

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

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    document.title = getPageTitle(currentPage);
    // For better accessibility, consider managing focus to the new page's main heading
    // or using an ARIA live region to announce page changes.
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
      <div className="w-full flex flex-col flex-grow overflow-hidden">
        <motion.header 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-event-blue text-white p-4 sm:p-5 md:p-6 flex flex-col items-center shadow-nav sticky top-0 z-50">
          <div className="text-center mb-3 sm:mb-4 md:mb-5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">BYTF 2026</h1>
              <p className="text-xs sm:text-sm lg:text-base font-normal text-event-blue-light opacity-90">Batam Youth &amp; Tourism Festival</p>
          </div>
          <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
        </motion.header>
        
        <AnimatePresence mode="wait">
          <motion.main
            key={currentPage} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="p-4 sm:p-5 md:p-6 lg:p-8 flex-grow w-full max-w-7xl mx-auto"
          >
            {renderPage()}
          </motion.main>
        </AnimatePresence>
        
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="text-center w-full p-6 sm:p-8 md:p-10 bg-event-dark text-event-gray-text text-sm"
        >
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-2">Dapatkan Update Terbaru!</h4>
              <p className="text-xs text-event-gray-text mb-3">
                Daftarkan emailmu untuk mendapatkan berita, pengumuman lineup, dan penawaran tiket spesial langsung ke inbox. (Fitur Segera Hadir)
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Alamat email Anda" 
                  className="flex-grow p-2.5 rounded-md text-sm bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-event-blue focus:border-event-blue outline-none placeholder-gray-400"
                  disabled 
                />
                <button 
                  type="submit" 
                  className="bg-event-blue hover:bg-event-blue-dark text-white font-semibold p-2.5 rounded-md text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  Daftar (Segera)
                </button>
              </form>
            </div>
            <p className="mb-1">&copy; {new Date().getFullYear()} BYTF Organizing Committee. All rights reserved. (bytfest.org)</p>
            <p>Follow us: <a href="https://instagram.com/bytf.official" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">@bytf.official</a></p>
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