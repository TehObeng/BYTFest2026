
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const MenuIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pages: { key: Page, label: string }[] = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'Tentang' },
    { key: 'lineup', label: 'Lineup' },
    { key: 'schedule', label: 'Jadwal' },
    { key: 'tickets', label: 'Tiket' },
    { key: 'gallery', label: 'Galeri'},
    { key: 'merchandise', label: 'Merch'},
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
      <div className="md:hidden flex justify-end items-center px-2 sm:px-0 py-1">
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white p-2.5 rounded-md hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-event-blue-dark focus:ring-white transition-colors"
          aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu-panel"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileMenuOpen ? (
              <motion.div key="close" initial={{ opacity:0, rotate: -90 }} animate={{ opacity:1, rotate: 0 }} exit={{ opacity:0, rotate: 90}} transition={{duration: 0.2}}>
                <CloseIcon />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ opacity:0, rotate: 90 }} animate={{ opacity:1, rotate: 0 }} exit={{ opacity:0, rotate: -90}} transition={{duration: 0.2}}>
                <MenuIcon />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <nav className="hidden md:block w-full" aria-label="Navigasi Utama - Desktop">
        <ul className="list-none p-0 m-0 flex flex-wrap justify-center gap-1 md:gap-1.5">
          {pages.map(pageInfo => (
            <li key={pageInfo.key}>
              <motion.button
                id={`nav-${pageInfo.key}`}
                onClick={() => onNavigate(pageInfo.key)}
                className={`
                  relative text-white 
                  px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-medium uppercase rounded-lg tracking-wider
                  transition-all duration-300 ease-custom-ease group
                  focus:outline-none focus:ring-2 focus:ring-offset-1 
                  ${currentPage === pageInfo.key 
                    ? 'bg-event-green-dark text-white font-semibold shadow-md transform -translate-y-0.5 focus:ring-offset-event-green-dark focus:ring-event-green-light' // Active and slightly raised with new colors
                    : 'hover:bg-white/25 active:bg-white/30 hover:text-white focus:ring-offset-event-blue-dark focus:ring-white'
                  }
                `}
                aria-current={currentPage === pageInfo.key ? 'page' : undefined}
                whileHover={currentPage === pageInfo.key ? { scale: 1.03, y: -3, boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" } : { y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {pageInfo.label}
                {currentPage === pageInfo.key && (
                   <motion.div 
                     layoutId="activeNavUnderline"
                     className="absolute -bottom-px left-0 right-0 h-[3.5px] bg-white rounded-full" // Underline for active
                     transition={{ type: "spring", stiffness: 350, damping: 30 }}
                   />
                )}
                 <span className={`absolute inset-0 border-2 rounded-lg transition-all duration-300 ease-custom-ease
                    ${currentPage !== pageInfo.key ? 'group-hover:border-white/40 border-transparent' : 'border-event-green-light/50'}`}> 
                </span>
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-menu-panel"
            className="md:hidden w-full bg-event-blue-dark shadow-xl" 
            aria-label="Navigasi Utama - Mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ 
              position: 'absolute', 
              top: '100%', 
              left: 0, 
              right: 0,
              maxHeight: 'calc(100vh - var(--header-height, 100px) - 1rem)', 
              overflowY: 'auto'
            }}
          >
            <ul className="flex flex-col items-stretch pt-2 pb-3"> 
              {pages.map((pageInfo, index) => (
                <motion.li 
                  key={`mobile-${pageInfo.key}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.2, ease: "easeOut" }}
                >
                  <button
                    onClick={() => handleMobileLinkClick(pageInfo.key)}
                    className={`
                      block w-full text-left py-3.5 px-6 text-sm font-medium transition-colors duration-200 ease-in-out relative
                      focus:outline-none focus:bg-white/25 
                      ${currentPage === pageInfo.key
                        ? 'bg-event-green-dark text-white font-bold' // Active mobile style with new colors
                        : 'text-gray-100 hover:bg-white/20 active:bg-white/30' 
                      }`}
                    aria-current={currentPage === pageInfo.key ? 'page' : undefined}
                  >
                    {pageInfo.label}
                    {currentPage === pageInfo.key && (
                        <motion.div 
                            className="absolute left-1.5 top-1/2 -translate-y-1/2 h-5 w-1.5 bg-white rounded-full" // Indicator remains white
                            layoutId="mobileActiveIndicator"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration:0.2}}
                        />
                    )}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
