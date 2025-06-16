
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants, Easing } from 'framer-motion';
import { galleryData, GalleryImage } from './gallery-data';

// --- STYLES & VARIANTS (Consistent with existing app structure) ---
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
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" as Easing } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" as Easing } },
};

const modalContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: "5%" },
  visible: { opacity: 1, scale: 1, y: "0%", transition: { duration: 0.35, ease: "easeOut" as Easing } },
  exit: { opacity: 0, scale: 0.95, y: "2%", transition: { duration: 0.25, ease: "easeIn" as Easing } },
};


// --- SUB-COMPONENT: GalleryGridItem ---
interface GalleryGridItemProps {
  image: GalleryImage;
  onItemClick: () => void;
}

const GalleryGridItem: React.FC<GalleryGridItemProps> = ({ image, onItemClick }) => {
  const [imageHasError, setImageHasError] = useState(false);

  const handleImageError = () => {
    setImageHasError(true);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease overflow-hidden group cursor-pointer aspect-square relative"
      variants={imageCardVariants}
      onClick={onItemClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onItemClick(); }}
      aria-label={`Lihat gambar: ${image.title || image.alt}`}
    >
      {imageHasError ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-event-text-muted p-3 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs sm:text-sm">{image.alt}</span>
          <span className="text-xs mt-1 text-gray-400">(Gambar tidak dapat dimuat)</span>
        </div>
      ) : (
        <>
          <img
            src={image.src}
            alt={image.alt} // Alt text is important for accessibility and if image fails to load
            className="w-full h-full object-cover object-center transition-transform duration-300 ease-custom-ease group-hover:scale-105"
            loading="lazy"
            onError={handleImageError}
          />
          {image.title && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-left backdrop-blur-sm">
              <p className="w-full text-white text-xs sm:text-sm font-semibold truncate">
                {image.title}
              </p>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

// --- MAIN COMPONENT: GalleryPage ---
const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [modalImageHasError, setModalImageHasError] = useState(false);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setModalImageHasError(false); // Reset error state for new modal image
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  
  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to restore scroll on component unmount if modal was open
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  // Keyboard navigation for modal
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


  return (
    <motion.div
      id="gallery"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full" // Removed text-left as children will handle alignment
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
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
          variants={pageVariants} // This allows staggerChildren on GalleryGridItem
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

      {/* Modal Implementation */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[100] cursor-pointer"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeModal} // Close on overlay click
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            aria-describedby="gallery-modal-description"
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden cursor-default"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
              variants={modalContentVariants}
              role="document"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200">
                <h3 id="gallery-modal-title" className="text-left text-base sm:text-lg font-semibold text-event-blue">
                  {selectedImage.title || selectedImage.alt}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-event-blue transition-colors rounded-full p-1.5 -mr-1.5 focus:outline-none focus:ring-2 focus:ring-event-blue focus:ring-offset-2"
                  aria-label="Tutup modal gambar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body - Image */}
              <div className="p-2 sm:p-4 flex-grow flex items-center justify-center bg-gray-100 min-h-[200px] sm:min-h-[300px]">
                {modalImageHasError ? (
                  <div className="text-center text-event-text-muted p-4">
                    <p>Gambar tidak dapat ditampilkan.</p>
                    <p className="text-sm">{selectedImage.alt}</p>
                  </div>
                ) : (
                  <img 
                    src={selectedImage.src} 
                    alt={selectedImage.alt} // Important: Alt text for accessibility
                    className="max-w-full max-h-[calc(90vh-160px)] object-contain rounded-md" // Adjusted max-h to account for header/footer
                    onError={() => setModalImageHasError(true)}
                  />
                )}
              </div>
              
              {/* Modal Footer - Caption */}
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
