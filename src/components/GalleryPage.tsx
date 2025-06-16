
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants, Easing } from 'framer-motion';
import { galleryData, GalleryImage } from '../data/gallery-data'; // Updated path

const pageTitleStyle = "text-left text-2xl sm:text-3xl md:text-4xl font-bold text-event-text-heading mt-0 mb-8 pb-4 border-b-2 border-gray-200";

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.05, delayChildren: 0.1 } 
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

const imageCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as Easing
    }
  }
};

const modalOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: "5%" },
  visible: { opacity: 1, scale: 1, y: "0%", transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, y: "2%", transition: { duration: 0.2, ease: "easeIn" } },
};


const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openModal = (image: GalleryImage) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <motion.div
      id="gallery"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full text-left" // Ensure the container is full-width and text defaults to left
    >
      <motion.h2 className={pageTitleStyle} variants={titleVariants}>
        Galeri BYTF
      </motion.h2>
      <motion.p 
        className="text-left text-sm sm:text-base text-event-text-muted mb-10" 
        variants={titleVariants}
        transition={{ delay: 0.1 }}
      >
        Lihat kembali momen-momen tak terlupakan dari Batam Youth & Tourism Festival. 
        (Gambar di bawah ini adalah placeholder dan akan diganti dengan foto aktual setelah acara).
      </motion.p>

      {galleryData.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={pageVariants} // Container for stagger effect
        >
          {galleryData.map((image) => (
            <motion.div
              key={image.id}
              className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease overflow-hidden group cursor-pointer aspect-square"
              variants={imageCardVariants}
              onClick={() => openModal(image)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openModal(image);}}
              aria-label={`Lihat gambar ${image.title || image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover object-center transition-transform duration-300 ease-custom-ease group-hover:scale-105"
                loading="lazy"
              />
              {image.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-left"> {/* Changed text-center to text-left */}
                  <p className="text-white text-xs sm:text-sm font-semibold truncate">{image.title}</p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p className="text-center text-event-text-muted py-8" variants={titleVariants}>
          Galeri akan segera diisi dengan foto-foto terbaik dari festival!
        </motion.p>
      )}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[100]"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              variants={modalContentVariants}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 id="gallery-modal-title" className="text-lg font-semibold text-event-blue">
                  {selectedImage.title || selectedImage.alt}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-event-blue transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-event-blue focus:ring-offset-2"
                  aria-label="Tutup modal gambar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-2 flex-grow flex items-center justify-center">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt} 
                  className="max-w-full max-h-[75vh] object-contain rounded" 
                />
              </div>
               <p className="p-4 text-sm text-event-text-muted text-center border-t border-gray-200">{selectedImage.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GalleryPage;
