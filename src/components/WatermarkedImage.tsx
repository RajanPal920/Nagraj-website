// src/components/WatermarkedImage.tsx

interface WatermarkedImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackSrc?: string;
  showWatermark?: boolean;
}

/**
 * Image with Nagraj Metal Industries watermark
 * Style inspired by premium B2B steel companies
 */
export function WatermarkedImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  fallbackSrc = "/images/productHero.png",
  showWatermark = true,
}: WatermarkedImageProps) {
  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      {/* Main Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover ${imgClassName}`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          const fallback = fallbackSrc || "/images/productHero.png";
          if (target.src !== fallback && !target.src.endsWith(fallback)) {
            target.src = fallback;
          }
        }}
      />

      {showWatermark && (
        <>
          {/* ✅ Watermark 1 — Center Diagonal Logo (Semi-transparent) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
            <img
              src="/images/logo.png"
              alt=""
              className="w-[50%] max-w-[160px] h-auto object-contain opacity-[0.18] transform -rotate-12"
            />
          </div>

          {/* ✅ Watermark 2 — Bottom-Right Brand Badge */}
          <div className="absolute bottom-2 right-2.5 pointer-events-none select-none z-10">
            <div className="bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded shadow-sm border border-gray-200/80">
              <img
                src="/images/logo.png"
                alt="Nagraj Metal Industries"
                className="w-12 h-6 object-contain"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
