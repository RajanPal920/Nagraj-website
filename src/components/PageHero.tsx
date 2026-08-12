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
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />
      <div className="relative z-10 container-xl h-full flex items-center px-4 sm:px-8 lg:px-16 xl:px-24">
      
      </div>
    </section>
  );
}
