export type PropertyType = 'Guesthouse' | 'Mountain Retreat' | 'Lake Experience';

export interface Property {
  id: string;
  name: string;
  address: string; // Added address field
  slug: string;
  type: PropertyType;
  description: string;
  priceStart: string;
  image: string;
  highlights: string[];
  mapCoordinates: {
    x: number; 
    y: number; 
  };
}

export const properties: Property[] = [
    {
   id: '1',
    name: "Ca' Pedrott",
    address: "Monti Mornera, 6513 Monte Carasso",
    slug: 'ca-pedrott',
    type: 'Mountain Retreat', 
    description: 'High-altitude tranquility in Mornera. Accessible by cable car, offering breathtaking panoramic views.',
    priceStart: 'CHF 250',
    image: '/properties/ca_pedrot.jpeg',
    highlights: ['Panoramic Views', 'Hiking Trails'],
    mapCoordinates: { x: 52, y: 28 }
  },
  {
    id: '2',
    name: "Ca' Spontoi",
    address: "Spontoi 19, 6525 Gnosca",
    slug: 'ca-spontoi',
    type: 'Mountain Retreat', 
    description: 'A historic stone rustic house in Gnosca, offering a raw and authentic Swiss valley experience.',
    priceStart: 'CHF 220',
    image: '/properties/ca_spontoi_1.png',
    highlights: ['Rustic Stone', 'Valley Views'],
    mapCoordinates: { x: 27, y: 55 }
  },
  {
   id: '3',
    name: "Ca' Pölete",
    address: "er Cará de Pedmúnt 7, 6513 Monte Carasso",
    slug: 'ca-polete',
    type: 'Guesthouse', 
    description: 'Charming accommodation in the heart of Monte Carasso, perfect for exploring the castles and local grottoes.',
    priceStart: 'CHF 180',
    image: '/properties/ca_polete.jpeg',
   highlights: ['Village Life', 'Near Cable Car'],
    mapCoordinates: { x: 78, y: 48 }
  },

  {
   id: '4',
    name: "Barca Winca",
    address: "Porto Mappo, 6598 Minusio",
    slug: 'barca-winca',
    type: 'Lake Experience', 
    description: 'A unique waterside experience at Porto Mappo. Enjoy the breeze of Lake Maggiore.',
    priceStart: 'CHF 300',
    image: '/properties/barca_winga.jpg',
    highlights: ['Lakefront', 'Marina Life'],
   mapCoordinates: { x: 44, y: 72 }
  },
];
