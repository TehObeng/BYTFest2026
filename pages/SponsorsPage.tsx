
import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import SponsorLogoGrid, { Sponsor } from '../SponsorLogoGrid'; // Import Sponsor type
import { mockSponsors } from '../data/sponsor-data'; 

const pageTitleStyle = "text-left text-xl sm:text-2xl md:text-3xl font-bold text-event-blue mt-0 mb-6 pb-3 border-b-2 border-event-blue";
const sectionTitleStyle = "text-left text-lg sm:text-xl md:text-2xl font-semibold text-event-blue-dark mt-8 mb-4";
const paragraphStyle = "mb-4 leading-relaxed text-gray-700 text-justify text-sm sm:text-base";
const listStyle = "list-disc pl-5 mb-4 text-gray-700 space-y-2 text-sm sm:text-base";
const subSectionTitleStyle = "text-left text-base sm:text-lg font-semibold text-event-blue-dark mt-0 mb-2";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as Easing, staggerChildren: 0.1 } 
  }
};

const itemVariants: Variants = { 
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as Easing }
  }
};

const cardVariants: Variants = { 
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as Easing
    }
  })
};

// Tier configuration
const tierDisplayConfig: Record<string, { title: string; customGridClasses?: string; tierTitleStyle?: string }> = {
  "Platinum": { 
    title: "💎 Sponsor Platinum Kami", 
    customGridClasses: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10 items-center", // Adjusted for fewer, larger logos
    tierTitleStyle: "text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-500 mt-12 mb-6 text-center"
  },
  "Gold": { 
    title: "🥇 Sponsor Gold Kami", 
    customGridClasses: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8 items-center",
    tierTitleStyle: "text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 mt-10 mb-5 text-center"
  },
  "Silver": { 
    title: "🥈 Sponsor Silver Kami", 
    customGridClasses: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 items-center",
    tierTitleStyle: "text-lg sm:text-xl md:text-2xl font-bold text-slate-400 mt-10 mb-5 text-center"
  },
  "Community Partner": { 
    title: "🤝 Mitra Komunitas Kami", 
    tierTitleStyle: "text-md sm:text-lg md:text-xl font-semibold text-event-blue-dark mt-10 mb-5 text-center"
    // Default grid class from SponsorLogoGrid will be used
  },
  "Media Partner": { 
    title: "📰 Mitra Media Kami", 
    tierTitleStyle: "text-md sm:text-lg md:text-xl font-semibold text-event-blue-dark mt-10 mb-5 text-center"
    // Default grid class from SponsorLogoGrid will be used
  },
  "Other": {
    title: "💖 Dukungan Lainnya",
    tierTitleStyle: "text-md sm:text-lg md:text-xl font-semibold text-gray-600 mt-10 mb-5 text-center"
  }
};
const tierOrder = ["Platinum", "Gold", "Silver", "Community Partner", "Media Partner", "Other"];


const SponsorsPage: React.FC = () => {
  const sponsorsByTier = mockSponsors.reduce((acc, sponsor) => {
    const tier = sponsor.tier && tierOrder.includes(sponsor.tier) ? sponsor.tier : "Other";
    if (!acc[tier]) {
      acc[tier] = [];
    }
    acc[tier].push(sponsor);
    return acc;
  }, {} as Record<string, Sponsor[]>);

  return (
    <motion.div 
      id="sponsors"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <motion.h2 className={pageTitleStyle} variants={itemVariants}>Dukung BYTF 2026: Investasi Strategis untuk Brand Anda!</motion.h2>
      <motion.p className={paragraphStyle} variants={itemVariants}>Batam Youth & Tourism Festival (BYTF) 2026 bukan hanya sekadar acara, melainkan sebuah platform dinamis yang menghubungkan brand Anda dengan ribuan pemuda energik, komunitas kreatif, dan wisatawan potensial. Jadilah mitra kami dan raih eksposur tak tertandingi serta asosiasi brand yang positif dengan festival pemuda terbesar dan paling dinanti di Batam.</motion.p>

      <motion.section className="mb-8" variants={sectionVariants}>
        <motion.h3 className={sectionTitleStyle} variants={itemVariants}>Mengapa Kemitraan dengan BYTF 2026 adalah Langkah Cerdas?</motion.h3>
        <ul className={`${listStyle} columns-1 md:columns-2 gap-x-8`}>
          {[
              "Branding Dominan & Luas: Logo Anda akan terpampang strategis di berbagai materi promosi online dan offline, panggung utama, LED screen, hingga media digital kami, menjangkau audiens yang masif dan beragam.",
              "Akses Eksklusif ke Target Audiens Muda: Terhubung langsung dengan generasi Z dan milenial yang dinamis, kreatif, melek digital, dan memiliki daya beli yang signifikan.",
              "Eksklusivitas Kategori Industri: Amankan posisi sebagai sponsor tunggal dalam kategori industri Anda, memberikan keunggulan kompetitif yang jelas (syarat & ketentuan berlaku).",
              "Aktivasi Brand Kreatif & Imersif: Dapatkan ruang untuk menghadirkan zona eksklusif brand Anda, booth interaktif, games menarik, instalasi seni, atau sesi talkshow yang melibatkan audiens secara langsung.",
              "Liputan Media Luas & Terpercaya: Manfaatkan eksposur melalui jaringan media partner kami yang solid, mencakup media lokal, nasional, hingga influencer ternama.",
              "Wawasan Data Demografi Pengunjung: Akses ke data agregat pengunjung (non-pribadi) seperti usia, gender, dan minat untuk sponsor utama/zona eksklusif, membantu Anda mengukur dampak dan merencanakan strategi masa depan.",
              "Dukungan Penuh dari Tim Profesional: Tim kemitraan kami siap membantu Anda merancang paket sponsorship yang paling optimal dan memaksimalkan ROI partisipasi Anda.",
              "Kontribusi Nyata & Citra Positif: Jadilah bagian dari gerakan positif yang mendukung ekonomi kreatif, pariwisata berkelanjutan, dan pemberdayaan generasi muda Batam, meningkatkan citra positif brand Anda."
          ].map((benefit, index) => (
              <motion.li key={index} variants={itemVariants}>{benefit}</motion.li>
          ))}
        </ul>
      </motion.section>

      <motion.section className="mb-8" variants={sectionVariants}>
        <motion.h3 className={sectionTitleStyle} variants={itemVariants}>Pilihan Paket Kemitraan Eksklusif (Placeholder)</motion.h3>
        <motion.p className={paragraphStyle} variants={itemVariants}>Kami menawarkan berbagai pilihan paket sponsorship yang dirancang untuk memenuhi kebutuhan dan tujuan pemasaran brand Anda. Setiap paket dapat disesuaikan lebih lanjut:</motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {[
              { title: "TITLE SPONSOR (PLATINUM+)", color: "text-event-blue", description: "Level kemitraan tertinggi dengan branding paling dominan (misal: \"BYTF 2026 presented by [Nama Brand Anda]\"). Hak penamaan zona utama, aktivasi eksklusif, liputan media primer, dan berbagai keuntungan premium lainnya." },
              { title: "PLATINUM SPONSOR", color: "text-sky-700", description: "Visibilitas sangat tinggi di berbagai area event strategis, slot iklan premium di LED utama, hak penamaan sub-zona, dan fasilitas VIP eksklusif untuk tamu Anda." },
              { title: "GOLD SPONSOR", color: "text-teal-700", description: "Branding signifikan di area event dan materi promosi, partisipasi dalam aktivasi panggung, kesempatan aktivasi booth di lokasi premium, dan akses ke laporan pasca-acara." },
              { title: "SILVER SPONSOR", color: "text-green-700", description: "Dukungan berharga dengan eksposur brand di area tertentu, penyebutan di media digital, dan kesempatan memiliki booth standar untuk interaksi langsung." },
              { title: "MITRA ZONA / AKTIVASI", color: "text-orange-600", description: "Kesempatan untuk memiliki atau berkolaborasi dalam satu zona tematik tertentu (misal: Zona Gaming, Zona Kuliner) atau menyelenggarakan aktivasi khusus.", layoutClass: "md:col-span-2 lg:col-span-1"},
              { title: "MITRA KOMUNITAS & UMKM", color: "text-purple-700", description: "Paket khusus dengan investasi terjangkau untuk mendukung partisipasi aktif komunitas lokal dan usaha mikro kecil menengah, memberikan mereka platform untuk bersinar." }
          ].map((tier, index) => (
            <motion.div 
              key={index} 
              className={`bg-event-blue-extralight p-4 sm:p-6 rounded-lg border border-blue-200 shadow-md hover:shadow-lg transition-shadow ${tier.layoutClass || ''}`}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <h4 className={`${subSectionTitleStyle} ${tier.color}`}>{tier.title}</h4>
              <p className="text-xs sm:text-sm text-gray-600">{tier.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.p className={`${paragraphStyle} mt-6 italic`} variants={itemVariants}>Detail lengkap mengenai benefit, investasi, dan opsi kustomisasi untuk masing-masing paket tersedia dalam proposal sponsorship resmi kami. Jangan ragu untuk menghubungi kami!</motion.p>
      </motion.section>

      {/* Tiered Sponsor Logos Section */}
      <motion.div variants={sectionVariants} className="my-12">
        {tierOrder.map((tierKey) => {
          const sponsorsInTier = sponsorsByTier[tierKey];
          const config = tierDisplayConfig[tierKey] || tierDisplayConfig["Other"];
          if (sponsorsInTier && sponsorsInTier.length > 0) {
            return (
              <motion.section 
                key={tierKey} 
                className="mb-10" // Spacing between tier sections
                variants={itemVariants} // Animate each tier section
              >
                {/* SponsorLogoGrid will render its own title if passed, or we can have a separate title here */}
                <SponsorLogoGrid 
                  sponsors={sponsorsInTier} 
                  title={config.title} // Pass the configured tier title to SponsorLogoGrid
                  customGridClasses={config.customGridClasses} 
                />
              </motion.section>
            );
          }
          return null;
        })}
         {Object.keys(sponsorsByTier).length === 0 && (
            <motion.p 
              className="text-center text-event-text-muted py-8"
              variants={itemVariants}
            >
              Sponsor kami akan segera diumumkan. Terima kasih atas dukungan Anda!
            </motion.p>
        )}
      </motion.div>

      <motion.section 
        className="text-center bg-event-green hover:bg-green-700 transition-colors text-white p-6 sm:p-8 rounded-lg mt-10 shadow-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants} 
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-3">Mari Bersinergi untuk Kesuksesan Bersama!</h3>
        <p className="text-sm sm:text-base text-white mb-4 max-w-2xl mx-auto">Bergabunglah dengan BYTF 2026 dan jadilah bagian integral dari festival yang akan membentuk masa depan kreatif Batam. Ini adalah kesempatan emas untuk meningkatkan visibilitas brand Anda, menjangkau pasar yang relevan, dan menunjukkan komitmen Anda terhadap pengembangan komunitas.</p>
        <p className="mt-4 text-base sm:text-lg">
          Untuk mendapatkan proposal sponsorship atau diskusi lebih lanjut mengenai bagaimana brand Anda dapat bersinar di BYTF 2026, silakan hubungi tim kemitraan kami:
        </p>
        <p className="mt-3 text-lg sm:text-xl">
          <strong className="block mb-1">Email:</strong> 
          <a href="mailto:sponsorship.bytfest@gmail.com" className="text-white hover:underline font-semibold hover:text-yellow-300 transition-colors">sponsorship.bytfest@gmail.com</a> (placeholder)
        </p>
        <p className="mt-1 text-lg sm:text-xl">
          <strong className="block mb-1">WhatsApp:</strong> 
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-semibold hover:text-yellow-300 transition-colors">+62 812-3456-7890</a> (placeholder)
        </p>
        <p className="mt-6 text-white font-medium">Kami antusias untuk berkolaborasi dengan Anda!</p>
      </motion.section>
    </motion.div>
  );
};

export default SponsorsPage;
