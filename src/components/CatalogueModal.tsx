// src/components/CatalogueModal.tsx
import { useState } from "react";
import {
  FileText,
  Download,
  Building2,
  X,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Package,
} from "lucide-react";
import {
  downloadCompanyCatalogue,
  downloadProductCatalogue,
} from "../utils/catalogueGenerator";
import { IoLogoWhatsapp } from "react-icons/io";

interface CatalogueModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "all" | "company" | "product";
}

export function CatalogueModal({
  isOpen,
  onClose,
}: CatalogueModalProps) {
  const [downloadingCompany, setDownloadingCompany] = useState(false);
  const [downloadingProduct, setDownloadingProduct] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadCompany = () => {
    try {
      setDownloadingCompany(true);
      downloadCompanyCatalogue();
      setSuccessMsg("Company Catalogue downloaded successfully!");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (e) {
      console.error(e);
    } finally {
      setDownloadingCompany(false);
    }
  };

  const handleDownloadProduct = () => {
    try {
      setDownloadingProduct(true);
      downloadProductCatalogue();
      setSuccessMsg("Product Catalogue downloaded successfully!");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (e) {
      console.error(e);
    } finally {
      setDownloadingProduct(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-slideDown">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-gray-950 via-[#1A1A1A] to-[#250d0d] px-6 py-5 text-white border-b border-[#8B1A1A]/40">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B1A1A] via-[#C9A84C] to-[#8B1A1A]" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8B1A1A]/30 border border-[#8B1A1A]/50 flex items-center justify-center text-[#D43A3A]">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C9A84C]">
                  Official Publications
                </p>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
                  Download Company & Product Catalogues
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Success toast if any */}
        {successMsg && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 flex items-center gap-2 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-body">
            Get instant access to our official, ISO 9001:2015 verified documentation. Choose the specific catalogue you need below or request customized specification sheets.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card 1: Company Catalogue */}
            <div className="group rounded-xl border-2 border-gray-200 hover:border-[#8B1A1A] p-5 transition-all duration-300 bg-gradient-to-b from-white to-gray-50 flex flex-col justify-between hover:shadow-lg hover:-translate-y-0.5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#8B1A1A]/10 text-[#8B1A1A] flex items-center justify-center">
                    <Building2 size={20} strokeWidth={2} />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    Corporate Profile
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-gray-900 group-hover:text-[#8B1A1A] transition-colors mb-1.5">
                  Company Catalogue
                </h4>
                <p className="font-body text-xs text-gray-500 leading-relaxed mb-4">
                  Corporate profile, leadership background, Mumbai & Pune warehousing facilities, MSME Udyam registration, and client sectors.
                </p>
                <div className="space-y-1 mb-4 text-[11px] text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-[#8B1A1A]" />
                    <span>ISO 9001:2015 Certified Credentials</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-[#8B1A1A]" />
                    <span>Pan-India Supply & Export Network</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownloadCompany}
                disabled={downloadingCompany}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 to-gray-950 hover:from-[#8B1A1A] hover:to-[#6F1414] text-white font-display font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                <Download size={14} />
                <span>{downloadingCompany ? "Generating PDF..." : "Download Company Catalogue"}</span>
              </button>
            </div>

            {/* Card 2: Product Catalogue */}
            <div className="group rounded-xl border-2 border-gray-200 hover:border-[#8B1A1A] p-5 transition-all duration-300 bg-gradient-to-b from-white to-gray-50 flex flex-col justify-between hover:shadow-lg hover:-translate-y-0.5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#8B1A1A]/10 text-[#8B1A1A] flex items-center justify-center">
                    <Package size={20} strokeWidth={2} />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#8B1A1A] bg-[#8B1A1A]/10 px-2 py-0.5 rounded">
                    Full Portfolio
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-gray-900 group-hover:text-[#8B1A1A] transition-colors mb-1.5">
                  Product Catalogue
                </h4>
                <p className="font-body text-xs text-gray-500 leading-relaxed mb-4">
                  Comprehensive catalogue of pipes, sheets, round bars, flanges, fasteners, fittings, and full metallurgical grade specifications.
                </p>
                <div className="space-y-1 mb-4 text-[11px] text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-[#8B1A1A]" />
                    <span>Stainless, Alloy, Inconel & Duplex Grades</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-[#8B1A1A]" />
                    <span>ASTM, ASME, DIN, ISO Dimensions</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownloadProduct}
                disabled={downloadingProduct}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#8B1A1A] hover:bg-[#6F1414] text-white font-display font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                <Download size={14} />
                <span>{downloadingProduct ? "Generating PDF..." : "Download Product Catalogue"}</span>
              </button>
            </div>
          </div>

          {/* Quick WhatsApp assistance banner */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-gray-700">
              <IoLogoWhatsapp size={20} className="text-emerald-600 shrink-0" />
              <span>Need custom size cut-sheets or physical printed catalogues?</span>
            </div>
            <a
              href="https://wa.me/917073875529?text=Hello%20Nagraj%20Metal%20Industries%2C%20please%20send%20me%20your%20Company%20and%20Product%20Catalogues."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800 transition-colors uppercase tracking-wider text-[11px] shrink-0"
            >
              <span>Chat on WhatsApp</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
