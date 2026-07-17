export interface ProductInfo {
  id: string;
  name: string;
  shortDescription: string;
  imageUrl: string;
  fallbackImageUrl: string;
  highlights: string[];
}

export const products: ProductInfo[] = [
  {
    id: 'pipes-tubes',
    name: 'Pipes & Tubes',
    shortDescription:
      'Seamless and welded pipes in carbon steel, stainless steel, and alloy grades for high-pressure industrial applications.',
    imageUrl: '/images/pipe.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1584824388147-38d5db229649?auto=format&fit=crop&q=80&w=800',
    highlights: ['Seamless & ERW', 'Carbon / SS / Alloy', 'Oil & Gas grade'],
  },
  {
    id: 'flanges',
    name: 'Flanges',
    shortDescription:
      'Slip-on, weld neck, blind, and socket-weld flanges machined to ANSI, ASME, DIN, and IS standards.',
    imageUrl: '/images/flange.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
    highlights: ['ANSI / ASME / DIN', 'Weld Neck, Blind, SO', 'Custom ratings'],
  },
  {
    id: 'fittings',
    name: 'Fittings',
    shortDescription:
      'Buttweld and forged fittings — elbows, tees, reducers, and caps — to match every piping system requirement.',
    imageUrl: '/images/fitting.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1590481231649-7c8bd3cb27e5?auto=format&fit=crop&q=80&w=800',
    highlights: ['Buttweld & Forged', 'Elbows, Tees, Reducers', 'Pressure-rated'],
  },
  {
    id: 'round-bars',
    name: 'Round Bars & Rods',
    shortDescription:
      'Bright and black round bars in mild steel, stainless, and tool steel — cut to length or in full mill lengths.',
    imageUrl: '/images/bar.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1506509939527-0dbf62fb438f?auto=format&fit=crop&q=80&w=800',
    highlights: ['Mild Steel / SS', 'Bright & Black finish', 'Cut-to-length'],
  },
  {
    id: 'sheets-plates',
    name: 'Sheets & Plates',
    shortDescription:
      'HR, CR, and stainless steel sheets and plates in a wide range of thicknesses and widths for structural and process use.',
    imageUrl: '/images/sheet.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1580983538118-2e86b4020c64?auto=format&fit=crop&q=80&w=800',
    highlights: ['HR / CR / SS', 'Structural & Process', 'Shearing available'],
  },
  {
    id: 'hollow-sections',
    name: 'Hollow Sections',
    shortDescription:
      'Square hollow sections (SHS) and rectangular hollow sections (RHS) in mild steel for construction and fabrication.',
    imageUrl: '/images/hollow.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800',
    highlights: ['SHS & RHS', 'Mild Steel', 'Construction grade'],
  },
];
