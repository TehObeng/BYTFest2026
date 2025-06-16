
import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import { ticketData, TicketTier } from '../data/ticket-data'; 

const pageTitleStyle = "text-left text-3xl sm:text-4xl md:text-4xl font-bold text-event-text-heading mt-0 mb-10 pb-5 border-b-2 border-gray-200";

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.08, delayChildren: 0.1 } 
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

const ticketCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as Easing
    }
  })
};

// Simple Benefit Icons (can be replaced with more specific SVGs if needed)
const BenefitIcon: React.FC<{ benefitText: string }> = ({ benefitText }) => {
  let icon = "🎟️"; // Default icon
  if (benefitText.toLowerCase().includes("vip")) icon = "⭐";
  else if (benefitText.toLowerCase().includes("merchandise")) icon = "🎁";
  else if (benefitText.toLowerCase().includes("hemat") || benefitText.toLowerCase().includes("ekonomis")) icon = "💰";
  else if (benefitText.toLowerCase().includes("akses")) icon = "🚪";
  else if (benefitText.toLowerCase().includes("zona")) icon = "📍";
  else if (benefitText.toLowerCase().includes("fast lane")) icon = "🚀";
  else if (benefitText.toLowerCase().includes("lounge")) icon = "🛋️";
  else if (benefitText.toLowerCase().includes("toilet")) icon = "🚻";
  
  return <span className="mr-2.5 text-event-accent" aria-hidden="true">{icon}</span>;
};


const TicketsPage: React.FC = () => {
  return (
    <motion.div
      id="tickets"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="space-y-10"
    >
      <motion.h2 className={pageTitleStyle} variants={titleVariants}>
        Tiket BYTF 2026
      </motion.h2>

      <motion.p 
        className="text-sm sm:text-base text-event-text-muted mb-10 text-center"
        variants={titleVariants}
        transition={{ delay: 0.1 }}
      >
        Amankan tiketmu sekarang untuk menjadi bagian dari kemeriahan Batam Youth & Tourism Festival 2026! 
        Pilih tiket yang paling sesuai dengan kebutuhanmu. Hari 1-4 GRATIS untuk area festival umum! Konser utama dan akses penuh pada Hari 5 & 6 memerlukan tiket berbayar.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {ticketData.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            custom={index}
            variants={ticketCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className={`
              bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease 
              flex flex-col transform hover:-translate-y-1.5
              ${ticket.isFeatured ? 'border-2 border-event-green ring-4 ring-event-green/25 hover:shadow-glow-accent' : 'border border-gray-200/80'}
            `}
          >
            {ticket.isFeatured && (
              <div className="bg-event-green text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-t-lg text-center shadow-sm">
                🔥 Paling Populer
              </div>
            )}
            <div className="p-5 sm:p-6 flex-grow flex flex-col">
              <h3 className={`text-left text-xl lg:text-2xl font-bold mb-2.5 group-hover:text-event-blue-dark transition-colors ${ticket.isFeatured ? 'text-event-green-dark' : 'text-event-blue'}`}>{ticket.name}</h3>
              <div className="mb-5">
                <span className={`text-2xl lg:text-3xl font-extrabold ${ticket.price === "GRATIS" ? "text-event-green" : ticket.isFeatured ? "text-event-green-dark" : "text-event-text-heading"}`}>
                  {ticket.price}
                </span>
                {ticket.originalPrice && (
                  <span className="text-sm text-gray-400 line-through ml-2.5">{ticket.originalPrice}</span>
                )}
              </div>
              
              <ul className="text-sm text-event-text-muted space-y-2.5 mb-6 flex-grow">
                {ticket.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <BenefitIcon benefitText={benefit} /> 
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {ticket.note && (
                <p className="text-xs text-red-600 font-semibold italic mb-4 p-2 bg-red-50 rounded-md border border-red-200">{ticket.note}</p>
              )}

              <p className={`text-sm font-semibold mb-5 
                ${ticket.availability === 'Tersedia' ? 'text-green-600' : 
                  ticket.availability === 'Segera Hadir' ? 'text-sky-600' : 
                  ticket.availability === 'Terbatas' ? 'text-orange-600' : 'text-red-600'}`}>
                Status: {ticket.availability}
              </p>
              
              {ticket.price !== "GRATIS" && (
                <motion.a
                  href={ticket.purchaseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    w-full mt-auto text-center font-semibold py-3 px-6 rounded-lg transition-all duration-200 ease-custom-ease active:scale-95 shadow-md hover:shadow-lg
                    ${ticket.availability === 'Habis Terjual' || ticket.availability === 'Segera Hadir'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : ticket.isFeatured ? 'bg-event-green text-white hover:bg-event-green-dark focus:ring-event-green-light' : 'bg-event-blue text-white hover:bg-event-blue-dark focus:ring-event-blue-light'
                    }
                     focus:outline-none focus:ring-2 focus:ring-offset-2 
                  `}
                  aria-disabled={ticket.availability === 'Habis Terjual' || ticket.availability === 'Segera Hadir'}
                  onClick={(e) => {
                    if (ticket.availability === 'Habis Terjual' || ticket.availability === 'Segera Hadir') {
                      e.preventDefault();
                    }
                  }}
                  whileHover={ (ticket.availability !== 'Habis Terjual' && ticket.availability !== 'Segera Hadir') ? { scale: 1.03, y: -2 } : {}}
                  whileTap={ (ticket.availability !== 'Habis Terjual' && ticket.availability !== 'Segera Hadir') ? { scale: 0.97 } : {}}
                >
                  {ticket.availability === 'Habis Terjual' ? 'Tiket Habis' : ticket.availability === 'Segera Hadir' ? 'Segera Hadir' : ticket.isFeatured ? 'Dapatkan Tiket Spesial!' : 'Beli Tiket'}
                </motion.a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-12 p-6 bg-event-blue-extralight rounded-xl shadow-lg border border-event-blue-light/50"
        variants={titleVariants}
        transition={{ delay: 0.2 }}
        >
        <h4 className="text-lg sm:text-xl font-semibold text-event-blue-dark mb-3 text-left flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-event-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Informasi Penting Tiket:
        </h4>
        <ul className="list-none pl-0 text-sm text-event-text-muted space-y-2 leading-relaxed">
          <li className="flex items-start"><span className="mr-2 text-event-blue-dark">●</span>Tiket yang sudah dibeli tidak dapat di-refund, namun dapat dipindahtangankan (syarat & ketentuan berlaku, akan diinfo lebih lanjut).</li>
          <li className="flex items-start"><span className="mr-2 text-event-blue-dark">●</span>Harga tiket belum termasuk pajak dan biaya platform (jika ada, akan tertera saat pembelian).</li>
          <li className="flex items-start"><span className="mr-2 text-event-blue-dark">●</span>Anak di bawah usia 5 tahun gratis masuk ke area festival umum pada Hari 1-4 (tidak berlaku untuk area konser berbayar pada Hari 5 & 6, pendampingan orang tua wajib).</li>
          <li className="flex items-start"><span className="mr-2 text-event-blue-dark">●</span>E-ticket akan dikirimkan ke email Anda setelah pembayaran berhasil dikonfirmasi. Tunjukkan e-ticket (digital atau cetak) saat penukaran dengan wristband resmi di lokasi festival.</li>
          <li className="flex items-start"><span className="mr-2 text-event-blue-dark">●</span>Untuk pertanyaan lebih lanjut seputar tiket, silakan hubungi kami melalui halaman <a href="#contact" onClick={(e) => { e.preventDefault(); const navContact = document.getElementById('nav-contact'); if(navContact) navContact.click(); }} className="text-event-blue hover:underline font-medium">Kontak</a> kami.</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default TicketsPage;
