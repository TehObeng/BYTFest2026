
import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';

const pageTitleStyle = "text-2xl sm:text-3xl md:text-4xl font-bold text-event-text-heading mt-0 mb-8 pb-4 border-b-2 border-gray-200"; // Adjusted font size
const sectionTitleStyle = "text-xl sm:text-2xl md:text-3xl font-semibold text-event-text-heading mt-10 mb-5"; // Adjusted font size
const paragraphStyle = "mb-5 leading-relaxed text-event-text-muted text-sm sm:text-base md:text-lg text-justify"; // Adjusted font size (base is sm)
const listStyle = "list-disc pl-6 mb-5 text-event-text-muted space-y-2.5 text-sm sm:text-base md:text-lg";  // Adjusted font size (base is sm)

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

const pillarCardVariants: Variants = {
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


const AboutPage: React.FC = () => (
  <motion.div 
    id="about"
    initial="hidden"
    animate="visible" 
    variants={sectionVariants} 
  >
    <motion.h2 className={pageTitleStyle} variants={itemVariants}>Tentang BYTF 2026: Lebih Dari Sekedar Festival</motion.h2>
    <motion.p className={paragraphStyle} variants={itemVariants}>Batam Youth & Tourism Festival (BYTF) 2026 adalah sebuah perayaan akbar yang dirancang sebagai wadah ekspresi, inovasi, dan kolaborasi bagi generasi muda Batam. Lebih dari itu, BYTF bertujuan untuk mengangkat dan mempromosikan kekayaan potensi pariwisata serta keragaman budaya kota Batam ke panggung yang lebih luas, baik nasional maupun internasional.</motion.p>
    <motion.p className={paragraphStyle} variants={itemVariants}>Kami percaya bahwa energi pemuda adalah kunci kemajuan, dan pariwisata adalah jendela untuk menampilkan identitas serta keunikan sebuah daerah. BYTF hadir untuk menjembatani keduanya.</motion.p>

    <motion.section className="mb-8" variants={sectionVariants}>
      <motion.h3 className={sectionTitleStyle} variants={itemVariants}>Visi Kami</motion.h3>
      <motion.p className={`${paragraphStyle} font-semibold text-event-blue-dark italic text-base sm:text-lg md:text-xl`} variants={itemVariants}>"Menjadikan Batam sebagai episentrum festival pemuda kreatif dan destinasi pariwisata unggulan di kawasan perbatasan ASEAN, yang menginspirasi kolaborasi lintas budaya dan inovasi berkelanjutan."</motion.p> {/* Adjusted font size */}
    </motion.section>

    <motion.section className="mb-8" variants={sectionVariants}>
      <motion.h3 className={sectionTitleStyle} variants={itemVariants}>Misi Kami</motion.h3>
      <motion.ul className={listStyle} variants={itemVariants}>
        {[
            "Menyediakan platform inklusif dan dinamis bagi pemuda Batam untuk mengeksplorasi, mengekspresikan, dan mengembangkan bakat, ide, serta kreativitas mereka di berbagai bidang.",
            "Mendorong pertumbuhan ekosistem ekonomi kreatif lokal dengan memberdayakan UMKM, seniman, dan talenta muda melalui pameran, workshop, dan peluang pasar.",
            "Memperkenalkan dan mempromosikan secara aktif destinasi wisata ikonik, atraksi budaya, dan keramahan khas Batam kepada wisatawan domestik dan mancanegara.",
            "Memperkuat ikatan persatuan, semangat toleransi, dan kebanggaan sebagai warga Batam melalui kegiatan-kegiatan yang melibatkan partisipasi aktif berbagai komunitas.",
            "Menginspirasi dan membekali generasi muda untuk menjadi agen perubahan yang proaktif, inovatif, dan berkontribusi positif bagi pembangunan sosial dan lingkungan."
        ].map((mission, index) => (
            <motion.li key={index} variants={itemVariants}>{mission}</motion.li>
        ))}
      </motion.ul>
    </motion.section>

    <motion.section className="mb-8" variants={sectionVariants}>
      <motion.h3 className={sectionTitleStyle} variants={itemVariants}>Pilar Festival BYTF 2026</motion.h3>
      <motion.p className={paragraphStyle} variants={itemVariants}>Keseluruhan rangkaian acara BYTF 2026 dibangun di atas lima pilar utama yang saling mendukung:</motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-4">
        {[
          { title: "🚀 Ekspresi Pemuda & Inovasi", description: "Memberikan ruang seluas-luasnya bagi unjuk bakat, kreasi seni, ide-ide segar, dan inovasi anak muda dalam berbagai bentuk dan platform." },
          { title: "🌏 Promosi Pariwisata & Budaya", description: "Menampilkan pesona, keindahan alam, keragaman budaya, dan keunikan Batam sebagai destinasi wisata yang wajib dikunjungi." },
          { title: "💼 Pengembangan Ekonomi Kreatif", description: "Mendukung pertumbuhan UMKM lokal dan industri kreatif melalui bazaar, pameran produk, workshop keterampilan, dan peluang jejaring bisnis." },
          { title: "💡 Edukasi & Inspirasi", description: "Menghadirkan konten edukatif, seminar, talkshow, dan pameran yang menginspirasi, membuka wawasan, dan membekali pemuda dengan pengetahuan relevan." },
          { title: "🤝 Kolaborasi Komunitas & Toleransi", description: "Merangkul dan memfasilitasi kerjasama antar berbagai komunitas, memperkuat jejaring sosial, dan merayakan semangat toleransi serta kebersamaan.", specialClass: "sm:col-span-2 lg:col-span-1 lg:col-start-2" }
        ].map((pillar, index) => (
          <motion.div 
            key={index} 
            className={`bg-event-blue-extralight p-4 sm:p-6 rounded-xl text-center shadow-card hover:shadow-card-hover transition-all duration-300 ease-custom-ease transform hover:-translate-y-1 ${pillar.specialClass || ''}`} // Adjusted padding
            custom={index}
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={pillarCardVariants}
          >
            <h4 className="text-base sm:text-lg md:text-xl font-semibold text-event-blue mb-2.5">{pillar.title}</h4> {/* Adjusted font size */}
            <p className="text-xs sm:text-sm text-event-text-muted leading-relaxed">{pillar.description}</p> {/* Adjusted font size */}
          </motion.div>
        ))}
      </div>
    </motion.section>
    
    <motion.section variants={sectionVariants}>
      <motion.h3 className={sectionTitleStyle} variants={itemVariants}>Tim Penyelenggara Profesional</motion.h3>
      <motion.p className={paragraphStyle} variants={itemVariants}>BYTF 2026 diselenggarakan oleh <strong className="text-event-blue-dark font-semibold">[Nama Event Organizer Profesional Anda - Placeholder]</strong>, sebuah tim yang terdiri dari para profesional berpengalaman dan penuh dedikasi dalam merancang dan mengeksekusi event berskala besar dan berdampak. Dengan semangat inovasi dan perhatian terhadap detail, kami bekerja sama erat dengan Pemerintah Kota Batam, Dinas Pariwisata, berbagai komunitas pemuda kreatif, serta didukung oleh para sponsor dan mitra media yang memiliki visi sejalan untuk kemajuan Batam.</motion.p>
      <motion.p className={paragraphStyle} variants={itemVariants}>Kami berkomitmen untuk menyajikan sebuah festival yang tidak hanya meriah dan menghibur, tetapi juga aman, nyaman, inklusif, berkesan mendalam, serta memberikan manfaat nyata dan berkelanjutan bagi seluruh pihak yang terlibat.</motion.p>
    </motion.section>
  </motion.div>
);

export default AboutPage;
