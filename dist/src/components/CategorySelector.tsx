
import React from 'react';

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <nav className="flex flex-wrap gap-2.5 md:gap-3.5 mb-8 pb-4 border-b border-gray-200 justify-center" aria-label="Q&A Categories">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`
            px-4 py-2.5 sm:px-5 text-xs sm:text-sm font-medium capitalize rounded-lg
            transition-all duration-200 ease-custom-ease transform focus:outline-none 
            focus:ring-2 focus:ring-offset-2 focus:ring-event-blue
            ${selectedCategory === category 
              ? 'bg-event-blue text-white font-semibold shadow-button border-transparent' 
              : 'bg-gray-100 text-event-text-muted border border-gray-300 hover:bg-event-blue-extralight hover:text-event-blue hover:border-event-blue-light active:bg-event-blue-light/70 active:text-event-blue-dark'
            }
          `}
          aria-pressed={selectedCategory === category}
        >
          {category.replace(/ \/ /g, ' / ')}
        </button>
      ))}
    </nav>
  );
};

export default CategorySelector;
