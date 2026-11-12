
export type PlaceCategory = "Restaurant" | "Cafe" | "Hotel" | "Leisure";

export type LocalPlace = {
  name: string;
  neighborhood: string;
  category: PlaceCategory;
  description: string;
};

export const localPlaces: LocalPlace[] = [
  // BOLE
  {
    name: "Kategna Restaurant",
    neighborhood: "Bole",
    category: "Restaurant",
    description: "Traditional Ethiopian dining on Cameroon Street.",
  },
  {
    name: "Golden Plate Restaurant",
    neighborhood: "Bole",
    category: "Restaurant",
    description: "A popular dining spot with a relaxed atmosphere.",
  },
  {
    name: "Cremino Café",
    neighborhood: "Bole",
    category: "Cafe",
    description: "A café stop along Africa Avenue.",
  },
  {
    name: "Golden Tulip Addis Ababa",
    neighborhood: "Bole",
    category: "Hotel",
    description: "A full-service hotel close to Bole's dining and shopping.",
  },
  {
    name: "DoubleTree by Hilton Addis Ababa Airport",
    neighborhood: "Bole",
    category: "Hotel",
    description: "An airport-convenient hotel with dining and wellness facilities.",
  },

  // OLD AIRPORT
  {
    name: "LÀDAM",
    neighborhood: "Old Airport",
    category: "Restaurant",
    description: "A casual restaurant serving breakfast, burgers and pizza.",
  },
  {
    name: "Broni Café",
    neighborhood: "Old Airport",
    category: "Cafe",
    description: "A neighborhood café in the Old Airport area.",
  },
  {
    name: "Bilo's Pastry",
    neighborhood: "Old Airport",
    category: "Cafe",
    description: "A local pastry and coffee stop.",
  },
  {
    name: "Hera Addis Hotel",
    neighborhood: "Old Airport",
    category: "Hotel",
    description: "A hotel option in the Old Airport neighborhood.",
  },
  {
    name: "DABI Hotel & Apartments",
    neighborhood: "Old Airport",
    category: "Hotel",
    description: "Hotel and apartment-style accommodation.",
  },

  // KAZANCHIS
  {
    name: "The Blue Hen",
    neighborhood: "Kazanchis",
    category: "Cafe",
    description: "A café, restaurant and art-inspired concept space.",
  },
  {
    name: "Tryst Addis",
    neighborhood: "Kazanchis",
    category: "Cafe",
    description: "A café and lounge with a lively atmosphere.",
  },
  {
    name: "Rising Cub Coffee Roasters",
    neighborhood: "Kazanchis",
    category: "Cafe",
    description: "A specialty coffee shop and roastery.",
  },
  {
    name: "Radisson Blu Hotel",
    neighborhood: "Kazanchis",
    category: "Hotel",
    description: "A central hotel in the Kazanchis business district.",
  },
  {
    name: "Inter Luxury Hotel",
    neighborhood: "Kazanchis",
    category: "Hotel",
    description: "A full-service hotel in the central business district.",
  },

  // CMC
  {
    name: "Commune Cafe",
    neighborhood: "CMC",
    category: "Cafe",
    description: "A relaxed café known for coffee and pastries.",
  },
  {
    name: "Orchid Cafe & Restaurant",
    neighborhood: "CMC",
    category: "Restaurant",
    description: "A café and restaurant on CMC Road.",
  },
  {
    name: "Flames Restaurant",
    neighborhood: "CMC",
    category: "Restaurant",
    description: "A restaurant inside Activ8 Recreation Center.",
  },
  {
    name: "Kefetew Guest House",
    neighborhood: "CMC",
    category: "Hotel",
    description: "A home-style guesthouse on CMC Road.",
  },
  {
    name: "Dimitri Hotel",
    neighborhood: "CMC",
    category: "Hotel",
    description: "A small hotel in the CMC residential area.",
  },
];

export function getMapSearchUrl(place: LocalPlace) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${place.name}, ${place.neighborhood}, Addis Ababa, Ethiopia`
  )}`;
}
