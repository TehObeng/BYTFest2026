
import React, { useState } from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import SponsorLogoGrid, { Sponsor } from '../SponsorLogoGrid';
import { mockSponsors } from '../data/sponsor-data';
import SponsorDetailModal from '../SponsorDetailModal';

// --- STYLES ---
const pageTitleStyle = "text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-event-blue via-event-accent to-event-green mb-4";
const heroSubtitleStyle = "text-center text-base sm:text-lg md:text-xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed";
const sectionTitleStyle = "text-left text-2xl sm:text-3xl md:text-4xl font-bold text-event-text-heading mt-16 mb-10 pb-4 border-b border-gray-200/80";
const paragraphStyle = "mb-6 leading-relaxed text-event-text text-sm sm:text-base md:text-lg text-justify";
const cardBaseStyle = "bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease p-6 flex flex-col";

// --- ANIMATION VARIANTS ---
const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as Easing } }
};

const sectionContentVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as Easing, staggerChildren: 0.1 } }
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as Easing } }
};

const cardHoverEffect = {
  scale: 1.03,
  y: -5,
  boxShadow: "0 10px 20px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)"
};

// --- DATA STRUCTURES ---

interface StrategicAdvantage {
  icon: string;
  title: string;
  text: string;
}

const strategicAdvantages: StrategicAdvantage[] = [
  { icon: "🎯", title: "Jangkau Audiens Luas & Berkualitas", text: "Terhubung secara autentik dengan puluhan ribu Gen Z & Milenial – demografi yang dinamis, melek digital, berpengaruh, dan haus akan pengalaman unik." },
  { icon: "🤝", title: "Integrasi Brand yang Autentik", text: "Lebih dari sekadar logo. Kami berkolaborasi menciptakan pengalaman brand yang bermakna, berkesan mendalam, dan membangun koneksi jangka panjang dengan target audiens Anda." },
  { icon: "🚀", title: "Perluas Jangkauan & Visibilitas Brand", text: "Manfaatkan pemasaran multi-kanal kami yang luas, hubungan masyarakat, dan kemitraan media untuk memamerkan brand Anda sebelum, selama, dan setelah festival." },
  { icon: "📈", title: "ROI & Dampak Terukur", text: "Kami berkomitmen memberikan hasil nyata. Kemitraan kami dirancang dengan KPI yang jelas, dan kami menyediakan laporan pasca-acara yang komprehensif." },
  { icon: "🌟", title: "Asosiasi Komunitas yang Positif", text: "Selaraskan brand Anda dengan festival yang merayakan pemuda, budaya, dan pariwisata Batam, membangun citra positif dan kehadiran komunitas yang kuat." },
  { icon: "💡", title: "Platform Aktivasi Inovatif", text: "Dari zona imersif hingga keterlibatan digital, kami menawarkan platform yang beragam dan kreatif untuk menghidupkan cerita brand Anda secara efektif." },
];

interface AudienceDemographic {
  icon: string;
  stat: string;
  label: string;
  colorClass: string;
}

const audienceDemographics: AudienceDemographic[] = [
  { icon: "👥", stat: "50.000+", label: "Pengunjung Unik (Estimasi 6 Hari)", colorClass: "bg-event-blue text-white" },
  { icon: "🧑‍🎓", stat: "70%", label: "Gen Z & Milenial (16-35 thn)", colorClass: "bg-event-green text-white" },
  { icon: "📱", stat: "95%", label: "Aktif di Media Sosial Harian", colorClass: "bg-event-accent text-white" },
  { icon: "🎶", stat: "Minat Utama", label: "Musik, Wisata, Teknologi, Fashion, Kuliner", colorClass: "bg-purple-500 text-white" },
  { icon: "🛒", stat: "Daya Beli", label: "Minat Tinggi: Pengalaman & Produk Lokal", colorClass: "bg-yellow-500 text-gray-800" },
  { icon: "🌏", stat: "Jangkauan", label: "Batam, Kepri, Nasional & Regional (SG/MY)", colorClass: "bg-sky-500 text-white" },
];

interface OpportunityPillar {
  id: string;
  icon: string;
  title: string;
  description: string;
  idealFor: string;
  colorClass: string;
}

const opportunityPillars: OpportunityPillar[] = [
  { id: "headline", icon: "🏆", title: "Visibilitas Brand Unggulan", description: "Amankan visibilitas premium di seluruh area festival. Opsi meliputi hak penamaan panggung utama, branding di seluruh festival, dan penempatan logo yang menonjol.", idealFor: "Memaksimalkan ingatan brand dan membangun kepemimpinan pasar.", colorClass: "border-event-blue-dark bg-event-blue-extralight/70" },
  { id: "experiential", icon: "✨", title: "Aktivasi Berbasis Pengalaman", description: "Ciptakan dunia brand yang imersif. Kembangkan zona interaktif, pameran produk, pengalaman gamifikasi, atau lounge bermerek.", idealFor: "Memperdalam koneksi dengan audiens dan menciptakan kenangan tak terlupakan.", colorClass: "border-event-green-dark bg-event-green-light/20" },
  { id: "digital", icon: "💻", title: "Integrasi Digital & Konten", description: "Perluas jangkauan Anda jauh melampaui area festival. Berkolaborasi menciptakan kampanye media sosial yang menarik, konten bersponsor, atau kolaborasi dengan influencer.", idealFor: "Mendorong keterlibatan online dan membangun jejak digital.", colorClass: "border-event-accent-dark bg-event-accent-light/20" },
  { id: "targeted", icon: "🎯", title: "Jangkauan Segmen Tertarget", description: "Terhubung dengan titik minat spesifik. Sponsori zona khusus (mis., Zona Budaya Pop, Pojok Youthpreneur, Area Kuliner) atau kompetisi tertentu.", idealFor: "Menjangkau audiens khusus yang sangat terlibat secara efektif.", colorClass: "border-purple-600 bg-purple-100/80" },
  { id: "community", icon: "🤝", title: "Dampak Komunitas & CSR", description: "Tunjukkan komitmen brand Anda. Dukung penampilan bakat lokal, inisiatif keberlanjutan, atau lokakarya pengembangan pemuda.", idealFor: "Meningkatkan reputasi brand dan menunjukkan tanggung jawab sosial.", colorClass: "border-yellow-600 bg-yellow-100/70" },
];

interface JourneyStep {
  step: string;
  icon: string;
  title: string;
  description: string;
}

const collaborativeJourney: JourneyStep[] = [
  { step: "1", icon: "📞", title: "Diskusi Awal (Discovery Call)", description: "Kami memulai dengan mendengarkan: memahami tujuan brand Anda, target audiens, dan pertimbangan anggaran." },
  { step: "2", icon: "📝", title: "Proposal Kustom", description: "Tim kami menyusun cetak biru kemitraan yang disesuaikan, menguraikan hasil yang jelas, ide aktivasi, dan KPI yang terukur." },
  { step: "3", icon: "🚀", title: "Aktivasi & Eksekusi", description: "Dengan persetujuan Anda, tim kami yang berdedikasi memastikan implementasi semua elemen kemitraan berjalan lancar, mengelola setiap detail." },
  { step: "4", icon: "📊", title: "Pelaporan & Tinjauan", description: "Setelah festival, terima laporan komprehensif yang merinci dampak, jangkauan, keterlibatan, dan pembelajaran utama untuk mengukur kesuksesan." },
];

const SponsorsPage: React.FC = () => {
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSponsorClick = (sponsor: Sponsor) => {
    setSelectedSponsor(sponsor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedSponsor(null), 300); // Delay for exit animation
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact-sponsorship-cta');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };


  return (
    <motion.div
      id="sponsors-blueprint"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="space-y-12 md:space-y-16 lg:space-y-20"
    >
      {/* Hero Section */}
      <motion.section 
        className="text-center bg-gradient-to-br from-event-blue-dark via-event-blue to-event-accent py-16 sm:py-20 md:py-28 rounded-3xl shadow-2xl relative overflow-hidden"
        variants={heroItemVariants}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>
        <div className="absolute inset-0 bg-subtle-dots bg-dots-sm opacity-10 z-[1]"></div>
        <div className="relative z-10 px-4">
          <motion.h2 className={pageTitleStyle} variants={heroItemVariants}>
            Nyalakan Dampak Brand Anda Bersama BYTF 2026
          </motion.h2>
          <motion.p className={heroSubtitleStyle} variants={heroItemVariants} transition={{ delay: 0.1 }}>
            Lebih dari sekadar festival, BYTF 2026 adalah ekosistem dinamis tempat bertemunya semangat pemuda, pesona pariwisata, dan denyut inovasi. Jadilah mitra kami untuk terhubung secara autentik dengan audiens yang bersemangat dan terlibat aktif, serta mencapai tujuan brand yang terukur.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-8"
            variants={heroItemVariants}
            transition={{ delay: 0.2 }}
          >
            <motion.a
              href="#" 
              onClick={(e)=>{e.preventDefault(); alert("Prospektus Sponsorship PDF (Placeholder). Fitur segera datang.")}}
              className="bg-white text-event-blue font-bold px-8 py-3.5 rounded-lg shadow-lg hover:bg-gray-100 active:bg-gray-200 transform hover:scale-105 active:scale-95 transition-all duration-200 text-sm sm:text-base w-full sm:w-auto"
              whileHover={{ y: -2 }}
            >
              Unduh Prospektus Sponsorship
            </motion.a>
            <motion.button
              onClick={handleScrollToContact}
              className="border-2 border-white text-white font-bold px-8 py-3.5 rounded-lg hover:bg-white hover:text-event-accent active:bg-white/90 transform hover:scale-105 active:scale-95 transition-all duration-200 text-sm sm:text-base w-full sm:w-auto"
              whileHover={{ y: -2 }}
            >
              Mari Diskusi Visi Anda
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Why BYTF 2026? Your Strategic Advantage */}
      <motion.section variants={sectionContentVariants}>
        <h3 className={sectionTitleStyle}>Mengapa BYTF 2026? Keunggulan Strategis Anda.</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {strategicAdvantages.map((advantage, index) => (
            <motion.div
              key={index}
              className={`${cardBaseStyle} group border border-gray-200/70 hover:border-event-accent/50`}
              variants={listItemVariants}
              whileHover={cardHoverEffect}
            >
              <div className="text-4xl sm:text-5xl mb-4 text-event-accent group-hover:text-event-accent-dark transition-colors">{advantage.icon}</div>
              <h4 className="text-lg sm:text-xl font-semibold text-event-blue mb-2.5 group-hover:text-event-blue-dark transition-colors">{advantage.title}</h4>
              <p className="text-sm text-event-text-muted leading-relaxed">{advantage.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Meet Your Next Generation of Advocates */}
      <motion.section variants={sectionContentVariants}>
        <h3 className={sectionTitleStyle}>Kenali Calon Advokat Brand Anda: Audiens BYTF</h3>
        <p className={`${paragraphStyle} text-center max-w-3xl mx-auto`}>
            BYTF 2026 menarik audiens yang dinamis dan melek digital, terutama Gen Z dan Milenial. Mereka adalah pencipta tren, pengadopsi awal, dan advokat brand yang vokal, yang mencari pengalaman autentik serta menghargai brand yang selaras dengan minat mereka. Inilah kesempatan Anda untuk berinteraksi langsung dengan mereka.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
          {audienceDemographics.map((demo, index) => (
            <motion.div
              key={index}
              className={`p-5 sm:p-6 rounded-xl shadow-lg text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300 ${demo.colorClass}`}
              variants={listItemVariants}
              whileHover={{boxShadow: "0 0 25px -5px rgba(0,0,0,0.2)"}}
            >
              <div className="text-4xl sm:text-5xl mb-3">{demo.icon}</div>
              <div className="text-2xl sm:text-3xl font-bold mb-1">{demo.stat}</div>
              <p className="text-xs sm:text-sm font-medium uppercase tracking-wider opacity-90">{demo.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Craft Your Custom Partnership: The BYTF Blueprint */}
      <motion.section variants={sectionContentVariants}>
        <h3 className={sectionTitleStyle}>Rancang Kemitraan Kustom Anda: Cetak Biru BYTF</h3>
        <p className={`${paragraphStyle} text-center max-w-3xl mx-auto`}>
          Kami tidak menawarkan paket standar. Kami berkolaborasi menciptakan kemitraan yang disesuaikan dengan <strong>tujuan brand Anda</strong>, anggaran, dan tingkat keterlibatan yang diinginkan. Jelajahi pilar-pilar peluang ini sebagai titik awal, dan mari kita bangun cetak biru kesuksesan Anda di BYTF 2026.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-8">
          {opportunityPillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              className={`${cardBaseStyle} group border-2 ${pillar.colorClass} hover:shadow-xl`}
              variants={listItemVariants}
              whileHover={cardHoverEffect}
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl sm:text-5xl mr-4">{pillar.icon}</span>
                <h4 className="text-xl sm:text-2xl font-bold text-event-text-heading">{pillar.title}</h4>
              </div>
              <p className="text-sm text-gray-700 mb-4 flex-grow leading-relaxed">{pillar.description}</p>
              <div className="mt-auto p-3 bg-white/70 rounded-md border border-dashed border-gray-400">
                <p className="text-xs sm:text-sm italic text-gray-600">
                  <span className="font-semibold text-gray-800">🎯 Ideal untuk:</span> {pillar.idealFor}
                </p>
              </div>
               <button
                onClick={handleScrollToContact}
                className="mt-5 w-full font-semibold py-3 px-4 rounded-lg text-sm sm:text-base transition-colors duration-200 shadow-button bg-event-blue hover:bg-event-blue-dark text-white active:scale-95"
              >
                Diskusikan Opsi {pillar.title.split(' ')[0]}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Our Collaborative Journey */}
      <motion.section variants={sectionContentVariants}>
        <h3 className={sectionTitleStyle}>Perjalanan Kolaboratif Kita: Dari Visi ke Dampak Nyata</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-8">
          {collaborativeJourney.map((item) => (
            <motion.div
              key={item.step}
              className={`${cardBaseStyle} text-center items-center border border-gray-200/70 group`}
              variants={listItemVariants}
              whileHover={cardHoverEffect}
            >
              <div className="bg-event-accent text-white rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-2xl sm:text-3xl font-bold mb-5 shadow-lg group-hover:bg-event-accent-dark transition-colors">{item.icon}</div>
              <h4 className="text-lg sm:text-xl font-semibold text-event-blue mb-2.5">{item.step}. {item.title}</h4>
              <p className="text-xs sm:text-sm text-event-text-muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Our Esteemed Partners */}
      <motion.section variants={sectionContentVariants} className="my-16 md:my-20">
        <h3 className={sectionTitleStyle}>Bergabunglah dengan Komunitas Brand Visioner</h3>
        {mockSponsors.length === 0 ? (
          <motion.p
            className="text-center text-event-text-muted py-8 text-lg"
            variants={listItemVariants}
          >
            Daftar mitra terhormat kami untuk BYTF 2026 terus bertambah. Jadilah yang pertama bergabung dengan kami!
          </motion.p>
        ) : (
          <motion.div
            className="mt-8 flex flex-col items-center w-full"
            variants={sectionContentVariants}
          >
             <motion.p
              className="text-center text-sm sm:text-base text-event-text-muted mb-6 md:mb-8 max-w-3xl mx-auto px-4"
              variants={listItemVariants}
            >
             Kami bangga berkolaborasi dengan organisasi dan brand terkemuka yang memiliki visi yang sama untuk pemberdayaan pemuda dan pengembangan pariwisata di Batam.
            </motion.p>
            <SponsorLogoGrid
              sponsors={mockSponsors}
              onSponsorClick={handleSponsorClick}
              customGridClasses="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6 md:gap-8 items-center justify-items-center w-full"
            />
          </motion.div>
        )}
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        id="contact-sponsorship-cta"
        className="text-center bg-gradient-to-tr from-event-green via-event-accent to-event-blue hover:from-event-green-dark hover:via-event-accent-dark hover:to-event-blue-dark transition-all text-white p-10 sm:p-12 md:p-16 rounded-3xl mt-12 shadow-2xl"
        variants={sectionContentVariants}
      >
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Siap Membangun Legasi BYTF Anda?</h3>
        <p className="text-base sm:text-lg md:text-xl text-gray-50 mb-10 max-w-3xl mx-auto leading-relaxed">
          Ini adalah kesempatan Anda untuk mengangkat brand Anda, terhubung dengan audiens yang penuh semangat, dan membuat dampak jangka panjang. Mari ciptakan sesuatu yang luar biasa bersama-sama.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <motion.a
              href="mailto:sponsorship.bytfest@gmail.com?subject=Permintaan%20Kemitraan%20-%20BYTF%202026"
              className="inline-flex items-center justify-center gap-2.5 bg-white text-event-blue font-bold px-8 py-3.5 rounded-lg shadow-lg hover:bg-gray-100 active:bg-gray-200 transform hover:scale-105 active:scale-95 transition-all duration-200 text-sm sm:text-base w-full sm:w-auto"
              whileHover={{ y: -2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
              Jadwalkan Konsultasi
            </motion.a>
            <motion.a
              href="#" 
              onClick={(e)=>{e.preventDefault(); alert("Prospektus Sponsorship PDF (Placeholder). Fitur segera datang.")}}
              className="inline-flex items-center justify-center gap-2.5 border-2 border-white text-white font-bold px-8 py-3.5 rounded-lg hover:bg-white hover:text-event-accent active:bg-white/90 transform hover:scale-105 active:scale-95 transition-all duration-200 text-sm sm:text-base w-full sm:w-auto"
              whileHover={{ y: -2 }}
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Unduh Prospektus Lengkap
            </motion.a>
        </div>
        <p className="mt-12 text-gray-100 font-semibold text-xl">Mari jadikan BYTF 2026 kesuksesan tak terlupakan, bersama-sama!</p>
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
