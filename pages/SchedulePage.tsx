
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants, Easing } from 'framer-motion';
import { scheduleData, festivalZones, Activity } from '../data/schedule-data';

const pageTitleStyle = "text-left text-3xl sm:text-4xl md:text-4xl font-bold text-event-text-heading mt-0 mb-10 pb-5 border-b-2 border-gray-200";
const sectionTitleStyle = "text-left text-xl sm:text-2xl md:text-3xl font-semibold text-event-text-heading mt-10 mb-6";
const paragraphStyle = "mb-6 leading-relaxed text-event-text text-justify text-sm sm:text-base";

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.05 } 
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

const tabContentVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as Easing, staggerChildren: 0.07 }
  },
  exit: { 
    opacity: 0, 
    y: -15,
    transition: { duration: 0.3, ease: [0.64,0,0.78,0] as Easing }
  }
};

const activityItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as Easing }
  }
};

const zoneCardVariants: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as Easing,
    },
  }),
};


const ActivityItem: React.FC<{ activity: Activity, index: number }> = ({ activity, index }) => {
  const handleArtistLinkClick = (artistId: string) => {
    const lineupNavButton = document.getElementById('nav-lineup');
    if (lineupNavButton) {
      // Basic navigation for now. Advanced linking/state passing is more complex.
      // Ideally, LineupPage would accept a prop or query param to highlight/scroll to an artist.
      lineupNavButton.click(); 
      // Example: history.pushState(null, '', `/lineup?artist=${artistId}`); // if using React Router or similar
    }
  };

  const renderActivityText = (act: Activity) => {
    if (act.linkedArtist) {
      // Simple case: act.text is "Prefix text for " and linkedArtist.name is the link.
      // More complex parsing would be needed if artist name is embedded within act.text.
      return (
        <>
          {act.text}
          <button 
            onClick={() => handleArtistLinkClick(act.linkedArtist!.id)}
            className="font-semibold text-event-accent hover:text-event-accent-dark hover:underline focus:outline-none focus:ring-1 focus:ring-event-accent-light rounded-sm"
            aria-label={`Lihat detail untuk ${act.linkedArtist.name}`}
          >
            {act.linkedArtist.name}
          </button>
          {act.emphasis && <span className="italic text-gray-500 ml-1">{act.emphasis}</span>}
        </>
      );
    }
    return (
      <>
        <span className={`${activity.highlightColor || 'text-event-text'} font-medium`}>{activity.text}</span> 
        {activity.emphasis && <span className="italic text-gray-500 ml-1">{activity.emphasis}</span>}
      </>
    );
  };


  return (
    <motion.li 
      custom={index} 
      variants={activityItemVariants}
      className="flex items-start gap-3 p-3 bg-white hover:bg-gray-50/70 rounded-lg shadow-sm border border-gray-200/70 transition-colors duration-150"
    >
      {activity.icon && <span className="text-2xl text-event-accent-light mt-0.5 shrink-0" aria-hidden="true">{activity.icon}</span>}
      <div className="flex-grow">
        {activity.time && <span className="block font-semibold text-event-blue-dark text-xs mb-0.5">[{activity.time}]</span>}
        <div className="text-sm text-event-text-muted leading-relaxed">
          {renderActivityText(activity)}
        </div>
      </div>
    </motion.li>
  );
};


const SchedulePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <motion.div 
      id="schedule"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="space-y-10"
    >
      <motion.h2 className={pageTitleStyle} variants={titleVariants}>Jadwal Rangkaian Acara BYTF 2026</motion.h2>
      <motion.p className={paragraphStyle} variants={titleVariants} transition={{delay: 0.05}}>
        Bersiaplah untuk enam hari penuh kemeriahan, inspirasi, dan kreativitas! Berikut adalah gambaran umum rangkaian acara BYTF 2026 yang akan berlangsung dari <strong className="text-event-blue font-semibold">1 - 6 Juni 2026</strong>. Jadwal detail, termasuk jam penampilan artis dan lokasi spesifik, akan diumumkan secara berkala mendekati tanggal pelaksanaan. Pantau terus update kami!
      </motion.p>

      {/* Tabs for Day Groups */}
      <motion.div 
        className="mb-8"
        variants={titleVariants}
        transition={{delay: 0.1}}
      >
        <div className="flex flex-wrap border-b border-gray-300" role="tablist" aria-label="Jadwal Festival Harian">
          {scheduleData.map((dayGroup, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`tabpanel-${index}`}
              id={`tab-${index}`}
              onClick={() => setActiveTab(index)}
              className={`
                px-4 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-medium -mb-px border-b-2 transition-all duration-200 ease-custom-ease
                focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-event-accent z-10
                ${activeTab === index 
                  ? 'border-event-accent text-event-accent font-semibold' 
                  : 'border-transparent text-event-text-muted hover:text-event-blue hover:border-gray-400'
                }
              `}
            >
              {dayGroup.shortTitle}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {scheduleData.map((dayGroup, index) => 
          activeTab === index && (
            <motion.section 
              key={index}
              id={`tabpanel-${index}`}
              role="tabpanel"
              aria-labelledby={`tab-${index}`}
              className={`p-1 bg-gray-50/80 rounded-xl shadow-inner`}
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={`p-4 sm:p-5 bg-white border-l-4 ${dayGroup.borderColorClass} rounded-r-lg shadow-card`}>
                <h3 className="text-left text-lg sm:text-xl font-semibold text-event-text-heading mb-4">{dayGroup.title}</h3>
                <motion.ul 
                  className="space-y-3.5"
                  variants={tabContentVariants} 
                >
                  {dayGroup.activities.map((activity, actIndex) => (
                    <ActivityItem key={actIndex} activity={activity} index={actIndex} />
                  ))}
                </motion.ul>
              </div>
            </motion.section>
          )
        )}
      </AnimatePresence>

      <motion.section 
        className="mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={pageVariants} 
      >
          <motion.h3 className={sectionTitleStyle} variants={titleVariants}>Jelajahi Zona-Zona Menarik Kami:</motion.h3>
          <motion.p className={`${paragraphStyle} mb-8`} variants={titleVariants} transition={{delay:0.05}}>Setiap sudut BYTF 2026 dirancang untuk memberikan pengalaman unik. Temukan favoritmu di zona-zona berikut:</motion.p>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={tabContentVariants} 
          >
              {festivalZones.map((zone, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-white p-5 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease transform hover:-translate-y-1 group border border-gray-200/70"
                    custom={index}
                    variants={zoneCardVariants} 
                  >
                    <div className="text-4xl mb-3 text-event-accent" aria-hidden="true">{zone.icon}</div>
                    <h4 className="font-semibold text-event-accent text-lg mb-2 group-hover:text-event-accent-dark transition-colors">{zone.title}</h4>
                    <p className="text-sm text-event-text-muted leading-relaxed">{zone.description}</p>
                  </motion.div>
              ))}
          </motion.div>
      </motion.section>
      <motion.p 
        className="text-xs sm:text-sm text-gray-500 italic mt-12 block text-center"
        variants={titleVariants}
        transition={{ delay: 0.1 }}
      >
        <em>Jadwal, pengisi acara, dan detail zona dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Pastikan untuk selalu memeriksa informasi terbaru di website resmi dan akun media sosial kami @bytf.official.</em>
      </motion.p>
    </motion.div>
  );
};

export default SchedulePage;
