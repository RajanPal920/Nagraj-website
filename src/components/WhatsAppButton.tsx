import { IoLogoWhatsapp } from "react-icons/io";
import { Phone } from "lucide-react";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Call Button */}
      <a
        href="tel:+917073875529"
        className="flex items-center justify-center w-14 h-14 bg-[#4475df] text-white rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 group relative"
        aria-label="Call us"
      >
        <Phone size={24} strokeWidth={2} />

        {/* Tooltip for Call */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-brand-charcoal text-white text-xs font-body font-medium rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md">
          Call Now
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-brand-charcoal" />
        </div>

        {/* Ping animation */}
        <div className="absolute inset-0 z-[-1] rounded-full border-2 border-[#4FC3F7] opacity-75" />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917073875529"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 group relative"
        aria-label="Chat with us on WhatsApp"
      >
        <IoLogoWhatsapp size={28} className="fill-white text-[#25D366]" />

        {/* Tooltip for WhatsApp */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-brand-charcoal text-white text-xs font-body font-medium rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md">
          Chat with Sales
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-brand-charcoal" />
        </div>

        {/* Ping animation for WhatsApp */}
        <div className="absolute inset-0 z-[-1] rounded-full border-2 border-[#25D366] opacity-75" />
      </a>
    </div>
  );
}
