export type PropertyType = 'Guesthouse' | 'Mountain Retreat' | 'Lake Experience';

export interface Property {
  id: string;
  name: string;
  slug: string;
  type: PropertyType;
  description: string;
  priceStart: string;
  mapX: number; // Percentage from left (0-100)
  mapY: number; // Percentage from top (0-100)
  image: string; // URL
  highlights: string[];
  lat: number;
  lng: number;
}

export const properties: Property[] = [
  {
    id: '1',
    name: 'CA SPONTOI',
    slug: 'CA_SPONTOI',
    type: 'Lake Experience',
    description: 'A calm wellness oasis overlooking Lago Maggiore. Features minimalist architecture and thermal baths.',
    priceStart: 'CHF 450',
    mapX: 35, // 35% from left
    mapY: 60, // 60% from top (Locarno area)
    image: '/properties/ca_spontoi.jpg',
    highlights: ['Infinity Pool', 'Private Spa Suites'],
    lat: 46.1738,
    lng: 8.7954,
  },
  {
    id: '2',
    name: 'CA PÖLETE',
    slug: 'CA_PÖLETE',
    type: 'Mountain Retreat',
    description: 'Alpine luxury meets Asian grace. High altitude serenity with world-class skiing and spa facilities.',
    priceStart: 'CHF 850',
    mapX: 55,
    mapY: 20, // Northern Alps
    image: '/properties/ca_polete.jpeg',
    highlights: ['Michelin Dining', 'Hydrotherapy'],
    lat: 46.6358,
    lng: 8.5947,
  },
  {
    id: '3',
    name: 'CA PEDROT',
    slug: 'CA_PEDROT',
    type: 'Guesthouse',
    description: 'A historic estate surrounded by vineyards and private beaches. True "Farm to Table" luxury.',
    priceStart: 'CHF 620',
    mapX: 40,
    mapY: 65, // Ascona
    image: '/properties/ca_pedrot.jpeg',
    highlights: ['Private Beach', 'Vineyards'],
    lat: 46.1554,
    lng: 8.7753,
  },
  {
    id: '4',
    name: 'Barca Winga',
    slug: 'Barca_Winga',
    type: 'Lake Experience',
    description: 'Belle Époque elegance in Lugano. A timeless classic offering panoramic lake views.',
    priceStart: 'CHF 500',
    mapX: 65,
    mapY: 80, // Lugano
    image: '/properties/barca_winga.jpg',
    highlights: ['Fine Dining', 'Lake Terrace'],
    lat: 45.9961,
    lng: 8.9482,
  },
];