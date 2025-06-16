
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants, Easing } from 'framer-motion';
import { Sponsor } from './SponsorLogoGrid';

interface SponsorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  sponsor: Sponsor | null;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" as Easing } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" as Easing } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as Easing, delay: 0.1 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.25, ease: [0.64, 0, 0.78, 0] as Easing } },
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
      if (sponsor) { // Reset error only if a new sponsor is loaded
          setImageError(false);
      }
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose, sponsor]);

  if (!sponsor) return null;

  const logoActuallyAvailable = sponsor.logoUrl && sponsor.logoUrl.trim() !== '';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-overlay-backdrop" // Use custom z-index class
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
            className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden z-overlay-content" // Use custom z-index class
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="document"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between p-5 sm:p-6 border-b border-gray-200">
              <h3 id="sponsor-modal-title" className="text-xl sm:text-2xl font-bold text-event-blue leading-tight">
                {sponsor.name}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-event-blue-dark transition-colors rounded-full p-1.5 -mt-1 -mr-1.5 focus:outline-none focus:ring-2 focus:ring-event-blue focus:ring-offset-2"
                aria-label="Tutup Detail Sponsor"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-grow space-y-5">
              <div className="flex justify-center items-center bg-gray-50 p-6 rounded-lg min-h-[180px] border border-gray-100">
                {imageError || !logoActuallyAvailable ? (
                   <div className="text-center text-event-text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Logo tidak tersedia untuk {sponsor.name}
                   </div>
                ) : (
                  <img 
                    src={sponsor.logoUrl} 
                    alt={`${sponsor.name} logo`}
                    className="max-h-40 sm:max-h-48 object-contain"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
              
              <div id="sponsor-modal-description" className="text-sm sm:text-base text-event-text-muted leading-relaxed whitespace-pre-line prose prose-sm max-w-none">
                <p>{sponsor.explanation || "Informasi lebih lanjut mengenai kontribusi dan kemitraan dengan sponsor ini akan segera kami perbarui. Terima kasih atas dukungan mereka!"}</p>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-end items-center gap-3">
              {sponsor.websiteUrl && sponsor.websiteUrl !== '#' && (
                <a
                  href={sponsor.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-event-green hover:bg-event-green-dark rounded-lg shadow-button focus:outline-none focus:ring-2 focus:ring-event-green focus:ring-offset-2 transition-colors text-center inline-flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0l-4-4a2 2 0 012.828-2.828L8 7.172l2.586-2.586zM12 10a2 2 0 01-2.828 0L6 6.828a4 4 0 105.656 5.656l.707-.707A4.004 4.004 0 0012 10z" clipRule="evenodd" />
                  </svg>
                  Kunjungi Website
                </a>
              )}
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors text-center"
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
