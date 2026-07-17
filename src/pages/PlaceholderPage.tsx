import { Link } from 'react-router-dom';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Green top bar */}
      <div className="h-1 bg-gold-gradient" />

      {/* Spacer for fixed header */}
      <div className="h-20 bg-brand-green" />

      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 rounded-sm bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mx-auto mb-6">
            <Construction size={36} className="text-brand-green" strokeWidth={1.5} />
          </div>
          <p className="section-label">Coming Soon</p>
          <h1 className="font-display font-extrabold text-4xl text-brand-green mb-4">
            {title}
          </h1>
          <div className="w-16 h-1 bg-brand-gold mx-auto mb-6" />
          <p className="font-body text-gray-500 text-base leading-relaxed mb-10">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" id="placeholder-back-home" className="btn-primary">
              Back to Home
            </Link>
            <Link to="/contact" id="placeholder-contact" className="btn-outline-green">
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-brand-green-dark text-white py-6 text-center">
        <p className="font-body text-white/40 text-xs">
          © {new Date().getFullYear()} Bhumi Steel · Subject to Mumbai Jurisdiction
        </p>
      </footer>
    </div>
  );
}
