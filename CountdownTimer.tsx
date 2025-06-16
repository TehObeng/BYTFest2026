import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetStartDate: string;
  targetEndDate: string;
}

// New component for animating individual digits
const AnimatedDigit: React.FC<{ digit: string }> = ({ digit }) => {
  return (
    <div style={{
      position: 'relative',
      display: 'inline-block',
      width: '1ch', // Approximate width of one character, adjust if needed
      height: '1.2em', // Ensure enough height for rotation
      lineHeight: '1.2em',
      overflow: 'visible', // Allow animations to temporarily go outside bounds
      textAlign: 'center',
    }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={digit} // Key changes when digit changes, triggering animation
          initial={{ y: '-100%', opacity: 0, rotateX: 75 }} // Start from above, tilted
          animate={{ y: '0%', opacity: 1, rotateX: 0 }}   // Arrive in place, flat
          exit={{ y: '100%', opacity: 0, rotateX: -75 }}    // Exit downwards, tilted other way
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          style={{
            display: 'inline-block',
            position: 'absolute', // Necessary for AnimatePresence to swap elements
            top: 0,
            left: 0,
            width: '100%',
            transformOrigin: 'center center',
          }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const TimeValue: React.FC<{ value: number; unit: string }> = ({ value, unit }) => {
  // Ensure value is always at least 0 and pad with leading zero if needed
  const safeValue = Math.max(0, value);
  const formattedValue = String(safeValue).padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-lg w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
      {/* Container for the digits */}
      <div className="flex text-2xl sm:text-3xl md:text-4xl font-bold text-white" aria-live="polite" aria-atomic="true" aria-label={`${value} ${unit}`}>
        {formattedValue.split('').map((digit, index) => (
          // Render each digit using AnimatedDigit
          // Key for React list is index, key for AnimatePresence in AnimatedDigit is the digit itself
          <AnimatedDigit key={index} digit={digit} />
        ))}
      </div>
      <span className="text-xs sm:text-sm text-event-blue-light uppercase tracking-wider mt-1">{unit}</span>
    </div>
  );
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetStartDate, targetEndDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [eventStatus, setEventStatus] = useState<'pending' | 'ongoing' | 'ended' | 'loading'>('loading');

  useEffect(() => {
    const calculateState = () => {
      const now = new Date().getTime();
      const startDate = new Date(targetStartDate).getTime();
      const endDate = new Date(targetEndDate).getTime();

      if (isNaN(startDate) || isNaN(endDate)) {
        setEventStatus('loading');
        setTimeLeft(null);
        return;
      }

      if (now < startDate) {
        setEventStatus('pending');
        const difference = startDate - now;
        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          });
        } else {
          // This case should ideally not be hit if logic is correct, but as a fallback:
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      } else if (now >= startDate && now <= endDate) {
        setEventStatus('ongoing');
        setTimeLeft(null); // No countdown needed when ongoing
      } else {
        setEventStatus('ended');
        setTimeLeft(null); // No countdown needed when ended
      }
    };

    calculateState(); // Initial call
    const timer = setInterval(calculateState, 1000);

    return () => clearInterval(timer);
  }, [targetStartDate, targetEndDate]); // Corrected: Removed extra parenthesis here
  
  if (eventStatus === 'loading') {
    return <div className="text-center py-6 text-white">Memuat hitung mundur...</div>;
  }

  if (eventStatus === 'ongoing') {
    return (
      <div className="text-center py-6 sm:py-8">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-event-green animate-pulse">Festival Sedang Berlangsung!</h3>
        <p className="text-sm sm:text-base text-gray-200 mt-2">Kunjungi berbagai zona dan nikmati kemeriahannya!</p>
      </div>
    );
  }

  if (eventStatus === 'ended') {
    return (
      <div className="text-center py-6 sm:py-8">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-300">Festival Telah Berakhir</h3>
        <p className="text-sm sm:text-base text-gray-400 mt-2">Terima kasih atas partisipasinya! Sampai jumpa di BYTF berikutnya.</p>
      </div>
    );
  }
  
  // This check handles the brief moment before the first timeLeft is calculated for a 'pending' event
  if (!timeLeft && eventStatus === 'pending') {
    return <div className="text-center py-6 text-white">Menyiapkan hitung mundur...</div>;
  }
  
  // Only show countdown if timeLeft is available and status is 'pending'
  if (timeLeft && eventStatus === 'pending') {
    return (
      <div className="text-center py-6 sm:py-8">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-6 sm:mb-8">
          Hitung Mundur Menuju Kemeriahan BYTF 2026!
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-5">
          <TimeValue value={timeLeft.days} unit="Hari" />
          <TimeValue value={timeLeft.hours} unit="Jam" />
          <TimeValue value={timeLeft.minutes} unit="Menit" />
          <TimeValue value={timeLeft.seconds} unit="Detik" />
        </div>
      </div>
    );
  }

  // Fallback for any unexpected state, though ideally not reached
  return <div className="text-center py-6 text-white">Memeriksa status acara...</div>;
};

export default CountdownTimer;
