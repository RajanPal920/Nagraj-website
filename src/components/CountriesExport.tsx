import { Globe, Plane, ShieldCheck, Ship, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ExportCountry {
  name: string;
  code: string;
  market: string;
}

const EXPORT_COUNTRIES: ExportCountry[] = [
  { name: "UNITED STATES", code: "us", market: "GLOBAL MARKET" },
  { name: "CANADA", code: "ca", market: "INTERNATIONAL MARKET" },
  { name: "MEXICO", code: "mx", market: "GLOBAL MARKETS" },
  { name: "UNITED KINGDOM", code: "gb", market: "INTERNATIONAL MARKETS" },
  { name: "GERMANY", code: "de", market: "EXPORT MARKETS" },
  { name: "FRANCE", code: "fr", market: "OVERSEAS MARKETS" },
  { name: "ITALY", code: "it", market: "GLOBAL TRADE" },
  { name: "SPAIN", code: "es", market: "INTERNATIONAL TRADE" },
  { name: "PORTUGAL", code: "pt", market: "GLOBAL SUPPLY" },
  { name: "NETHERLANDS", code: "nl", market: "INTERNATIONAL SUPPLY" },
  { name: "BELGIUM", code: "be", market: "EUROPEAN TRADE" },
  { name: "SWITZERLAND", code: "ch", market: "PRECISION SUPPLY" },
  { name: "JAPAN", code: "jp", market: "ASIA PACIFIC" },
  { name: "SWEDEN", code: "se", market: "SCANDINAVIA" },
  { name: "NORWAY", code: "no", market: "OFFSHORE SUPPLY" },
  { name: "UNITED ARAB EMIRATES", code: "ae", market: "MIDDLE EAST" },
  { name: "SAUDI ARABIA", code: "sa", market: "GCC MARKET" },
  { name: "SINGAPORE", code: "sg", market: "SOUTHEAST ASIA" },
  { name: "AUSTRALIA", code: "au", market: "OCEANIA REGION" },
  { name: "SOUTH AFRICA", code: "za", market: "AFRICA EXPORTS" },
];

export function CountriesExport() {
  return (
    <section
      id="countries-we-export"
      className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-t border-gray-200/80 relative overflow-hidden"
      aria-label="Countries We Export To"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="text-[#C8102E] font-display font-black text-xs uppercase tracking-[0.25em]">
              GLOBAL PRESENCE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-black text-[#0B1E33] tracking-tight leading-tight mb-4">
            Countries We Export To
          </h2>
          <p className="text-gray-600 font-body text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            We proudly serve clients across 50+ countries worldwide with our premium metal products, complete export documentation, and sea-worthy logistics.
          </p>
        </div>

        {/* 5-Column Country Cards Grid matching Screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 mb-12">
          {EXPORT_COUNTRIES.map((country) => (
            <div
              key={country.name}
              className="flex flex-col items-center group transition-transform duration-200 hover:-translate-y-1"
            >
              {/* White Top Card with Circular Flag */}
              <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200/80 p-4 sm:p-5 flex flex-col items-center justify-center text-center min-h-[110px] group-hover:border-[#B22222]/40 group-hover:shadow-md transition-all">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-xs border border-gray-200 flex items-center justify-center bg-gray-50 mb-2.5 shrink-0">
                  <img
                    src={`https://flagcdn.com/w80/${country.code}.png`}
                    alt={`${country.name} Flag`}
                    className="w-full h-full object-cover select-none"
                    loading="lazy"
                  />
                </div>
                <span className="font-display font-black text-[10px] sm:text-xs text-gray-800 tracking-wider uppercase leading-snug">
                  {country.name}
                </span>
              </div>

              {/* Bottom Gradient Tag Badge matching Screenshot */}
              <div className="w-full mt-2 py-2 px-1 text-center rounded-xl bg-gradient-to-r from-[#B22222] via-[#8B1A1A] to-[#1E3A8A] text-white font-display font-black text-[9px] sm:text-[10px] tracking-wider uppercase shadow-xs">
                {country.market}
              </div>
            </div>
          ))}
        </div>

        {/* Export Capabilities Strip */}
        <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#B22222]/10 border border-[#B22222]/20 flex items-center justify-center text-[#B22222] shrink-0">
                <Ship size={20} />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-xs sm:text-sm text-gray-900 uppercase tracking-wider">
                  Sea & Air Freight
                </h3>
                <p className="font-body text-xs text-gray-600 mt-0.5">
                  FOB, CIF, CFR terms from Nhava Sheva (JNPT) & Mumbai Port.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#B22222]/10 border border-[#B22222]/20 flex items-center justify-center text-[#B22222] shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-xs sm:text-sm text-gray-900 uppercase tracking-wider">
                  100% Export Documentation
                </h3>
                <p className="font-body text-xs text-gray-600 mt-0.5">
                  CT3, ARE4, Certificate of Origin, and SGS/TUV reports.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#B22222]/10 border border-[#B22222]/20 flex items-center justify-center text-[#B22222] shrink-0">
                <Plane size={20} />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-xs sm:text-sm text-gray-900 uppercase tracking-wider">
                  Sea-Worthy Packaging
                </h3>
                <p className="font-body text-xs text-gray-600 mt-0.5">
                  Wooden crates, plastic shrink-wrap, and end-cap protection.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#B22222]/10 border border-[#B22222]/20 flex items-center justify-center text-[#B22222] shrink-0">
                <Globe size={20} />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-xs sm:text-sm text-gray-900 uppercase tracking-wider">
                  Global Client Desk
                </h3>
                <p className="font-body text-xs text-gray-600 mt-0.5">
                  Direct international sales team responding within 1 business day.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-gray-700 font-medium text-center sm:text-left">
              Looking for custom export deliveries, volume mill discounts, or specific port freight rates?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#B22222] hover:bg-[#8B1A1A] text-white font-display font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-md transition-all shrink-0"
            >
              <span>Contact Export Desk</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
