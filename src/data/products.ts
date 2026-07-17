export interface ProductInfo {
  id: string;
  name: string;
  shortDescription: string;
  iconName: string; // lucide-react icon name
  highlights: string[];
}

export const products: ProductInfo[] = [
  {
    id: 'pipes-tubes',
    name: 'Pipes & Tubes',
    shortDescription:
      'Seamless and welded pipes in carbon steel, stainless steel, and alloy grades for high-pressure industrial applications.',
    iconName: 'Cylinder',
    highlights: ['Seamless & ERW', 'Carbon / SS / Alloy', 'Oil & Gas grade'],
  },
  {
    id: 'flanges',
    name: 'Flanges',
    shortDescription:
      'Slip-on, weld neck, blind, and socket-weld flanges machined to ANSI, ASME, DIN, and IS standards.',
    iconName: 'Circle',
    highlights: ['ANSI / ASME / DIN', 'Weld Neck, Blind, SO', 'Custom ratings'],
  },
  {
    id: 'fittings',
    name: 'Fittings',
    shortDescription:
      'Buttweld and forged fittings — elbows, tees, reducers, and caps — to match every piping system requirement.',
    iconName: 'GitBranch',
    highlights: ['Buttweld & Forged', 'Elbows, Tees, Reducers', 'Pressure-rated'],
  },
  {
    id: 'round-bars',
    name: 'Round Bars & Rods',
    shortDescription:
      'Bright and black round bars in mild steel, stainless, and tool steel — cut to length or in full mill lengths.',
    iconName: 'Minus',
    highlights: ['Mild Steel / SS', 'Bright & Black finish', 'Cut-to-length'],
  },
  {
    id: 'sheets-plates',
    name: 'Sheets & Plates',
    shortDescription:
      'HR, CR, and stainless steel sheets and plates in a wide range of thicknesses and widths for structural and process use.',
    iconName: 'LayoutGrid',
    highlights: ['HR / CR / SS', 'Structural & Process', 'Shearing available'],
  },
  {
    id: 'hollow-sections',
    name: 'Hollow Sections',
    shortDescription:
      'Square hollow sections (SHS) and rectangular hollow sections (RHS) in mild steel for construction and fabrication.',
    iconName: 'Square',
    highlights: ['SHS & RHS', 'Mild Steel', 'Construction grade'],
  },
];
