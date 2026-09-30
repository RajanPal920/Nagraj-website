import { IoLogoWhatsapp } from "react-icons/io";
import { Phone } from "lucide-react";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Call Button */}
      <a
        href="tel:+917073875529"
        className="flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-[#8B1A1A] hover:bg-[#6F1414] text-white rounded-full shadow-xl hover:scale-105 transition-all duration-300 group relative border border-white/20"
        aria-label="Call Nagraj Sales"
      >
        <Phone size={22} strokeWidth={2} />

        {/* Tooltip for Call */}
        <div className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-950 text-white border border-gray-800 text-xs font-display font-bold uppercase tracking-wider rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
          Call Sales
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-gray-950" />
        </div>

        {/* Ping animation */}
        <div className="absolute inset-0 rounded-full border-2 border-[#B22222] animate-ping opacity-25 pointer-events-none" />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917073875529"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full shadow-xl hover:scale-105 transition-all duration-300 group relative border border-white/20"
        aria-label="Chat with us on WhatsApp"
      >
        <IoLogoWhatsapp size={28} className="fill-white" />

        {/* Tooltip for WhatsApp */}
        <div className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-950 text-white border border-gray-800 text-xs font-display font-bold uppercase tracking-wider rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
          WhatsApp RFQ
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-gray-950" />
        </div>

        {/* Ping animation for WhatsApp */}
        <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-25 pointer-events-none" />
      </a>
    </div>
  );
}

