
import React, { useState, useEffect } from 'react';
import { motion, Variants, Easing } from 'framer-motion';

const pageTitleStyle = "text-left text-3xl sm:text-4xl md:text-4xl font-bold text-event-text-heading mt-0 mb-10 pb-5 border-b-2 border-gray-200";

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.05 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as Easing }
  }
};

const MAX_RETRIES = 2;
const RETRY_DELAYS = [500, 1000];

const VenueMapPage: React.FC = () => {
  const initialMapUrl = "/images/venue_map.webp";
  const [currentMapUrl, setCurrentMapUrl] = useState(`${initialMapUrl}?retry=0`);
  const [finalMapLoadError, setFinalMapLoadError] = useState(false);
  const [mapLoadAttempts, setMapLoadAttempts] = useState(0);

  useEffect(() => {
    setCurrentMapUrl(`${initialMapUrl}?retry=0`);
    setFinalMapLoadError(false);
    setMapLoadAttempts(0);
  }, [initialMapUrl]);


  const handleMapError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (mapLoadAttempts < MAX_RETRIES) {
      const newAttemptCount = mapLoadAttempts + 1;
      setTimeout(() => {
        setMapLoadAttempts(newAttemptCount);
        setCurrentMapUrl(`${initialMapUrl}${initialMapUrl.includes('?') ? '&' : '?'}retry=${newAttemptCount}`);
      }, RETRY_DELAYS[mapLoadAttempts]);
    } else {
      setFinalMapLoadError(true);
      if (e.target) {
        (e.target as HTMLImageElement).style.display = 'none'; 
      }
    }
  };

  return (
    <motion.div
      id="venueMap"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="space-y-8" // Increased base spacing
    >
      <motion.h2 className={pageTitleStyle} variants={itemVariants}>
        Peta Venue BYTF 2026
      </motion.h2>

      <motion.p 
        className="text-sm sm:text-base text-event-text-muted text-center"
        variants={itemVariants}
        transition={{ delay: 0.05 }}
      >
        Temukan jalanmu mengelilingi kemeriahan BYTF 2026! Peta venue detail akan tersedia di sini mendekati tanggal acara. 
        Untuk sementara, berikut adalah gambaran area festival.
      </motion.p>

      <motion.div 
        className="bg-gray-100 p-4 sm:p-6 rounded-xl shadow-lg overflow-hidden min-h-[350px] sm:min-h-[450px] flex items-center justify-center border border-gray-200/80"
        variants={itemVariants}
        transition={{ delay: 0.1 }}
      >
        {finalMapLoadError ? (
          <div className="text-center text-red-600 p-8 space-y-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-semibold">Gambar peta venue tidak dapat dimuat.</p>
            <p className="text-sm">Mohon periksa kembali nanti atau hubungi dukungan jika masalah berlanjut.</p>
          </div>
        ) : (
          <img
            src={currentMapUrl}
            alt="Peta Venue BYTF 2026"
            className="w-full h-auto max-w-4xl object-contain rounded-md" // Constrain max width for very large maps
            onError={handleMapError}
          />
        )}
      </motion.div>

      <motion.div
        className="mt-10 text-center"
        variants={itemVariants}
        transition={{ delay: 0.15 }}
      >
        <h3 className="text-xl sm:text-2xl font-semibold text-event-blue-dark mb-4">Keterangan (Contoh):</h3>
        <ul className="list-none inline-block text-left text-sm sm:text-base text-event-text-muted space-y-1.5 bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200/70">
          <li><span className="mr-2">🅿️</span> Area Parkir</li>
          <li><span className="mr-2">🚻</span> Toilet Umum & Mushola</li>
          <li><span className="mr-2">ℹ️</span> Pusat Informasi & Lost and Found</li>
          <li><span className="mr-2">🚑</span> Pos Medis</li>
          <li><span className="mr-2">🎪</span> Panggung Utama</li>
          <li><span className="mr-2">🛍️</span> Zona UMKM & Youthpreneur</li>
          <li><span className="mr-2">🍔</span> Zona Kuliner</li>
          <li><span className="mr-2">🎨</span> Zona Pop Culture & Komunitas</li>
        </ul>
      </motion.div>
      
      <motion.p 
        className="text-xs sm:text-sm text-gray-500 italic mt-12 block text-center"
        variants={itemVariants}
        transition={{ delay: 0.2 }}
        >
        <em>Peta venue final dengan detail lokasi semua zona, panggung, fasilitas, dan tenant akan dirilis H-7 sebelum acara.</em>
      </motion.p>
    </motion.div>
  );
};

export default VenueMapPage;
