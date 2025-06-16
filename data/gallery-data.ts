
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category?: string; // e.g., "Konser", "Suasana", "Budaya"
}

export const galleryData: GalleryImage[] = [
  { id: "g1", src: "/images/gallery/gallery_konser_malam.webp", alt: "Suasana konser meriah di malam hari", title: "Kemeriahan Panggung Utama", category: "Konser" },
  { id: "g2", src: "/images/gallery/gallery_parade_budaya.webp", alt: "Parade budaya dengan kostum warna-warni", title: "Parade Budaya Nusantara", category: "Budaya" },
  { id: "g3", src: "/images/gallery/gallery_zona_kuliner.webp", alt: "Pengunjung menikmati makanan di zona kuliner", title: "Jelajah Zona Kuliner", category: "Suasana" },
  { id: "g4", src: "/images/gallery/gallery_workshop_kreatif.webp", alt: "Workshop kreatif diikuti oleh peserta antusias", title: "Workshop Interaktif", category: "Aktivitas" },
  { id: "g5", src: "/images/gallery/gallery_booth_umkm.webp", alt: "Booth UMKM yang ramai dikunjungi", title: "Dukungan untuk Youthpreneur", category: "UMKM" },
  { id: "g6", src: "/images/gallery/gallery_band_lokal.webp", alt: "Penampilan band lokal di panggung komunitas", title: "Energi Talenta Lokal", category: "Konser" },
  { id: "g7", src: "/images/gallery/gallery_cosplayer_popculture.webp", alt: "Cosplayer berpose di zona pop culture", title: "Kreativitas Tanpa Batas", category: "Pop Culture" },
  { id: "g8", src: "/images/gallery/gallery_area_keluarga.webp", alt: "Anak-anak bermain di area keluarga", title: "Keceriaan Keluarga", category: "Suasana" },
  { id: "g9", src: "/images/gallery/gallery_instalasi_seni.webp", alt: "Instalasi seni yang menarik perhatian", title: "Seni dan Inspirasi", category: "Aktivitas" },
];
