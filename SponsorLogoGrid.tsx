
import React, { useState } from 'react';
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

// Sub-component to handle individual sponsor image loading and error state
const SponsorImage: React.FC<{ sponsor: Sponsor }> = ({ sponsor }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !sponsor.logoUrl) {
    // Fallback UI if image fails to load or URL is missing
    return (
      <div className="w-full h-full flex items-center justify-center text-xs text-event-text-muted bg-gray-100 p-2 text-center break-words rounded-md">
        {`${sponsor.name}`}
      </div>
    );
  }

  return (
    <img
      src={sponsor.logoUrl}
      alt={`${sponsor.name} logo`}
      className="max-h-full max-w-full object-contain"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
};

const SponsorLogoGrid: React.FC<SponsorLogoGridProps> = ({ sponsors, title }) => {
  if (!sponsors || sponsors.length === 0) {
    return (
      <section className="mt-8 sm:mt-10 mb-6 sm:mb-8">
         {title && <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-event-text-heading mb-6 sm:mb-8 text-center">{title}</h3>}
        <p className="text-center text-event-text-muted">Sponsor akan segera diumumkan.</p>
      </section>
    );
  }

  return (
    <section className="mt-8 sm:mt-10 mb-6 sm:mb-8">
      {title && <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-event-text-heading mb-6 sm:mb-8 text-center">{title}</h3>}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-center"
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={index}
            variants={logoItemVariants}
            className="p-2 sm:p-3 bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease transform hover:scale-105"
          >
            <a
              href={sponsor.websiteUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              title={`Visit ${sponsor.name}`}
              className="block aspect-[3/2] flex items-center justify-center" // Ensure <a> tag itself handles aspect ratio
            >
              <SponsorImage sponsor={sponsor} />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SponsorLogoGrid;
