import type { ReactNode } from 'react';

interface PageHeroProps {
  id: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  bgImage?: string;
}

export function PageHero({ id, label, title, description, children, bgImage = '/images/hero-banner.jpg' }: PageHeroProps) {
  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-green-dark"
    >
      {/* Full Bleed Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat animate-bg-pan"
        style={{ backgroundImage: `url("${bgImage}")` }}
      />

      {/* Dark Green Gradient Overlay for Readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-brand-green-dark/40 via-brand-green-dark/58 to-brand-green-dark/40" />
      <div className="absolute inset-0 z-0 bg-brand-green-dark/30 mix-blend-multiply" />

      {/* Steel texture overlay */}
      <div className="absolute inset-0 z-0 steel-texture opacity-40 mix-blend-overlay" />

      {/* Gold bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-gradient z-20" />

      {/* Content Container */}
      <div className="relative z-10 container-xl px-4 sm:px-8 lg:px-16 xl:px-24 pt-24 pb-10 w-full mt-10">
        <div className="max-w-2xl text-left">
          {/* Eyebrow / Label */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <div className="h-px w-12 bg-brand-gold" />
            <span className="text-brand-gold font-display font-bold text-xs uppercase tracking-[0.3em] drop-shadow-md">
              {label}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6 animate-fade-in-up drop-shadow-lg">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="font-body text-white/90 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl animate-fade-in-up drop-shadow-md">
              {description}
            </p>
          )}

          {/* Additional children (e.g. stat tiles) */}
          {children && (
            <div className="animate-fade-in-up">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
