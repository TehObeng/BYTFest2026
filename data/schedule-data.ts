
export interface Activity {
  text: string;
  time?: string; 
  emphasis?: string;
  highlightColor?: string;
  icon?: string; 
  linkedArtist?: { 
    id: string; 
    name: string; 
  };
}

interface DaySchedule {
  title: string;
  shortTitle: string; 
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
      { 
        text: "Panggung Komunitas: Penampilan dari {artistName} dan sesi {artistName}.", 
        time: "1 Juni, Sore - Malam", 
        icon: "🌟",
        // This is a bit tricky, ideally one activity per artist or group similar artists.
        // For demo, let's assume the text implies multiple artists, but we link one for now.
        // Or, structure as: "Panggung Komunitas: Penampilan dari Batam Ethnic Fusion & Sesi Poetry Slam"
        // And then have separate linkedArtist entries if granular linking is needed.
        // For this example, let's make it more specific:
      },
      {
        text: "Panggung Komunitas: Alunan Etnik Modern dari {artistName}.",
        time: "1 Juni, 16:30 - 17:30",
        icon: "🎶",
        linkedArtist: { id: "batam-ethnic-fusion", name: "Batam Ethnic Fusion" }
      },
      {
        text: "Panggung Komunitas: Sesi {artistName} yang Menggugah Jiwa.",
        time: "1 Juni, 19:00 - 20:00",
        icon: "📜",
        linkedArtist: { id: "poetry-slam-batam", name: "Batam Poetry Slam"}
      },
      { text: "Babak Penyisihan Lomba: Cosplay (Walk-on), Fotografi (On-the-spot theme).", time: "2 Juni, 13:00 - 17:00", icon: "🏆" },
      { 
        text: "Panggung Komunitas: {artistName} memukau dengan musik tradisional kontemporer.",
        time: "2 Juni, 16:00 - 17:00",
        icon: "🎻",
        linkedArtist: { id: "senandung-batam-collective", name: "Senandung Batam Collective"}
      },
      { 
        text: "Panggung Komunitas: {artistName} Showcase.",
        time: "2 Juni, 19:30 - 21:00",
        icon: "💃",
        linkedArtist: {id: "kpop-dance-community-showcase", name: "K-Pop Dance Community"}
      },
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
      { 
        text: "Panggung Komunitas: Parade dari {artistName} dan penampilan spesial DJ Lokal {artistName}.",
        time: "3 Juni, Sore - Malam",
        icon: "✨" 
        // Example of multiple artists in one description. For linking, better to split if possible or link primary.
        // For simplicity, I'll link one here or rephrase.
      },
       { 
        text: "Panggung Komunitas: {artistName} Parade.",
        time: "3 Juni, 16:00 - 17:30",
        icon: "🦸", // Superhero icon for cosplay
        linkedArtist: {id: "cosplay-champions-parade", name: "Cosplay Champions"}
      },
      { 
        text: "Panggung Komunitas: DJ Set dari {artistName}.",
        time: "3 Juni, 20:00 - 21:30",
        icon: "🎧",
        linkedArtist: {id: "dj-beatflow", name: "DJ Beatflow"}
      },
      { text: "Seminar Pengembangan Diri & Karir:", emphasis: "Tema \"Digital Skills for Future\", \"Personal Branding\".", time: "4 Juni, 10:00 - 12:00", icon: "🧠" },
      { 
        text: "Panggung Komunitas: Irama Reggae bersama {artistName} dan gelak tawa bersama {artistName}.",
        time: "4 Juni, Sore - Malam",
        icon: "🌴",
      },
      { 
        text: "Panggung Komunitas: Santai sore bersama {artistName}.",
        time: "4 Juni, 16:30 - 17:30",
        icon: "🎸",
        linkedArtist: { id: "the-islanders-reggae", name: "The Islanders Reggae"}
      },
      { 
        text: "Panggung Komunitas: Gelak Tawa bersama {artistName}.",
        time: "4 Juni, 19:30 - 20:30",
        icon: "😂",
        linkedArtist: { id: "standup-comedy-batam", name: "Standup Comedy Batam"}
      },
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
        text: "Konser Utama: Malam pertama dimeriahkan oleh {artistName}, {artistName}, dan {artistName}.", 
        emphasis: "Area berbayar.", 
        highlightColor: "text-event-green-dark", 
        time: "5 Juni, Mulai 19:00", 
        icon: "🎤",
        // This is a summary. Individual artist entries below for more specific linking if desired.
        // For the summary, could link the first one or the most prominent.
        linkedArtist: { id: "jkt48", name: "JKT48" } 
      },
      {
        text: "Penampilan Spektakuler dari {artistName}.",
        time: "5 Juni, Jadwal Menyusul", icon: "🎤",
        linkedArtist: { id: "jkt48", name: "JKT48" }
      },
      {
        text: "Melodi Puitis bersama {artistName}.",
        time: "5 Juni, Jadwal Menyusul", icon: "🎤",
        linkedArtist: { id: "juicy-luicy", name: "Juicy Luicy" }
      },
      {
        text: "Suara Emas dari {artistName}.",
        time: "5 Juni, Jadwal Menyusul", icon: "🎤",
        linkedArtist: { id: "tulus", name: "Tulus" }
      },
      { 
        text: "Konser Utama: Malam kedua menghentak dengan {artistName}, {artistName}, dan {artistName}.", 
        emphasis: "Area berbayar.", 
        highlightColor: "text-event-green-dark", 
        time: "6 Juni, Mulai 19:00", 
        icon: "🎶",
        linkedArtist: { id: "hivi", name: "HIVI!"}
      },
      {
        text: "Keceriaan Pop bersama {artistName}.",
        time: "6 Juni, Jadwal Menyusul", icon: "🎶",
        linkedArtist: { id: "hivi", name: "HIVI!"}
      },
      {
        text: "Beat Elektronik dari {artistName}.",
        time: "6 Juni, Jadwal Menyusul", icon: "🎶",
        linkedArtist: { id: "eka-gustiwana", name: "Eka Gustiwana"}
      },
      {
        text: "Bergoyang bersama {artistName}.",
        time: "6 Juni, Jadwal Menyusul", icon: "🎶",
        linkedArtist: { id: "ndx-aka", name: "NDX A.K.A."}
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
