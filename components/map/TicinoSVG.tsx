import React from 'react';

export const TicinoSVG = () => (
  <svg
    viewBox="0 0 800 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full object-cover drop-shadow-2xl"
    role="img"
    aria-label="Map of Ticino, Switzerland"
  >
    {/* Abstract representation of Ticino shape for demo */}
    <path
      d="M200,50 Q250,20 350,40 T500,100 T650,150 T750,300 Q700,400 600,450 T400,550 T200,500 T50,300 Q100,150 200,50 Z"
      fill="#F5F3EF"
      stroke="#D4C5B0"
      strokeWidth="2"
    />
    
    {/* Lake Maggiore */}
    <path d="M250,450 Q300,400 320,350 T300,300" stroke="#A8C0D0" strokeWidth="15" fill="none" opacity="0.6"/>
    
    {/* Lake Lugano */}
    <path d="M550,500 Q600,450 620,400 T580,350" stroke="#A8C0D0" strokeWidth="15" fill="none" opacity="0.6"/>

    {/* Topography Lines (Style) */}
    <path d="M220,70 Q300,50 400,90" stroke="#E6DFD5" strokeWidth="1" />
    <path d="M600,200 Q650,250 700,220" stroke="#E6DFD5" strokeWidth="1" />
  </svg>
);