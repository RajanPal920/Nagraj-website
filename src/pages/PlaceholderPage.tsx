import { Link } from "react-router-dom";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Red top bar */}
      <div className="h-1 bg-brand-red" />

      {/* Spacer for fixed header */}
      <div className="h-20 bg-brand-red" />

      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 rounded-sm bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mx-auto mb-6">
            <Construction
              size={36}
              className="text-brand-red"
              strokeWidth={1.5}
            />
          </div>
          <p className="section-label text-brand-red">Coming Soon</p>
          <h1 className="font-display font-extrabold text-4xl text-brand-charcoal mb-4">
            {title}
          </h1>
          <div className="w-16 h-1 bg-brand-red mx-auto mb-6" />
          <p className="font-body text-gray-500 text-base leading-relaxed mb-10">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              id="placeholder-back-home"
              className="bg-brand-red hover:bg-brand-red-dark text-white font-display font-bold px-8 py-3.5 rounded-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base inline-flex items-center justify-center"
            >
              Back to Home
            </Link>
            <Link
              to="/contact"
              id="placeholder-contact"
              className="border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-display font-bold px-8 py-3.5 rounded-sm transition-all duration-200 hover:-translate-y-0.5 text-base inline-flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-brand-charcoal text-white py-6 text-center">
        <p className="font-body text-white/40 text-xs">
          © {new Date().getFullYear()} Nagraj Metal Industries · Subject to
          Mumbai Jurisdiction
        </p>
      </footer>
    </div>
  );
}
