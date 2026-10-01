import { IoLogoWhatsapp } from "react-icons/io";
import { Phone } from "lucide-react";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-3">
      {/* Call Button - Blue color as requested */}
      <a
        href="tel:+917073875529"
        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group relative border-2 border-white"
        aria-label="Call Nagraj Sales"
      >
        <Phone size={22} className="text-white shrink-0" strokeWidth={2.2} />

        {/* Tooltip for Call (hidden on mobile) */}
        <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-950 text-white border border-gray-800 text-xs font-display font-bold uppercase tracking-wider rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
          Call Sales
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-gray-950" />
        </div>

        {/* Ping animation in blue */}
        <div className="absolute inset-0 rounded-full border-2 border-[#38BDF8] animate-ping opacity-30 pointer-events-none" />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917073875529"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group relative border-2 border-white"
        aria-label="Chat with us on WhatsApp"
      >
        <IoLogoWhatsapp size={28} className="fill-white shrink-0" />

        {/* Tooltip for WhatsApp (hidden on mobile) */}
        <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-950 text-white border border-gray-800 text-xs font-display font-bold uppercase tracking-wider rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
          WhatsApp RFQ
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-gray-950" />
        </div>

        {/* Ping animation for WhatsApp */}
        <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-30 pointer-events-none" />
      </a>
    </div>
  );
}

