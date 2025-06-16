
import React from 'react';
import { Page } from './types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const pages: { key: Page, label: string }[] = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'Tentang Kami' },
    { key: 'lineup', label: 'Lineup' },
    { key: 'schedule', label: 'Jadwal' },
    { key: 'tickets', label: 'Tiket' },
    { key: 'gallery', label: 'Galeri'},
    { key: 'venueMap', label: 'Peta Venue'},
    { key: 'sponsors', label: 'Sponsor' },
    { key: 'qna', label: 'Info & Q&A' },
    { key: 'contact', label: 'Kontak' },
  ];

  return (
    <nav className="w-full" aria-label="Main Navigation">
      <ul className="list-none p-0 m-0 flex flex-wrap justify-center gap-1.5 md:gap-2.5"> {/* Slightly adjusted gap */}
        {pages.map(pageInfo => (
          <li key={pageInfo.key}>
            <button
              id={`nav-${pageInfo.key}`} // Added ID for easier targeting
              onClick={() => onNavigate(pageInfo.key)}
              className={`
                relative text-white 
                px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm font-medium uppercase rounded-lg tracking-wide
                transition-all duration-300 ease-custom-ease group
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-event-blue-dark focus:ring-white
                ${currentPage === pageInfo.key 
                  ? 'bg-white text-event-blue font-semibold shadow-button' 
                  : 'hover:bg-white/15 active:bg-white/25'
                }
              `}
              aria-current={currentPage === pageInfo.key ? 'page' : undefined}
            >
              {pageInfo.label}
              {/* Subtle underline for active and hover states */}
              <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-3/5 h-[2px] transition-all duration-300 ease-custom-ease
                ${currentPage === pageInfo.key ? 'bg-event-blue scale-x-100' : 'bg-white scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100'} `}>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;