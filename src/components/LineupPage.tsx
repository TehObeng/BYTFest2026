import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import { lineupData, Artist } from '../data/lineup-data'; // Updated path

const pageTitleStyle = "text-2xl sm:text-3xl md:text-4xl font-bold text-event-text-heading mt-0 mb-8 pb-4 border-b-2 border-gray-200";
const sectionTitleStyle = "text-xl sm:text-2xl md:text-3xl font-semibold text-event-text-heading mt-10 mb-5";

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
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
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as Easing
    }
  })
};

const LineupPage: React.FC = () => {
  // Potentially group artists by day or type in the future
  // For now, display all
  const allArtists = lineupData;

  return (
    <motion.div
      id="lineup"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="space-y-8"
    >
      <motion.h2 className={pageTitleStyle} variants={titleVariants}>
        Lineup & Pengisi Acara BYTF 2026
      </motion.h2>
      
      <motion.p 
        className="text-sm sm:text-base text-event-text-muted mb-8 text-center"
        variants={titleVariants}
        transition={{ delay: 0.2 }}
      >
        Saksikan penampilan memukau dari berbagai musisi, idol group, DJ, hingga talenta lokal kebanggaan Batam! 
        Jadwal spesifik penampilan akan diumumkan lebih lanjut.
      </motion.p>

      {allArtists.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          variants={pageVariants} // Use pageVariants for staggerChildren effect on cards
        >
          {allArtists.map((artist, index) => (
            <motion.div
              key={artist.id}
              className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease overflow-hidden flex flex-col group transform hover:-translate-y-1.5"
              custom={index}
              variants={artistCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <img
                src={artist.imagePath}
                alt={artist.name}
                className="w-full h-56 sm:h-64 object-cover object-center transition-transform duration-300 ease-custom-ease group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null; 
                  (e.target as HTMLImageElement).src = "/images/placeholder-artist.webp"; // Fallback placeholder
                }}
              />
              <div className="p-4 sm:p-5 flex-grow flex flex-col">
                <h3 className="text-xl sm:text-2xl font-bold text-event-blue mb-1 group-hover:text-event-blue-dark transition-colors">{artist.name}</h3>
                <p className="text-xs sm:text-sm font-semibold text-event-green mb-2">{artist.type} {artist.day && `(${artist.day})`}</p>
                <p className="text-sm text-event-text-muted mb-4 flex-grow">{artist.description}</p>
                {artist.socialLink && (
                  <a
                    href={artist.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-event-green hover:text-event-green-dark self-start transition-colors duration-200 mt-auto"
                  >
                    Kunjungi Media Sosial &rarr;
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p className="text-center text-event-text-muted py-8" variants={titleVariants}>
          Informasi lineup akan segera diperbarui. Pantau terus!
        </motion.p>
      )}

       <motion.p 
        className="text-xs sm:text-sm text-gray-500 italic mt-12 block text-center"
        variants={titleVariants}
        transition={{ delay: 0.3 }}
        >
        <em>Lineup dan jadwal dapat berubah sewaktu-waktu. Informasi terbaru akan selalu tersedia di sini dan media sosial kami.</em>
      </motion.p>
    </motion.div>
  );
};

export default LineupPage;
