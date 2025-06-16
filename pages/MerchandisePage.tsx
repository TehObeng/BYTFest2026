
import React, { useState, useEffect } from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import { merchandiseItemsData, MerchandiseItem } from '../data/merchandise-data';

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

const itemCardVariants: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.07,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as Easing
    }
  })
};

const MAX_RETRIES = 2;
const RETRY_DELAYS = [500, 1000];

interface MerchImageProps {
  src: string;
  alt: string;
}

const MerchImage: React.FC<MerchImageProps> = ({ src: initialSrc, alt }) => {
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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <p className="text-xs text-gray-500">{alt} (Gambar tidak tersedia)</p>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className="w-full h-full object-contain p-4 sm:p-5 transition-transform duration-350 ease-custom-ease group-hover:scale-105"
      loading="lazy"
      onError={handleError}
    />
  );
};


const MerchandisePage: React.FC = () => {
  return (
    <motion.div
      id="merchandise"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="space-y-10"
    >
      <motion.h2 className={pageTitleStyle} variants={titleVariants}>
        Merchandise Resmi BYTF 2026
      </motion.h2>

      <motion.p
        className="text-sm sm:text-base text-event-text-muted mb-10 text-center"
        variants={titleVariants}
        transition={{ delay: 0.1 }}
      >
        Bawa pulang kenang-kenangan spesial dari BYTF 2026! Temukan koleksi merchandise resmi kami yang keren dan eksklusif. 
        Produk akan tersedia untuk dibeli secara online dan di booth merchandise selama festival berlangsung.
      </motion.p>

      {merchandiseItemsData.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          variants={pageVariants} 
        >
          {merchandiseItemsData.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              variants={itemCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease overflow-hidden flex flex-col group transform hover:-translate-y-1.5 hover:shadow-glow-accent/30"
            >
              <div className="aspect-[4/3] bg-event-background-subtle overflow-hidden flex items-center justify-center border-b border-gray-200/80 relative">
                <MerchImage
                  src={item.imageUrl}
                  alt={item.name}
                />
                 {item.availability === 'Stok Terbatas' && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md">
                    Stok Terbatas!
                  </div>
                )}
              </div>
              <div className="p-4 sm:p-5 flex-grow flex flex-col">
                <h3 className="text-lg sm:text-xl font-semibold text-event-blue mb-1.5 group-hover:text-event-accent-dark transition-colors">{item.name}</h3>
                {item.description && (
                  <p className="text-xs text-event-text-muted mb-3 flex-grow leading-relaxed">{item.description}</p>
                )}
                <p className="text-xl font-bold text-event-text-heading mb-4">{item.price}</p>
                <motion.button
                  type="button"
                  className={`w-full mt-auto font-semibold py-3 px-4 rounded-lg transition-all duration-200 ease-custom-ease active:scale-95 shadow-md hover:shadow-lg
                    ${item.availability === 'Habis' || item.availability === 'Segera Hadir'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-event-green hover:bg-event-green-dark text-white focus:ring-event-green-light'
                    }
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                  `}
                  disabled={item.availability === 'Habis' || item.availability === 'Segera Hadir'}
                  onClick={() => { 
                    if (item.availability === 'Tersedia' || item.availability === 'Stok Terbatas') {
                      alert(`Membeli ${item.name} (Fitur segera hadir)`); 
                    }
                  }}
                  aria-label={item.availability === 'Tersedia' || item.availability === 'Stok Terbatas' ? `Beli ${item.name}` : `${item.name} ${item.availability.toLowerCase()}`}
                  whileHover={ (item.availability === 'Tersedia' || item.availability === 'Stok Terbatas') ? { scale: 1.03, y: -1 } : {}}
                  whileTap={ (item.availability === 'Tersedia' || item.availability === 'Stok Terbatas') ? { scale: 0.97 } : {}}
                >
                  {item.availability === 'Tersedia' || item.availability === 'Stok Terbatas' ? 'Beli Sekarang' : item.availability}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p className="text-center text-event-text-muted py-10" variants={titleVariants}>
          Koleksi merchandise akan segera diumumkan. Pantau terus!
        </motion.p>
      )}

      <motion.div
        className="mt-12 p-6 bg-event-blue-extralight rounded-xl shadow-lg border border-event-blue-light/50 text-center"
        variants={titleVariants}
        transition={{ delay: 0.2 }}
      >
        <h4 className="text-lg sm:text-xl font-semibold text-event-blue-dark mb-3 flex items-center justify-center">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-event-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Informasi Pembelian:
        </h4>
        <p className="text-sm text-event-text-muted leading-relaxed">
          Merchandise resmi BYTF 2026 akan dapat dibeli melalui platform online kami (akan diumumkan) dan di booth merchandise khusus yang tersedia di area festival.
          <br />
          Stok terbatas untuk beberapa item eksklusif, jadi jangan sampai kehabisan!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MerchandisePage;
