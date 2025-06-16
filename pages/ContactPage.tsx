
import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';

const pageTitleStyle = "text-left text-3xl sm:text-4xl md:text-4xl font-bold text-event-text-heading mt-0 mb-10 pb-5 border-b-2 border-gray-200";
const paragraphStyle = "mb-6 leading-relaxed text-event-text text-justify text-sm sm:text-base";
const contactSectionStyle = "p-5 sm:p-6 bg-white rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300"; // New card style
const contactTitleStyle = "text-left text-lg sm:text-xl font-semibold text-event-blue mt-0 mb-3";
const contactListStyle = "list-none pl-0 space-y-1.5 text-sm sm:text-base text-event-text-muted"; // Slightly larger base text
const linkStyle = "text-event-accent hover:text-event-accent-dark hover:underline transition-colors font-medium";

type ContactDetail =
  | { type: 'email'; label: string; value: string; note?: string }
  | { type: 'whatsapp'; label: string; value: string; link: string; note?: string }
  | { type: 'social'; label: string; value: string; link: string; note?: string }
  | { type: 'link'; label?: string; value: string; link?: string; note?: string; isComingSoon?: boolean }
  | { type: 'text'; label?: string; value: string; note?: string }
  | { type: 'note'; value: string; label?: string };

interface ContactPoint {
  title: string;
  description?: string;
  details?: ContactDetail[];
  isAddress?: boolean;
  addressLines?: string[];
  note?: string; 
}

const sectionGroupVariants: Variants = { 
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.05 } 
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

const contactCardVariants: Variants = { 
  hidden: { opacity: 0, x: -25, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: i * 0.07, 
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as Easing
    }
  })
};

const contactPoints: ContactPoint[] = [
    {
        title: "Informasi Umum & Pengunjung",
        description: "Punya pertanyaan seputar tiket, jadwal, aksesibilitas, atau hal umum lainnya terkait festival?",
        details: [
            { label: "Email", value: "info@bytfest.org", type: "email" },
            { label: "WhatsApp", value: "+62 812-0000-1111", type: "whatsapp", link: "https://wa.me/6281200001111", note: "Jam Operasional: Senin-Jumat, 09:00-17:00 WIB" },
            { label: "Instagram", value: "@bytf.official", type: "social", link: "https://instagram.com/bytf.official", note: "Untuk update cepat, ikuti kami!" },
        ]
    },
    {
        title: "Sponsorship & Kemitraan",
        description: "Tertarik untuk menjadikan brand Anda bagian dari kesuksesan BYTF 2026? Hubungi tim kemitraan kami.",
        details: [
            { label: "Email", value: "sponsorship@bytfest.org", type: "email" },
            { label: "Koordinator", value: "Ibu Aisyah Putri", type: "text" },
            { label: "Form Minat", value: "di sini (Segera Hadir)", type: "link", link: "#", note: "Link akan tersedia segera", isComingSoon: true },
        ]
    },
    {
        title: "Liputan Media & Pers",
        description: "Untuk permintaan wawancara, press release, atau akreditasi media.",
        details: [
            { label: "Email", value: "media@bytfest.org", type: "email" },
            { label: "Koordinator", value: "Bapak Budi Santoso", type: "text" },
        ]
    },
    {
        title: "Tenant UMKM & Vendor",
        description: "Ingin memamerkan dan menjual produk Anda di zona Youthpreneur atau area vendor lainnya?",
        details: [
            { label: "Email", value: "tenant@bytfest.org", type: "email" },
            { type: "note", value: "Pantau pengumuman resmi mengenai periode open call untuk tenant di website dan media sosial kami." },
        ]
    },
    {
        title: "Pendaftaran Relawan",
        description: "Ingin berkontribusi langsung dan mendapatkan pengalaman berharga di balik layar festival?",
        details: [
            { label: "Email", value: "volunteer@bytfest.org", type: "email" },
            { type: "note", value: "Informasi detail mengenai pendaftaran relawan akan diumumkan lebih lanjut. Stay tuned!" },
        ]
    },
    {
        title: "Alamat Kantor Penyelenggara",
        isAddress: true,
        addressLines: [
            "Phoenix EO Batam (Contoh)",
            "Gedung Kreatif Batam, Lt. 3",
            "Jl. Festival Pemuda No. 1, Batam Center,",
            "Kota Batam, Kepulauan Riau (29461)"
        ],
        details: [
           { label: "Instagram EO", value: "@phoenixeventbatam", type: "social", link: "https://www.instagram.com/phoenixeventbatam/?hl=en" }
        ],
        note: "(Kunjungan hanya dengan perjanjian)"
    }
];


const ContactPage: React.FC = () => (
  <motion.div 
    id="contact"
    initial="hidden"
    animate="visible"
    variants={sectionGroupVariants}
    className="space-y-10"
  >
    <motion.h2 className={pageTitleStyle} variants={itemVariants}>Hubungi Tim BYTF 2026</motion.h2>
    <motion.p className={paragraphStyle} variants={itemVariants}>Kami sangat antusias untuk mendengar dari Anda! Apakah Anda memiliki pertanyaan spesifik, saran berharga, atau keinginan untuk berkolaborasi dalam menyukseskan BYTF 2026? Silakan hubungi kami melalui kanal yang paling sesuai dengan kebutuhan Anda di bawah ini. Tim kami akan berusaha merespons sesegera mungkin, umumnya dalam 1-2 hari kerja.</motion.p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {contactPoints.map((point, index) => (
        <motion.section 
          key={index} 
          className={`${contactSectionStyle} flex flex-col`} // Added flex flex-col
          custom={index}
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.15 }} 
          variants={contactCardVariants}
        >
          <h3 className={contactTitleStyle}>{point.title}</h3>
          {point.description && <p className="text-xs text-gray-500 mb-3 leading-relaxed">{point.description}</p>}
          
          <div className="flex-grow"> {/* Added flex-grow for content */}
            {point.isAddress ? (
              <>
                <p className="text-sm text-event-text-muted"> 
                  {point.addressLines?.map((line, lineIdx) => <React.Fragment key={lineIdx}>{line}<br/></React.Fragment>)}
                </p>
                {point.details?.map((detail, detailIdx) => ( 
                  <li key={detailIdx} className="list-none mt-1.5">
                    {detail.label && <strong className="text-xs text-gray-700">{detail.label}:</strong>}
                    {detail.type === "social" && detail.link && <a href={detail.link} target="_blank" rel="noopener noreferrer" className={linkStyle}> {detail.value}</a>}
                    {detail.type !== 'note' && detail.note && (
                      <span className="block text-xs text-gray-500 ml-1 mt-0.5"><em>{detail.note}</em></span>
                    )}
                    {detail.type === 'note' && (
                       <span className="block text-xs text-gray-500 ml-1 mt-0.5"><em>{detail.value}</em></span>
                    )}
                  </li>
                ))}
              </>
            ) : (
              <ul className={contactListStyle}>
                {point.details?.map((detail, detailIdx) => (
                  <li key={detailIdx}>
                    {detail.label && <strong className="text-gray-700">{detail.label}:</strong>}
                    {detail.type === "email" && <a href={`mailto:${detail.value}`} className={linkStyle}> {detail.value}</a>}
                    {detail.type === "whatsapp" && detail.link && <a href={detail.link} target="_blank" rel="noopener noreferrer" className={linkStyle}> {detail.value}</a>}
                    {detail.type === "social" && detail.link && <a href={detail.link} target="_blank" rel="noopener noreferrer" className={linkStyle}> {detail.value}</a>}
                    {detail.type === "link" && detail.isComingSoon ? (
                      <span className="text-gray-500"> {detail.value}</span>
                    ) : detail.type === "link" ? (
                      <a href={detail.link || "#"} className={linkStyle}> {detail.value}</a>
                    ) : null}
                    {detail.type === "text" && ` ${detail.value}`}
                    
                    {detail.type !== 'note' && detail.note && (
                      <span className="block text-xs text-gray-500 ml-1 mt-0.5"><em>{detail.note}</em></span>
                    )}
                    {detail.type === 'note' && (
                      <span className="block text-xs text-gray-500 ml-1 mt-0.5"><em>{detail.value}</em></span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {point.note && point.isAddress && <p className="text-xs text-gray-500 mt-auto pt-3">{point.note}</p>} {/* Moved address note to bottom */}
        </motion.section>
      ))}
    </div>

    <motion.p 
      className={`${paragraphStyle} mt-12 text-center bg-event-accent/10 p-5 sm:p-6 rounded-xl border border-event-accent/30 text-event-accent-dark`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={itemVariants} 
    >
      Kami menghargai setiap masukan dan pertanyaan dari Anda. Tim BYTF 2026 berkomitmen untuk memberikan pengalaman terbaik dan menjawab setiap pertanyaan dengan saksama. Terima kasih atas minat dan dukungan Anda terhadap Batam Youth & Tourism Festival!
    </motion.p>
  </motion.div>
);

export default ContactPage;
