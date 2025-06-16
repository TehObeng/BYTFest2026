
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
            focus:ring-2 focus:ring-offset-2 focus:ring-event-accent
            ${selectedCategory === category 
              ? 'bg-event-accent text-white font-semibold shadow-button border-transparent' 
              : 'bg-gray-100 text-event-text-muted border border-gray-300 hover:bg-event-accent/10 hover:text-event-accent hover:border-event-accent/30 active:bg-event-accent/20 active:text-event-accent-dark'
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
