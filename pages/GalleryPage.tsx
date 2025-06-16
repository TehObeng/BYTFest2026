
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants, Easing } from 'framer-motion';
import { galleryData, GalleryImage } from '../data/gallery-data';

const pageTitleStyle = "text-left text-3xl sm:text-4xl md:text-4xl font-bold text-event-text-heading mt-0 mb-10 pb-5 border-b-2 border-gray-200";

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
  hidden: { opacity: 0, scale: 0.9, y: 20 },
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
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" as Easing } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" as Easing } },
};

const modalContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: "5%" },
  visible: { opacity: 1, scale: 1, y: "0%", transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as Easing } },
  exit: { opacity: 0, scale: 0.95, y: "2%", transition: { duration: 0.25, ease: [0.64, 0, 0.78, 0] as Easing } },
};

const MAX_RETRIES = 2;
const RETRY_DELAYS = [500, 1000];

interface GalleryGridItemProps {
  image: GalleryImage;
  onItemClick: () => void;
}

const GalleryGridItem: React.FC<GalleryGridItemProps> = ({ image, onItemClick }) => {
  const initialSrc = image.src;
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

  return (
    <motion.div
      className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease overflow-hidden group cursor-pointer aspect-square relative transform hover:-translate-y-1"
      variants={imageCardVariants}
      onClick={onItemClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onItemClick(); }}
      aria-label={`Lihat gambar: ${image.title || image.alt}`}
    >
      {finalError || !initialSrc ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-event-text-muted p-3 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs sm:text-sm">{image.alt}</span>
          <span className="text-xs mt-1 text-gray-400">(Gambar tidak ditemukan)</span>
        </div>
      ) : (
        <>
          <img
            src={currentSrc}
            alt={image.alt}
            className="w-full h-full object-cover object-center transition-transform duration-300 ease-custom-ease group-hover:scale-105"
            loading="lazy"
            onError={handleError}
          />
          {image.title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 pt-6 text-left">
              <p className="w-full text-white text-sm sm:text-base font-semibold truncate group-hover:whitespace-normal group-hover:text-event-accent-light transition-colors">
                {image.title}
              </p>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  const [modalCurrentSrc, setModalCurrentSrc] = useState('');
  const [modalFinalError, setModalFinalError] = useState(false);
  const [modalAttempts, setModalAttempts] = useState(0);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    if (image?.src) {
        setModalCurrentSrc(`${image.src}?retry=0`);
        setModalFinalError(false);
        setModalAttempts(0);
    } else {
        setModalCurrentSrc('');
        setModalFinalError(true); 
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedImage) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  const handleModalImageError = () => {
    if (selectedImage?.src && modalAttempts < MAX_RETRIES) {
      const newAttemptCount = modalAttempts + 1;
      setTimeout(() => {
        setModalAttempts(newAttemptCount);
        setModalCurrentSrc(`${selectedImage.src}${selectedImage.src.includes('?') ? '&' : '?'}retry=${newAttemptCount}`);
      }, RETRY_DELAYS[modalAttempts]);
    } else {
      setModalFinalError(true);
    }
  };

  return (
    <motion.div
      id="gallery"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full space-y-10"
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
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6"
          variants={pageVariants} // This will stagger direct children (GalleryGridItem)
        >
          {galleryData.map((image) => (
            <GalleryGridItem 
              key={image.id} 
              image={image} 
              onItemClick={() => openModal(image)} 
            />
          ))}
        </motion.div>
      ) : (
        <motion.p 
          className="text-center text-event-text-muted py-8 text-left" 
          variants={titleVariants}
          transition={{delay: 0.2}}
        >
          Galeri akan segera diisi dengan foto-foto terbaik dari festival!
        </motion.p>
      )}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-modal-backdrop cursor-pointer"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            aria-describedby="gallery-modal-description"
          >
            <motion.div
              className="bg-white rounded-xl shadow-modal w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden cursor-default z-modal-content"
              onClick={(e) => e.stopPropagation()}
              variants={modalContentVariants}
              role="document"
            >
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200">
                <h3 id="gallery-modal-title" className="text-left text-base sm:text-lg font-semibold text-event-blue">
                  {selectedImage.title || selectedImage.alt}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-event-accent transition-colors rounded-full p-1.5 -mr-1.5 focus:outline-none focus:ring-2 focus:ring-event-accent focus:ring-offset-2"
                  aria-label="Tutup modal gambar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-2 sm:p-4 flex-grow flex items-center justify-center bg-gray-100 min-h-[250px] sm:min-h-[350px]">
                {modalFinalError ? (
                  <div className="text-center text-event-text-muted p-4">
                    <p>Gambar tidak dapat dimuat.</p>
                    <p className="text-sm">{selectedImage.alt}</p>
                  </div>
                ) : (
                  <img 
                    src={modalCurrentSrc} 
                    alt={selectedImage.alt}
                    className="max-w-full max-h-[calc(90vh-160px)] object-contain rounded-md" // Ensure image fits
                    onError={handleModalImageError}
                  />
                )}
              </div>
              <p id="gallery-modal-description" className="p-3 sm:p-4 text-xs sm:text-sm text-event-text-muted text-center border-t border-gray-200 bg-gray-50">
                {selectedImage.alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GalleryPage;
