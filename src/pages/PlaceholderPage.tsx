import { Link } from "react-router-dom";
import { Construction, ArrowRight } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gray-50/60 flex flex-col pt-24">
      {/* Red accent top bar */}
      <div className="h-1 bg-gradient-to-r from-[#8B1A1A] via-[#B22222] to-[#6F1414]" />

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-lg bg-white rounded-2xl border border-gray-200/90 p-8 sm:p-12 shadow-lg">
          <div className="w-20 h-20 rounded-2xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center mx-auto mb-6">
            <Construction
              size={36}
              className="text-[#8B1A1A]"
              strokeWidth={1.75}
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1A1A]/10 text-[#8B1A1A] text-[10px] font-bold uppercase tracking-widest mb-3">
            In Preparation
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 mb-3 tracking-tight">
            {title}
          </h1>
          <div className="w-14 h-1 bg-[#8B1A1A] mx-auto mb-6 rounded-full" />
          <p className="font-body text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              id="placeholder-back-home"
              className="bg-[#8B1A1A] hover:bg-[#6F1414] text-white font-display font-bold px-7 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2"
            >
              <span>Back to Home</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/contact"
              id="placeholder-contact"
              className="border border-gray-300 hover:border-[#8B1A1A] text-gray-800 hover:text-[#8B1A1A] font-display font-bold px-7 py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5 text-xs uppercase tracking-wider inline-flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-950 border-t border-gray-800 text-white py-6 text-center">
        <p className="font-body text-gray-400 text-xs">
          © {new Date().getFullYear()} Nagraj Metal Industries · Subject to Mumbai Jurisdiction
        </p>
      </footer>
    </div>
  );
}

