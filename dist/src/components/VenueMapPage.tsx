
import React, { useState } from 'react';
import { motion, Variants, Easing } from 'framer-motion';

const pageTitleStyle = "text-2xl sm:text-3xl md:text-4xl font-bold text-event-text-heading mt-0 mb-8 pb-4 border-b-2 border-gray-200";

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
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

const VenueMapPage: React.FC = () => {
  const placeholderMapUrl = "/images/venue_map_placeholder.webp"; // Placeholder image path in public/images/
  const [mapLoadError, setMapLoadError] = useState(false);

  return (
    <motion.div
      id="venueMap"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="space-y-6"
    >
      <motion.h2 className={pageTitleStyle} variants={itemVariants}>
        Peta Venue BYTF 2026
      </motion.h2>

      <motion.p 
        className="text-sm sm:text-base text-event-text-muted text-center"
        variants={itemVariants}
        transition={{ delay: 0.1 }}
      >
        Temukan jalanmu mengelilingi kemeriahan BYTF 2026! Peta venue detail akan tersedia di sini mendekati tanggal acara. 
        Untuk sementara, berikut adalah gambaran area festival (placeholder).
      </motion.p>

      <motion.div 
        className="bg-gray-100 p-4 sm:p-6 rounded-xl shadow-lg overflow-hidden min-h-[200px] flex items-center justify-center" // Added min-height and flex for error message centering
        variants={itemVariants}
        transition={{ delay: 0.2 }}
      >
        {mapLoadError ? (
          <p className="text-center text-red-500 p-8">
            Gambar peta venue tidak dapat dimuat saat ini. Mohon periksa kembali nanti.
          </p>
        ) : (
          <img
            src={placeholderMapUrl}
            alt="Peta Venue BYTF 2026 (Placeholder)"
            className="w-full h-auto object-contain rounded-md border-2 border-gray-300"
            onError={(e) => {
              setMapLoadError(true);
              // Hide the broken image icon by making the img element itself not take up space or be visible
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        variants={itemVariants}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg sm:text-xl font-semibold text-event-blue-dark mb-3">Keterangan (Contoh):</h3>
        <ul className="list-disc list-inside inline-block text-left text-sm text-event-text-muted space-y-1">
          <li>🅿️ Area Parkir</li>
          <li>🚻 Toilet Umum & Mushola</li>
          <li>ℹ️ Pusat Informasi & Lost and Found</li>
          <li>🚑 Pos Medis</li>
          <li>🎪 Panggung Utama</li>
          <li>🛍️ Zona UMKM & Youthpreneur</li>
          <li>🍔 Zona Kuliner</li>
          <li>🎨 Zona Pop Culture & Komunitas</li>
        </ul>
      </motion.div>
      
      <motion.p 
        className="text-xs sm:text-sm text-gray-500 italic mt-10 block text-center"
        variants={itemVariants}
        transition={{ delay: 0.4 }}
        >
        <em>Peta venue final dengan detail lokasi semua zona, panggung, fasilitas, dan tenant akan dirilis H-7 sebelum acara.</em>
      </motion.p>
    </motion.div>
  );
};

export default VenueMapPage;
