
export interface Artist {
  id: string;
  name: string;
  genre: string;
  description: string;
  imagePath: string;
  socialLink?: string;
  day?: string; // e.g., "Hari 1", "Hari 2", "Hari 5"
  type: string; // e.g., "Idol Group", "Band Pop", "DJ", "Talenta Lokal"
}

export const lineupData: Artist[] = [
  // Hari 5 & 6 - Main Stage / Headliners
  {
    id: "jkt48",
    name: "JKT48",
    genre: "Idol Group",
    description: "Penampilan penuh semangat dari idol group JKT48 akan memeriahkan panggung utama BYTF 2026. Jangan lewatkan koreografi enerjik dan lagu-lagu hits mereka!",
    imagePath: "/images/artist/jkt48.jpg",
    socialLink: "https://jkt48.com/",
    day: "Hari 5",
    type: "Idol Group"
  },
  {
    id: "hivi",
    name: "HIVI!",
    genre: "Pop Ceria",
    description: "HIVI! siap membawa keceriaan dengan lagu-lagu pop yang easy listening dan lirik yang relate dengan anak muda. Bernyanyi bersama HIVI! di BYTF 2026!",
    imagePath: "/images/artist/hivi.jpg",
    socialLink: "https://www.instagram.com/sayhivi",
    day: "Hari 6",
    type: "Band Pop"
  },
  {
    id: "juicy-luicy",
    name: "Juicy Luicy",
    genre: "Pop Puitis",
    description: "Hanyutkan perasaanmu dengan melodi sendu dan lirik puitis dari Juicy Luicy. Sebuah pengalaman musik yang mendalam menantimu.",
    imagePath: "/images/artist/juicy.jpg",
    socialLink: "https://www.instagram.com/juicyluicyband",
    day: "Hari 5",
    type: "Band Pop Puitis"
  },
  {
    id: "eka-gustiwana",
    name: "Eka Gustiwana",
    genre: "DJ / Produser Musik Elektronik",
    description: "Saksikan kejeniusan Eka Gustiwana dalam meracik musik elektronik yang unik dan aransemen speech composing yang viral. Siap-siap untuk berdansa!",
    imagePath: "/images/artist/eka.jpg",
    socialLink: "https://www.instagram.com/ekagustiwana",
    day: "Hari 6",
    type: "DJ / Produser"
  },
  {
    id: "tulus",
    name: "Tulus",
    genre: "Pop / Jazz",
    description: "Suara merdu dan lagu-lagu penuh makna dari Tulus akan menjadi salah satu highlight di BYTF 2026. (Status: Terkonfirmasi)",
    imagePath: "/images/artist/tulus.webp", 
    socialLink: "https://www.instagram.com/tulusm",
    day: "Hari 5",
    type: "Penyanyi Solo Pop"
  },
  {
    id: "ndx-aka",
    name: "NDX A.K.A.",
    genre: "Dangdut Hip-Hop",
    description: "Ambyar bareng NDX A.K.A! Perpaduan dangdut dan hip-hop yang akan membuat semua bergoyang. (Status: Terkonfirmasi)",
    imagePath: "/images/artist/ndx_aka.webp", 
    socialLink: "https://www.instagram.com/ndxakatv",
    day: "Hari 6",
    type: "Grup Dangdut Hip-Hop"
  },

  // Hari 1-4 - Community Stage / Local Talents
  {
    id: "senandung-batam-collective",
    name: "Senandung Batam Collective",
    genre: "Musik Tradisional Kontemporer",
    description: "Nikmati alunan musik khas Batam yang dibawakan dengan aransemen modern oleh talenta-talenta lokal berbakat.",
    imagePath: "/images/artist/senandung_batam_collective.webp",
    day: "Hari 2",
    type: "Talenta Lokal"
  },
  {
    id: "dj-beatflow",
    name: "DJ Beatflow",
    genre: "EDM / House",
    description: "DJ lokal yang siap memanaskan suasana dengan set EDM dan House musik yang menghentak di panggung komunitas.",
    imagePath: "/images/artist/dj_beatflow.webp",
    day: "Hari 3",
    type: "DJ Lokal"
  },
  {
    id: "batam-ethnic-fusion",
    name: "Batam Ethnic Fusion",
    genre: "Etnik Modern",
    description: "Grup musik yang memadukan instrumen tradisional Melayu dengan harmoni modern, menciptakan suara unik khas perbatasan.",
    imagePath: "/images/artist/batam_ethnic_fusion.webp",
    day: "Hari 1",
    type: "Talenta Lokal"
  },
  {
    id: "the-islanders-reggae",
    name: "The Islanders Reggae",
    genre: "Reggae",
    description: "Bawa santai dan nikmati irama reggae dari band lokal The Islanders. Suasana pantai langsung terasa!",
    imagePath: "/images/artist/the_islanders_reggae.webp",
    day: "Hari 4",
    type: "Band Lokal"
  },
  {
    id: "kpop-dance-community-showcase",
    name: "K-Pop Dance Community Showcase",
    genre: "Dance Cover",
    description: "Penampilan spesial dari berbagai grup K-Pop dance cover terbaik Batam. Tunjukkan dukunganmu!",
    imagePath: "/images/artist/kpop_dance_community_showcase.webp", 
    day: "Hari 2",
    type: "Komunitas"
  },
  {
    id: "cosplay-champions-parade",
    name: "Cosplay Champions Parade",
    genre: "Cosplay Performance",
    description: "Parade para juara lomba cosplay dan penampilan karakter-karakter favoritmu di panggung komunitas.",
    imagePath: "/images/artist/cosplay_champions_parade.webp", 
    day: "Hari 3",
    type: "Komunitas"
  },
  {
    id: "standup-comedy-batam",
    name: "Standup Comedy Batam Allstars",
    genre: "Komedi",
    description: "Gelak tawa bersama para komika terbaik dari komunitas Standup Comedy Batam. Siap mengocok perut!",
    imagePath: "/images/artist/standup_comedy_batam.webp",
    day: "Hari 4",
    type: "Komunitas"
  },
  {
    id: "poetry-slam-batam",
    name: "Batam Poetry Slam",
    genre: "Sastra Pertunjukan",
    description: "Dengarkan lantunan kata-kata penuh makna dari para penyair muda Batam dalam sesi poetry slam yang emosional.",
    imagePath: "/images/artist/poetry_slam_batam.webp",
    day: "Hari 1",
    type: "Komunitas"
  }
];
