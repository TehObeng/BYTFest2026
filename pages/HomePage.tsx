
import React, { useState, useEffect } from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import CountdownTimer from '../CountdownTimer'; 
import HighlightModal, { HighlightData } from '../HighlightModal'; 
import { guestStars, latestNewsData, festivalHighlightsData, GuestStar } from '../data/home-data'; 
import { Page } from '../types';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as Easing, staggerChildren: 0.12 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: (i: number = 0) => ({ 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1, 
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as Easing
    }
  })
};

const newsItemVariants: Variants = { 
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as Easing
    }
  })
};

const MAX_RETRIES = 2;
const RETRY_DELAYS = [500, 1000];

interface RetryingImageProps {
  src: string;
  alt: string;
  className: string;
  placeholderContainerClassName?: string;
  placeholderTextClassName?: string;
  errorIcon?: React.ReactNode;
}

const RetryingImage: React.FC<RetryingImageProps> = ({ 
  src: initialSrc, 
  alt, 
  className,
  placeholderContainerClassName = "w-full h-full flex flex-col items-center justify-center bg-gray-100 p-2",
  placeholderTextClassName = "text-xs text-gray-500 text-center",
  errorIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}) => {
  const [currentSrc, setCurrentSrc] = useState(initialSrc ? `${initialSrc}?retry=0` : '');
  const [finalError, setFinalError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    setCurrentSrc(initialSrc ? `${initialSrc}?retry=0` : '');
    setFinalError(false);
    setAttempts(0);
  }, [initialSrc]);

  const handleError = () => {
    if (attempts < MAX_RETRIES) {
      const newAttemptCount = attempts + 1;
      setTimeout(() => {
        setAttempts(newAttemptCount);
        setCurrentSrc(`${initialSrc}${initialSrc.includes('?') ? '&' : '?'}retry=${newAttemptCount}`);
      }, RETRY_DELAYS[attempts]);
    } else {
      setFinalError(true);
    }
  };

  if (finalError || !initialSrc) {
    return (
      <div className={placeholderContainerClassName}>
        {errorIcon}
        <p className={placeholderTextClassName}>{alt} (Tidak tersedia)</p>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
    />
  );
};

interface HomePageProps {
  onNavigate: (page: Page, targetId?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const eventStartDate = "2026-06-01T09:00:00";
  const eventEndDate = "2026-06-06T23:59:59";

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
      className="space-y-12 md:space-y-16 lg:space-y-20"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <motion.section
        className="text-center bg-hero-gradient text-white py-10 sm:py-14 md:py-20 rounded-2xl shadow-xl overflow-hidden relative"
        variants={cardVariants} 
        custom={0}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-0 opacity-80"></div> 
        <div className="absolute inset-0 bg-subtle-dots bg-dots-sm opacity-20 z-[1]"></div>

        <div className="relative z-10 px-4">
            <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-event-accent-light via-white to-event-blue-light animate-fadeInUp"
                variants={cardVariants}
                custom={1}
            >
                Selamat Datang di BYTF 2026!
            </motion.h2>
            <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 sm:mb-10 max-w-3xl mx-auto animate-fadeInUp"
                variants={cardVariants}
                custom={2}
                style={{ animationDelay: '0.15s' }}
            >
                Festival Pemuda & Pariwisata Batam terbesar siap mengguncang kota! Enam hari penuh inspirasi, kreativitas, musik, budaya, dan keseruan tanpa batas. Temukan semua yang perlu Anda ketahui di sini.
            </motion.p>
            <CountdownTimer targetStartDate={eventStartDate} targetEndDate={eventEndDate} />
        </div>
      </motion.section>

      <motion.section variants={sectionVariants}>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-event-text-heading text-center mb-8 sm:mb-10">Berita Terbaru</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {latestNewsData.map((news, index) => (
            <motion.div
              key={news.id}
              className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease overflow-hidden flex flex-col group p-5 sm:p-6 transform hover:-translate-y-1.5 hover:shadow-glow-accent/30"
              custom={index}
              variants={newsItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <span className="text-xs text-event-accent font-semibold mb-2.5 uppercase tracking-wide">{news.date}</span>
              <h4 className="text-lg sm:text-xl font-semibold text-event-blue group-hover:text-event-accent-dark transition-colors mb-3">{news.title}</h4>
              <p className="text-sm text-event-text-muted mb-4 flex-grow leading-relaxed">{news.summary}</p>
              {news.link && (
                 <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (news.link && news.link.startsWith('#nav-')) {
                        const pageKey = news.link.split('nav-')[1] as Page;
                        onNavigate(pageKey);
                      } else if (news.link) {
                        window.open(news.link, '_blank');
                      }
                    }}
                    className="text-sm font-semibold text-event-green hover:text-event-green-dark self-start transition-colors duration-200 group-hover:underline focus:outline-none focus:ring-1 focus:ring-event-green rounded"
                    aria-label={`Baca berita: ${news.title}`}
                  >
                  Baca Selengkapnya <span aria-hidden="true" className="ml-1 group-hover:translate-x-1 transition-transform duration-200 inline-block">&rarr;</span>
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={sectionVariants}>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-event-text-heading text-center mb-8 sm:mb-10">Penampilan Spesial Oleh:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {guestStars.map((star, index) => (
            <motion.div
              key={star.name}
              className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease overflow-hidden flex flex-col transform hover:-translate-y-1.5 group hover:shadow-glow-blue/40"
              custom={index} 
              variants={cardVariants} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="w-full h-56 sm:h-60 md:h-64 bg-gray-200 overflow-hidden relative">
                <RetryingImage
                  src={star.imagePath}
                  alt={star.name}
                  className="w-full h-full object-cover object-center transition-transform duration-350 ease-custom-ease group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4 sm:p-5 flex-grow flex flex-col">
                <h4 className="text-xl sm:text-2xl font-bold text-event-blue mb-2 group-hover:text-event-blue-dark transition-colors">{star.name}</h4>
                <p className="text-sm text-event-text-muted mb-3.5 flex-grow leading-relaxed">{star.description}</p>
                <span className="text-xs font-semibold text-event-accent bg-event-accent/10 px-3.5 py-1.5 rounded-full self-start uppercase tracking-wider group-hover:bg-event-accent/20 transition-colors">{star.type}</span>
              </div>
            </motion.div>
          ))}
        </div>
          <motion.div 
            className="text-center mt-10 sm:mt-12"
            variants={cardVariants} 
            custom={guestStars.length} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            >
            <motion.button
                onClick={(e) => {
                    e.preventDefault();
                    onNavigate('lineup');
                }}
                className="bg-event-accent hover:bg-event-accent-dark text-white font-semibold px-8 py-3 sm:px-10 sm:py-3.5 rounded-lg shadow-button active:bg-event-accent-dark/90 transform active:scale-95 transition-all duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-event-accent-light focus:ring-offset-2"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(20, 184, 166, 0.4)" }}
                whileTap={{ scale: 0.98 }}
            >
                Lihat Semua Lineup
            </motion.button>
        </motion.div>
      </motion.section>

      <motion.section variants={sectionVariants}>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-event-text-heading text-center mb-8 sm:mb-10">Sorotan Festival BYTF 2026</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {festivalHighlightsData.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease text-center transform hover:-translate-y-2 cursor-pointer group border-2 border-transparent hover:border-event-accent/60 hover:shadow-glow-accent/35"
              custom={index} 
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              onClick={() => openModal(highlight)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openModal(highlight);}}
              aria-label={`Lihat detail untuk ${highlight.title}`}
              whileHover={{ scale: 1.03 }}
            >
              <motion.div 
                className="text-5xl sm:text-6xl mb-4 text-event-accent group-hover:scale-110 transition-transform duration-300 ease-out"
                whileHover={{ rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.5 } }}
              >
                {highlight.icon}
              </motion.div>
              <h4 className="text-xl sm:text-2xl font-semibold text-event-blue group-hover:text-event-accent-dark mb-2.5 transition-colors">{highlight.title}</h4>
              <p className="text-sm text-event-text-muted leading-relaxed">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="text-center bg-gradient-to-br from-event-green to-event-accent hover:from-event-green-dark hover:to-event-accent-dark transition-all text-white p-8 sm:p-10 md:p-12 rounded-2xl shadow-xl hover:shadow-lg"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Jangan Lewatkan Keseruannya!</h3>
        <p className="text-base sm:text-lg text-gray-50 mb-8 max-w-xl mx-auto leading-relaxed">
          Ikuti terus informasi terbaru mengenai jadwal, tiket, dan pengisi acara lainnya melalui media sosial dan website resmi kami. Ajak teman, keluarga, dan komunitasmu untuk menjadi bagian dari BYTF 2026!
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5">
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              onNavigate('schedule');
            }}
            className="bg-white text-event-green font-semibold px-8 py-3 sm:py-3.5 rounded-lg shadow-button hover:bg-gray-100 active:bg-gray-200 transform active:scale-95 transition-all duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-event-green"
            whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.98 }}
          >
            Lihat Jadwal Acara
          </motion.button>
          <motion.a
            href="https://instagram.com/bytf.official"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white font-semibold px-8 py-3 sm:py-3.5 rounded-lg hover:bg-white hover:text-event-accent active:bg-white/90 transform active:scale-95 transition-all duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-event-accent"
            whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.98 }}
          >
            Ikuti Instagram Kami
          </motion.a>
        </div>
      </motion.section>

      <HighlightModal 
        isOpen={selectedHighlight !== null} 
        onClose={closeModal} 
        highlight={selectedHighlight} 
      />
    </motion.div>
  );
};

export default HomePage;
