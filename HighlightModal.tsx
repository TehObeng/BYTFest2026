
import React, { useEffect } from 'react';
import { motion, AnimatePresence, Variants, Easing } from 'framer-motion';

export interface HighlightData {
  title: string;
  description: string; // Original short description for the card
  icon: string;
  detailedDescription: string; // New detailed description for the modal
  modalImage?: string; // Optional image for the modal
}

interface HighlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlight: HighlightData | null;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" as Easing } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as Easing } },
  exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2, ease: "easeIn" as Easing } },
};

const HighlightModal: React.FC<HighlightModalProps> = ({ isOpen, onClose, highlight }) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      window.addEventListener('keydown', handleEscapeKey);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!highlight) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[100]"
          onClick={onClose} // Close on overlay click
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="highlight-modal-title"
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl">{highlight.icon}</span>
                <h3 id="highlight-modal-title" className="text-left text-lg sm:text-xl font-semibold text-event-blue">
                  {highlight.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-event-blue transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-event-blue focus:ring-offset-2"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-grow">
              {highlight.modalImage && (
                <img 
                  src={highlight.modalImage} 
                  alt={highlight.title} 
                  className="w-full h-48 object-cover rounded-md mb-4" 
                />
              )}
              <p className="text-left text-sm sm:text-base text-event-text-muted leading-relaxed whitespace-pre-line">
                {highlight.detailedDescription}
              </p>
            </div>
            
            {/* Modal Footer (Optional, e.g., for extra actions) */}
            <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-200 text-right">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-white bg-event-blue hover:bg-event-blue-dark rounded-lg shadow-button focus:outline-none focus:ring-2 focus:ring-event-blue focus:ring-offset-2 transition-colors"
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