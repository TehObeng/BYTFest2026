
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants, Easing } from 'framer-motion';

export interface HighlightData {
  title: string;
  description: string; 
  icon: string;
  detailedDescription: string; 
  modalImage?: string; 
}

interface HighlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlight: HighlightData | null;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" as Easing } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" as Easing } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as Easing, delay:0.05 } },
  exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.25, ease: [0.64, 0, 0.78, 0] as Easing } },
};

const MAX_RETRIES_MODAL = 2;
const RETRY_DELAYS_MODAL = [500, 1000];

const HighlightModal: React.FC<HighlightModalProps> = ({ isOpen, onClose, highlight }) => {
  const [currentSrc, setCurrentSrc] = useState('');
  const [finalImageError, setFinalImageError] = useState(false);
  const [imageAttempts, setImageAttempts] = useState(0);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscapeKey);
      if (highlight?.modalImage) {
        setCurrentSrc(`${highlight.modalImage}?retry=0`);
        setFinalImageError(false);
        setImageAttempts(0);
      } else {
        setCurrentSrc('');
        setFinalImageError(false); // Reset error state if no image
        setImageAttempts(0);
      }
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose, highlight?.modalImage]); // Add highlight?.modalImage dependency

  const handleImageError = () => {
    if (highlight?.modalImage && imageAttempts < MAX_RETRIES_MODAL) {
      const newAttemptCount = imageAttempts + 1;
      setTimeout(() => {
        setImageAttempts(newAttemptCount);
        setCurrentSrc(`${highlight.modalImage}${highlight.modalImage.includes('?') ? '&' : '?'}retry=${newAttemptCount}`);
      }, RETRY_DELAYS_MODAL[imageAttempts]);
    } else {
      setFinalImageError(true);
    }
  };

  if (!highlight) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-modal-backdrop" // Use new z-index class
          onClick={onClose} 
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="highlight-modal-title"
        >
          <motion.div
            className="bg-white rounded-xl shadow-modal w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden z-modal-content" // Use new z-index class
            onClick={(e) => e.stopPropagation()} 
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200/80">
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl text-event-accent">{highlight.icon}</span>
                <h3 id="highlight-modal-title" className="text-left text-lg sm:text-xl font-semibold text-event-blue">
                  {highlight.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-event-accent-dark transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-event-accent focus:ring-offset-2"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto flex-grow">
              {highlight.modalImage && (
                <div className="w-full aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-gray-200/70">
                  {finalImageError ? (
                     <div className="text-center p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-500">Gambar tidak ditemukan</p>
                     </div>
                  ) : (
                    <img 
                      src={currentSrc} 
                      alt={highlight.title} 
                      className="w-full h-full object-cover" 
                      onError={handleImageError}
                    />
                  )}
                </div>
              )}
              <p className="text-left text-sm sm:text-base text-event-text leading-relaxed whitespace-pre-line">
                {highlight.detailedDescription}
              </p>
            </div>
            
            <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-200/80 text-right">
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-event-blue hover:bg-event-blue-dark rounded-lg shadow-button focus:outline-none focus:ring-2 focus:ring-event-blue focus:ring-offset-2 transition-colors active:scale-95"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HighlightModal;
