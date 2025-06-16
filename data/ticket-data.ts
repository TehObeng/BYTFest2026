
export interface TicketTier {
  id: string;
  name: string;
  price: string;
  originalPrice?: string; // For strikethrough effect if discounted
  benefits: string[];
  availability: 'Tersedia' | 'Segera Hadir' | 'Terbatas' | 'Habis Terjual';
  purchaseLink: string;
  isFeatured?: boolean;
  note?: string;
}

export const ticketData: TicketTier[] = [
  {
    id: "earlybird-daily",
    name: "Early Bird - Tiket Harian (Pilihan Hari 5 atau 6)",
    price: "Rp 250.000",
    originalPrice: "Rp 300.000",
    benefits: [
      "Akses ke area konser utama (1 hari pilihan)",
      "Akses ke semua zona festival umum",
      "Kesempatan melihat semua bintang tamu di hari tersebut"
    ],
    availability: "Terbatas",
    purchaseLink: "https://google.com", // Placeholder
    isFeatured: true,
    note: "Harga spesial, kuota sangat terbatas!"
  },
  {
    id: "normal-daily",
    name: "Tiket Normal Harian (Pilihan Hari 5 atau 6)",
    price: "Rp 300.000",
    benefits: [
      "Akses ke area konser utama (1 hari pilihan)",
      "Akses ke semua zona festival umum",
    ],
    availability: "Segera Hadir",
    purchaseLink: "https://google.com", // Placeholder
  },
  {
    id: "earlybird-two-day-pass",
    name: "Early Bird - Tiket Terusan (Hari 5 & 6)",
    price: "Rp 450.000",
    originalPrice: "Rp 600.000", // (2x Regular Daily Price)
    benefits: [
      "Akses ke area konser utama untuk Hari 5 DAN Hari 6",
      "Akses ke semua zona festival umum selama 2 hari",
      "Merchandise eksklusif (terbatas untuk pembeli awal)",
      "Hemat lebih banyak!"
    ],
    availability: "Terbatas", // Changed from Segera Hadir
    purchaseLink: "https://google.com", // Placeholder
    isFeatured: true,
  },
  {
    id: "regular-two-day-pass",
    name: "Regular - Tiket Terusan (Hari 5 & 6)",
    price: "Rp 400.000", // As requested, though unusual pricing
    benefits: [
      "Akses ke area konser utama untuk Hari 5 DAN Hari 6",
      "Akses ke semua zona festival umum selama 2 hari",
      "Pilihan lebih ekonomis untuk akses 2 hari."
    ],
    availability: "Segera Hadir",
    purchaseLink: "https://google.com", // Placeholder
    note: "Penawaran spesial untuk akses dua hari konser!"
  },
  {
    id: "vip-access",
    name: "VIP Access Pass (Per Hari)",
    price: "Rp 1.000.000",
    benefits: [
      "Akses ke area VIP dekat panggung",
      "Fast lane entry",
      "Akses ke VIP Lounge (makanan & minuman ringan)",
      "Merchandise eksklusif BYTF 2026",
      "Toilet khusus VIP"
    ],
    availability: "Terbatas",
    purchaseLink: "https://google.com", // Placeholder
    note: "Pengalaman festival paling premium! Kuota sangat terbatas."
  },
  {
    id: "free-days",
    name: "Akses Gratis Festival Umum (Hari 1 - 4)",
    price: "GRATIS",
    benefits: [
      "Akses ke semua zona festival umum (pameran UMKM, workshop umum, pertunjukan komunitas, dll) selama Hari 1 hingga Hari 4.",
      "Menikmati parade budaya dan berbagai aktivitas non-konser di hari-hari tersebut."
    ],
    availability: "Tersedia",
    purchaseLink: "#", // No link needed
    note: "Nikmati kemeriahan awal festival tanpa biaya! Tiket berbayar diperlukan untuk akses ke festival pada Hari ke-5 dan Hari ke-6."
  }
];