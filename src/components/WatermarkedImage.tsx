// src/components/WatermarkedImage.tsx

interface WatermarkedImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

/**
 * Image with Nagraj Metal Industries logo watermark (logo only, no text)
 * Use this component for product images on Products & Specialized Products pages
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

      {/* ✅ Watermark — Logo Only */}
      <div className="absolute bottom-3 right-3 pointer-events-none select-none z-10">
        <div className="bg-white/90 bg-transparent backdrop-blur-md p-2 rounded-md shadow-md border border-gray-200 ">
          <img
            src="/images/logo.png"
            alt="Nagraj Metal Industries"
            className="w-25 h-12 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
