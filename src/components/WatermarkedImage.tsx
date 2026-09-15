// src/components/WatermarkedImage.tsx

interface WatermarkedImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

/**
 * Image with Nagraj Metal Industries watermark
 * Style inspired by premium B2B steel companies (Textron-like)
 */
export function WatermarkedImage({
  src,
  alt,
  className = "",
  imgClassName = "",
}: WatermarkedImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Main Image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${imgClassName}`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (!target.src.includes("productHero")) {
            target.src = "/images/productHero.png";
          }
        }}
      />

      {/* ✅ Watermark 1 — Center Diagonal Logo (Large, Semi-transparent) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
        <img
          src="/images/logo.png"
          alt=""
          className="w-[60%] h-auto object-contain opacity-40 transform -rotate-12"
        />
      </div>

      {/* ✅ Watermark 2 — Top-Left Small Logo */}
      {/* <div className="absolute top-12 left-3 pointer-events-none select-none z-10">
        <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-sm shadow-md border border-gray-200">
          <img
            src="/images/logo.png"
            alt="Nagraj Metal Industries"
            className="w-16 h-10 object-contain"
          />
        </div>
      </div> */}
    </div>
  );
}
