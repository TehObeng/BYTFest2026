
import React, { useState } from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import SponsorLogoGrid, { Sponsor } from '../SponsorLogoGrid';
import { mockSponsors } from '../data/sponsor-data'; 
import SponsorDetailModal from '../SponsorDetailModal'; // Import the new modal

const pageTitleStyle = "text-left text-2xl sm:text-3xl md:text-4xl font-bold text-event-text-heading mt-0 mb-8 pb-4 border-b-2 border-gray-200";
const sectionTitleStyle = "text-left text-xl sm:text-2xl md:text-3xl font-semibold text-event-text-heading mt-10 mb-6";
const paragraphStyle = "mb-5 leading-relaxed text-gray-700 text-justify text-sm sm:text-base";
const listStyle = "list-disc pl-5 mb-6 text-gray-700 space-y-2.5 text-sm sm:text-base";

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

const packageCardVariants: Variants = { 
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as Easing
    }
  })
};

const tierDisplayConfig: Record<string, { title: string; customGridClasses?: string; tierTitleStyle?: string; introBlurb?: string }> = {
  "Platinum": { 
    title: "💎 Sponsor Platinum Kami", 
    customGridClasses: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 items-center justify-items-center",
    tierTitleStyle: "text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-500 mt-12 mb-6 text-center",
    introBlurb: "Kami mengucapkan terima kasih sebesar-besarnya kepada Sponsor Platinum kami atas kontribusi luar biasa dan kepercayaan mereka dalam menyukseskan BYTF 2026. Dukungan Anda adalah pilar utama festival ini."
  },
  "Gold": { 
    title: "🥇 Sponsor Gold Kami", 
    customGridClasses: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8 items-center justify-items-center",
    tierTitleStyle: "text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 mt-10 mb-5 text-center",
    introBlurb: "Dukungan berarti dari Sponsor Gold kami sangat vital bagi kemeriahan dan kualitas festival ini. Terima kasih atas komitmen Anda!"
  },
  "Silver": { 
    title: "🥈 Sponsor Silver Kami", 
    customGridClasses: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 items-center justify-items-center",
    tierTitleStyle: "text-lg sm:text-xl md:text-2xl font-bold text-slate-400 mt-10 mb-5 text-center",
    introBlurb: "Kami mengapresiasi dukungan berharga dari Sponsor Silver kami yang turut menyemarakkan dan memperkaya pengalaman di BYTF 2026."
  },
  "Community Partner": { 
    title: "🤝 Mitra Komunitas Kami", 
    tierTitleStyle: "text-md sm:text-lg md:text-xl font-semibold text-event-blue-dark mt-10 mb-5 text-center",
    introBlurb: "Kolaborasi erat dengan Mitra Komunitas memperkaya festival dengan beragam kegiatan kreatif dan semangat kebersamaan yang luar biasa."
  },
  "Media Partner": { 
    title: "📰 Mitra Media Kami", 
    tierTitleStyle: "text-md sm:text-lg md:text-xl font-semibold text-event-blue-dark mt-10 mb-5 text-center",
    introBlurb: "Terima kasih kepada Mitra Media kami yang membantu menyebarkan berita, antusiasme, dan kemeriahan BYTF 2026 ke khalayak yang lebih luas."
  },
  "Other": {
    title: "💖 Dukungan Lainnya",
    tierTitleStyle: "text-md sm:text-lg md:text-xl font-semibold text-gray-600 mt-10 mb-5 text-center",
    introBlurb: "Setiap bentuk dukungan sangat berarti bagi kami. Kami berterima kasih kepada semua pihak yang telah berkontribusi dalam menyukseskan BYTF 2026."
  }
};
const tierOrder = ["Platinum", "Gold", "Silver", "Community Partner", "Media Partner", "Other"];

interface SponsorshipPackageHighlight {
  title: string;
  icon: string;
  description: string;
  keyBenefits: string[];
  idealFor?: string;
  colorClass: string;
  layoutClass?: string;
}

const sponsorshipPackages: SponsorshipPackageHighlight[] = [
  { 
    title: "TITLE SPONSOR (PLATINUM+)", 
    icon: "👑", 
    description: "Kemitraan tertinggi dengan branding paling dominan (misal: \"BYTF 2026 presented by [Nama Brand Anda]\"). Kesempatan emas untuk integrasi brand yang mendalam.",
    keyBenefits: [
      "Hak penamaan event atau zona utama strategis",
      "Eksposur brand maksimal di semua lini promosi",
      "Aktivasi eksklusif & fasilitas VIP premium"
    ],
    idealFor: "Brand yang mencari dampak dan asosiasi tertinggi, ingin namanya terintegrasi secara mendalam dengan identitas festival.",
    colorClass: "border-yellow-400 bg-yellow-50",
    layoutClass: "lg:col-span-3 md:col-span-2" 
  },
  { 
    title: "PLATINUM SPONSOR", 
    icon: "💎", 
    description: "Visibilitas sangat tinggi di berbagai area event strategis, materi promosi utama, dan liputan media.",
    keyBenefits: [
      "Logo besar dan menonjol di panggung utama & LED",
      "Hak penamaan sub-zona atau program khusus",
      "Slot iklan premium & fasilitas VIP eksklusif"
    ],
    idealFor: "Brand besar yang menginginkan visibilitas premium, aktivasi brand yang kuat, dan pengakuan sebagai pendukung utama festival.",
    colorClass: "border-sky-400 bg-sky-50",
  },
  { 
    title: "GOLD SPONSOR", 
    icon: "🥇", 
    description: "Branding signifikan, partisipasi dalam aktivasi panggung, dan booth di lokasi premium untuk interaksi maksimal.",
    keyBenefits: [
      "Branding menonjol di area event yang ramai",
      "Kesempatan aktivasi panggung yang menarik",
      "Booth di lokasi strategis untuk engagement tinggi"
    ],
    idealFor: "Brand yang mencari keseimbangan optimal antara eksposur signifikan, interaksi audiens yang bermakna, dan investasi strategis.",
    colorClass: "border-amber-400 bg-amber-50",
  },
  { 
    title: "SILVER SPONSOR", 
    icon: "🥈", 
    description: "Dukungan berharga dengan eksposur brand di area tertentu, booth standar, dan pengakuan di platform digital.",
    keyBenefits: [
      "Eksposur brand yang baik dan terlihat jelas",
      "Booth standar untuk interaksi dan display produk",
      "Penyebutan di media digital & materi cetak"
    ],
    idealFor: "Brand yang ingin memulai kemitraan berdampak, mendapatkan eksposur brand yang solid, dan berinteraksi langsung dengan pengunjung.",
    colorClass: "border-slate-400 bg-slate-50",
  },
  { 
    title: "MITRA ZONA / AKTIVASI", 
    icon: "🧩", 
    description: "Memiliki atau berkolaborasi dalam satu zona tematik (Gaming, Kuliner, Seni) atau aktivasi khusus yang kreatif.",
    keyBenefits: [
      "Branding terfokus pada zona tematik pilihan",
      "Interaksi langsung dengan audiens yang relevan",
      "Kebebasan kreativitas dalam aktivasi brand"
    ],
    idealFor: "Brand yang ingin menargetkan audiens spesifik, menciptakan pengalaman brand yang unik dan tak terlupakan, serta berkolaborasi secara kreatif.",
    colorClass: "border-orange-400 bg-orange-50",
  },
  { 
    title: "MITRA KOMUNITAS & UMKM", 
    icon: "🤝", 
    description: "Paket terjangkau yang dirancang khusus untuk mendukung partisipasi aktif komunitas lokal dan UMKM.",
    keyBenefits: [
      "Memberikan platform bagi komunitas & UMKM untuk tampil",
      "Menunjukkan dukungan nyata pada ekonomi lokal & kreatif",
      "Membangun asosiasi brand yang positif dan dekat dengan masyarakat"
    ],
    idealFor: "Brand, organisasi, dan UMKM yang peduli terhadap pemberdayaan lokal, mendukung talenta komunitas, dan ingin membangun citra positif.",
    colorClass: "border-purple-400 bg-purple-50",
  }
];


const SponsorsPage: React.FC = () => {
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sponsorsByTier = mockSponsors.reduce((acc, sponsor) => {
    const tier = sponsor.tier && tierOrder.includes(sponsor.tier) ? sponsor.tier : "Other";
    if (!acc[tier]) {
      acc[tier] = [];
    }
    acc[tier].push(sponsor);
    return acc;
  }, {} as Record<string, Sponsor[]>);

  const handleSponsorClick = (sponsor: Sponsor) => {
    setSelectedSponsor(sponsor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSponsor(null);
  };


  return (
    <motion.div 
      id="sponsors"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="space-y-10" 
    >
      <motion.h2 className={pageTitleStyle} variants={itemVariants}>Dukung BYTF 2026: Investasi Strategis untuk Brand Anda!</motion.h2>
      <motion.p className={paragraphStyle} variants={itemVariants}>Batam Youth & Tourism Festival (BYTF) 2026 bukan hanya sekadar acara, melainkan sebuah platform dinamis yang menghubungkan brand Anda dengan ribuan pemuda energik, komunitas kreatif, dan wisatawan potensial. Jadilah mitra kami dan raih eksposur tak tertandingi serta asosiasi brand yang positif dengan festival pemuda terbesar dan paling dinanti di Batam.</motion.p>

      <motion.section variants={sectionVariants}>
        <motion.h3 className={sectionTitleStyle} variants={itemVariants}>Mengapa Kemitraan dengan BYTF 2026 adalah Langkah Cerdas?</motion.h3>
        <ul className={`${listStyle} columns-1 md:columns-2 gap-x-8`}>
          {[
              {strong: "Branding Dominan & Luas:", text: "Logo Anda akan terpampang strategis di berbagai materi promosi online dan offline, panggung utama, LED screen, hingga media digital kami, menjangkau audiens yang masif dan beragam."},
              {strong: "Akses Eksklusif ke Target Audiens Muda:", text: "Terhubung langsung dengan generasi Z dan milenial yang dinamis, kreatif, melek digital, dan memiliki daya beli yang signifikan."},
              {strong: "Eksklusivitas Kategori Industri:", text: "Amankan posisi sebagai sponsor tunggal dalam kategori industri Anda, memberikan keunggulan kompetitif yang jelas (syarat & ketentuan berlaku)."},
              {strong: "Aktivasi Brand Kreatif & Imersif:", text: "Dapatkan ruang untuk menghadirkan zona eksklusif brand Anda, booth interaktif, games menarik, instalasi seni, atau sesi talkshow yang melibatkan audiens secara langsung."},
              {strong: "Liputan Media Luas & Terpercaya:", text: "Manfaatkan eksposur melalui jaringan media partner kami yang solid, mencakup media lokal, nasional, hingga influencer ternama."},
              {strong: "Wawasan Data Demografi Pengunjung:", text: "Akses ke data agregat pengunjung (non-pribadi) seperti usia, gender, dan minat untuk sponsor utama/zona eksklusif, membantu Anda mengukur dampak dan merencanakan strategi masa depan."},
              {strong: "Dukungan Penuh dari Tim Profesional:", text: "Tim kemitraan kami siap membantu Anda merancang paket sponsorship yang paling optimal dan memaksimalkan ROI partisipasi Anda."},
              {strong: "Kontribusi Nyata & Citra Positif:", text: "Jadilah bagian dari gerakan positif yang mendukung ekonomi kreatif, pariwisata berkelanjutan, dan pemberdayaan generasi muda Batam, meningkatkan citra positif brand Anda."}
          ].map((benefit, index) => (
              <motion.li key={index} variants={itemVariants}>
                <strong className="font-semibold text-event-blue-dark">{benefit.strong}</strong> {benefit.text}
              </motion.li>
          ))}
        </ul>
      </motion.section>

      <motion.section variants={sectionVariants}>
        <motion.h3 className={sectionTitleStyle} variants={itemVariants}>Pilihan Paket Kemitraan Eksklusif</motion.h3>
        <motion.p className={paragraphStyle} variants={itemVariants}>Kami menawarkan berbagai pilihan paket sponsorship yang dirancang untuk memenuhi kebutuhan dan tujuan pemasaran brand Anda. Setiap paket dapat disesuaikan lebih lanjut untuk sinergi yang maksimal:</motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {sponsorshipPackages.map((pkg, index) => (
            <motion.div 
              key={pkg.title} 
              className={`flex flex-col p-5 sm:p-6 rounded-xl border-2 shadow-lg hover:shadow-xl transition-all duration-300 ease-custom-ease transform hover:-translate-y-1 ${pkg.colorClass} ${pkg.layoutClass || ''}`}
              custom={index}
              variants={packageCardVariants}
            >
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">{pkg.icon}</span>
                <h4 className="text-lg sm:text-xl font-bold text-event-blue-dark">{pkg.title}</h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-4 flex-grow">{pkg.description}</p>
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-1.5">Manfaat Utama:</p>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1.5">
                  {pkg.keyBenefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                </ul>
              </div>
              {pkg.idealFor && <p className="text-xs italic text-gray-500 mt-auto mb-4"><strong>Ideal untuk:</strong> {pkg.idealFor}</p>}
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact-sponsorship-cta');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="mt-auto w-full bg-event-blue hover:bg-event-blue-dark text-white font-semibold py-2.5 px-4 rounded-md text-xs sm:text-sm transition-colors duration-200 shadow-button inline-flex items-center justify-center gap-2"
              >
                Pelajari Lebih Lanjut <span aria-hidden="true">&rarr;</span>
              </button>
            </motion.div>
          ))}
        </div>
        <motion.p className={`${paragraphStyle} mt-8 italic text-center`} variants={itemVariants}>Detail lengkap mengenai benefit, investasi, dan opsi kustomisasi untuk masing-masing paket tersedia dalam proposal sponsorship resmi kami. Jangan ragu untuk menghubungi kami!</motion.p>
      </motion.section>

      {/* Tiered Sponsor Logos Section */}
      <motion.div variants={sectionVariants} className="my-12">
        <motion.h3 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-event-text-heading mt-12 mb-8 text-center"
            variants={itemVariants}
        >
            Meet Our Esteemed Sponsors
        </motion.h3>
        {tierOrder.map((tierKey) => {
          const sponsorsInTier = sponsorsByTier[tierKey];
          const config = tierDisplayConfig[tierKey] || tierDisplayConfig["Other"];
          if (sponsorsInTier && sponsorsInTier.length > 0) {
            return (
              <motion.section 
                key={tierKey} 
                className="mb-10 flex flex-col items-center" 
                variants={itemVariants} // Apply itemVariants for animation of the whole section
              >
                {/* Tier Title is now part of SponsorLogoGrid, but intro blurb can be here */}
                {config.introBlurb && (
                  <motion.p 
                    className="text-center text-sm sm:text-base text-event-text-muted mb-6 max-w-3xl mx-auto px-4"
                    variants={itemVariants} // Animate this paragraph
                  >
                    {config.introBlurb}
                  </motion.p>
                )}
                <SponsorLogoGrid 
                  sponsors={sponsorsInTier} 
                  title={config.title} // Title is passed to SponsorLogoGrid
                  customGridClasses={config.customGridClasses} 
                  onSponsorClick={handleSponsorClick} 
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
      
      <motion.section variants={sectionVariants}>
        <motion.h3 className={sectionTitleStyle} variants={itemVariants}>Bagaimana Cara Menjadi Sponsor BYTF 2026?</motion.h3>
        <motion.p className={paragraphStyle} variants={itemVariants}>
          Bergabung sebagai sponsor BYTF 2026 adalah proses yang mudah dan kolaboratif. Berikut langkah-langkahnya:
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { number: "1", title: "Jelajahi Paket Kami", description: "Pahami berbagai pilihan paket kemitraan yang kami tawarkan dan identifikasi yang paling sesuai dengan tujuan brand Anda.", icon: "🔍" },
            { number: "2", title: "Hubungi Tim Kemitraan", description: "Sampaikan minat Anda kepada tim kami. Kami siap mendiskusikan kebutuhan spesifik dan menjawab semua pertanyaan Anda.", icon: "💬" },
            { number: "3", title: "Kustomisasi & Kolaborasi", description: "Bersama-sama, kita akan merancang proposal kemitraan yang disesuaikan, memastikan sinergi maksimal dan dampak yang optimal.", icon: "✨" }
          ].map((step, index) => (
            <motion.div
              key={step.number}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              custom={index}
              variants={packageCardVariants}
            >
              <div className="text-4xl mb-3">{step.icon}</div>
              <h4 className="text-lg font-semibold text-event-blue mb-2">{step.number}. {step.title}</h4>
              <p className="text-xs sm:text-sm text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        id="contact-sponsorship-cta"
        className="text-center bg-event-green hover:bg-green-700 transition-colors text-white p-6 sm:p-8 md:p-10 rounded-xl mt-12 shadow-xl"
        variants={sectionVariants} 
      >
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Mari Bersinergi untuk Kesuksesan Bersama!</h3>
        <p className="text-sm sm:text-base md:text-lg text-gray-100 mb-6 max-w-3xl mx-auto">Bergabunglah dengan BYTF 2026 dan jadilah bagian integral dari festival yang akan membentuk masa depan kreatif Batam. Ini adalah kesempatan emas untuk meningkatkan visibilitas brand Anda, menjangkau pasar yang relevan, dan menunjukkan komitmen Anda terhadap pengembangan komunitas.</p>
        <p className="mt-4 text-base sm:text-lg mb-2">
          Untuk mendapatkan proposal sponsorship atau diskusi lebih lanjut, hubungi tim kemitraan kami:
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
            <a 
              href="mailto:sponsorship.bytfest@gmail.com" 
              className="inline-flex items-center justify-center gap-2 bg-white text-event-green font-semibold px-6 py-3 rounded-lg shadow-button hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
              Email: sponsorship.bytfest@gmail.com
            </a>
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-event-green transition-colors duration-200 text-sm sm:text-base"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-4 0H9v2h2V9z" clipRule="evenodd" /></svg>
              WhatsApp: +62 812-3456-7890
            </a>
        </div>
        <p className="mt-8 text-white font-medium text-lg">Kami antusias untuk berkolaborasi dengan Anda!</p>
      </motion.section>

      <SponsorDetailModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        sponsor={selectedSponsor}
      />
    </motion.div>
  );
};

export default SponsorsPage;
