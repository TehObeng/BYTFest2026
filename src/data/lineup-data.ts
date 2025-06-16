
export interface Artist {
  id: string;
  name: string;
  genre: string;
  description: string;
  imagePath: string;
  socialLink?: string;
  day?: string; // e.g., "Hari 1", "Hari 2"
  type: string; // e.g., "Idol Group", "Band Pop", "DJ"
}

export const lineupData: Artist[] = [
  {
    id: "jkt48",
    name: "JKT48",
    genre: "Idol Group",
    description: "Penampilan penuh semangat dari idol group JKT48 akan memeriahkan panggung utama BYTF 2026. Jangan lewatkan koreografi enerjik dan lagu-lagu hits mereka!",
    imagePath: "/images/jkt48.webp",
    socialLink: "https://jkt48.com/",
    day: "Hari 5",
    type: "Idol Group"
  },
  {
    id: "hivi",
    name: "HIVI!",
    genre: "Pop Ceria",
    description: "HIVI! siap membawa keceriaan dengan lagu-lagu pop yang easy listening dan lirik yang relate dengan anak muda. Bernyanyi bersama HIVI! di BYTF 2026!",
    imagePath: "/images/hivi.webp",
    socialLink: "https://www.instagram.com/sayhivi",
    day: "Hari 6",
    type: "Band Pop"
  },
  {
    id: "juicy-luicy",
    name: "Juicy Luicy",
    genre: "Pop Puitis",
    description: "Hanyutkan perasaanmu dengan melodi sendu dan lirik puitis dari Juicy Luicy. Sebuah pengalaman musik yang mendalam menantimu.",
    imagePath: "/images/juicy-luicy.webp",
    socialLink: "https://www.instagram.com/juicyluicyband",
    day: "Hari 5",
    type: "Band Pop Puitis"
  },
  {
    id: "eka-gustiwana",
    name: "Eka Gustiwana",
    genre: "DJ / Produser Musik Elektronik",
    description: "Saksikan kejeniusan Eka Gustiwana dalam meracik musik elektronik yang unik dan aransemen speech composing yang viral. Siap-siap untuk berdansa!",
    imagePath: "/images/eka-gustiwana.webp",
    socialLink: "https://www.instagram.com/ekagustiwana",
    day: "Hari 6",
    type: "DJ / Produser"
  },
  {
    id: "tulus",
    name: "Tulus",
    genre: "Pop / Jazz",
    description: "Suara merdu dan lagu-lagu penuh makna dari Tulus akan menjadi salah satu highlight di BYTF 2026. (Placeholder - Artist belum dikonfirmasi)",
    imagePath: "/images/placeholder-artist2.webp", // Placeholder image
    socialLink: "https://www.instagram.com/tulusm",
    day: "Hari 5",
    type: "Penyanyi Solo Pop"
  },
  {
    id: "ndx-aka",
    name: "NDX A.K.A.",
    genre: "Dangdut Hip-Hop",
    description: "Ambyar bareng NDX A.K.A! Perpaduan dangdut dan hip-hop yang akan membuat semua bergoyang. (Placeholder - Artist belum dikonfirmasi)",
    imagePath: "/images/placeholder-artist3.webp", // Placeholder image
    socialLink: "https://www.instagram.com/ndxakatv",
    day: "Hari 6",
    type: "Grup Dangdut Hip-Hop"
  },
  {
    id: "local-band-1",
    name: "Senandung Batam Collective",
    genre: "Musik Tradisional Kontemporer",
    description: "Nikmati alunan musik khas Batam yang dibawakan dengan aransemen modern oleh talenta-talenta lokal berbakat.",
    imagePath: "/images/placeholder-local1.webp", // Placeholder image
    day: "Hari 2",
    type: "Band Lokal"
  },
  {
    id: "local-dj-1",
    name: "DJ Beatflow",
    genre: "EDM / House",
    description: "DJ lokal yang siap memanaskan suasana dengan set EDM dan House musik yang menghentak.",
    imagePath: "/images/placeholder-local2.webp", // Placeholder image
    day: "Hari 3",
    type: "DJ Lokal"
  }
];
