
import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';

const pageTitleStyle = "text-left text-3xl sm:text-4xl md:text-4xl font-bold text-event-text-heading mt-0 mb-10 pb-5 border-b-2 border-gray-200";
const sectionTitleStyle = "text-left text-xl sm:text-2xl md:text-3xl font-semibold text-event-text-heading mt-10 mb-6";
const paragraphStyle = "mb-6 leading-relaxed text-event-text text-justify text-sm sm:text-base";
const dayTitleStyle = "text-left text-xl sm:text-2xl font-semibold text-event-text-heading mb-4"; // Updated day title
const activityListStyle = "list-disc pl-5 space-y-3 text-event-text-muted text-sm sm:text-base"; 

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as Easing, staggerChildren: 0.1 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as Easing }
  }
};

const cardListItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as Easing
    }
  })
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

interface Activity {
  text: string;
  time?: string; 
  emphasis?: string;
  highlightColor?: string; // e.g., 'text-event-accent'
}

interface DaySchedule {
  title: string;
  borderColorClass: string; // Tailwind class for border color, e.g., 'border-event-blue'
  activities: Activity[];
}

const scheduleData: DaySchedule[] = [
  { 
    title: "Hari 1-2: Pembukaan Spektakuler & Gelora Komunitas (1-2 Juni)", 
    borderColorClass: "border-event-blue",
    activities: [
      { text: "Upacara Pembukaan Megah:", emphasis: "Menampilkan pertunjukan kolosal, tarian tradisional, dan seremoni resmi.", highlightColor: "text-event-blue-dark", time: "1 Juni, 10:00 - 12:00" },
      { text: "Parade Budaya Lintas Komunitas:", emphasis: "Saksikan keberagaman Batam dalam satu barisan.", time: "1 Juni, 14:00 - 16:00" },
      { text: "Pertunjukan Seni Tradisional (Mak Yong, Zapin) & Kontemporer (Modern Dance, Beatbox).", time: "1 Juni, 19:00 - 21:00" },
      { text: "Babak Penyisihan Lomba: Cosplay (Walk-on), K-Pop Dance Cover (Group), Fotografi (On-the-spot theme).", time: "2 Juni, 13:00 - 17:00" },
      { text: "Pembukaan Zona UMKM & Kuliner:", emphasis: "Ratusan pilihan produk kreatif dan hidangan lezat.", time: "1-2 Juni, Sepanjang Hari" },
      { text: "Workshop Kreatif Sesi Awal:", emphasis: "Misal, \"Dasar Videografi Smartphone\", \"Membuat Kerajinan Daur Ulang\".", time: "2 Juni, Sesi Pagi & Siang" },
    ]
  },
  {
    title: "Hari 3-4: Edukasi, Inspirasi & Unjuk Bakat (3-4 Juni)",
    borderColorClass: "border-event-accent",
    activities: [
      { text: "Talkshow Inspiratif:", emphasis: "Bersama Tokoh Nasional (Pengusaha Sukses, Aktivis Sosial) & Lokal (Seniman Berprestasi, Atlet).", time: "3 Juni, 14:00 - 16:00" },
      { text: "Seminar Pengembangan Diri & Karir:", emphasis: "Tema \"Digital Skills for Future\", \"Personal Branding\".", time: "4 Juni, 10:00 - 12:00" },
      { text: "Final Lomba & Pengumuman Pemenang Tahap Awal: Lomba Lukis, Cipta Puisi, Band Akustik.", time: "3 Juni, Sore" },
      { text: "Showcase Talenta Komunitas:", emphasis: "Panggung terbuka untuk musik indie, pertunjukan teaterikal, stand-up comedy.", time: "3-4 Juni, Malam Hari" },
      { text: "Zona Edukasi:", emphasis: "Pameran Teknologi Hijau, Inovasi Digital, dan Startup Lokal.", time: "3-4 Juni, Sepanjang Hari" },
      { text: "Aktivasi Sponsor & Games Interaktif:", emphasis: "Berburu hadiah dan pengalaman seru di booth sponsor." },
      { text: "Tema Khusus Hari ke-4 (4 Juni):", emphasis: "\"Semangat Pancasila dan Toleransi Pemuda\" - Diskusi panel, pameran budaya, dan pertunjukan kolaboratif.", highlightColor: "text-event-accent-dark", time: "4 Juni, Sepanjang Hari" },
    ]
  },
  {
    title: "Hari 5-6: Puncak Perayaan & Konser Akbar (5-6 Juni)",
    borderColorClass: "border-event-green",
    activities: [
      { text: "Konser Musik dengan Bintang Tamu Nasional & Internasional:", emphasis: "Dua malam penuh bintang di panggung utama (area berbayar).", highlightColor: "text-event-green-dark", time: "5-6 Juni, Mulai 19:00" },
      { text: "Penampilan Spesial dari Pemenang Lomba Utama: Juara Cosplay Performance, K-Pop Dance, Band Festival.", time: "5 Juni, Sore" },
      { text: "Grand Final Turnamen E-Sports:", emphasis: "Pertarungan sengit tim-tim terbaik.", time: "6 Juni, Siang - Sore" },
      { text: "Pameran Karya Seni & Fotografi Terbaik:", emphasis: "Kurasi karya pemenang lomba dan seniman undangan." },
      { text: "Bazaar UMKM Unggulan & Festival Kuliner Spesial.", time: "5-6 Juni, Sepanjang Hari" },
      { text: "Upacara Penutupan Spektakuler & Pesta Kembang Api:", emphasis: "Mengakhiri BYTF 2026 dengan kenangan manis.", highlightColor: "text-event-green-dark", time: "6 Juni, 22:00" },
    ]
  }
];

const festivalZones = [
    { icon: "🏟️", title: "Panggung Utama", description: "Jantung festival! Nikmati konser artis ternama, pertunjukan spektakuler, dan seremoni penting." },
    { icon: "🎤", title: "Panggung Komunitas", description: "Ruang bagi talenta lokal dan puluhan komunitas Batam untuk unjuk gigi. Dari musik akustik, tari, hingga teater mini." },
    { icon: "🛍️", title: "Zona Youthpreneur", description: "Surga belanja produk lokal! Area khusus untuk UMKM muda, produk kreatif, fashion, dan kerajinan tangan inovatif." },
    { icon: "🍔", title: "Zona Kuliner", description: "Manjakan lidahmu! Ratusan pilihan hidangan lezat dari kuliner khas Batam, Nusantara, hingga jajanan kekinian." },
    { icon: "🎭", title: "Zona Pop Culture", description: "Tempat berkumpulnya para cosplayer, penggemar K-Pop, kolektor mainan, dan komunitas hobi lainnya. Banyak spot foto keren!" },
    { icon: "💡", title: "Zona Edukasi & Workshop", description: "Tambah ilmu dan keterampilan baru melalui pameran interaktif, demo teknologi, dan sesi workshop praktis." },
    { icon: "📰", title: "Media Center & Lounge", description: "Fasilitas khusus untuk rekan media meliput acara dan area nyaman bagi para mitra sponsor kami." },
    { icon: "👨‍👩‍👧‍👦", title: "Zona Relaksasi & Keluarga", description: "Area teduh untuk beristirahat sejenak, lengkap dengan fasilitas ramah anak." }
];

const SchedulePage: React.FC = () => (
  <motion.div 
    id="schedule"
    initial="hidden"
    animate="visible"
    variants={sectionVariants}
    className="space-y-12"
  >
    <motion.h2 className={pageTitleStyle} variants={itemVariants}>Jadwal Rangkaian Acara BYTF 2026</motion.h2>
    <motion.p className={paragraphStyle} variants={itemVariants}>Bersiaplah untuk enam hari penuh kemeriahan, inspirasi, dan kreativitas! Berikut adalah gambaran umum rangkaian acara BYTF 2026 yang akan berlangsung dari <strong className="text-event-blue font-semibold">1 - 6 Juni 2026</strong>. Jadwal detail, termasuk jam penampilan artis dan lokasi spesifik, akan diumumkan secara berkala mendekati tanggal pelaksanaan. Pantau terus update kami!</motion.p>

    <div className="space-y-10">
      {scheduleData.map((day, dayIndex) => (
        <motion.section 
          key={dayIndex} 
          className={`p-5 sm:p-6 bg-white border-l-4 ${day.borderColorClass} rounded-r-xl shadow-card`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionVariants} // Stagger children of this section
        >
          <h3 className={dayTitleStyle}>{day.title}</h3>
          <ul className={activityListStyle}>
            {day.activities.map((activity, actIndex) => (
               <motion.li key={actIndex} custom={actIndex} variants={cardListItemVariants}>
                {activity.time && <span className="font-semibold text-event-blue-dark mr-2">[{activity.time}]</span>}
                <span className={`${activity.highlightColor || 'text-event-text-muted'} font-medium`}>{activity.text}</span> {activity.emphasis && <span className="italic text-gray-500">{activity.emphasis}</span>}
              </motion.li>
            ))}
          </ul>
        </motion.section>
      ))}
    </div>

    <motion.section 
      className="mt-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
        <h3 className={sectionTitleStyle}>Jelajahi Zona-Zona Menarik Kami:</h3>
        <p className={`${paragraphStyle} mb-8`}>Setiap sudut BYTF 2026 dirancang untuk memberikan pengalaman unik. Temukan favoritmu di zona-zona berikut:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {festivalZones.map((zone, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white p-5 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease transform hover:-translate-y-1 group"
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={zoneCardVariants}
                >
                  <div className="text-4xl mb-3 text-event-accent">{zone.icon}</div>
                  <h4 className="font-semibold text-event-accent text-lg mb-2 group-hover:text-event-accent-dark transition-colors">{zone.title}</h4>
                  <p className="text-sm text-event-text-muted leading-relaxed">{zone.description}</p>
                </motion.div>
            ))}
        </ul>
    </motion.section>
    <motion.p 
      className="text-xs sm:text-sm text-gray-500 italic mt-12 block text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={itemVariants}
    >
      <em>Jadwal, pengisi acara, dan detail zona dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Pastikan untuk selalu memeriksa informasi terbaru di website resmi dan akun media sosial kami @bytf.official.</em>
    </motion.p>
  </motion.div>
);

export default SchedulePage;
