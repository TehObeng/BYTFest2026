
import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';

const pageTitleStyle = "text-left text-3xl sm:text-4xl md:text-4xl font-bold text-event-text-heading mt-0 mb-10 pb-5 border-b-2 border-gray-200";
const sectionTitleStyle = "text-left text-2xl sm:text-3xl font-semibold text-event-text-heading mt-12 mb-6";
const paragraphStyle = "mb-5 leading-relaxed text-event-text text-sm sm:text-base md:text-lg text-justify";
const missionListStyle = "list-none space-y-5"; 

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as Easing, staggerChildren: 0.15 } 
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

const pillarCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as Easing
    }
  })
};

interface MissionItem {
  icon: string;
  text: string;
}

const missionData: MissionItem[] = [
    { icon: "🌟", text: "Menyediakan platform inklusif dan dinamis bagi pemuda Batam untuk mengeksplorasi, mengekspresikan, dan mengembangkan bakat, ide, serta kreativitas mereka di berbagai bidang." },
    { icon: "📈", text: "Mendorong pertumbuhan ekosistem ekonomi kreatif lokal dengan memberdayakan UMKM, seniman, dan talenta muda melalui pameran, workshop, dan peluang pasar." },
    { icon: "🏞️", text: "Memperkenalkan dan mempromosikan secara aktif destinasi wisata ikonik, atraksi budaya, dan keramahan khas Batam kepada wisatawan domestik dan mancanegara." },
    { icon: "❤️", text: "Memperkuat ikatan persatuan, semangat toleransi, dan kebanggaan sebagai warga Batam melalui kegiatan-kegiatan yang melibatkan partisipasi aktif berbagai komunitas." },
    { icon: "🚀", text: "Menginspirasi dan membekali generasi muda untuk menjadi agen perubahan yang proaktif, inovatif, dan berkontribusi positif bagi pembangunan sosial dan lingkungan." }
];

interface PillarData {
    icon: string;
    title: string;
    description: string;
    specialClass?: string;
}

const festivalPillars: PillarData[] = [
  { icon: "🎨", title: "Ekspresi Pemuda & Inovasi", description: "Memberikan ruang seluas-luasnya bagi unjuk bakat, kreasi seni, ide-ide segar, dan inovasi anak muda dalam berbagai bentuk dan platform." },
  { icon: "🌏", title: "Promosi Pariwisata & Budaya", description: "Menampilkan pesona, keindahan alam, keragaman budaya, dan keunikan Batam sebagai destinasi wisata yang wajib dikunjungi." },
  { icon: "💼", title: "Pengembangan Ekonomi Kreatif", description: "Mendukung pertumbuhan UMKM lokal dan industri kreatif melalui bazaar, pameran produk, workshop keterampilan, dan peluang jejaring bisnis." },
  { icon: "💡", title: "Edukasi & Inspirasi", description: "Menghadirkan konten edukatif, seminar, talkshow, dan pameran yang menginspirasi, membuka wawasan, dan membekali pemuda dengan pengetahuan relevan." },
  { icon: "🤝", title: "Kolaborasi Komunitas & Toleransi", description: "Merangkul dan memfasilitasi kerjasama antar berbagai komunitas, memperkuat jejaring sosial, dan merayakan semangat toleransi serta kebersamaan.", specialClass: "sm:col-span-2 lg:col-span-1 lg:col-start-2" }
];


const AboutPage: React.FC = () => (
  <motion.div 
    id="about"
    initial="hidden"
    animate="visible" 
    variants={sectionVariants}
    className="space-y-12 md:space-y-16"
  >
    <motion.h2 className={pageTitleStyle} variants={itemVariants}>Tentang BYTF 2026: Lebih Dari Sekedar Festival</motion.h2>
    <motion.p className={paragraphStyle} variants={itemVariants}>Batam Youth & Tourism Festival (BYTF) 2026 adalah sebuah perayaan akbar yang dirancang sebagai wadah ekspresi, inovasi, dan kolaborasi bagi generasi muda Batam. Lebih dari itu, BYTF bertujuan untuk mengangkat dan mempromosikan kekayaan potensi pariwisata serta keragaman budaya kota Batam ke panggung yang lebih luas, baik nasional maupun internasional.</motion.p>
    <motion.p className={paragraphStyle} variants={itemVariants}>Kami percaya bahwa energi pemuda adalah kunci kemajuan, dan pariwisata adalah jendela untuk menampilkan identitas serta keunikan sebuah daerah. BYTF hadir untuk menjembatani keduanya, menciptakan sebuah festival yang tidak hanya menghibur tetapi juga memberdayakan dan menginspirasi.</motion.p>

    <motion.section variants={sectionVariants}>
      <motion.h3 className={sectionTitleStyle} variants={itemVariants}>Visi Kami</motion.h3>
      <motion.div 
        className="bg-event-blue-extralight p-6 sm:p-8 rounded-xl border-l-4 border-event-blue shadow-lg"
        variants={itemVariants}
      >
        <motion.p className="font-semibold text-event-blue-dark italic text-base sm:text-lg md:text-xl text-center md:text-left" variants={itemVariants}>
          "Menjadikan Batam sebagai episentrum festival pemuda kreatif dan destinasi pariwisata unggulan di kawasan perbatasan ASEAN, yang menginspirasi kolaborasi lintas budaya dan inovasi berkelanjutan."
        </motion.p>
      </motion.div>
    </motion.section>

    <motion.section variants={sectionVariants}>
      <motion.h3 className={sectionTitleStyle} variants={itemVariants}>Misi Kami</motion.h3>
      <motion.ul className={missionListStyle} variants={sectionVariants}>
        {missionData.map((mission, index) => (
            <motion.li 
              key={index} 
              variants={itemVariants} 
              className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-sm"
            >
                <span className="text-4xl mr-4 text-event-accent shrink-0">{mission.icon}</span>
                <span className="text-sm sm:text-base md:text-lg text-event-text self-center">{mission.text}</span>
            </motion.li>
        ))}
      </motion.ul>
    </motion.section>

    <motion.section variants={sectionVariants}>
      <motion.h3 className={sectionTitleStyle} variants={itemVariants}>Pilar Festival BYTF 2026</motion.h3>
      <motion.p className={paragraphStyle} variants={itemVariants}>Keseluruhan rangkaian acara BYTF 2026 dibangun di atas lima pilar utama yang saling mendukung untuk menciptakan pengalaman festival yang komprehensif dan berdampak:</motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6">
        {festivalPillars.map((pillar, index) => (
          <motion.div 
            key={index} 
            className={`bg-white p-6 rounded-2xl text-center shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease transform hover:-translate-y-1.5 hover:border-event-accent/70 border-2 border-transparent group ${pillar.specialClass || ''}`}
            custom={index}
            variants={pillarCardVariants}
          >
            <div className="text-5xl sm:text-6xl mb-4 text-event-accent group-hover:scale-110 transition-transform duration-300">{pillar.icon}</div>
            <h4 className="text-lg sm:text-xl font-semibold text-event-blue group-hover:text-event-accent-dark mb-2.5 transition-colors duration-300">{pillar.title}</h4>
            <p className="text-xs sm:text-sm text-event-text-muted leading-relaxed">{pillar.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
    
    <motion.section variants={sectionVariants}>
      <motion.h3 className={sectionTitleStyle} variants={itemVariants}>Di Balik Layar: Tim Profesional & Penuh Dedikasi</motion.h3>
      <motion.p className={paragraphStyle} variants={itemVariants}>BYTF 2026 diselenggarakan oleh <strong className="text-event-blue-dark font-semibold">[Nama Event Organizer Profesional Anda - Placeholder]</strong>, sebuah tim yang terdiri dari para profesional berpengalaman, kreatif, dan penuh dedikasi dalam merancang serta mengeksekusi event berskala besar yang berdampak. Dengan semangat inovasi dan perhatian terhadap setiap detail, kami bekerja sama erat dengan Pemerintah Kota Batam, Dinas Pariwisata, berbagai komunitas pemuda kreatif, serta didukung oleh para sponsor dan mitra media yang memiliki visi sejalan untuk kemajuan Batam.</motion.p>
      
      <motion.div 
        className="mt-8 bg-gradient-to-r from-event-accent/10 via-sky-50 to-teal-50 p-6 sm:p-8 rounded-xl shadow-lg border border-event-accent/30"
        variants={itemVariants}
      >
        <h4 className="text-xl sm:text-2xl font-semibold text-event-text-heading mb-3 text-center sm:text-left">Semangat Kami</h4>
        <p className="text-sm sm:text-base text-event-text-muted italic text-center sm:text-justify leading-relaxed">
            "Kami adalah kolektif individu yang bersemangat tentang Batam, pemuda, dan kekuatan transformatif dari sebuah festival. Setiap detail direncanakan dengan hati, setiap tantangan dihadapi dengan solusi kreatif, dan setiap momen diciptakan untuk meninggalkan kesan mendalam. Bagi kami, BYTF bukan hanya sekadar pekerjaan—ini adalah panggilan untuk berkontribusi, menginspirasi, dan merayakan potensi luar biasa yang dimiliki kota ini dan generasi mudanya."
        </p>
      </motion.div>
    </motion.section>

    <motion.section 
        className="text-center bg-event-accent hover:bg-event-accent-dark transition-colors text-white p-8 sm:p-10 md:p-12 rounded-2xl shadow-xl mt-12"
        variants={sectionVariants}
      >
        <motion.h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4" variants={itemVariants}>Bergabunglah Dalam Kemeriahan!</motion.h3>
        <motion.p className="text-base sm:text-lg text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed" variants={itemVariants}>
          BYTF 2026 adalah milik kita bersama—sebuah panggung bagi Batam untuk bersinar dan generasi muda untuk unjuk gigi. Kami mengundang Anda semua: para pemuda, komunitas, pelaku kreatif, UMKM, wisatawan, dan seluruh masyarakat Batam untuk menjadi bagian dari sejarah ini. Mari ciptakan kenangan tak terlupakan dan dorong perubahan positif bersama!
        </motion.p>
        <motion.button
            onClick={(e) => {
                e.preventDefault();
                const navButton = document.getElementById('nav-tickets');
                if (navButton) navButton.click();
            }}
            className="bg-white text-event-accent font-bold px-8 py-3.5 rounded-lg shadow-button hover:bg-gray-100 active:bg-gray-200 transform active:scale-95 transition-all duration-200 text-sm sm:text-base"
            variants={itemVariants}
        >
            Dapatkan Tiket Anda
        </motion.button>
    </motion.section>

  </motion.div>
);

export default AboutPage;
