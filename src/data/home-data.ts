import { HighlightData } from '../components/HighlightModal'; // Updated path

export interface GuestStar {
  name: string;
  description: string;
  imagePath: string;
  type: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  link?: string; // Optional link to full article/page
}

// Data previously in HomePage.tsx

export const festivalHighlightsData: HighlightData[] = [
  { 
    title: "Konser Musik Spektakuler", 
    description: "Artis nasional dan internasional siap menghentak panggung utama.", 
    icon: "🎤",
    detailedDescription: "Panggung utama BYTF 2026 akan bergetar dengan penampilan dari artis-artis papan atas nasional dan internasional. Nikmati kualitas suara dan tata cahaya kelas dunia yang akan membuat pengalaman konser Anda tak terlupakan. Jadwal lengkap dan line-up final akan diumumkan segera! Pastikan Anda tidak melewatkan penampilan idola Anda."
  },
  { 
    title: "Parade Budaya & Komunitas", 
    description: "Rayakan keragaman Batam dengan parade kreatif dari berbagai komunitas.", 
    icon: "🎉",
    detailedDescription: "Saksikan parade megah yang menampilkan kekayaan budaya Batam dan kreativitas tanpa batas dari puluhan komunitas lokal. Mulai dari kostum tradisional yang memukau, tarian daerah yang energik, hingga instalasi seni berjalan yang inovatif. Sebuah perayaan keberagaman yang wajib Anda lihat dan abadikan momennya!"
  },
  { 
    title: "Zona Youthpreneur & UMKM", 
    description: "Temukan produk inovatif dan kuliner lezat dari para pengusaha muda Batam.", 
    icon: "🛍️",
    detailedDescription: "Dukung pengusaha muda Batam dan temukan produk-produk unik di Zona Youthpreneur! Jelajahi berbagai booth yang menawarkan fashion, kerajinan tangan, kuliner inovatif, dan banyak lagi. Kesempatan emas untuk berbelanja produk lokal berkualitas, mendapatkan inspirasi bisnis, dan bertemu langsung dengan para kreatornya."
  },
  { 
    title: "Workshop & Talkshow Inspiratif", 
    description: "Belajar hal baru dan dapatkan inspirasi dari para ahli dan tokoh ternama.", 
    icon: "💡",
    detailedDescription: "Perluas wawasan dan dapatkan inspirasi baru dari para ahli, tokoh publik, dan praktisi berpengalaman di berbagai bidang. Sesi workshop interaktif dan talkshow yang insightful akan membahas topik-topik terkini seputar kreativitas, teknologi, kewirausahaan, dan pengembangan diri. Ambil kesempatan untuk bertanya langsung dan berjejaring."
  },
  { 
    title: "Lomba & Kompetisi Seru", 
    description: "Tunjukkan bakatmu di berbagai kompetisi: Cosplay, K-Pop Dance, E-Sports, dan lainnya!", 
    icon: "🏆",
    detailedDescription: "Ajang unjuk bakat terbesar di BYTF 2026! Daftarkan diri Anda atau dukung peserta favorit di berbagai kategori lomba seperti Cosplay Competition (Walk-on & Performance), K-Pop Dance Cover, Turnamen E-Sports, Lomba Fotografi Festival, dan banyak lagi. Hadiah menarik dan pengakuan menanti para juara!"
  },
  { 
    title: "Pameran Seni & Teknologi", 
    description: "Jelajahi karya seni menakjubkan dan inovasi teknologi terkini.", 
    icon: "🎨",
    detailedDescription: "Masuki dunia imajinasi dan inovasi di Pameran Seni & Teknologi. Kagumi karya-karya seni visual dari seniman lokal dan regional, serta jelajahi instalasi teknologi interaktif yang akan membuka pandangan Anda tentang masa depan. Pengalaman yang memadukan estetika, kreativitas, dan kecanggihan teknologi."
  }
];

export const guestStars: GuestStar[] = [
  {
    name: "JKT48",
    description: "Saksikan penampilan energik dari idol group fenomenal JKT48!",
    imagePath: "/images/jkt48.webp",
    type: "Idol Group"
  },
  {
    name: "HIVI!",
    description: "Nikmati alunan musik pop ceria dan lagu-lagu hits dari HIVI!",
    imagePath: "/images/hivi.webp",
    type: "Band Pop"
  },
  {
    name: "Juicy Luicy",
    description: "Terhanyut dalam melodi sendu dan lirik puitis bersama Juicy Luicy.",
    imagePath: "/images/juicy-luicy.webp",
    type: "Band Pop Puitis"
  },
  {
    name: "Eka Gustiwana",
    description: "Rasakan pengalaman musik elektronik unik dan aransemen kreatif dari Eka Gustiwana.",
    imagePath: "/images/eka-gustiwana.webp",
    type: "DJ / Produser"
  },
];

export const latestNewsData: NewsItem[] = [
  {
    id: "news-1",
    date: "20 Mei 2024",
    title: "Pendaftaran Tenant UMKM BYTF 2026 Segera Dibuka!",
    summary: "Siapkan bisnismu! Kesempatan emas untuk para pengusaha muda Batam memamerkan produk di festival terbesar tahun ini. Info lengkap minggu depan.",
    link: "#nav-contact"
  },
  {
    id: "news-2",
    date: "15 Mei 2024",
    title: "Lineup Fase Pertama Diumumkan! Siapa Saja Mereka?",
    summary: "Beberapa nama besar dipastikan akan meramaikan panggung BYTF 2026. Cek halaman Lineup untuk detailnya!",
    link: "#nav-lineup" 
  },
  {
    id: "news-3",
    date: "10 Mei 2024",
    title: "Volunteer BYTF 2026: Jadilah Bagian dari Sejarah!",
    summary: "Panggilan untuk kamu yang berjiwa muda dan ingin berkontribusi. Pendaftaran relawan akan dibuka awal Juni. Stay tuned!",
    link: "#nav-contact" 
  },
];
