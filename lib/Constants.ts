import { SocialEvent } from "./Types";

export const CATEGORIES = [
  {
    id: "beach",
    name: "Beach Day",
    icon: "🏖️",
    desc: "Vibrant beach escapes, ocean breeze, and tropical vibes.",
    accent: "bg-orange-50 border-orange-200 hover:border-orange-500",
  },
  {
    id: "maquis",
    name: "Maquis & Chill",
    icon: "🍢",
    desc: "Sizzling local grills, cold drinks, and high-energy street jams.",
    accent: "bg-amber-50 border-amber-200 hover:border-amber-500",
  },
  {
    id: "birthday",
    name: "Birthday Bash",
    icon: "🎂",
    desc: "Celebrate life with friends, music, cake, and memories.",
    accent: "bg-rose-50 border-rose-200 hover:border-rose-500",
  },
  {
    id: "concert",
    name: "Concert & DJ Show",
    icon: "🎵",
    desc: "Loud speakers, strobe lights, and non-stop dancing.",
    accent: "bg-violet-50 border-violet-200 hover:border-violet-500",
  },
  {
    id: "business",
    name: "Business / Meetup",
    icon: "💼",
    desc: "Exchange cards, share coffees, and grow your local network.",
    accent: "bg-blue-50 border-blue-200 hover:border-blue-500",
  },
  {
    id: "dinner",
    name: "Dinner Gala",
    icon: "🍽️",
    desc: "Elegant dining, tailored attire, and fine conversations.",
    accent: "bg-emerald-50 border-emerald-200 hover:border-emerald-500",
  },
];

export const COVERS_BY_CATEGORY: Record<string, string[]> = {
  birthday: [
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
  ],
  beach: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
  ],
  maquis: [
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  ],
  concert: [
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
  ],
  business: [
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
  ],
  dinner: [
    "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
  ],
};

export const DEFAULT_COVERS = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
];

export interface AfricanRegion {
  id: string;
  name: string;
  emoji: string;
  currency: string;
  placeholderPhone: string;
  operators: string[];
  mapTheme: {
    lakeLabel: string;
    oceanLabel: string;
    bgColor: string;
    waterColor: string;
    coastPath: string;
  };
  boundingBox: { minLat: number; maxLat: number; minLng: number; maxLng: number };
  landmarks: { name: string; x: number; y: number }[];
}

export const AFRICAN_REGIONS: AfricanRegion[] = [
  {
    id: "west",
    name: "West Africa (Afrique de l'Ouest)",
    emoji: "🌍",
    currency: "FCFA (XOF)",
    placeholderPhone: "+225 07 00 00 00 00",
    operators: ["Wave", "Orange Money", "MTN MoMo", "Telebirr"],
    mapTheme: {
      lakeLabel: "LAGUNE ÉBRIÉ",
      oceanLabel: "OCÉAN ATLANTIQUE",
      bgColor: "#e0f2fe",
      waterColor: "#93c5fd",
      coastPath:
        "M-10 120 C 150 140, 250 180, 550 120 L 550 210 C 350 250, 150 210, -10 240 Z",
    },
    boundingBox: { minLat: 5.15, maxLat: 5.38, minLng: -4.12, maxLng: -3.2 },
    landmarks: [
      { name: "Assinie-Mafia KM 11.5 Beachfront, Côte d'Ivoire", x: 420, y: 260 },
      { name: "Cocody, Rue des Jardins Shopping Block, Côte d'Ivoire", x: 220, y: 60 },
      { name: "Zone 4, Marcory (Rue du Canal) Grills, Côte d'Ivoire", x: 180, y: 150 },
      { name: "Plateau, Boulevard de la République, Côte d'Ivoire", x: 120, y: 80 },
      { name: "Labadi Beach Party Arena, Accra, Ghana", x: 310, y: 180 },
      {
        name: "Hard Rock Cafe Beach Club, Victoria Island, Lagos, Nigeria",
        x: 460,
        y: 190,
      },
    ],
  },
  {
    id: "east",
    name: "East Africa (Afrique de l'Est)",
    emoji: "🦓",
    currency: "KES",
    placeholderPhone: "+254 700 000 000",
    operators: ["M-Pesa", "Airtel Money", "MTN MoMo"],
    mapTheme: {
      lakeLabel: "LAKE VICTORIA",
      oceanLabel: "INDIAN OCEAN",
      bgColor: "#fef9c3",
      waterColor: "#38bdf8",
      coastPath: "M550 0 C 450 80, 480 180, 420 250 L 550 250 Z",
    },
    boundingBox: { minLat: -4.5, maxLat: 0.5, minLng: 32.0, maxLng: 40.5 },
    landmarks: [
      { name: "KICC Rooftop Heliport Lounge, Nairobi, Kenya", x: 180, y: 80 },
      { name: "The Alchemist Westlands, Nairobi, Kenya", x: 220, y: 70 },
      { name: "Nyali Beachfront Sunset Club, Mombasa, Kenya", x: 410, y: 210 },
      { name: "Ggaba Beach Resort, Kampala, Uganda", x: 60, y: 120 },
      { name: "Coco Beach Hangout, Dar es Salaam, Tanzania", x: 390, y: 240 },
    ],
  },
  {
    id: "southern",
    name: "Southern Africa (Afrique Australe)",
    emoji: "🦁",
    currency: "ZAR",
    placeholderPhone: "+27 72 000 0000",
    operators: ["EcoCash", "MTN MoMo", "M-Pesa", "Card / Instant EFT"],
    mapTheme: {
      lakeLabel: "V&A MARINA",
      oceanLabel: "ATLANTIC & INDIAN OCEAN",
      bgColor: "#dcfce7",
      waterColor: "#2563eb",
      coastPath: "M-10 160 C 120 180, 250 140, 510 250 L-10 250 Z",
    },
    boundingBox: { minLat: -34.5, maxLat: -22.0, minLng: 18.0, maxLng: 33.0 },
    landmarks: [
      { name: "Maboneng Arts District, Johannesburg, South Africa", x: 340, y: 90 },
      { name: "V&A Waterfront Clocktower, Cape Town, South Africa", x: 60, y: 230 },
      { name: "Camps Bay Sunset Strip, Cape Town, South Africa", x: 50, y: 245 },
      { name: "Feira Popular Social Hub, Maputo, Mozambique", x: 440, y: 105 },
      { name: "Samora Machel Avenue, Harare, Zimbabwe", x: 380, y: 40 },
    ],
  },
  {
    id: "north",
    name: "North Africa (Afrique du Nord)",
    emoji: "🐪",
    currency: "EGP",
    placeholderPhone: "+20 10 0000 0000",
    operators: ["Fawry", "Vodafone Cash", "Orange Money", "Card Pay"],
    mapTheme: {
      lakeLabel: "RIVER NILE DELTA",
      oceanLabel: "MEDITERRANEAN SEA",
      bgColor: "#ffedd5",
      waterColor: "#0ea5e9",
      coastPath: "M-10 60 C 150 40, 300 50, 510 30 L510 0 L-10 0 Z",
    },
    boundingBox: { minLat: 29.5, maxLat: 36.5, minLng: -10.0, maxLng: 33.0 },
    landmarks: [
      { name: "Zamalek Rooftop Garden, Cairo, Egypt", x: 460, y: 150 },
      { name: "Giza Plateau Sunset Base, Cairo, Egypt", x: 440, y: 170 },
      { name: "La Corniche Promenade Cafe, Casablanca, Morocco", x: 60, y: 110 },
      { name: "Sidi Bou Said Cliffside Pavilion, Tunis, Tunisia", x: 240, y: 50 },
    ],
  },
  {
    id: "central",
    name: "Central Africa (Afrique Centrale)",
    emoji: "🦍",
    currency: "FCFA (XAF)",
    placeholderPhone: "+237 600 000 000",
    operators: ["MTN MoMo", "Orange Money", "Airtel Money"],
    mapTheme: {
      lakeLabel: "CONGO RIVER",
      oceanLabel: "GULF OF GUINEA",
      bgColor: "#f3e8ff",
      waterColor: "#3b82f6",
      coastPath: "M-10 80 C 120 110, 180 180, 220 250 L-10 250 Z",
    },
    boundingBox: { minLat: -5.0, maxLat: 5.0, minLng: 9.0, maxLng: 16.0 },
    landmarks: [
      { name: "Palais des Congrès Social Plaza, Yaoundé, Cameroon", x: 140, y: 40 },
      { name: "Kribi Beachfront Seafood Shacks, Kribi, Cameroon", x: 100, y: 80 },
      { name: "Gombe Boulevard Chillout Lounge, Kinshasa, DR Congo", x: 380, y: 220 },
      { name: "Pointe-Noire Coast Ocean Drive, Republic of Congo", x: 320, y: 240 },
    ],
  },
];

export const MAP_LANDMARKS = AFRICAN_REGIONS[0].landmarks;

export const PRESET_GIFS = [
  {
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=200&q=80",
    label: "Dance",
  },
  {
    url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=200&q=80",
    label: "Sparks",
  },
  {
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=200&q=80",
    label: "Music",
  },
  {
    url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=200&q=80",
    label: "Cheers",
  },
];
