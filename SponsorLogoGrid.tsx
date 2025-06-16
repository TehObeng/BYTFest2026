
import React, { useState } from 'react';
import { motion, Variants, Easing } from 'framer-motion';

export interface Sponsor {
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  tier?: string; 
  explanation?: string; 
}

interface SponsorLogoGridProps {
  sponsors: Sponsor[];
  customGridClasses?: string;
  onSponsorClick?: (sponsor: Sponsor) => void;
}

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07, // Slightly faster stagger for a tighter feel
      ease: [0.22, 1, 0.36, 1] as Easing,
    },
  },
};

const logoItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 25 }, // Slightly more pronounced entry
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45, // Slightly longer for a smoother pop
      ease: [0.22, 1, 0.36, 1] as Easing,
    },
  },
};

const SponsorImagePlaceholder: React.FC<{ sponsorName: string }> = ({ sponsorName }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100/50 p-3 rounded-lg text-center border border-gray-200">
    <svg 
      className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-1.5"
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <span className="text-xs font-medium text-event-text-muted break-words leading-tight">
      {sponsorName}
    </span>
    <span className="text-[10px] text-gray-400 leading-tight mt-0.5">
      (Logo segera hadir)
    </span>
  </div>
);

const SponsorImage: React.FC<{ sponsor: Sponsor }> = ({ sponsor }) => {
  const [hasError, setHasError] = useState(false);
  const logoActuallyAvailable = sponsor.logoUrl && sponsor.logoUrl.trim() !== '';

  if (hasError || !logoActuallyAvailable) {
    return <SponsorImagePlaceholder sponsorName={sponsor.name} />;
  }

  return (
    <img
      src={sponsor.logoUrl}
      alt={`${sponsor.name} logo`}
      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:opacity-80"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
};

const SponsorLogoGrid: React.FC<SponsorLogoGridProps> = ({ sponsors, customGridClasses, onSponsorClick }) => {
  if (!sponsors || sponsors.length === 0) {
    // This fallback is unlikely if SponsorsPage handles empty states, but good for robustness.
    return (
      <div className="w-full text-center py-6">
        <p className="text-event-text-muted italic">Informasi sponsor untuk kategori ini akan segera kami perbarui.</p>
      </div>
    );
  }

  // Default grid classes if none provided, ensuring responsiveness and item centering.
  const defaultGridClasses = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center";

  return (
    // This outer div ensures the component can be placed within a flex container by its parent for overall centering.
    // It takes full width available to it.
    <div className="w-full px-2 sm:px-0"> 
      {/* This div uses flex to center the actual grid (motion.div), especially when items are fewer than columns */}
      <div className="flex justify-center w-full">
        <motion.div
          className={customGridClasses || defaultGridClasses}
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={`${sponsor.name}-${index}`} // Ensure unique key
              variants={logoItemVariants}
              className={`
                p-3 sm:p-4 bg-white rounded-xl shadow-card hover:shadow-card-hover 
                transition-all duration-300 ease-custom-ease transform hover:scale-105 
                w-full group
                ${onSponsorClick ? 'cursor-pointer focus-within:ring-2 focus-within:ring-event-blue focus-within:ring-offset-2' : ''}
              `}
              onClick={onSponsorClick ? () => onSponsorClick(sponsor) : undefined}
              role={onSponsorClick ? "button" : undefined}
              tabIndex={onSponsorClick ? 0 : undefined}
              onKeyDown={onSponsorClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onSponsorClick(sponsor); } : undefined}
              aria-label={onSponsorClick ? `Lihat detail untuk ${sponsor.name}` : `${sponsor.name} logo`}
            >
              <div
                title={onSponsorClick ? `Lihat detail untuk ${sponsor.name}` : sponsor.name}
                className="block aspect-[3/2] flex items-center justify-center overflow-hidden" // Ensure image doesn't break aspect ratio
              >
                <SponsorImage sponsor={sponsor} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SponsorLogoGrid;
