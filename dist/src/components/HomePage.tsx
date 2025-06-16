import React, { useState } from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import CountdownTimer from './CountdownTimer'; // Path relative to src/components/
import HighlightModal, { HighlightData } from './HighlightModal'; // Path relative to src/components/
import { guestStars, latestNewsData, festivalHighlightsData } from '../data/home-data'; // Updated path to src/data/

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as Easing, staggerChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12, // Stagger delay
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as Easing
    }
  })
};

const guestStarCardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1, // Stagger delay for guest stars
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as Easing
    }
  })
};

const newsItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as Easing
    }
  })
};

const HomePage: React.FC = () => {
  const eventStartDate = "2026-06-01T09:00:00";
  const eventEndDate = "2026-06-06T23:59:59"; // Festival ends on June 6th

  const [selectedHighlight, setSelectedHighlight] = useState<HighlightData | null>(null);

  const openModal = (highlight: HighlightData) => {
    setSelectedHighlight(highlight);
  };

  const closeModal = () => {
    setSelectedHighlight(null);
  };

  return (
    <motion.div
      id="home"
      className="space-y-10 md:space-y-16"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      {/* Hero Section with Countdown */}
      <motion.section
        className="text-center bg-event-blue-dark text-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl overflow-hidden relative"
        variants={sectionVariants}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-xs z-0"></div> {/* Soft overlay */}
        <div className="relative z-10">
            <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-event-blue-light via-white to-event-blue-extralight animate-fadeInUp"
                variants={cardVariants}
                custom={0}
            >
                Selamat Datang di BYTF 2026!
            </motion.h2>
            <motion.p
                className="text-sm sm:text-base md:text-lg text-event-blue-extralight mb-6 sm:mb-8 max-w-3xl mx-auto animate-fadeInUp"
                variants={cardVariants}
                custom={1}
                style={{ animationDelay: '0.2s' }}
            >
                Festival Pemuda & Pariwisata Batam terbesar siap mengguncang kota! Enam hari penuh inspirasi, kreativitas, musik, budaya, dan keseruan tanpa batas. Temukan semua yang perlu Anda ketahui di sini.
            </motion.p>
            <CountdownTimer targetStartDate={eventStartDate} targetEndDate={eventEndDate} />
        </div>
      </motion.section>

      {/* Latest News Section */}
      <motion.section variants={sectionVariants}>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-event-text-heading text-center mb-6 sm:mb-8">Berita Terbaru</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {latestNewsData.map((news, index) => (
            <motion.div
              key={news.id}
              className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease overflow-hidden flex flex-col group p-5"
              custom={index}
              variants={newsItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <span className="text-xs text-event-green font-medium mb-1.5">{news.date}</span>
              <h4 className="text-lg font-semibold text-event-blue mb-2 group-hover:text-event-blue-dark transition-colors">{news.title}</h4>
              <p className="text-sm text-event-text-muted mb-3 flex-grow">{news.summary}</p>
              {news.link && (
                 <a
                    href={news.link}
                    onClick={(e) => {
                      if (news.link.startsWith('#nav-')) {
                        e.preventDefault();
                        const pageKey = news.link.split('nav-')[1];
                        const navButton = document.getElementById(`nav-${pageKey}`);
                        if (navButton) navButton.click();
                      }
                    }}
                    className="text-sm font-medium text-event-green hover:text-event-green-dark self-start transition-colors duration-200"
                  >
                  Baca Selengkapnya &rarr;
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Guest Stars Section */}
      <motion.section variants={sectionVariants}>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-event-text-heading text-center mb-6 sm:mb-8">Penampilan Spesial Oleh:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {guestStars.map((star, index) => (
            <motion.div
              key={star.name}
              className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease overflow-hidden flex flex-col transform hover:-translate-y-1 group"
              custom={index} 
              variants={guestStarCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <img
                src={star.imagePath}
                alt={star.name}
                className="w-full h-40 sm:h-48 md:h-56 object-cover object-center transition-transform duration-300 ease-custom-ease group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null; 
                  (e.target as HTMLImageElement).src = "/images/placeholder-artist.webp";
                }}
              />
              <div className="p-4 sm:p-5 flex-grow flex flex-col">
                <h4 className="text-lg sm:text-xl font-semibold text-event-blue mb-1.5">{star.name}</h4>
                <p className="text-xs sm:text-sm text-event-text-muted mb-3 flex-grow">{star.description}</p>
                <span className="text-xs font-medium text-event-green bg-event-green/10 px-2.5 py-1 rounded-full self-start">{star.type}</span>
              </div>
            </motion.div>
          ))}
        </div>
          <motion.div 
            className="text-center mt-8"
            variants={cardVariants} 
            custom={guestStars.length} // Ensure this animates after the cards
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            >
            <button
                onClick={(e) => {
                    e.preventDefault();
                    const navButton = document.getElementById('nav-lineup');
                    if (navButton) navButton.click();
                }}
                className="bg-event-blue text-white font-semibold px-6 py-3 rounded-lg shadow-button hover:bg-event-blue-dark transition-colors duration-200 text-sm sm:text-base"
            >
                Lihat Semua Lineup
            </button>
        </motion.div>
      </motion.section>

      {/* Festival Highlights Section - Now Interactive */}
      <motion.section variants={sectionVariants}>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-event-text-heading text-center mb-6 sm:mb-8">Sorotan Festival BYTF 2026</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {festivalHighlightsData.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              className="bg-event-blue-extralight p-5 sm:p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease text-center transform hover:-translate-y-1 cursor-pointer group"
              custom={index} 
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              onClick={() => openModal(highlight)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openModal(highlight);}}
              aria-label={`Lihat detail untuk ${highlight.title}`}
            >
              <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">{highlight.icon}</div>
              <h4 className="text-lg sm:text-xl font-semibold text-event-blue mb-2">{highlight.title}</h4>
              <p className="text-xs sm:text-sm text-event-text-muted">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="text-center bg-event-green hover:bg-event-green-dark transition-colors text-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl"
        variants={sectionVariants}
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">Jangan Lewatkan Keseruannya!</h3>
        <p className="text-sm sm:text-base text-gray-100 mb-6 max-w-xl mx-auto">
          Ikuti terus informasi terbaru mengenai jadwal, tiket, dan pengisi acara lainnya melalui media sosial dan website resmi kami. Ajak teman, keluarga, dan komunitasmu untuk menjadi bagian dari BYTF 2026!
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          <a
            href="#schedule" 
            onClick={(e) => {
              e.preventDefault();
              const navButton = document.getElementById('nav-schedule');
              if (navButton) navButton.click();
            }}
            className="bg-white text-event-green font-semibold px-6 py-3 rounded-lg shadow-button hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base"
          >
            Lihat Jadwal Acara
          </a>
          <a
            href="https://instagram.com/bytf.official"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-event-green transition-colors duration-200 text-sm sm:text-base"
          >
            Ikuti Instagram Kami
          </a>
        </div>
      </motion.section>

      {/* Render the HighlightModal */}
      <HighlightModal 
        isOpen={selectedHighlight !== null} 
        onClose={closeModal} 
        highlight={selectedHighlight} 
      />
    </motion.div>
  );
};

export default HomePage;
