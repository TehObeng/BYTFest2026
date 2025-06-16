
import React, { useState } from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import SponsorLogoGrid, { Sponsor } from '../SponsorLogoGrid';
import { mockSponsors } from '../data/sponsor-data'; 
import SponsorDetailModal from '../SponsorDetailModal'; 

// --- STYLES ---
const pageTitleStyle = "text-left text-3xl sm:text-4xl md:text-5xl font-extrabold text-event-text-heading mt-0 mb-10 pb-5 border-b-2 border-gray-200";
const sectionTitleStyle = "text-left text-2xl sm:text-3xl font-bold text-event-text-heading mt-12 mb-8";
const subSectionTitleStyle = "text-left text-xl sm:text-2xl md:text-3xl font-semibold text-event-text-heading mt-10 mb-6";
const paragraphStyle = "mb-6 leading-relaxed text-event-text text-justify text-sm sm:text-base md:text-lg";

// --- ANIMATION VARIANTS ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as Easing, staggerChildren: 0.15 } 
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

const cardVariants: Variants = { 
  hidden: { opacity: 0, scale: 0.95, y: 25 },
  visible: (i: number = 0) => ({
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

// --- DATA STRUCTURES ---
const tierDisplayConfig: Record<string, { titleHtml: string; customGridClasses?: string; tierTitleStyle: string; introBlurb?: string }> = {
  "Platinum": { 
    titleHtml: "💎 Sponsor <span class='text-yellow-400'>Platinum</span> Kami", 
    customGridClasses: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10 items-center justify-items-center",
    tierTitleStyle: "text-2xl sm:text-3xl font-bold text-event-text-heading mt-12 mb-6 text-center",
    introBlurb: "Kami mengucapkan terima kasih sebesar-besarnya kepada Sponsor Platinum kami atas kontribusi luar biasa dan kepercayaan mereka dalam menyukseskan BYTF 2026. Dukungan Anda adalah pilar utama festival ini."
  },
  "Gold": { 
    titleHtml: "🥇 Sponsor <span class='text-amber-400'>Gold</span> Kami", 
    customGridClasses: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8 items-center justify-items-center",
    tierTitleStyle: "text-xl sm:text-2xl font-bold text-event-text-heading mt-10 mb-5 text-center",
    introBlurb: "Dukungan berarti dari Sponsor Gold kami sangat vital bagi kemeriahan dan kualitas festival ini. Terima kasih atas komitmen Anda!"
  },
  "Silver": { 
    titleHtml: "🥈 Sponsor <span class='text-slate-400'>Silver</span> Kami", 
    customGridClasses: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 items-center justify-items-center",
    tierTitleStyle: "text-lg sm:text-xl font-bold text-event-text-heading mt-10 mb-5 text-center",
    introBlurb: "Kami mengapresiasi dukungan berharga dari Sponsor Silver kami yang turut menyemarakkan dan memperkaya pengalaman di BYTF 2026."
  },
  "Community Partner": { 
    titleHtml: "🤝 <span class='text-event-green'>Mitra Komunitas</span> Kami", 
    tierTitleStyle: "text-md sm:text-lg font-semibold text-event-text-heading mt-10 mb-5 text-center",
    introBlurb: "Kolaborasi erat dengan Mitra Komunitas memperkaya festival dengan beragam kegiatan kreatif dan semangat kebersamaan yang luar biasa."
  },
  "Media Partner": { 
    titleHtml: "📰 <span class='text-event-blue-light'>Mitra Media</span> Kami", 
    tierTitleStyle: "text-md sm:text-lg font-semibold text-event-text-heading mt-10 mb-5 text-center",
    introBlurb: "Terima kasih kepada Mitra Media kami yang membantu menyebarkan berita, antusiasme, dan kemeriahan BYTF 2026 ke khalayak yang lebih luas."
  },
  "Other": {
    titleHtml: "💖 Dukungan Lainnya",
    tierTitleStyle: "text-md sm:text-lg font-semibold text-gray-600 mt-10 mb-5 text-center",
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
  textColorClass?: string; 
  layoutClass?: string;
  isPremium?: boolean; 
}

const sponsorshipPackages: SponsorshipPackageHighlight[] = [
  { 
    title: "TITLE SPONSOR (PLATINUM+)", 
    icon: "👑", 
    description: "Kemitraan tertinggi dengan branding paling dominan (misal: \"BYTF 2026 presented by [Nama Brand Anda]\"). Kesempatan emas untuk integrasi brand yang mendalam.",
    keyBenefits: [
      "Hak penamaan event atau zona utama strategis",
      "Eksposur brand maksimal di semua lini promosi",
      "Aktivasi eksklusif & fasilitas VIP premium",
      "Liputan media khusus dan dedicated content"
    ],
    idealFor: "Brand yang mencari dampak dan asosiasi tertinggi, ingin namanya terintegrasi secara mendalam dengan identitas festival.",
    colorClass: "border-yellow-400 bg-yellow-50 hover:border-yellow-500",
    textColorClass: "text-yellow-600",
    layoutClass: "lg:col-span-3 md:col-span-2",
    isPremium: true,
  },
  { 
    title: "PLATINUM SPONSOR", 
    icon: "💎", 
    description: "Visibilitas sangat tinggi di berbagai area event strategis, materi promosi utama, dan liputan media. Pengakuan sebagai pilar pendukung festival.",
    keyBenefits: [
      "Logo besar dan menonjol di panggung utama & LED",
      "Hak penamaan sub-zona atau program khusus",
      "Slot iklan premium & fasilitas VIP eksklusif",
      "Keterlibatan dalam konferensi pers"
    ],
    idealFor: "Brand besar yang menginginkan visibilitas premium, aktivasi brand yang kuat, dan pengakuan sebagai pendukung utama festival.",
    colorClass: "border-sky-400 bg-sky-50 hover:border-sky-500", // Consider event-blue variant
    textColorClass: "text-sky-600", // Consider event-blue variant
    isPremium: true,
  },
  { 
    title: "GOLD SPONSOR", 
    icon: "🥇", 
    description: "Branding signifikan, partisipasi dalam aktivasi panggung, dan booth di lokasi premium untuk interaksi maksimal dengan pengunjung.",
    keyBenefits: [
      "Branding menonjol di area event yang ramai",
      "Kesempatan aktivasi panggung yang menarik",
      "Booth di lokasi strategis untuk engagement tinggi",
      "Logo di materi promosi sekunder"
    ],
    idealFor: "Brand yang mencari keseimbangan optimal antara eksposur signifikan, interaksi audiens yang bermakna, dan investasi strategis.",
    colorClass: "border-amber-400 bg-amber-50 hover:border-amber-500",
    textColorClass: "text-amber-600",
  },
  { 
    title: "SILVER SPONSOR", 
    icon: "🥈", 
    description: "Dukungan berharga dengan eksposur brand di area tertentu, booth standar, dan pengakuan di platform digital serta materi cetak terbatas.",
    keyBenefits: [
      "Eksposur brand yang baik dan terlihat jelas",
      "Booth standar untuk interaksi dan display produk",
      "Penyebutan di media digital & materi cetak",
      "Paket tiket komplimen"
    ],
    idealFor: "Brand yang ingin memulai kemitraan berdampak, mendapatkan eksposur brand yang solid, dan berinteraksi langsung dengan pengunjung.",
    colorClass: "border-slate-400 bg-slate-100 hover:border-slate-500",
    textColorClass: "text-slate-600",
  },
  { 
    title: "MITRA ZONA / AKTIVASI", 
    icon: "🧩", 
    description: "Memiliki atau berkolaborasi dalam satu zona tematik (Gaming, Kuliner, Seni) atau aktivasi khusus yang kreatif dan imersif.",
    keyBenefits: [
      "Branding terfokus pada zona tematik pilihan",
      "Interaksi langsung dengan audiens yang relevan",
      "Kebebasan kreativitas dalam aktivasi brand",
      "Asosiasi kuat dengan minat spesifik pengunjung"
    ],
    idealFor: "Brand yang ingin menargetkan audiens spesifik, menciptakan pengalaman brand yang unik dan tak terlupakan, serta berkolaborasi secara kreatif.",
    colorClass: "border-orange-400 bg-orange-50 hover:border-orange-500",
    textColorClass: "text-orange-600",
  },
  { 
    title: "MITRA KOMUNITAS & UMKM", 
    icon: "🤝", 
    description: "Paket terjangkau yang dirancang khusus untuk mendukung partisipasi aktif komunitas lokal dan UMKM, menunjukkan dukungan nyata pada akar rumput.",
    keyBenefits: [
      "Memberikan platform bagi komunitas & UMKM untuk tampil",
      "Menunjukkan dukungan nyata pada ekonomi lokal & kreatif",
      "Membangun asosiasi brand yang positif dan dekat dengan masyarakat",
      "Peluang co-branding dengan materi festival"
    ],
    idealFor: "Brand, organisasi, dan UMKM yang peduli terhadap pemberdayaan lokal, mendukung talenta komunitas, dan ingin membangun citra positif.",
    colorClass: "border-purple-400 bg-purple-50 hover:border-purple-500",
    textColorClass: "text-purple-600",
  }
];

const whySponsorBenefits = [
    { icon: "📢", title: "Branding Dominan & Luas", text: "Logo Anda akan terpampang strategis di berbagai materi promosi online dan offline, panggung utama, LED screen, hingga media digital kami, menjangkau audiens yang masif dan beragam." },
    { icon: "🎯", title: "Akses Eksklusif ke Target Audiens Muda", text: "Terhubung langsung dengan generasi Z dan milenial yang dinamis, kreatif, melek digital, dan memiliki daya beli yang signifikan." },
    { icon: "✨", title: "Aktivasi Brand Kreatif & Imersif", text: "Dapatkan ruang untuk menghadirkan zona eksklusif brand Anda, booth interaktif, games menarik, instalasi seni, atau sesi talkshow yang melibatkan audiens secara langsung." },
    { icon: "📰", title: "Liputan Media Luas & Terpercaya", text: "Manfaatkan eksposur melalui jaringan media partner kami yang solid, mencakup media lokal, nasional, hingga influencer ternama." },
    { icon: "📊", title: "Wawasan Data Demografi Pengunjung", text: "Akses ke data agregat pengunjung (non-pribadi) untuk sponsor utama/zona eksklusif, membantu Anda mengukur dampak dan merencanakan strategi masa depan." },
    { icon: "🌱", title: "Kontribusi Nyata & Citra Positif", text: "Jadilah bagian dari gerakan positif yang mendukung ekonomi kreatif, pariwisata berkelanjutan, dan pemberdayaan generasi muda Batam, meningkatkan citra positif brand Anda." }
];

// --- COMPONENT ---
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
    setTimeout(() => setSelectedSponsor(null), 300);
  };

  return (
    <motion.div 
      id="sponsors"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="space-y-16 md:space-y-20" 
    >
      <motion.h2 className={pageTitleStyle} variants={itemVariants}>Dukung BYTF 2026: Investasi Strategis untuk Brand Anda!</motion.h2>
      <motion.p className={paragraphStyle} variants={itemVariants}>
        Batam Youth & Tourism Festival (BYTF) 2026 bukan hanya sekadar acara, melainkan sebuah platform dinamis yang menghubungkan brand Anda dengan ribuan pemuda energik, komunitas kreatif, dan wisatawan potensial. Jadilah mitra kami dan raih eksposur tak tertandingi serta asosiasi brand yang positif dengan festival pemuda terbesar dan paling dinanti di Batam.
      </motion.p>

      <motion.section variants={sectionVariants}>
        <motion.h3 className={subSectionTitleStyle} variants={itemVariants}>Mengapa Kemitraan dengan BYTF 2026 adalah Langkah Cerdas?</motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-6">
            {whySponsorBenefits.map((benefit, index) => (
                <motion.div 
                    key={index} 
                    className="flex items-start gap-4 sm:gap-5 p-6 bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease transform hover:-translate-y-1"
                    custom={index}
                    variants={cardVariants}
                >
                    <span className="text-4xl sm:text-5xl text-event-accent mt-1 shrink-0">{benefit.icon}</span>
                    <div>
                        <h4 className="font-semibold text-event-blue text-lg sm:text-xl mb-1.5">{benefit.title}</h4>
                        <p className="text-sm text-event-text-muted leading-relaxed">{benefit.text}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </motion.section>

      <motion.section variants={sectionVariants}>
        <motion.h3 className={subSectionTitleStyle} variants={itemVariants}>Pilihan Paket Kemitraan Eksklusif</motion.h3>
        <motion.p className={paragraphStyle} variants={itemVariants}>Kami menawarkan berbagai pilihan paket sponsorship yang dirancang untuk memenuhi kebutuhan dan tujuan pemasaran brand Anda. Setiap paket dapat disesuaikan lebih lanjut untuk sinergi yang maksimal:</motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6"> 
          {sponsorshipPackages.map((pkg, index) => (
            <motion.div 
              key={pkg.title} 
              className={`flex flex-col p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease transform hover:-translate-y-1.5 group ${pkg.colorClass} ${pkg.layoutClass || ''} ${pkg.isPremium ? 'border-l-[10px] border-t-4' : 'border-2'}`}
              custom={index}
              variants={cardVariants}
            >
              <div className="flex items-center mb-4">
                <span className={`text-4xl sm:text-5xl mr-4 ${pkg.textColorClass || 'text-event-blue'}`}>{pkg.icon}</span>
                <h4 className={`text-xl sm:text-2xl font-bold ${pkg.textColorClass || 'text-event-blue-dark'}`}>{pkg.title}</h4>
              </div>
              <p className="text-sm text-gray-700 mb-5 flex-grow leading-relaxed">{pkg.description}</p>
              
              <div className="mb-5">
                <p className={`text-sm font-semibold ${pkg.textColorClass || 'text-gray-800'} mb-2.5`}>Manfaat Utama:</p>
                <ul className="space-y-2">
                  {pkg.keyBenefits.map((benefitText, i) => (
                    <li key={i} className="flex items-start text-xs sm:text-sm text-gray-600">
                      <span className={`mr-2.5 shrink-0 ${pkg.isPremium ? 'text-yellow-500' : 'text-event-green'}`}>✅</span>
                      <span>{benefitText}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {pkg.idealFor && (
                <div className="mt-auto mb-5 p-3.5 bg-white/60 rounded-lg border border-dashed border-gray-300">
                    <p className="text-xs sm:text-sm italic text-gray-700">
                        <span className={`font-bold ${pkg.textColorClass || 'text-gray-700'}`}>💡 Ideal untuk:</span> {pkg.idealFor}
                    </p>
                </div>
              )}
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact-sponsorship-cta');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className={`mt-auto w-full font-semibold py-3 px-4 rounded-lg text-sm sm:text-base transition-colors duration-200 shadow-button inline-flex items-center justify-center gap-2 ${pkg.isPremium ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-event-blue hover:bg-event-blue-dark text-white'} active:scale-95`}
              >
                Pelajari Lebih Lanjut <span aria-hidden="true" className="transform group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
              </button>
            </motion.div>
          ))}
        </div>
        <motion.p className={`${paragraphStyle} mt-10 italic text-center text-gray-500`} variants={itemVariants}>Detail lengkap mengenai benefit, investasi, dan opsi kustomisasi untuk masing-masing paket tersedia dalam proposal sponsorship resmi kami. Jangan ragu untuk menghubungi kami!</motion.p>
      </motion.section>

      <motion.section variants={sectionVariants} className="my-16 md:my-20">
        <motion.h2 
            className={sectionTitleStyle}
            variants={itemVariants}
        >
            Apresiasi untuk Para Sponsor & Mitra Kami
        </motion.h2>
        {Object.keys(sponsorsByTier).length === 0 ? (
            <motion.p 
              className="text-center text-event-text-muted py-8 text-lg"
              variants={itemVariants}
            >
              Daftar sponsor dan mitra kami akan segera diumumkan. Terima kasih atas dukungan Anda yang luar biasa!
            </motion.p>
        ) : (
            tierOrder.map((tierKey) => {
              const sponsorsInTier = sponsorsByTier[tierKey];
              const config = tierDisplayConfig[tierKey] || tierDisplayConfig["Other"];
              if (sponsorsInTier && sponsorsInTier.length > 0) {
                return (
                  <motion.div 
                    key={tierKey} 
                    className="mb-12 md:mb-16 flex flex-col items-center w-full" 
                    variants={sectionVariants} 
                  >
                    {config.introBlurb && (
                      <motion.p 
                        className="text-center text-sm sm:text-base text-event-text-muted mb-6 md:mb-8 max-w-3xl mx-auto px-4"
                        variants={itemVariants}
                      >
                        {config.introBlurb}
                      </motion.p>
                    )}
                    <motion.h3 
                      className={config.tierTitleStyle}
                      variants={itemVariants}
                      dangerouslySetInnerHTML={{ __html: config.titleHtml }}
                    />
                    <SponsorLogoGrid 
                      sponsors={sponsorsInTier} 
                      customGridClasses={config.customGridClasses} 
                      onSponsorClick={handleSponsorClick} 
                    />
                  </motion.div>
                );
              }
              return null;
            })
        )}
      </motion.section>
      
      <motion.section variants={sectionVariants}>
        <motion.h3 className={subSectionTitleStyle} variants={itemVariants}>Bagaimana Cara Menjadi Sponsor BYTF 2026?</motion.h3>
        <motion.p className={paragraphStyle} variants={itemVariants}>
          Bergabung sebagai sponsor BYTF 2026 adalah proses yang mudah dan kolaboratif. Kami siap membantu Anda menemukan paket yang paling sesuai dengan strategi brand Anda. Berikut langkah-langkahnya:
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center mt-6">
          {[
            { number: "1", title: "Jelajahi Paket Kami", description: "Pahami berbagai pilihan paket kemitraan yang kami tawarkan dan identifikasi yang paling sesuai dengan tujuan brand Anda.", icon: "🔍" },
            { number: "2", title: "Hubungi Tim Kemitraan", description: "Sampaikan minat Anda kepada tim kami. Kami siap mendiskusikan kebutuhan spesifik dan menjawab semua pertanyaan Anda.", icon: "💬" },
            { number: "3", title: "Kustomisasi & Kolaborasi", description: "Bersama-sama, kita akan merancang proposal kemitraan yang disesuaikan, memastikan sinergi maksimal dan dampak yang optimal.", icon: "✨" }
          ].map((step, index) => (
            <motion.div
              key={step.number}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:scale-105"
              custom={index}
              variants={cardVariants} 
            >
              <div className="text-6xl sm:text-7xl mb-5 text-event-accent">{step.icon}</div>
              <h4 className="text-xl sm:text-2xl font-semibold text-event-blue mb-3">{step.title}</h4>
              <p className="text-sm text-event-text-muted leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        id="contact-sponsorship-cta"
        className="text-center bg-gradient-to-br from-event-blue via-event-accent to-event-green hover:from-event-blue-dark hover:via-event-accent-dark hover:to-event-green-dark transition-all text-white p-8 sm:p-10 md:p-12 rounded-2xl mt-12 shadow-xl" 
        variants={sectionVariants} 
      >
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">Mari Bersinergi untuk Kesuksesan Bersama!</h3>
        <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed">
          Bergabunglah dengan BYTF 2026 dan jadilah bagian integral dari festival yang akan membentuk masa depan kreatif Batam. Ini adalah kesempatan emas untuk meningkatkan visibilitas brand Anda, menjangkau pasar yang relevan, dan menunjukkan komitmen Anda terhadap pengembangan komunitas.
        </p>
        <p className="mt-4 text-lg sm:text-xl mb-4 font-medium">
          Untuk mendapatkan proposal sponsorship atau diskusi lebih lanjut, hubungi tim kemitraan kami:
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <a 
              href="mailto:sponsorship.bytfest@gmail.com?subject=Inquiry%20Sponsorship%20BYTF%202026" 
              className="inline-flex items-center justify-center gap-2.5 bg-white text-event-blue font-bold px-8 py-3.5 rounded-lg shadow-button hover:bg-gray-100 active:bg-gray-200 transform hover:scale-105 active:scale-95 transition-all duration-200 text-base sm:text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
              Email Tim Kemitraan
            </a>
            <a 
              href="https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik%20untuk%20menjadi%20sponsor%20BYTF%202026." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-2.5 border-2 border-white text-white font-bold px-8 py-3.5 rounded-lg hover:bg-white hover:text-event-accent active:bg-white/90 transform hover:scale-105 active:scale-95 transition-all duration-200 text-base sm:text-lg"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
                 <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.1-.8-.396-1.028-.442-.228-.046-.393-.069-.557.069-.164.139-.393.442-.482.529-.09.087-.179.099-.338.033-.16-.065-.678-.247-1.282-.782-.459-.407-.768-.908-.857-1.064-.09-.156-.009-.239.061-.326.064-.082.139-.208.209-.309.07-.1.093-.165.139-.276.046-.112.023-.204-.011-.29Zm-.888-.859c-.276-.299-.492-.37-.666-.37h-.093c-.173 0-.37.078-.545.37-.174.292-.666.836-.666 2.036 0 1.2.69 2.357.782 2.523.092.166 1.397 2.136 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943s-.164-.139-.328-.234Z"/>
               </svg>
              WhatsApp Tim Kemitraan
            </a>
        </div>
        <p className="mt-10 text-gray-50 font-semibold text-xl">Kami antusias untuk berkolaborasi dengan Anda!</p>
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
