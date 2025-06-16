
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, Variants, Easing } from 'framer-motion';
import { lineupData, Artist } from '../data/lineup-data'; 
import { Page } from '../types';

const pageTitleStyle = "text-left text-3xl sm:text-4xl md:text-4xl font-bold text-event-text-heading mt-0 mb-10 pb-5 border-b-2 border-gray-200";

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.08, delayChildren: 0.1 } 
  }
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as Easing }
  }
};

const artistCardVariants: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as Easing
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
        duration: 0.3,
        ease: [0.64,0,0.78,0] as Easing
    }
  }
};

const filterButtonContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2
    }
  }
};

const filterButtonVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

const daySectionVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.05 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeIn" } }
};


const MAX_RETRIES = 2;
const RETRY_DELAYS = [500, 1000];

interface ArtistImageProps {
  src: string;
  alt: string;
}

const ArtistImage: React.FC<ArtistImageProps> = ({ src: initialSrc, alt }) => {
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
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-xs text-gray-500">{alt} (Gambar tidak tersedia)</p>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className="w-full h-full object-cover object-center transition-transform duration-300 ease-custom-ease group-hover:scale-105"
      loading="lazy"
      onError={handleError}
    />
  );
};

interface LineupPageProps {
  targetArtistId: string | null;
  onTargetArtistViewed: () => void;
  onNavigate: (page: Page, targetId?: string) => void; // For potential internal navigation
}

const LineupPage: React.FC<LineupPageProps> = ({ targetArtistId, onTargetArtistViewed, onNavigate }) => {
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>("Semua Hari");

  const availableDays = useMemo(() => {
    const days = Array.from(new Set(lineupData.map(artist => artist.day).filter(Boolean))) as string[];
    days.sort((a, b) => { // Sort "Hari 1", "Hari 2", ... numerically
        const numA = parseInt(a.replace(/[^0-9]/g, ''), 10);
        const numB = parseInt(b.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        if (!isNaN(numA)) return -1; // Numbers first
        if (!isNaN(numB)) return 1;
        return a.localeCompare(b); // Alphabetical for non-numeric days
    });
    return ["Semua Hari", ...days];
  }, []);

  const artistsGroupedByDay = useMemo(() => {
    const grouped: Record<string, Artist[]> = {};
    const dayOrder = availableDays.filter(day => day !== "Semua Hari");

    dayOrder.forEach(day => grouped[day] = []); // Initialize with sorted days

    lineupData.forEach(artist => {
      const dayKey = artist.day || "Lainnya"; // Group artists without a day under "Lainnya"
      if (!grouped[dayKey] && !dayOrder.includes(dayKey)) {
        grouped[dayKey] = [];
      }
      if (grouped[dayKey]) { // Ensure artist.day is a key in grouped
         grouped[dayKey].push(artist);
      } else if (artist.day) { // If artist.day was not in dayOrder (e.g. "Talenta Lokal")
         grouped[artist.day] = [artist];
      } else { // Fallback for artists with no day and "Lainnya" was not initialized (should not happen with current logic)
         if(!grouped["Lainnya"]) grouped["Lainnya"] = [];
         grouped["Lainnya"].push(artist);
      }
    });
    return grouped;
  }, [availableDays]);


  useEffect(() => {
    if (targetArtistId) {
      const artistData = lineupData.find(a => a.id === targetArtistId);
      if (artistData) {
        // Set filter to artist's day, or "Semua Hari" if artist has no specific day
        const targetDay = artistData.day || "Semua Hari";
        if (availableDays.includes(targetDay)) {
             setSelectedDayFilter(targetDay);
        } else {
             setSelectedDayFilter("Semua Hari"); // Fallback if artist's day isn't a filter option
        }

        // Delay scroll slightly to allow for potential filter change and re-render
        setTimeout(() => {
          const element = document.getElementById(`artist-card-${targetArtistId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('ring-4', 'ring-event-accent-light', 'ring-offset-2', 'ring-offset-event-background', 'transition-all', 'duration-300', 'rounded-xl');
            setTimeout(() => {
              element.classList.remove('ring-4', 'ring-event-accent-light', 'ring-offset-2', 'ring-offset-event-background', 'rounded-xl');
            }, 2500); // Highlight duration
          }
          onTargetArtistViewed(); // Reset targetArtistId in App.tsx
        }, 150); 
      } else {
        onTargetArtistViewed(); // Artist not found, reset
      }
    }
  }, [targetArtistId, onTargetArtistViewed, availableDays]);

  const displayedArtistEntries = useMemo(() => {
    if (selectedDayFilter === "Semua Hari") {
      // Create a sorted list of day keys for "Semua Hari" view
      const sortedDays = Object.keys(artistsGroupedByDay).sort((a, b) => {
        const numA = parseInt(a.replace(/[^0-9]/g, ''), 10);
        const numB = parseInt(b.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        if (a === "Lainnya") return 1; // "Lainnya" at the end
        if (b === "Lainnya") return -1;
        if (!isNaN(numA)) return -1;
        if (!isNaN(numB)) return 1;
        return a.localeCompare(b);
      });
      return sortedDays.map(day => ({ day, artists: artistsGroupedByDay[day] || [] })).filter(group => group.artists.length > 0);
    }
    return [{ day: selectedDayFilter, artists: artistsGroupedByDay[selectedDayFilter] || [] }].filter(group => group.artists.length > 0) ;
  }, [selectedDayFilter, artistsGroupedByDay]);


  return (
    <motion.div
      id="lineup"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="space-y-10"
    >
      <motion.h2 className={pageTitleStyle} variants={titleVariants}>
        Lineup & Pengisi Acara BYTF 2026
      </motion.h2>
      
      <motion.p 
        className="text-sm sm:text-base text-event-text-muted mb-6 text-center"
        variants={titleVariants}
        transition={{ delay: 0.1 }}
      >
        Saksikan penampilan memukau dari berbagai musisi, idol group, DJ, hingga talenta lokal kebanggaan Batam! 
        Jadwal spesifik penampilan akan diumumkan lebih lanjut.
      </motion.p>

      {/* Filter Buttons */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5 mb-8 pb-4 border-b border-gray-200 sticky top-[calc(var(--header-height,130px)+1rem)] bg-event-background/80 backdrop-blur-sm py-3 z-dropdown"
        aria-label="Filter lineup berdasarkan hari"
        variants={filterButtonContainerVariants}
      >
        {availableDays.map(day => (
          <motion.button
            key={day}
            onClick={() => setSelectedDayFilter(day)}
            className={`
              px-4 py-2 sm:px-5 text-xs sm:text-sm font-medium rounded-lg
              transition-all duration-200 ease-custom-ease transform focus:outline-none 
              focus:ring-2 focus:ring-offset-2 focus:ring-event-accent
              ${selectedDayFilter === day
                ? 'bg-event-accent text-white font-semibold shadow-button border-transparent' 
                : 'bg-gray-100 text-event-text-muted border border-gray-300 hover:bg-event-accent/10 hover:text-event-accent hover:border-event-accent/30 active:bg-event-accent/20 active:text-event-accent-dark'
              }
            `}
            aria-pressed={selectedDayFilter === day}
            variants={filterButtonVariants}
          >
            {day.replace("Hari ", "H")}
          </motion.button>
        ))}
      </motion.div>
      
      <AnimatePresence mode="wait">
        {displayedArtistEntries.length > 0 ? (
          displayedArtistEntries.map(({ day, artists }) => (
            <motion.section
              key={day}
              variants={daySectionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-12"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-event-blue-dark mb-6 pl-2 border-l-4 border-event-accent">
                {day} {(day.startsWith("Hari") && (day === "Hari 5" || day === "Hari 6")) ? <span className="text-xl text-event-green font-medium">(Konser Utama)</span> : (day.startsWith("Hari") && !day.includes("Lainnya")) ? <span className="text-xl text-event-accent-dark font-medium">(Festival Umum)</span> : null}
              </h3>
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {artists.map((artist) => (
                    <motion.div
                      layout 
                      id={`artist-card-${artist.id}`} // Unique ID for scrolling
                      key={artist.id}
                      variants={artistCardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease overflow-hidden flex flex-col group transform hover:-translate-y-1.5"
                    >
                      <div className="w-full h-60 sm:h-64 md:h-72 bg-gray-100"> 
                        <ArtistImage
                          src={artist.imagePath}
                          alt={artist.name}
                        />
                      </div>
                      <div className="p-4 sm:p-5 flex-grow flex flex-col">
                        <h4 className="text-left text-xl sm:text-2xl font-bold text-event-blue mb-1.5 group-hover:text-event-blue-dark transition-colors">{artist.name}</h4>
                        <div className="mb-3 flex flex-wrap gap-2">
                          <span className="text-xs font-semibold text-event-accent bg-event-accent/10 px-3 py-1.5 rounded-full self-start uppercase tracking-wider">
                            {artist.type}
                          </span>
                          {artist.day && selectedDayFilter === "Semua Hari" && ( // Show day badge only in "Semua Hari" view if artist has a day
                            <span className="text-xs font-semibold text-white bg-event-blue/80 px-3 py-1.5 rounded-full self-start uppercase tracking-wider">
                              {artist.day}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-event-text-muted mb-4 flex-grow leading-relaxed">{artist.description}</p>
                        {artist.socialLink && (
                          <a
                            href={artist.socialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-event-green hover:text-event-green-dark self-start transition-colors duration-200 mt-auto group-hover:underline"
                          >
                            Kunjungi Media Sosial <span aria-hidden="true">&rarr;</span>
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.section>
          ))
        ) : (
          <motion.p className="text-center text-event-text-muted py-10" variants={titleVariants}>
            Tidak ada penampilan untuk filter hari yang dipilih atau belum ada lineup yang diumumkan.
          </motion.p>
        )}
      </AnimatePresence>

       <motion.p 
        className="text-xs sm:text-sm text-gray-500 italic mt-12 block text-center"
        variants={titleVariants}
        transition={{ delay: 0.2 }}
        >
        <em>Lineup dan jadwal dapat berubah sewaktu-waktu. Informasi terbaru akan selalu tersedia di sini dan media sosial kami. Header height for sticky: <code className="text-xs bg-gray-200 p-1 rounded">calc(var(--header-height, 130px) + 1rem)</code>.</em>
      </motion.p>
    </motion.div>
  );
};

export default LineupPage;
