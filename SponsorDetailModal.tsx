
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants, Easing } from 'framer-motion';
import { Sponsor } from './SponsorLogoGrid'; // Assuming Sponsor type is here

interface SponsorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  sponsor: Sponsor | null;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" as Easing } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" as Easing } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as Easing } },
  exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.25, ease: "easeIn" as Easing } },
};

const SponsorDetailModal: React.FC<SponsorDetailModalProps> = ({ isOpen, onClose, sponsor }) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscapeKey);
      setImageError(false); // Reset image error state when modal opens with a new sponsor
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!sponsor) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-[100]"
          onClick={onClose}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sponsor-modal-title"
          aria-describedby="sponsor-modal-description"
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between p-4 sm:p-5 border-b border-gray-200">
              <h3 id="sponsor-modal-title" className="text-xl sm:text-2xl font-semibold text-event-blue">
                {sponsor.name}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-event-blue transition-colors rounded-full p-1 -mt-1 -mr-1 focus:outline-none focus:ring-2 focus:ring-event-blue focus:ring-offset-2"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-grow">
              <div className="flex justify-center mb-5 items-center bg-gray-50 p-4 rounded-lg min-h-[150px]">
                {imageError || !sponsor.logoUrl ? (
                   <div className="text-center text-event-text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Logo tidak tersedia
                   </div>
                ) : (
                  <img 
                    src={sponsor.logoUrl} 
                    alt={`${sponsor.name} logo`}
                    className="max-h-36 sm:max-h-48 object-contain"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
              
              <p id="sponsor-modal-description" className="text-sm sm:text-base text-event-text-muted leading-relaxed whitespace-pre-line">
                {sponsor.explanation || "Informasi lebih lanjut tentang sponsor ini akan segera hadir."}
              </p>
            </div>
            
            {/* Modal Footer */}
            <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-end items-center gap-3">
              {sponsor.websiteUrl && sponsor.websiteUrl !== '#' && (
                <a
                  href={sponsor.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-event-green hover:bg-event-green-dark rounded-lg shadow-button focus:outline-none focus:ring-2 focus:ring-event-green focus:ring-offset-2 transition-colors text-center"
                >
                  Kunjungi Website
                </a>
              )}
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors text-center"
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

export default SponsorDetailModal;
