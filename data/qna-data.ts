

export type QnaItem = {
  q: string;
  a: string;
};

export type QnaData = Record<string, QnaItem[]>;

export const qnaData: QnaData = {
  "Sponsor": [
    { q: "Apa keuntungan menjadi sponsor utama BYTF 2026?", a: "Sponsor utama akan mendapatkan branding dominan di seluruh media, logo di backdrop panggung utama, hak aktivasi penuh di zona strategis, sebutan resmi dalam nama event, akses ke data demografi pengunjung (non-pribadi), dan prioritas join tahun berikutnya." },
    { q: "Apakah ada eksklusivitas per kategori sponsor?", a: "Ya. Satu sponsor per kategori (misalnya e-commerce, bank, e-wallet) akan ditetapkan sebagai sponsor eksklusif untuk menghindari konflik kepentingan." },
    { q: "Berapa estimasi jumlah pengunjung per hari?", a: "Hari biasa (1–4): 1.500–2.000 orang. Hari puncak (5–6): 5.000–7.000 orang." },
    { q: "Apa bentuk branding yang didapat sponsor?", a: "Banner di panggung, LED loop video, media sosial resmi, backdrop media, dokumentasi khusus, dan penyebutan brand oleh MC di event utama." },
    { q: "Bolehkah sponsor memiliki zona eksklusif?", a: "Ya. Misalnya \"Pop Culture Zone by Shopee\" atau \"Gaming Arena by by.U\"." },
    { q: "Apakah sponsor bisa aktifkan games atau booth interaktif?", a: "Sangat dianjurkan. Booth sponsor dapat mengadakan quiz, photobooth, mini challenge, dan aktivasi komunitas." },
    { q: "Apakah sponsor dapat data pengunjung?", a: "Hanya untuk sponsor utama/zona eksklusif dan berupa data agregat (gender, usia, asal), tanpa identitas pribadi." },
    { q: "Apakah sponsor boleh menjual produk?", a: "Ya, dengan booth penjualan resmi sesuai ketentuan kontrak zona." },
    { q: "Apakah boleh membagikan free sample produk?", a: "Boleh, dan bahkan dianjurkan untuk engagement maksimal." },
    { q: "Apakah kami boleh masuk backstage?", a: "Ya. Sponsor utama dan level VIP mendapatkan akses terbatas ke backstage melalui LO resmi." },
    { q: "Apakah sponsor bisa menampilkan iklan di layar LED utama?", a: "Ya. Ada slot iklan berdurasi 15–30 detik sebelum acara besar dan transisi panggung." },
    { q: "Apakah sponsor dapat slot acara sendiri?", a: "Bisa. Dalam bentuk sesi talkshow brand, zona permainan, atau workshop." },
    { q: "Apakah ada laporan pasca acara?", a: "Ya, post-event report lengkap: foto, reach digital, media coverage, dan statistik pengunjung." },
    { q: "Bagaimana jika dua sponsor ingin zona yang sama?", a: "Diutamakan sponsor yang menandatangani MoU lebih awal atau menyumbang dana lebih tinggi." },
    { q: "Apakah kami bisa menjadi sponsor tahunan?", a: "Ya, tersedia skema partnership jangka panjang untuk BYTF series mendatang." }
  ],
  "Pemerintah / Instansi": [
    { q: "Apa manfaat festival ini bagi pemerintah daerah?", a: "Meningkatkan pariwisata, ekonomi kreatif, promosi budaya lokal, dan mendorong keterlibatan pemuda lintas komunitas." },
    { q: "Apakah festival ini mendukung Hari Lahir Pancasila?", a: "Ya. Hari ke-4 mengangkat tema “Semangat Pancasila dan Toleransi Pemuda”." },
    { q: "Siapa penyelenggara resmi festival ini?", a: "Diselenggarakan oleh Event Phoenix Event Batam, bekerja sama dengan komunitas pemuda, dan didukung Dinas Pariwisata serta instansi terkait." },
    { q: "Apakah panitia memiliki izin resmi?", a: "Ya. Seluruh dokumen izin dari kepolisian, pemkot, Dinas Pariwisata, dan Satpol PP disiapkan H-30." },
    { q: "Apakah sekolah/kampus ikut terlibat?", a: "Ya. Diundang untuk parade budaya, lomba, zona edukasi, dan relawan festival." },
    { q: "Apakah kegiatan ini inklusif terhadap semua agama dan suku?", a: "Sangat. Ada Zona Toleransi yang memperkenalkan tempat ibadah dan budaya lintas keyakinan di Batam." },
    { q: "Apa kontribusi pemerintah dalam acara ini?", a: "Dukungan izin, keamanan, fasilitas umum, dan potensi pendanaan program pemuda/kebudayaan." },
    { q: "Apakah acara ini netral dari politik?", a: "Ya. Tidak mengandung unsur kampanye atau partai. Fokus pada budaya, edukasi, dan pariwisata." },
    { q: "Apakah ini bisa jadi agenda tahunan?", a: "Ya. BYTF dirancang sebagai festival rutin yang memperkuat identitas pemuda Batam." },
    { q: "Apakah panitia menyusun LPJ untuk instansi?", a: "Ya, dalam bentuk hard copy dan PDF sesuai standar pelaporan program kemitraan." }
  ],
  "Peserta / Pengunjung": [
    { q: "Apakah semua pengunjung harus beli tiket?", a: "Akses ke area festival umum (non-konser) gratis untuk Hari 1 hingga Hari 4. Untuk menikmati acara dan konser utama pada Hari ke-5 dan Hari ke-6 (total 6 hari festival), diperlukan tiket berbayar. Cek halaman 'Tiket' untuk detailnya." },
    { q: "Apa saja lomba yang bisa diikuti?", a: "Cosplay, K-pop Dance, Fun Challenge, Game Tournament, Foto Festival, dan Lomba UMKM Muda." },
    { q: "Apakah peserta lomba dapat sertifikat?", a: "Ya. E-sertifikat untuk semua peserta, piagam fisik dan hadiah untuk juara." },
    { q: "Bagaimana cara daftar lomba?", a: "Via website resmi dan link bio Instagram @bytf.official, ditutup H-7." },
    { q: "Apakah ada hadiah untuk lomba?", a: "Ya. Uang tunai, merchandise, sertifikat, dan publikasi di media festival." },
    { q: "Apakah boleh membawa kamera DSLR?", a: "Boleh untuk umum. Tapi untuk liputan profesional perlu registrasi media." },
    { q: "Apakah ada tempat salat dan toilet?", a: "Ya. Toilet portable di tiap sisi venue dan mushola di zona tenang." },
    { q: "Bagaimana jika saya kehilangan barang?", a: "Silakan ke pos Lost & Found di dekat tenda informasi utama." },
    { q: "Apakah tersedia tempat duduk?", a: "Beberapa zona disediakan area duduk, tetapi penonton konser utama umumnya berdiri." },
    { q: "Apakah festival ini ramah difabel?", a: "Ya. Akses jalan khusus, toilet difabel, dan LO pendamping tersedia." },
    { q: "Apakah boleh bawa makanan sendiri?", a: "Tidak, kecuali kebutuhan khusus (diet/medis). Makanan tersedia di Food Zone." },
    { q: "Bagaimana jika hujan turun saat konser?", a: "Disiapkan panggung kedap air. Aktivitas dapat dijeda dan dilanjutkan sesuai SOP evakuasi." },
    { q: "Apakah ada official merchandise?", a: "Ya. Kaos, pin, tote bag, stiker, dan kolaborasi sponsor." },
    { q: "Apakah ada penginapan terdekat?", a: "Ya. Beberapa hotel dan homestay di sekitar Alun-Alun Engku Putri bekerja sama dengan panitia." },
    { q: "Bagaimana sistem tiket konser?", a: "Tiket digital (e-ticket) akan ditukar dengan wristband fisik di lokasi. Satu e-ticket/wristband berlaku untuk 1 kali scan per hari/sesi." }
  ],
  "Media / Partner": [
    { q: "Bagaimana mendaftar jadi media partner?", a: "Isi form H-14. Dapat badge media dan akses area media resmi." },
    { q: "Apakah media bisa mewawancarai artis?", a: "Ya. Diatur lewat media schedule resmi." },
    { q: "Apa fasilitas media center?", a: "Tenda ber-AC, WiFi, listrik, air minum, dan akses rundown internal." },
    { q: "Bolehkah media livestream konser?", a: "Ya, jika bekerja sama resmi dan tidak komersial." },
    { q: "Apakah panitia membagikan dokumentasi?", a: "Ya. Setiap malam dokumentasi harian diunggah untuk media & sponsor." }
  ],
  "UMKM / Vendor": [
    { q: "Bagaimana cara daftar jadi tenant UMKM?", a: "Lewat open call di website. Hanya 60 tenant dipilih." },
    { q: "Berapa biaya sewa booth?", a: "Mulai dari Rp500.000 – Rp2.500.000 tergantung lokasi dan ukuran." },
    { q: "Apakah booth dapat listrik?", a: "Ya. Setiap tenant mendapat 500–1000 watt." },
    { q: "Apakah bisa membawa booth sendiri?", a: "Tidak. Semua booth seragam disediakan EO agar estetis." },
    { q: "Apakah UMKM bisa tampil di panggung?", a: "Ya, di Zona Youthpreneur khusus UMKM lokal." }
  ],
  "Panitia / Crew Internal": [
    { q: "Berapa jumlah panitia inti dan relawan?", a: "Sekitar 150–200 orang, terdiri dari tim EO, relawan harian, teknis, dan keamanan." },
    { q: "Bagaimana sistem kerja relawan?", a: "2 shift per hari, 6 jam/shift, dengan briefing, form absensi, dan konsumsi tersedia." },
    { q: "Apakah panitia mendapat seragam dan ID card?", a: "Ya. Setiap peran punya warna ID card berbeda (crew, sponsor, media, LO, keamanan, dll)." },
    { q: "Apa sistem komunikasi tim lapangan?", a: "HT dua arah dibagi per zona, serta backup via WhatsApp Group per divisi." },
    { q: "Bagaimana SOP jika ada kejadian darurat?", a: "Hentikan acara via MC, evakuasi pengunjung ke titik aman, tim keamanan dan medis aktif, hubungi pihak berwenang." },
    { q: "Apa sistem logistik barang masuk?", a: "Setiap barang besar masuk H-1 melalui loading gate. Harus mendaftar ke tim logistik." },
    { q: "Siapa yang handle artis dan jadwal panggung?", a: "Tim Talent Coordinator bertanggung jawab atas semua artis dan talent lokal." },
    { q: "Bagaimana sistem pelaporan divisi harian?", a: "Menggunakan Google Sheet terpusat + recap manual sebelum dan sesudah shift." },
    { q: "Apa platform koordinasi internal panitia?", a: "WA Group, Google Drive untuk SOP & rundown, dan sistem absensi digital." },
    { q: "Apakah ada backup teknis untuk listrik dan peralatan?", a: "Ya. 3 genset (utama, zona, cadangan), UPS, kabel cadangan, mic spare, dan teknisi standby per zona." }
  ],
  "Komunitas / Talent / Pertunjukan": [
    { q: "Bagaimana komunitas bisa ikut tampil?", a: "Daftar open call via form. Komunitas dikurasi untuk tampil di panggung atau zona." },
    { q: "Apakah komunitas diberi panggung sendiri?", a: "Ya. Misalnya Zona Pop Culture dikelola komunitas cosplay dan K-pop lokal." },
    { q: "Apakah komunitas dibayar untuk tampil?", a: "Tidak, namun disediakan dokumentasi, konsumsi, ID, dan fasilitas." },
    { q: "Apakah komunitas bisa ikut lomba?", a: "Ya. Bisa daftar sebagai tim atau individu sesuai kategori." },
    { q: "Apakah MC dan Host bisa ikut audisi?", a: "Ya. Panitia membuka audisi MC komunitas untuk semua panggung mini." },
    { q: "Apa fasilitas untuk band lokal?", a: "Slot panggung, soundcheck, konsumsi crew, dokumentasi, dan promosi digital." },
    { q: "Bagaimana sistem gladi bersih tampil?", a: "Jadwal gladi dilakukan H-1 atau di pagi hari acara untuk tim terdaftar." },
    { q: "Apakah komunitas boleh menjual merchandise?", a: "Ya, jika memiliki booth resmi yang disetujui panitia." },
    { q: "Apakah komunitas bisa jadi relawan?", a: "Bisa. Komunitas bisa mendaftar sebagai volunteer atau pengelola zona tertentu." },
    { q: "Apakah komunitas bisa melakukan campaign edukatif?", a: "Bisa, misalnya kampanye lingkungan, donor darah, edukasi digital." }
  ],
  "Teknis & Infrastruktur": [
    { q: "Berapa kapasitas genset yang digunakan?", a: "3 unit: 120 kVA (main stage), 80 kVA (zona umum), 80 kVA (cadangan)." },
    { q: "Berapa konsumsi BBM selama acara?", a: "±1.200–1.300 liter solar untuk 6 hari operasional." },
    { q: "Apa sistem distribusi listrik per zona?", a: "Panel box dengan MCB, dibagi ke zona dan booth melalui kabel aman & ducting." },
    { q: "Apakah tersedia WiFi di lokasi?", a: "Ya. Titik WiFi aktif di media center dan zona digital." },
    { q: "Bagaimana penanganan listrik drop?", a: "Matikan beban bertahap, restart panel, alihkan ke genset cadangan jika perlu." },
    { q: "Apa sistem kontrol suara antar zona?", a: "Gunakan speaker kecil/aktif dan arah panggung tidak saling tabrak. Max 3.000W di zona mini." },
    { q: "Apakah genset dijalankan nonstop?", a: "Ya, tapi diselingi maintenance setiap pagi atau malam saat zona istirahat." },
    { q: "Siapa vendor sound & lighting?", a: "Vendor profesional lokal/nasional, tergantung kebutuhan panggung (5000–50000 watt)." },
    { q: "Apakah ada sistem tracking logistik?", a: "Ya. Pencatatan barang keluar-masuk per hari + inventaris per zona." },
    { q: "Berapa besar area venue digunakan?", a: "±1–1.5 hektar mencakup panggung utama, zona booth, parkir, dan akses publik." }
  ],
  "Tiket & Finansial": [
    { q: "Bagaimana cara beli tiket konser?", a: "Online via platform tiket resmi yang akan diumumkan (contoh: Tokopedia, Shopee) dan booth tiket di lokasi (jika masih tersedia)." },
    { q: "Apa yang didapat dari tiket reguler?", a: "Akses konser utama pada hari yang dipilih, akses ke semua zona festival umum, dan kesempatan menikmati semua pertunjukan di hari tersebut." },
    { q: "Apa itu tiket VIP?", a: "Akses ke area khusus VIP dekat panggung, jalur masuk cepat (fastlane), akses ke VIP Lounge (dengan makanan & minuman ringan), merchandise eksklusif, dan fasilitas toilet khusus VIP." },
    { q: "Apakah ada tiket terusan?", a: "Ya. Tersedia tiket terusan untuk Hari ke-5 dan Hari ke-6 dengan harga spesial. Cek halaman 'Tiket' untuk detail." },
    { q: "Apakah ada Meet & Greet berbayar?", a: "Ya, kemungkinan akan tersedia dengan beberapa artis tertentu. Informasi Meet & Greet akan diumumkan terpisah dengan kuota sangat terbatas." },
    { q: "Apakah tiket bisa direfund?", a: "Tidak. Tiket yang sudah dibeli tidak dapat di-refund, namun dapat dipindahtangankan dengan mengikuti prosedur verifikasi sebelum acara." },
    { q: "Bagaimana kontrol duplikasi tiket?", a: "Setiap e-ticket memiliki QR code unik yang akan di-scan saat penukaran dengan wristband fisik. Wristband hanya berlaku untuk satu kali masuk per hari/sesi." },
    { q: "Apakah panitia menerima QRIS?", a: "Ya. Sebagian besar booth pembayaran, termasuk tiket on-site (jika ada) dan tenant, akan menerima pembayaran via QRIS untuk efisiensi dan transparansi." },
    { q: "Apa sistem pencatatan dana sponsor?", a: "Tercatat oleh bendahara + invoice + bukti transfer + pelaporan pasca acara." },
    { q: "Bagaimana dana digunakan?", a: "Untuk panggung, artis, keamanan, teknis, dokumentasi, dan publikasi." }
  ],
  "Strategis & Branding": [
    { q: "Apa target utama festival ini?", a: "Menyatukan komunitas pemuda, memajukan pariwisata Batam, dan memperkuat toleransi antarbudaya." },
    { q: "Apakah event ini bisa dikembangkan nasional?", a: "Bisa. Kami membuka peluang ekspansi BYTF di kota lain tahun depan." },
    { q: "Apakah ada peluang franchise event?", a: "Ya. Konsep BYTF bisa dikembangkan sebagai waralaba lokal berbasis komunitas." },
    { q: "Apakah festival ini berdampak ekonomi langsung?", a: "Ya. Melibatkan 100+ UMKM, ratusan vendor lokal, dan promosi wisata." },
    { q: "Apakah dokumentasi bisa dipakai sponsor?", a: "Ya, setiap sponsor dapat recap video, foto, dan media kit." },
    { q: "Apa media utama promosi festival?", a: "Instagram, TikTok, YouTube, media lokal, radio, dan website resmi." },
    { q: "Apakah panitia menggunakan tools media monitoring?", a: "Ya, menggunakan tracking hashtag, reach insight, dan engagement rate." },
    { q: "Bagaimana jika festival rugi secara finansial?", a: "Tetap ditutup melalui backup sponsor dan dana cadangan manajemen risiko." },
    { q: "Apakah sponsor bisa melihat ROI event?", a: "Ya, dalam laporan post-event kami tampilkan metrik engagement, exposure, dan data peserta." },
    { q: "Apa visi jangka panjang dari BYTF?", a: "Menjadikan Batam sebagai pusat festival pemuda perbatasan terbesar di Indonesia." }
  ]
};