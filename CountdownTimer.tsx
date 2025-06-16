
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

const AnimatedDigit: React.FC<{ digit: string }> = ({ digit }) => {
  return (
    <div style={{
      position: 'relative',
      display: 'inline-block',
      width: '1ch', 
      height: '1.2em', 
      lineHeight: '1.2em',
      overflow: 'visible', 
      textAlign: 'center',
    }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={digit} 
          initial={{ y: '-100%', opacity: 0, rotateX: 75 }} 
          animate={{ y: '0%', opacity: 1, rotateX: 0 }}   
          exit={{ y: '100%', opacity: 0, rotateX: -75 }}    
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          style={{
            display: 'inline-block',
            position: 'absolute', 
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
  const safeValue = Math.max(0, value);
  const formattedValue = String(safeValue).padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center bg-black/25 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-lg w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
      <div className="flex text-2xl sm:text-3xl md:text-4xl font-bold text-white" aria-live="polite" aria-atomic="true" aria-label={`${value} ${unit}`}>
        {formattedValue.split('').map((digit, index) => (
          <AnimatedDigit key={index} digit={digit} />
        ))}
      </div>
      <span className="text-xs sm:text-sm text-event-blue-extralight uppercase tracking-wider mt-1">{unit}</span>
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
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      } else if (now >= startDate && now <= endDate) {
        setEventStatus('ongoing');
        setTimeLeft(null); 
      } else {
        setEventStatus('ended');
        setTimeLeft(null); 
      }
    };

    calculateState(); 
    const timer = setInterval(calculateState, 1000);

    return () => clearInterval(timer);
  }, [targetStartDate, targetEndDate]);
  
  if (eventStatus === 'loading') {
    return <div className="text-center py-6 text-gray-200">Memuat hitung mundur...</div>;
  }

  if (eventStatus === 'ongoing') {
    return (
      <div className="text-center py-6 sm:py-8">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-event-green animate-pulseLight">Festival Sedang Berlangsung!</h3>
        <p className="text-sm sm:text-base text-gray-100 mt-2">Kunjungi berbagai zona dan nikmati kemeriahannya!</p>
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
  
  if (!timeLeft && eventStatus === 'pending') {
    return <div className="text-center py-6 text-gray-200">Menyiapkan hitung mundur...</div>;
  }
  
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

  return <div className="text-center py-6 text-gray-200">Memeriksa status acara...</div>;
};

export default CountdownTimer;
