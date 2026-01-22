// 'use client';

// import React, { useMemo, useState, useEffect } from 'react';
// import { geoMercator, geoPath } from 'd3-geo';
// import { Property } from '@/lib/data';
// import { MapMarker } from './MapMarker';

// /* ---------- TEXTURE ---------- */
// const PaperTexture = () => (
//   <filter id="paper-noise">
//     <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" />
//     <feColorMatrix
//       type="matrix"
//       values="
//         0 0 0 0 0.95
//         0 0 0 0 0.94
//         0 0 0 0 0.92
//         0 0 0 1 0
//       "
//     />
//     <feBlend mode="multiply" in2="SourceGraphic" />
//   </filter>
// );

// interface GeoMapProps {
//   properties: Property[];
//   onMarkerClick: (p: Property) => void;
// }

// /* ---------- COMPONENT ---------- */
// export default function GeoMap({ properties, onMarkerClick }: GeoMapProps) {
//   const [geoData, setGeoData] = useState<any>(null);

//   /* ---------- FETCH GEO ---------- */
//   useEffect(() => {
//     fetch(
//       'https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/switzerland.geojson'
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         const ticino = data.features.find(
//           (f: any) =>
//             f.properties.name === 'Ticino' ||
//             f.properties.name === 'Tessin'
//         );
//         setGeoData(ticino);
//       });
//   }, []);

//   /* ---------- PROJECTION ---------- */
//   const { projection, pathGenerator } = useMemo(() => {
//     if (!geoData) return { projection: null, pathGenerator: null };

//     const proj = geoMercator();

//     const lats = properties.map((p) => p.lat);
//     const lngs = properties.map((p) => p.lng);

//     const bounds = {
//       type: 'LineString',
//       coordinates: [
//         [Math.min(...lngs) - 0.05, Math.min(...lats) - 0.05],
//         [Math.max(...lngs) + 0.05, Math.max(...lats) + 0.05],
//       ],
//     };

//     proj.fitSize([800, 600], bounds as any);
//     return { projection: proj, pathGenerator: geoPath().projection(proj) };
//   }, [geoData, properties]);

//   /* ---------- RIVER ---------- */
//   const riverPath = useMemo(() => {
//     if (!projection) return '';
//     const points: [number, number][] = [
//       [9.05, 46.28],
//       [9.02, 46.24],
//       [9.0, 46.19],
//       [8.95, 46.16],
//       [8.85, 46.15],
//     ];
//     return `M ${points
//       .map((p) => projection(p)?.join(','))
//       .join(' L ')}`;
//   }, [projection]);

//   if (!geoData || !projection)
//     return <div className="w-full h-full bg-[#FAF9F6] animate-pulse" />;

//   return (
//     <div className="relative w-full h-full bg-[#FAF9F6] rounded-3xl overflow-hidden border border-[#E7E3DC] shadow-inner">
      
//       {/* ---------- SVG ---------- */}
//       <svg
//         viewBox="0 0 800 600"
//         preserveAspectRatio="xMidYMid slice"
//         className="absolute inset-0 w-full h-full"
//       >
//         <defs>
//           <PaperTexture />

//           {/* Land Gradient */}
//           <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//   <stop offset="0%" stopColor="#F7F6F3" />
//   <stop offset="100%" stopColor="#EDE9E2" />
// </linearGradient>


//           {/* Hill shading */}
//           <radialGradient id="hillShade">
//             <stop offset="0%" stopColor="#EEEAE3" />
//             <stop offset="100%" stopColor="transparent" />
//           </radialGradient>

//           {/* Trees */}
//           <symbol id="tree-pine" viewBox="0 0 24 24">
//             <path
//               d="M12 2 L5 14 H9 L4 22 H20 L15 14 H19 Z"
//               fill="#D6D3CD"
//             />
//           </symbol>

//           <symbol id="tree-round" viewBox="0 0 24 24">
//             <circle cx="12" cy="10" r="6" fill="#DEDAD3" />
//             <rect x="10.5" y="14" width="3" height="6" fill="#CFCAC2" />
//           </symbol>
//         </defs>

//         {/* Paper */}
//         <rect width="100%" height="100%" fill="#FAF9F6" filter="url(#paper-noise)" />

//         {/* Terrain depth */}
//         <circle cx="260" cy="210" r="170" fill="url(#hillShade)" />
//         <circle cx="520" cy="380" r="150" fill="url(#hillShade)" />

//         {/* Land */}
//         <path
//           d={pathGenerator(geoData) || ''}
//           fill="url(#landGradient)"
//           stroke="#FFFFFF"
//           strokeWidth="4"
//         />

//         {/* River */}
//         <path
//           d={riverPath}
//           fill="none"
//           stroke="#CBD5E1"
//           strokeWidth="6"
//           strokeLinecap="round"
//           opacity="0.5"
//         />

//         {/* Trees */}
//         <g opacity="0.4">
//           <use href="#tree-pine" x="120" y="200" width="18" />
//           <use href="#tree-round" x="150" y="230" width="16" />
//           <use href="#tree-pine" x="620" y="320" width="20" />
//           <use href="#tree-round" x="650" y="350" width="16" />
//         </g>

//         {/* Decorative contours */}
//         <circle cx="120" cy="120" r="260" stroke="#E3DED6" strokeWidth="1" fill="none" opacity="0.5" />
//         <circle cx="720" cy="520" r="200" stroke="#E3DED6" strokeWidth="1" fill="none" opacity="0.5" />
//       </svg>

//       {/* Label */}
//       <div className="absolute top-8 left-8 font-serif text-4xl text-[#A8A29D] opacity-20 select-none">
//         TICINO
//       </div>

//       {/* Markers */}
//       {properties.map((prop) => {
//         const coords = projection([prop.lng, prop.lat]);
//         if (!coords) return null;

//         return (
//           <div
//             key={prop.id}
//             className="absolute z-20"
//             style={{
//               left: `${(coords[0] / 800) * 100}%`,
//               top: `${(coords[1] / 600) * 100}%`,
//             }}
//           >
//             <MapMarker
//               property={prop}
//               onClick={onMarkerClick}
//               isMobile={false}
//             />
//           </div>
//         );
//       })}

//       {/* Vignette */}
//       <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_80px_rgba(0,0,0,0.05)]
// " />
//     </div>
//   );
// }
