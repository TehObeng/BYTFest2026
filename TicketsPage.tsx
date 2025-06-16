
import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import { ticketData, TicketTier } from './ticket-data'; // Import data and type

const pageTitleStyle = "text-left text-2xl sm:text-3xl md:text-4xl font-bold text-event-text-heading mt-0 mb-8 pb-4 border-b-2 border-gray-200";

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as Easing
    }
  })
};

const TicketsPage: React.FC = () => {
  return (
    <motion.div
      id="tickets"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="space-y-8"
    >
      <motion.h2 className={pageTitleStyle} variants={titleVariants}>
        Tiket BYTF 2026
      </motion.h2>

      <motion.p 
        className="text-sm sm:text-base text-event-text-muted mb-10 text-center"
        variants={titleVariants}
        transition={{ delay: 0.15 }}
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
            viewport={{ once: true, amount: 0.2 }}
            className={`
              bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease 
              flex flex-col
              ${ticket.isFeatured ? 'border-2 border-event-green ring-4 ring-event-green/20' : 'border border-gray-200'}
            `}
          >
            {ticket.isFeatured && (
              <div className="bg-event-green text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-t-lg text-center">
                Paling Populer
              </div>
            )}
            <div className="p-5 sm:p-6 flex-grow flex flex-col">
              <h3 className="text-left text-xl lg:text-2xl font-bold text-event-blue mb-2">{ticket.name}</h3>
              <div className="mb-4">
                <span className={`text-2xl lg:text-3xl font-extrabold ${ticket.price === "GRATIS" ? "text-event-green" : "text-event-text-heading"}`}>
                  {ticket.price}
                </span>
                {ticket.originalPrice && (
                  <span className="text-sm text-gray-400 line-through ml-2">{ticket.originalPrice}</span>
                )}
              </div>
              
              <ul className="list-disc list-inside text-sm text-event-text-muted space-y-1.5 mb-6 flex-grow">
                {ticket.benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>

              {ticket.note && (
                <p className="text-xs text-red-600 font-semibold italic mb-3">{ticket.note}</p>
              )}

              <p className={`text-sm font-semibold mb-4 
                ${ticket.availability === 'Tersedia' ? 'text-green-600' : 
                  ticket.availability === 'Segera Hadir' ? 'text-sky-600' : 
                  ticket.availability === 'Terbatas' ? 'text-orange-600' : 'text-red-600'}`}>
                Status: {ticket.availability}
              </p>
              
              {ticket.price !== "GRATIS" && (
                <a
                  href={ticket.purchaseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    w-full mt-auto text-center font-semibold py-3 px-6 rounded-lg transition-colors duration-200 ease-custom-ease
                    ${ticket.availability === 'Habis Terjual' || ticket.availability === 'Segera Hadir'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-event-green text-white hover:bg-event-green-dark shadow-button'
                    }
                  `}
                  aria-disabled={ticket.availability === 'Habis Terjual' || ticket.availability === 'Segera Hadir'}
                  onClick={(e) => {
                    if (ticket.availability === 'Habis Terjual' || ticket.availability === 'Segera Hadir') {
                      e.preventDefault();
                    }
                  }}
                >
                  {ticket.availability === 'Habis Terjual' ? 'Tiket Habis' : ticket.availability === 'Segera Hadir' ? 'Segera Hadir' : 'Beli Tiket Sekarang'}
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-12 p-6 bg-event-blue-extralight rounded-xl shadow"
        variants={titleVariants}
        transition={{ delay: 0.3 }}
        >
        <h4 className="text-lg font-semibold text-event-blue-dark mb-3 text-left">Informasi Penting Tiket:</h4>
        <ul className="list-disc list-inside text-sm text-event-text-muted space-y-1">
          <li>Tiket yang sudah dibeli tidak dapat di-refund, namun dapat dipindahtangankan (syarat & ketentuan berlaku).</li>
          <li>Harga tiket belum termasuk pajak dan biaya platform (jika ada).</li>
          <li>Anak di bawah usia 5 tahun gratis masuk ke area festival umum pada Hari 1-4 (tidak berlaku untuk area konser berbayar pada Hari 5 & 6, pendampingan orang tua wajib).</li>
          <li>E-ticket akan dikirimkan ke email setelah pembayaran berhasil. Tunjukkan e-ticket saat penukaran dengan wristband di lokasi.</li>
          <li>Untuk pertanyaan lebih lanjut seputar tiket, hubungi kami melalui halaman <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('nav-contact')?.click(); }} className="text-event-blue hover:underline">Kontak</a>.</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default TicketsPage;