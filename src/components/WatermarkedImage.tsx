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
 * Product Image component (clean, without watermarks)
 */
export function WatermarkedImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  fallbackSrc = "/images/productHero.png",
  showWatermark: _showWatermark = false,
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
    </div>
  );
}
