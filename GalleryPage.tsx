
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants, Easing } from 'framer-motion';
import { galleryData, GalleryImage } from './gallery-data';

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

// Sub-component for individual gallery images with error handling
interface GalleryImageItemProps {
  image: GalleryImage;
  onClick: () => void;
}

const GalleryImageItem: React.FC<GalleryImageItemProps> = ({ image, onClick }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease overflow-hidden group cursor-pointer aspect-square"
      variants={imageCardVariants}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick();}}
      aria-label={`Lihat gambar ${image.title || image.alt}`}
    >
      {hasError ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-event-text-muted p-3 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs sm:text-sm">{image.alt}</span>
          <span className="text-xs mt-1">(Gambar tidak tersedia)</span>
        </div>
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover object-center transition-transform duration-300 ease-custom-ease group-hover:scale-105"
          loading="lazy"
          onError={handleError}
        />
      )}
      {!hasError && image.title && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-left">
          <p className="block w-full text-white text-xs sm:text-sm font-semibold truncate">{image.title}</p>
        </div>
      )}
    </motion.div>
  );
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
      className="w-full text-left"
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
          variants={pageVariants}
        >
          {galleryData.map((image) => (
            <GalleryImageItem key={image.id} image={image} onClick={() => openModal(image)} />
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
                <h3 id="gallery-modal-title" className="text-lg font-semibold text-event-blue text-left">
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
              <div className="p-2 flex-grow flex items-center justify-center bg-gray-50"> {/* Added bg for contrast if image is transparent/small */}
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt} 
                  className="max-w-full max-h-[75vh] object-contain rounded"
                  onError={(e) => { // Basic error handling for modal image too
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    // Visually indicate error, could replace with text but alt is usually shown by browser
                    target.style.border = '2px dashed #fca5a5'; // red-300
                    target.style.padding = '1rem';
                  }}
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
