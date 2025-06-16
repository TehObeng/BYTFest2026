
export interface Activity {
  text: string;
  time?: string; 
  emphasis?: string;
  highlightColor?: string;
  icon?: string; // New: For visual cue of activity type e.g., '🎤', '🧑‍🏫', '🏆'
  linkedArtist?: { // New: For linking to an artist on the Lineup page
    id: string; // Artist ID from lineupData
    name: string; // Artist name to display as link
  };
}

interface DaySchedule {
  title: string;
  shortTitle: string; // New: For tab labels
  borderColorClass: string; 
  activities: Activity[];
}

export const scheduleData: DaySchedule[] = [
  { 
    title: "Hari 1-2: Pembukaan Spektakuler & Gelora Komunitas (1-2 Juni)", 
    shortTitle: "Hari 1-2",
    borderColorClass: "border-event-blue",
    activities: [
      { text: "Upacara Pembukaan Megah:", emphasis: "Menampilkan pertunjukan kolosal, tarian tradisional, dan seremoni resmi.", highlightColor: "text-event-blue-dark", time: "1 Juni, 10:00 - 12:00", icon: "🎉" },
      { text: "Parade Budaya Lintas Komunitas:", emphasis: "Saksikan keberagaman Batam dalam satu barisan.", time: "1 Juni, 14:00 - 16:00", icon: "🎊" },
      { text: "Pertunjukan Seni Tradisional (Mak Yong, Zapin) & Kontemporer (Modern Dance, Beatbox).", time: "1 Juni, 19:00 - 21:00", icon: "🎭" },
      { text: "Babak Penyisihan Lomba: Cosplay (Walk-on), K-Pop Dance Cover (Group), Fotografi (On-the-spot theme).", time: "2 Juni, 13:00 - 17:00", icon: "🏆" },
      { text: "Pembukaan Zona UMKM & Kuliner:", emphasis: "Ratusan pilihan produk kreatif dan hidangan lezat.", time: "1-2 Juni, Sepanjang Hari", icon: "🛍️" },
      { text: "Workshop Kreatif Sesi Awal:", emphasis: "Misal, \"Dasar Videografi Smartphone\", \"Membuat Kerajinan Daur Ulang\".", time: "2 Juni, Sesi Pagi & Siang", icon: "🧑‍🏫" },
    ]
  },
  {
    title: "Hari 3-4: Edukasi, Inspirasi & Unjuk Bakat (3-4 Juni)",
    shortTitle: "Hari 3-4",
    borderColorClass: "border-event-accent",
    activities: [
      { text: "Talkshow Inspiratif:", emphasis: "Bersama Tokoh Nasional (Pengusaha Sukses, Aktivis Sosial) & Lokal (Seniman Berprestasi, Atlet).", time: "3 Juni, 14:00 - 16:00", icon: "🗣️" },
      { text: "Seminar Pengembangan Diri & Karir:", emphasis: "Tema \"Digital Skills for Future\", \"Personal Branding\".", time: "4 Juni, 10:00 - 12:00", icon: "🧠" },
      { text: "Final Lomba & Pengumuman Pemenang Tahap Awal: Lomba Lukis, Cipta Puisi, Band Akustik.", time: "3 Juni, Sore", icon: "🏅" },
      { text: "Showcase Talenta Komunitas:", emphasis: "Panggung terbuka untuk musik indie, pertunjukan teaterikal, stand-up comedy.", time: "3-4 Juni, Malam Hari", icon: "🌟" },
      { text: "Zona Edukasi:", emphasis: "Pameran Teknologi Hijau, Inovasi Digital, dan Startup Lokal.", time: "3-4 Juni, Sepanjang Hari", icon: "💡" },
      { text: "Aktivasi Sponsor & Games Interaktif:", emphasis: "Berburu hadiah dan pengalaman seru di booth sponsor." , icon: "🎮"},
      { text: "Tema Khusus Hari ke-4 (4 Juni):", emphasis: "\"Semangat Pancasila dan Toleransi Pemuda\" - Diskusi panel, pameran budaya, dan pertunjukan kolaboratif.", highlightColor: "text-event-accent-dark", time: "4 Juni, Sepanjang Hari", icon: "🕊️" },
    ]
  },
  {
    title: "Hari 5-6: Puncak Perayaan & Konser Akbar (5-6 Juni)",
    shortTitle: "Hari 5-6",
    borderColorClass: "border-event-green",
    activities: [
      { 
        text: "Konser Musik dengan Bintang Tamu Nasional & Internasional. Saksikan penampilan dari ", 
        emphasis: "Dua malam penuh bintang di panggung utama (area berbayar).", 
        highlightColor: "text-event-green-dark", 
        time: "5-6 Juni, Mulai 19:00", 
        icon: "🎤",
        linkedArtist: { id: "jkt48", name: "JKT48" }
      },
       { 
        text: "Pastikan juga untuk tidak melewatkan ", 
        emphasis: "", 
        time: "5-6 Juni, Mulai 19:00", 
        icon: "🎤",
        linkedArtist: { id: "hivi", name: "HIVI!" }
      },
      { 
        text: "Alunan merdu dari ", 
        time: "5 Juni, Jadwal Menyusul", 
        icon: "🎤",
        linkedArtist: { id: "tulus", name: "Tulus" } 
      },
      { 
        text: "Panggung Hip-Hop Dangdut bersama ", 
        time: "6 Juni, Jadwal Menyusul", 
        icon: "🎤",
        linkedArtist: { id: "ndx-aka", name: "NDX A.K.A." }
      },
      { text: "Penampilan Spesial dari Pemenang Lomba Utama: Juara Cosplay Performance, K-Pop Dance, Band Festival.", time: "5 Juni, Sore", icon: "🌟" },
      { text: "Grand Final Turnamen E-Sports:", emphasis: "Pertarungan sengit tim-tim terbaik.", time: "6 Juni, Siang - Sore", icon: "🎮" },
      { text: "Pameran Karya Seni & Fotografi Terbaik:", emphasis: "Kurasi karya pemenang lomba dan seniman undangan.", icon: "🖼️" },
      { text: "Bazaar UMKM Unggulan & Festival Kuliner Spesial.", time: "5-6 Juni, Sepanjang Hari", icon: "🍲" },
      { text: "Upacara Penutupan Spektakuler & Pesta Kembang Api:", emphasis: "Mengakhiri BYTF 2026 dengan kenangan manis.", highlightColor: "text-event-green-dark", time: "6 Juni, 22:00", icon: "🎆" },
    ]
  }
];

export const festivalZones = [
    { icon: "🏟️", title: "Panggung Utama", description: "Jantung festival! Nikmati konser artis ternama, pertunjukan spektakuler, dan seremoni penting." },
    { icon: "🎤", title: "Panggung Komunitas", description: "Ruang bagi talenta lokal dan puluhan komunitas Batam untuk unjuk gigi. Dari musik akustik, tari, hingga teater mini." },
    { icon: "🛍️", title: "Zona Youthpreneur", description: "Surga belanja produk lokal! Area khusus untuk UMKM muda, produk kreatif, fashion, dan kerajinan tangan inovatif." },
    { icon: "🍔", title: "Zona Kuliner", description: "Manjakan lidahmu! Ratusan pilihan hidangan lezat dari kuliner khas Batam, Nusantara, hingga jajanan kekinian." },
    { icon: "🎭", title: "Zona Pop Culture", description: "Tempat berkumpulnya para cosplayer, penggemar K-Pop, kolektor mainan, dan komunitas hobi lainnya. Banyak spot foto keren!" },
    { icon: "💡", title: "Zona Edukasi & Workshop", description: "Tambah ilmu dan keterampilan baru melalui pameran interaktif, demo teknologi, dan sesi workshop praktis." },
    { icon: "📰", title: "Media Center & Lounge", description: "Fasilitas khusus untuk rekan media meliput acara dan area nyaman bagi para mitra sponsor kami." },
    { icon: "👨‍👩‍👧‍👦", title: "Zona Relaksasi & Keluarga", description: "Area teduh untuk beristirahat sejenak, lengkap dengan fasilitas ramah anak." }
];
