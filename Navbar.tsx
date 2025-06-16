
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const MenuIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pages: { key: Page, label: string }[] = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'Tentang Kami' },
    { key: 'lineup', label: 'Lineup' },
    { key: 'schedule', label: 'Jadwal' },
    { key: 'tickets', label: 'Tiket' },
    { key: 'gallery', label: 'Galeri'},
    { key: 'merchandise', label: 'Merchandise'},
    { key: 'venueMap', label: 'Peta Venue'},
    { key: 'sponsors', label: 'Sponsor' },
    { key: 'qna', label: 'Info & Q&A' },
    { key: 'contact', label: 'Kontak' },
  ];

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = ''; 
    };
  }, [mobileMenuOpen]);

  const handleMobileLinkClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <div className="w-full">
      {/* Hamburger Button */}
      <div className="md:hidden flex justify-end items-center px-2 sm:px-0 py-1">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white p-2 rounded-md hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-event-blue-dark focus:ring-white"
          aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu-panel"
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:block w-full" aria-label="Navigasi Utama - Desktop">
        <ul className="list-none p-0 m-0 flex flex-wrap justify-center gap-1.5 md:gap-2">
          {pages.map(pageInfo => (
            <li key={pageInfo.key}>
              <button
                id={`nav-${pageInfo.key}`}
                onClick={() => onNavigate(pageInfo.key)}
                className={`
                  relative text-white 
                  px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-medium uppercase rounded-lg tracking-wider
                  transition-all duration-300 ease-custom-ease group
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-event-blue-dark focus:ring-white
                  ${currentPage === pageInfo.key 
                    ? 'bg-white text-event-blue font-semibold shadow-button' 
                    : 'hover:bg-white/20 active:bg-white/30'
                  }
                `}
                aria-current={currentPage === pageInfo.key ? 'page' : undefined}
              >
                {pageInfo.label}
                <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3/5 h-[2.5px] rounded-full transition-all duration-300 ease-custom-ease
                  ${currentPage === pageInfo.key ? 'bg-event-blue scale-x-100' : 'bg-white scale-x-0 group-hover:scale-x-75 group-focus:scale-x-75'} `}>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-menu-panel"
            className="md:hidden w-full bg-event-blue shadow-lg" 
            aria-label="Navigasi Utama - Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: 'hidden' }} 
          >
            <ul className="flex flex-col items-stretch pt-1 pb-2"> 
              {pages.map(pageInfo => (
                <li key={`mobile-${pageInfo.key}`}>
                  <button
                    onClick={() => handleMobileLinkClick(pageInfo.key)}
                    className={`block w-full text-center py-3.5 px-4 text-sm font-medium transition-colors duration-200 ease-in-out
                      ${currentPage === pageInfo.key
                        ? 'bg-event-accent text-white font-semibold' // Use accent for active mobile link
                        : 'text-white hover:bg-white/20 active:bg-white/30'
                      }`}
                    aria-current={currentPage === pageInfo.key ? 'page' : undefined}
                  >
                    {pageInfo.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
