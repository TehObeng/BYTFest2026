
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category?: string; // e.g., "Konser", "Suasana", "Budaya"
}

export const galleryData: GalleryImage[] = [
  { id: "g1", src: "/images/gallery/placeholder_1.webp", alt: "Suasana konser meriah di malam hari", title: "Kemeriahan Panggung Utama", category: "Konser" },
  { id: "g2", src: "/images/gallery/placeholder_2.webp", alt: "Parade budaya dengan kostum warna-warni", title: "Parade Budaya Nusantara", category: "Budaya" },
  { id: "g3", src: "/images/gallery/placeholder_3.webp", alt: "Pengunjung menikmati makanan di zona kuliner", title: "Jelajah Zona Kuliner", category: "Suasana" },
  { id: "g4", src: "/images/gallery/placeholder_4.webp", alt: "Workshop kreatif diikuti oleh peserta antusias", title: "Workshop Interaktif", category: "Aktivitas" },
  { id: "g5", src: "/images/gallery/placeholder_5.webp", alt: "Booth UMKM yang ramai dikunjungi", title: "Dukungan untuk Youthpreneur", category: "UMKM" },
  { id: "g6", src: "/images/gallery/placeholder_6.webp", alt: "Penampilan band lokal di panggung komunitas", title: "Energi Talenta Lokal", category: "Konser" },
  { id: "g7", src: "/images/gallery/placeholder_7.webp", alt: "Cosplayer berpose di zona pop culture", title: "Kreativitas Tanpa Batas", category: "Pop Culture" },
  { id: "g8", src: "/images/gallery/placeholder_8.webp", alt: "Anak-anak bermain di area keluarga", title: "Keceriaan Keluarga", category: "Suasana" },
  { id: "g9", src: "/images/gallery/placeholder_9.webp", alt: "Instalasi seni yang menarik perhatian", title: "Seni dan Inspirasi", category: "Aktivitas" },
];
