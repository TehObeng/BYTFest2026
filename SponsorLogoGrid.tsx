import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';

export interface Sponsor {
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  tier?: string; // Optional: for future styling or grouping
}

interface SponsorLogoGridProps {
  sponsors: Sponsor[];
  title?: string;
}

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      ease: [0.22, 1, 0.36, 1] as Easing,
    },
  },
};

const logoItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as Easing,
    },
  },
};

const SponsorLogoGrid: React.FC<SponsorLogoGridProps> = ({ sponsors, title }) => {
  if (!sponsors || sponsors.length === 0) {
    return null; // Or a message indicating no sponsors yet
  }

  return (
    <section className="mt-8 sm:mt-10 mb-6 sm:mb-8"> {/* Adjusted margin for mobile */}
      {title && <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-event-text-heading mb-6 sm:mb-8 text-center">{title}</h3>} {/* Adjusted font size and margin */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-center" // Adjusted gap for mobile
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={index}
            variants={logoItemVariants}
            className="p-2 sm:p-3 bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease transform hover:scale-105" // Adjusted padding
          >
            <a
              href={sponsor.websiteUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              title={`Visit ${sponsor.name}`}
              className="block aspect-[3/2] flex items-center justify-center" // Maintain aspect ratio, center content
            >
              <img
                src={sponsor.logoUrl}
                alt={`${sponsor.name} logo`}
                className="max-h-full max-w-full object-contain" // Ensure logo fits and maintains aspect ratio
                loading="lazy"
              />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SponsorLogoGrid;