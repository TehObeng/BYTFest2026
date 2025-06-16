
import React, { useState } from 'react';
import { QnaItem } from './data/qna-data';
import { motion, Variants, Easing, AnimatePresence } from 'framer-motion';

interface QnaDisplayProps {
  items: QnaItem[];
}

const qnaItemVariants: Variants = { 
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06, 
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as Easing 
    }
  })
};

const answerVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    marginTop: 0, 
    paddingTop: 0,
    paddingBottom: 0,
    transition: { duration: 0.25, ease: [0.42, 0, 0.58, 1] as Easing }
  },
  visible: {
    opacity: 1,
    height: 'auto',
    marginTop: '0.75rem', // pt-3
    paddingTop: '0.75rem', // pt-3
    paddingBottom: '0.75rem', // pb-3
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as Easing }
  }
};

const QnaDisplay: React.FC<QnaDisplayProps> = ({ items }) => {
  const [pinnedIndices, setPinnedIndices] = useState<Set<number>>(new Set());

  if (!items || items.length === 0) {
    return <p className="text-event-text-muted text-center py-6 text-sm sm:text-base">Silakan pilih kategori untuk melihat tanya jawab.</p>;
  }

  const handleTogglePin = (index: number) => {
    setPinnedIndices(prevPinned => {
      const newPinned = new Set(prevPinned);
      if (newPinned.has(index)) {
        newPinned.delete(index);
      } else {
        newPinned.add(index);
      }
      return newPinned;
    });
  };

  return (
    <div className="mt-4 space-y-4 sm:space-y-5">
      {items.map((item, index) => {
        const isPinned = pinnedIndices.has(index);
        const isOpen = isPinned; 
        const answerId = `qna-answer-${index}`;

        return (
          <motion.div 
            key={item.q + index} 
            className="bg-white border border-gray-200/80 p-4 sm:p-5 md:p-6 rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 ease-custom-ease"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }} 
            variants={qnaItemVariants}
          >
            <button
              type="button"
              onClick={() => handleTogglePin(index)}
              aria-expanded={isOpen}
              aria-controls={answerId}
              className={`w-full text-left font-semibold text-event-accent text-base md:text-lg cursor-pointer list-none flex justify-between items-center ${isOpen ? 'pb-3' : ''} transition-all duration-200 ease-custom-ease focus:outline-none focus:ring-2 focus:ring-event-accent focus:ring-offset-2 rounded-md p-1 -m-1`}
            >
              {item.q}
              <span className={`text-event-accent-light transition-transform duration-300 ease-custom-ease ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={answerId}
                  key="answer" 
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={answerVariants}
                  className="overflow-hidden border-t border-gray-200/80" 
                >
                  <p className="text-left text-event-text text-sm md:text-base whitespace-pre-line pt-3">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default QnaDisplay;
