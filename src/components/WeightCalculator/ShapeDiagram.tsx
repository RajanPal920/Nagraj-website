import { type ShapeId, type DimensionUnit } from "../../data/metalWeightData";
import { formatNumber } from "../../utils/metalCalculatorEngine";

interface ShapeDiagramProps {
  shapeId: ShapeId;
  dimensions: Record<string, number | undefined>;
  units: Record<string, DimensionUnit>;
}

export const ShapeDiagram: React.FC<ShapeDiagramProps> = ({
  shapeId,
  dimensions,
  units,
}) => {
  const getLabel = (key: string, defaultSymbol: string) => {
    const val = dimensions[key];
    const u = units[key] || "mm";
    if (val !== undefined && !isNaN(val) && val > 0) {
      return `${defaultSymbol} = ${formatNumber(val)} ${u}`;
    }
    return defaultSymbol;
  };

  return (
    <div className="w-full bg-linear-to-b from-gray-50/90 to-white rounded-2xl border border-gray-200/90 p-3.5 sm:p-4 text-center">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700 font-display flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#B22222]"></span>
          Dimensional Blueprint
        </span>
        <span className="text-[10px] text-gray-700 font-medium font-mono">
          Engineering Schematic
        </span>
      </div>

      <div className="relative h-44 sm:h-48 w-full flex items-center justify-center overflow-hidden">
        {shapeId === "round-bar" && (
          <svg viewBox="0 0 340 160" className="w-full h-full max-w-[340px]">
            {/* Round Bar Isometric */}
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#CBD5E1" />
                <stop offset="50%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#64748B" />
              </linearGradient>
            </defs>

            {/* Cylinder Body */}
            <path d="M 60,40 L 260,40 C 275,40 285,58 285,80 C 285,102 275,120 260,120 L 60,120 Z" fill="url(#barGrad)" opacity="0.85" />
            {/* Back rim */}
            <ellipse cx="60" cy="80" rx="16" ry="40" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
            {/* Front rim */}
            <ellipse cx="260" cy="80" rx="16" ry="40" fill="#CBD5E1" stroke="#334155" strokeWidth="2" />
            <path d="M 60,40 L 260,40" stroke="#334155" strokeWidth="2" />
            <path d="M 60,120 L 260,120" stroke="#334155" strokeWidth="2" />

            {/* Dimension D (Diameter) */}
            <line x1="38" y1="40" x2="38" y2="120" stroke="#B22222" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="32" y1="40" x2="44" y2="40" stroke="#B22222" strokeWidth="1.5" />
            <line x1="32" y1="120" x2="44" y2="120" stroke="#B22222" strokeWidth="1.5" />
            <text x="32" y="84" fill="#B22222" fontSize="11" fontWeight="bold" textAnchor="end" dominantBaseline="middle">
              {getLabel("diameter", "Ø D")}
            </text>

            {/* Dimension L (Length) */}
            <line x1="60" y1="138" x2="260" y2="138" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="60,138 68,135 68,141" fill="#0F172A" />
            <polygon points="260,138 252,135 252,141" fill="#0F172A" />
            <text x="160" y="152" fill="#0F172A" fontSize="11" fontWeight="bold" textAnchor="middle">
              {getLabel("length", "Length (L)")}
            </text>
          </svg>
        )}

        {shapeId === "square-bar" && (
          <svg viewBox="0 0 340 160" className="w-full h-full max-w-[340px]">
            {/* Isometric Square Bar */}
            <polygon points="40,60 80,30 250,30 210,60" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
            <polygon points="40,60 40,110 80,140 80,90" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
            <polygon points="80,90 80,140 250,80 250,30" fill="#64748B" stroke="#1E293B" strokeWidth="2" />

            {/* Side Dimension */}
            <line x1="28" y1="60" x2="28" y2="110" stroke="#B22222" strokeWidth="1.5" />
            <text x="22" y="88" fill="#B22222" fontSize="11" fontWeight="bold" textAnchor="end">
              {getLabel("side", "Side (S)")}
            </text>

            {/* Length Dimension */}
            <line x1="80" y1="148" x2="250" y2="88" stroke="#0F172A" strokeWidth="1.5" />
            <text x="175" y="132" fill="#0F172A" fontSize="11" fontWeight="bold" textAnchor="middle">
              {getLabel("length", "Length (L)")}
            </text>
          </svg>
        )}

        {shapeId === "rectangular-bar" && (
          <svg viewBox="0 0 340 160" className="w-full h-full max-w-[340px]">
            {/* Flat Bar */}
            <polygon points="40,75 110,40 270,40 200,75" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
            <polygon points="40,75 40,95 110,130 110,110" fill="#94A3B8" stroke="#334155" strokeWidth="2" opacity="0" />
            {/* Left face */}
            <polygon points="40,75 40,95 200,95 200,75" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
            {/* Right side face */}
            <polygon points="200,75 200,95 270,60 270,40" fill="#64748B" stroke="#1E293B" strokeWidth="2" />

            {/* Width */}
            <line x1="40" y1="108" x2="200" y2="108" stroke="#B22222" strokeWidth="1.5" />
            <text x="120" y="124" fill="#B22222" fontSize="11" fontWeight="bold" textAnchor="middle">
              {getLabel("width", "Width (W)")}
            </text>

            {/* Thickness */}
            <line x1="28" y1="75" x2="28" y2="95" stroke="#B22222" strokeWidth="1.5" />
            <text x="22" y="88" fill="#B22222" fontSize="11" fontWeight="bold" textAnchor="end">
              {getLabel("thickness", "T")}
            </text>

            {/* Length */}
            <line x1="210" y1="108" x2="280" y2="73" stroke="#0F172A" strokeWidth="1.5" />
            <text x="260" y="102" fill="#0F172A" fontSize="11" fontWeight="bold" textAnchor="start">
              {getLabel("length", "Length (L)")}
            </text>
          </svg>
        )}

        {(shapeId === "hexagonal-bar" || shapeId === "octagonal-bar") && (
          <svg viewBox="0 0 340 160" className="w-full h-full max-w-[340px]">
            {/* Hex / Oct Bar schematic */}
            <polygon points="70,40 110,25 240,25 200,40" fill="#CBD5E1" stroke="#475569" strokeWidth="1.8" />
            <polygon points="50,75 70,40 200,40 180,75" fill="#94A3B8" stroke="#334155" strokeWidth="1.8" />
            <polygon points="70,110 50,75 180,75 200,110" fill="#64748B" stroke="#1E293B" strokeWidth="1.8" />
            <polygon points="180,75 200,40 240,25 250,55 240,95 200,110" fill="#475569" stroke="#0F172A" strokeWidth="1.8" />

            {/* Across Flats Dimension */}
            <line x1="38" y1="40" x2="38" y2="110" stroke="#B22222" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="32" y1="40" x2="44" y2="40" stroke="#B22222" strokeWidth="1.5" />
            <line x1="32" y1="110" x2="44" y2="110" stroke="#B22222" strokeWidth="1.5" />
            <text x="32" y="78" fill="#B22222" fontSize="11" fontWeight="bold" textAnchor="end">
              {getLabel("acrossFlats", "A/F")}
            </text>

            {/* Length */}
            <line x1="70" y1="128" x2="200" y2="128" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="70,128 78,125 78,131" fill="#0F172A" />
            <polygon points="200,128 192,125 192,131" fill="#0F172A" />
            <text x="135" y="144" fill="#0F172A" fontSize="11" fontWeight="bold" textAnchor="middle">
              {getLabel("length", "Length (L)")}
            </text>
          </svg>
        )}

        {(shapeId === "sheet" || shapeId === "plate") && (
          <svg viewBox="0 0 340 160" className="w-full h-full max-w-[340px]">
            {/* Sheet / Plate 3D Plate */}
            <polygon points="40,90 120,40 280,40 200,90" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
            <polygon points="40,90 40,108 200,108 200,90" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
            <polygon points="200,90 200,108 280,58 280,40" fill="#64748B" stroke="#1E293B" strokeWidth="2" />

            {/* Thickness T */}
            <line x1="28" y1="90" x2="28" y2="108" stroke="#B22222" strokeWidth="1.5" />
            <text x="22" y="102" fill="#B22222" fontSize="11" fontWeight="bold" textAnchor="end">
              {getLabel("thickness", "T")}
            </text>

            {/* Width W */}
            <line x1="40" y1="120" x2="200" y2="120" stroke="#B22222" strokeWidth="1.5" />
            <polygon points="40,120 48,117 48,123" fill="#B22222" />
            <polygon points="200,120 192,117 192,123" fill="#B22222" />
            <text x="120" y="136" fill="#B22222" fontSize="11" fontWeight="bold" textAnchor="middle">
              {getLabel("width", "Width (W)")}
            </text>

            {/* Length L */}
            <line x1="210" y1="116" x2="288" y2="67" stroke="#0F172A" strokeWidth="1.5" />
            <text x="260" y="105" fill="#0F172A" fontSize="11" fontWeight="bold" textAnchor="start">
              {getLabel("length", "Length (L)")}
            </text>
          </svg>
        )}

        {(shapeId === "tube" || shapeId === "pipe") && (
          <svg viewBox="0 0 340 160" className="w-full h-full max-w-[340px]">
            {/* Hollow Tube / Pipe */}
            {/* Body */}
            <path d="M 60,35 L 250,35 C 265,35 275,53 275,75 C 275,97 265,115 250,115 L 60,115 Z" fill="#94A3B8" opacity="0.8" />
            {/* Back outer ellipse */}
            <ellipse cx="60" cy="75" rx="16" ry="40" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
            {/* Back inner hole */}
            <ellipse cx="60" cy="75" rx="10" ry="25" fill="#64748B" stroke="#334155" strokeWidth="1.5" />

            {/* Top and Bottom lines */}
            <line x1="60" y1="35" x2="250" y2="35" stroke="#334155" strokeWidth="2" />
            <line x1="60" y1="115" x2="250" y2="115" stroke="#334155" strokeWidth="2" />

            {/* Front outer face */}
            <ellipse cx="250" cy="75" rx="16" ry="40" fill="#CBD5E1" stroke="#334155" strokeWidth="2" />
            {/* Front hollow bore */}
            <ellipse cx="250" cy="75" rx="10" ry="25" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />

            {/* OD Dimension */}
            <line x1="38" y1="35" x2="38" y2="115" stroke="#B22222" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="32" y1="35" x2="44" y2="35" stroke="#B22222" strokeWidth="1.5" />
            <line x1="32" y1="115" x2="44" y2="115" stroke="#B22222" strokeWidth="1.5" />
            <text x="32" y="78" fill="#B22222" fontSize="11" fontWeight="bold" textAnchor="end">
              {getLabel("outerDiameter", "OD")}
            </text>

            {/* WT (Wall Thickness) */}
            <line x1="250" y1="35" x2="250" y2="50" stroke="#B22222" strokeWidth="2" />
            <text x="272" y="44" fill="#B22222" fontSize="10" fontWeight="bold" textAnchor="start">
              {getLabel("wallThickness", "WT")}
            </text>

            {/* Length L */}
            <line x1="60" y1="135" x2="250" y2="135" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="60,135 68,132 68,138" fill="#0F172A" />
            <polygon points="250,135 242,132 242,138" fill="#0F172A" />
            <text x="155" y="150" fill="#0F172A" fontSize="11" fontWeight="bold" textAnchor="middle">
              {getLabel("length", "Length (L)")}
            </text>
          </svg>
        )}

        {shapeId === "ring" && (
          <svg viewBox="0 0 340 160" className="w-full h-full max-w-[340px]">
            {/* Ring / Flange Blank */}
            {/* Outer bottom curve */}
            <ellipse cx="170" cy="90" rx="90" ry="45" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
            {/* Outer top face */}
            <ellipse cx="170" cy="70" rx="90" ry="45" fill="#CBD5E1" stroke="#334155" strokeWidth="2" />
            {/* Inner bottom hole */}
            <ellipse cx="170" cy="90" rx="45" ry="22.5" fill="#475569" stroke="#1E293B" strokeWidth="1.5" />
            {/* Inner top hole */}
            <ellipse cx="170" cy="70" rx="45" ry="22.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />

            {/* OD dimension */}
            <line x1="170" y1="15" x2="260" y2="15" stroke="#B22222" strokeWidth="1.5" />
            <line x1="80" y1="15" x2="170" y2="15" stroke="#B22222" strokeWidth="1.5" />
            <line x1="80" y1="10" x2="80" y2="70" stroke="#B22222" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="260" y1="10" x2="260" y2="70" stroke="#B22222" strokeWidth="1" strokeDasharray="2 2" />
            <text x="170" y="10" fill="#B22222" fontSize="11" fontWeight="bold" textAnchor="middle">
              {getLabel("outerDiameter", "OD")}
            </text>

            {/* ID dimension */}
            <line x1="125" y1="68" x2="215" y2="68" stroke="#B22222" strokeWidth="1.5" />
            <polygon points="125,68 131,65 131,71" fill="#B22222" />
            <polygon points="215,68 209,65 209,71" fill="#B22222" />
            <text x="170" y="60" fill="#B22222" fontSize="10" fontWeight="bold" textAnchor="middle">
              {getLabel("innerDiameter", "ID")}
            </text>

            {/* Thickness / Width (T) */}
            <line x1="272" y1="70" x2="272" y2="90" stroke="#0F172A" strokeWidth="1.5" />
            <line x1="268" y1="70" x2="276" y2="70" stroke="#0F172A" strokeWidth="1.5" />
            <line x1="268" y1="90" x2="276" y2="90" stroke="#0F172A" strokeWidth="1.5" />
            <text x="280" y="83" fill="#0F172A" fontSize="11" fontWeight="bold" textAnchor="start">
              {getLabel("thickness", "T")}
            </text>
          </svg>
        )}
      </div>

      <p className="text-[11px] text-gray-500 font-body mt-1">
        All formulas comply with international metallurgical weight standards (ASTM / ASME / DIN / IS).
      </p>
    </div>
  );
};
