// src/components/WeightCalculator/ShapeSelector.tsx

import { Check } from "lucide-react";
import { type ShapeType } from "../../data/productCalculatorData";

interface ShapeSelectorProps {
  selectedShape: ShapeType;
  onSelectShape: (shape: ShapeType) => void;
}

export interface ShapeCardItem {
  id: ShapeType;
  name: string;
}

export const VISUAL_SHAPES: ShapeCardItem[] = [
  { id: "round", name: "Round" },
  { id: "square", name: "Square" },
  { id: "rectangle", name: "Rectangle" },
  { id: "hexagonal", name: "Hexagonal" },
  { id: "octagonal", name: "Octagonal" },
  { id: "sheet", name: "Sheet" },
  { id: "plate", name: "Plate" },
  { id: "tubular", name: "Tubular" },
  { id: "ring", name: "Ring" },
  { id: "pipe", name: "Pipe" },
];

function ShapeIcon({ shape, isSelected }: { shape: ShapeType; isSelected: boolean }) {
  const strokeColor = isSelected ? "#B22222" : "currentColor";
  const fillColor = isSelected ? "rgba(178, 34, 34, 0.15)" : "rgba(100, 116, 139, 0.12)";

  switch (shape) {
    case "round":
      // Round: A filled/circular cross-section
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <circle cx="12" cy="12" r="8" stroke={strokeColor} strokeWidth="2" fill={fillColor} />
        </svg>
      );

    case "square":
      // Square: A square cross-section
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <rect x="4.5" y="4.5" width="15" height="15" rx="1" stroke={strokeColor} strokeWidth="2" fill={fillColor} />
        </svg>
      );

    case "rectangle":
      // Rectangle: A horizontal rectangle
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <rect x="3" y="6.5" width="18" height="11" rx="1" stroke={strokeColor} strokeWidth="2" fill={fillColor} />
        </svg>
      );

    case "hexagonal":
      // Hexagonal: A proper six-sided hexagon
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <polygon
            points="12,3.5 19.5,7.8 19.5,16.2 12,20.5 4.5,16.2 4.5,7.8"
            stroke={strokeColor}
            strokeWidth="2"
            fill={fillColor}
          />
        </svg>
      );

    case "octagonal":
      // Octagonal: A proper eight-sided octagon
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <polygon
            points="8.2,3.5 15.8,3.5 20.5,8.2 20.5,15.8 15.8,20.5 8.2,20.5 3.5,15.8 3.5,8.2"
            stroke={strokeColor}
            strokeWidth="2"
            fill={fillColor}
          />
        </svg>
      );

    case "sheet":
      // Sheet: A thin flat rectangular sheet
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <polygon
            points="3.5,14 13.5,7 20.5,10.5 10.5,17.5"
            stroke={strokeColor}
            strokeWidth="1.8"
            fill={fillColor}
          />
          <polygon
            points="3.5,14 3.5,16 10.5,19.5 10.5,17.5"
            stroke={strokeColor}
            strokeWidth="1.8"
            fill={isSelected ? "rgba(178, 34, 34, 0.3)" : "rgba(100, 116, 139, 0.25)"}
          />
          <polygon
            points="10.5,17.5 10.5,19.5 20.5,12.5 20.5,10.5"
            stroke={strokeColor}
            strokeWidth="1.8"
            fill={isSelected ? "rgba(178, 34, 34, 0.2)" : "rgba(100, 116, 139, 0.18)"}
          />
        </svg>
      );

    case "plate":
      // Plate: A thicker rectangular plate
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <polygon
            points="3.5,11.5 13.5,5 20.5,8.5 10.5,15"
            stroke={strokeColor}
            strokeWidth="1.8"
            fill={fillColor}
          />
          <polygon
            points="3.5,11.5 3.5,17 10.5,20.5 10.5,15"
            stroke={strokeColor}
            strokeWidth="1.8"
            fill={isSelected ? "rgba(178, 34, 34, 0.35)" : "rgba(100, 116, 139, 0.35)"}
          />
          <polygon
            points="10.5,15 10.5,20.5 20.5,14 20.5,8.5"
            stroke={strokeColor}
            strokeWidth="1.8"
            fill={isSelected ? "rgba(178, 34, 34, 0.25)" : "rgba(100, 116, 139, 0.22)"}
          />
        </svg>
      );

    case "tubular":
      // Tubular: A hollow circular tube showing the inner hole
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <circle cx="12" cy="12" r="8.5" stroke={strokeColor} strokeWidth="2" fill={fillColor} />
          <circle cx="12" cy="12" r="4.5" stroke={strokeColor} strokeWidth="1.8" fill="white" />
        </svg>
      );

    case "ring":
      // Ring: A circular ring with clearly visible inner and outer circles
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <circle cx="12" cy="12" r="9" stroke={strokeColor} strokeWidth="2.2" fill={fillColor} />
          <circle cx="12" cy="12" r="4" stroke={strokeColor} strokeWidth="2" fill="white" />
        </svg>
      );

    case "pipe":
      // Pipe: A hollow cylindrical pipe / tube representation
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <path d="M4 8.5 L17 8.5" stroke={strokeColor} strokeWidth="1.8" />
          <path d="M4 15.5 L17 15.5" stroke={strokeColor} strokeWidth="1.8" />
          <ellipse cx="4" cy="12" rx="2" ry="3.5" stroke={strokeColor} strokeWidth="1.8" fill={fillColor} />
          <ellipse cx="17" cy="12" rx="3.5" ry="3.5" stroke={strokeColor} strokeWidth="1.8" fill={fillColor} />
          <ellipse cx="17" cy="12" rx="1.8" ry="1.8" stroke={strokeColor} strokeWidth="1.5" fill="white" />
        </svg>
      );

    default:
      return null;
  }
}

export function ShapeSelector({ selectedShape, onSelectShape }: ShapeSelectorProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
        {VISUAL_SHAPES.map((shape) => {
          const isSelected = selectedShape === shape.id;
          return (
            <button
              key={shape.id}
              type="button"
              onClick={() => onSelectShape(shape.id)}
              aria-pressed={isSelected}
              className={`group relative p-2 sm:py-2.5 sm:px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[66px] sm:min-h-[72px] ${
                isSelected
                  ? "bg-red-50/80 text-[#B22222] border-[#B22222] shadow-xs ring-1 ring-[#B22222]/30"
                  : "bg-white hover:bg-gray-50/90 text-gray-700 border-gray-200 hover:border-gray-300 shadow-2xs"
              }`}
            >
              {/* Check indicator for selected card */}
              {isSelected && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-[#B22222] text-white flex items-center justify-center">
                  <Check size={8} strokeWidth={3.5} />
                </span>
              )}

              {/* Technical SVG Icon */}
              <div
                className={`mb-1 transition-colors ${
                  isSelected ? "text-[#B22222]" : "text-gray-500 group-hover:text-gray-800"
                }`}
              >
                <ShapeIcon shape={shape.id} isSelected={isSelected} />
              </div>

              {/* Shape Name */}
              <span
                className={`block text-[11px] sm:text-xs font-display leading-tight ${
                  isSelected
                    ? "font-bold text-[#B22222]"
                    : "font-semibold text-gray-800 group-hover:text-gray-900"
                }`}
              >
                {shape.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
