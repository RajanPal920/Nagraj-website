// PageHero.tsx
import type { ReactNode } from "react";

interface PageHeroProps {
  id: string;
  children?: ReactNode;
  bgImage?: string;
}

export function PageHero({
  id,
  bgImage = "/images/hero-banner.jpg",
}: PageHeroProps) {
  return (
    <section
      id={id}
      className="relative w-full h-[100svh] min-h-[600px] overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />

      {/* Light Red Overlay */}
      <div className="absolute inset-0 w-full h-full bg-brand-red/20 z-5"></div>

      {/* Content Container */}
      <div className="relative z-10 container-xl h-full flex items-center px-4 sm:px-8 lg:px-16 xl:px-24">
      
      </div>
    </section>
  );
}
