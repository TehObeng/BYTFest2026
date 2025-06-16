
import React, { useState, useEffect } from 'react';
import { qnaData } from '../data/qna-data';
import CategorySelector from '../CategorySelector';
import QnaDisplay from '../QnaDisplay';
import { motion, Variants, Easing } from 'framer-motion';

const pageTitleStyle = "text-left text-3xl sm:text-4xl md:text-4xl font-bold text-event-text-heading mt-0 mb-10 pb-5 border-b-2 border-gray-200";

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 } // Slight delay for children
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


const QnaPage: React.FC = () => {
  const categories = Object.keys(qnaData);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    if (categories.length > 0) {
        if (!selectedCategory || !categories.includes(selectedCategory)) {
            setSelectedCategory(categories[0]);
        }
    } else {
        setSelectedCategory('');
    }
  }, [categories, selectedCategory]);


  return (
    <motion.div 
      id="qna"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="space-y-8" // Add some spacing for content flow
    >
      <motion.h2 className={pageTitleStyle} variants={titleVariants}>Informasi & Pertanyaan Umum (Info & Q&A)</motion.h2>
      {categories.length > 0 && selectedCategory ? (
        <>
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <QnaDisplay items={qnaData[selectedCategory] || []} />
        </>
      ) : (
        <motion.p 
          className="text-event-text-muted py-4 text-sm sm:text-base text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Data Q&A tidak tersedia saat ini atau kategori tidak valid.
        </motion.p>
      )}
    </motion.div>
  );
};

export default QnaPage;
