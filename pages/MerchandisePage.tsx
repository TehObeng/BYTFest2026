
import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import { merchandiseItemsData, MerchandiseItem } from '../data/merchandise-data';

const pageTitleStyle = "text-left text-2xl sm:text-3xl md:text-4xl font-bold text-event-text-heading mt-0 mb-8 pb-4 border-b-2 border-gray-200";

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

const itemCardVariants: Variants = {
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

const MerchandisePage: React.FC = () => {
  return (
    <motion.div
      id="merchandise"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="space-y-8"
    >
      <motion.h2 className={pageTitleStyle} variants={titleVariants}>
        Merchandise Resmi BYTF 2026
      </motion.h2>

      <motion.p
        className="text-sm sm:text-base text-event-text-muted mb-10 text-center"
        variants={titleVariants}
        transition={{ delay: 0.15 }}
      >
        Bawa pulang kenang-kenangan spesial dari BYTF 2026! Temukan koleksi merchandise resmi kami yang keren dan eksklusif. 
        Produk akan tersedia untuk dibeli secara online dan di booth merchandise selama festival berlangsung.
      </motion.p>

      {merchandiseItemsData.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          variants={pageVariants} // For staggerChildren effect
        >
          {merchandiseItemsData.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              variants={itemCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease overflow-hidden flex flex-col group"
            >
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden flex items-center justify-center">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-contain p-2 transition-transform duration-300 ease-custom-ease group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src = "/images/merch/placeholder_default.webp"; // Fallback placeholder
                  }}
                />
              </div>
              <div className="p-4 sm:p-5 flex-grow flex flex-col">
                <h3 className="text-lg sm:text-xl font-semibold text-event-blue mb-1.5 group-hover:text-event-blue-dark transition-colors">{item.name}</h3>
                {item.description && (
                  <p className="text-xs text-event-text-muted mb-2 flex-grow">{item.description}</p>
                )}
                <p className="text-xl font-bold text-event-text-heading mb-3">{item.price}</p>
                <button
                  type="button"
                  className="w-full mt-auto bg-event-green hover:bg-event-green-dark text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 ease-custom-ease disabled:opacity-60 disabled:cursor-not-allowed shadow-button"
                  disabled={item.availability !== 'Tersedia'}
                  onClick={() => { /* Placeholder for future purchase logic */ alert(`Membeli ${item.name} (Fitur segera hadir)`); }}
                  aria-label={item.availability === 'Tersedia' ? `Beli ${item.name}` : `${item.name} ${item.availability.toLowerCase()}`}
                >
                  {item.availability === 'Tersedia' ? 'Beli Sekarang' : item.availability}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p className="text-center text-event-text-muted py-8" variants={titleVariants}>
          Koleksi merchandise akan segera diumumkan. Pantau terus!
        </motion.p>
      )}

      <motion.div
        className="mt-12 p-6 bg-event-blue-extralight rounded-xl shadow text-center"
        variants={titleVariants}
        transition={{ delay: 0.3 }}
      >
        <h4 className="text-lg font-semibold text-event-blue-dark mb-3">Informasi Pembelian:</h4>
        <p className="text-sm text-event-text-muted">
          Merchandise resmi BYTF 2026 akan dapat dibeli melalui platform online kami (akan diumumkan) dan di booth merchandise khusus yang tersedia di area festival.
          <br />
          Stok terbatas untuk beberapa item eksklusif, jadi jangan sampai kehabisan!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MerchandisePage;
