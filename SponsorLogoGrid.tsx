
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      ease: [0.22, 1, 0.36, 1] as Easing,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
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

const SponsorImagePlaceholder: React.FC<{ sponsorName: string }> = ({ sponsorName }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 border border-gray-200/80 rounded-lg p-3 text-center">
    <svg
      className="w-10 h-10 text-gray-300 mb-2" // Lighter icon color
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <div className="text-sm font-medium text-gray-500">{sponsorName}</div>
    <div className="text-xs text-gray-400">(Logo Segera)</div>
  </div>
);

const SponsorImage: React.FC<{ sponsor: Sponsor }> = ({ sponsor }) => {
  const [hasError, setHasError] = useState(false);
  const validLogo = sponsor.logoUrl?.trim();

  if (hasError || !validLogo) {
    return <SponsorImagePlaceholder sponsorName={sponsor.name} />;
  }

  return (
    <img
      src={sponsor.logoUrl}
      alt={`${sponsor.name} logo`}
      loading="lazy"
      onError={() => setHasError(true)}
      className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-85" // Slightly less opacity reduction on hover
    />
  );
};

const SponsorLogoGrid: React.FC<SponsorLogoGridProps> = ({
  sponsors,
  customGridClasses,
  onSponsorClick,
}) => {
  if (!sponsors || sponsors.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-event-text-muted italic">Data sponsor belum tersedia.</p>
      </div>
    );
  }

  const gridClasses =
    customGridClasses ||
    'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center';

  return (
    <div className="w-full px-2 sm:px-4"> {/* Added slight horizontal padding */}
      <motion.div
        className={`${gridClasses} mx-auto w-fit`} // w-fit can be tricky, ensure parent has width or use max-w
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {sponsors.map((sponsor, idx) => (
          <motion.div
            key={`${sponsor.name}-${idx}`}
            variants={itemVariants}
            onClick={onSponsorClick ? () => onSponsorClick(sponsor) : undefined}
            role={onSponsorClick ? 'button' : undefined}
            tabIndex={onSponsorClick ? 0 : undefined}
            onKeyDown={
              onSponsorClick
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') onSponsorClick(sponsor);
                  }
                : undefined
            }
            aria-label={sponsor.name}
            className={`
              w-full max-w-[150px] sm:max-w-[160px] aspect-[3/2] p-3 sm:p-4 bg-white rounded-xl shadow-card hover:shadow-card-hover
              transition-all duration-300 transform hover:scale-105 group border border-gray-100/80
              ${onSponsorClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-event-blue focus:ring-offset-2' : ''}
            `}
          >
            <SponsorImage sponsor={sponsor} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SponsorLogoGrid;
