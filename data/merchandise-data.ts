
export interface MerchandiseItem {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  description?: string; // Optional short description
  availability: 'Tersedia' | 'Segera Hadir' | 'Stok Terbatas' | 'Habis';
}

export const merchandiseItemsData: MerchandiseItem[] = [
  {
    id: "merch-tee-bytf",
    name: "Kaos Resmi BYTF 2026 - Hitam",
    price: "Rp 185.000",
    imageUrl: "/images/merch/placeholder_tee_black.webp", // Placeholder
    description: "Kaos katun premium dengan logo eksklusif BYTF 2026. Nyaman dipakai sepanjang hari.",
    availability: "Segera Hadir",
  },
  {
    id: "merch-hoodie-logo",
    name: "Hoodie BYTF 2026 - Logo Festival",
    price: "Rp 350.000",
    imageUrl: "/images/merch/placeholder_hoodie.webp", // Placeholder
    description: "Hoodie hangat dan stylish dengan desain logo BYTF 2026 yang ikonik.",
    availability: "Segera Hadir",
  },
  {
    id: "merch-totebag",
    name: "Tas Tote BYTF 2026 - Edisi Terbatas",
    price: "Rp 120.000",
    imageUrl: "/images/merch/placeholder_totebag.webp", // Placeholder
    description: "Bawa semua kebutuhan festivalmu dengan tas tote edisi terbatas BYTF 2026.",
    availability: "Segera Hadir",
  },
  {
    id: "merch-cap",
    name: "Topi Baseball BYTF 2026",
    price: "Rp 150.000",
    imageUrl: "/images/merch/placeholder_cap.webp", // Placeholder
    description: "Lengkapi gayamu dengan topi baseball resmi BYTF 2026. Keren dan fungsional.",
    availability: "Segera Hadir",
  },
  {
    id: "merch-tumbler",
    name: "Tumbler Minum BYTF 2026",
    price: "Rp 200.000",
    imageUrl: "/images/merch/placeholder_tumbler.webp", // Placeholder
    description: "Jaga hidrasi selama festival dengan tumbler eksklusif BYTF 2026. Ramah lingkungan!",
    availability: "Segera Hadir",
  },
  {
    id: "merch-pin-set",
    name: "Set Pin Enamel BYTF 2026",
    price: "Rp 75.000",
    imageUrl: "/images/merch/placeholder_pin_set.webp", // Placeholder
    description: "Koleksi set pin enamel dengan berbagai desain ikonik BYTF 2026. Cocok untuk aksesoris.",
    availability: "Segera Hadir",
  },
];
