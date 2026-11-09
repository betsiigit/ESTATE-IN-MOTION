
export type Property = {
  id: number;
  name: string;
  location: string;
  type: string;
  category: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  galleryImages: string[];
  description: string;
  featured?: boolean;
};

export const properties: Property[] = [
  {
    id: 1,
    name: "The Horizon House",
    location: "Bole, Addis Ababa",
    type: "Private Residence",
    category: "Villa",
    price: 28500000,
    bedrooms: 4,
    bathrooms: 3,
    area: 420,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90",
    galleryImages: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=90",
    ],
    description:
      "A contemporary residence where warm materials, generous spaces and thoughtful architecture come together.",
    featured: true,
  },
  {
    id: 2,
    name: "Casa Verde",
    location: "Old Airport, Addis Ababa",
    type: "Modern Villa",
    category: "Villa",
    price: 35000000,
    bedrooms: 5,
    bathrooms: 4,
    area: 510,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90",
    galleryImages: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=90",
    ],
    description:
      "A calm and spacious home with an elegant interior and a strong connection to its surroundings.",
    featured: true,
  },
  {
    id: 3,
    name: "The Quiet Residence",
    location: "CMC, Addis Ababa",
    type: "Contemporary Home",
    category: "House",
    price: 19800000,
    bedrooms: 3,
    bathrooms: 3,
    area: 280,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=90",
    galleryImages: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=90",
    ],
    description:
      "A carefully considered home designed around natural light, comfort and everyday living.",
  },
  {
    id: 4,
    name: "The Urban Edit",
    location: "Kazanchis, Addis Ababa",
    type: "Luxury Apartment",
    category: "Apartment",
    price: 12500000,
    bedrooms: 2,
    bathrooms: 2,
    area: 165,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=90",
    galleryImages: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=90",
    ],
    description:
      "A refined city apartment with an open layout and a warm, modern interior.",
  },
  {
    id: 5,
    name: "The Garden House",
    location: "Summit, Addis Ababa",
    type: "Family Residence",
    category: "House",
    price: 22500000,
    bedrooms: 4,
    bathrooms: 3,
    area: 360,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=90",
    galleryImages: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=90",
    ],
    description:
      "A welcoming family home with generous living spaces and a peaceful residential atmosphere.",
  },
  {
    id: 6,
    name: "Residence No. 06",
    location: "Sarbet, Addis Ababa",
    type: "Luxury Apartment",
    category: "Apartment",
    price: 15800000,
    bedrooms: 3,
    bathrooms: 2,
    area: 210,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90",
    galleryImages: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=90",
    ],
    description:
      "A sophisticated apartment combining understated finishes with practical, comfortable design.",
  },
];
