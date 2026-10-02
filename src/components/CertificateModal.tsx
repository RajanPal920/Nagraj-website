import { useEffect } from "react";
import { X, Download, ExternalLink, ShieldCheck } from "lucide-react";

export interface CertificateDoc {
  id: string;
  title: string;
  category: string;
  icon: typeof ShieldCheck;
  image: string;
  pdfUrl?: string;
  regNo?: string;
  description: string;
}

export const CERTIFICATE_DOCUMENTS: CertificateDoc[] = [
  {
    id: "iso",
    title: "ISO 9001:2015 Certification",
    category: "Quality Management System",
    icon: ShieldCheck,
    image: "/certificates/udyam.jpg", // Using udyam.jpg as fallback if iso image isn't available
    pdfUrl: "/certificates/nagraj-iso.pdf",
    regNo: "ISO-9001-2015",
    description:
      "Quality Management System Certification for Manufacturing & Supply.",
  },
  {
    id: "udyam",
    title: "Udyam Registration Certificate (MSME)",
    category: "Ministry of MSME · Govt. of India",
    icon: ShieldCheck,
    image: "/certificates/udyam.jpg",
    pdfUrl: "/certificates/nagraj-udyam.pdf",
    regNo: "UDYAM-MH-19-0231528",
    description:
      "Official Micro, Small & Medium Enterprise registration under Ministry of MSME, Govt. of India. Office located in Girgaon, Mumbai.",
  },
];

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateDoc | null;
}

export function CertificateModal({
  isOpen,
  onClose,
  certificate,
}: CertificateModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !certificate) return null;

  const Icon = certificate.icon;

  const handleView = () => {
    const fileUrl = certificate.pdfUrl || certificate.image;
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownload = () => {
    const fileUrl = certificate.pdfUrl || certificate.image;
    const win = window.open(fileUrl, "_blank", "noopener,noreferrer");
    if (!win) {
      window.location.href = fileUrl;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[100] overflow-y-auto p-4 sm:p-6 flex flex-col justify-center items-center transition-all duration-300 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-auto flex flex-col max-h-[92vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="shrink-0 bg-white border-b border-gray-200 px-5 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Icon size={22} className="text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B22222] font-display">
                  {certificate.category}
                </span>
                <span className="text-[10px] bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-full border border-green-200">
                  Active & Validated
                </span>
              </div>
              <h3 className="font-display font-extrabold text-sm sm:text-base text-gray-900 leading-tight">
                {certificate.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-xl transition-colors shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Certificate Image Canvas */}
        <div
          onClick={handleView}
          className="shrink min-h-0 bg-gray-100/90 p-4 sm:p-6 overflow-y-auto flex items-center justify-center cursor-pointer group/img"
          title="Click to open certificate in new tab"
        >
          <div className="relative bg-white rounded-xl shadow-md border border-gray-200 p-2 max-w-full group-hover/img:shadow-lg transition-shadow">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="max-h-[50vh] sm:max-h-[55vh] w-auto max-w-full object-contain rounded-lg select-none"
            />
          </div>
        </div>

        {/* Footer Details & Actions */}
        <div className="shrink-0 px-5 sm:px-6 py-3.5 bg-white border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            {certificate.regNo && (
              <p className="text-xs font-mono font-bold text-gray-900">
                Reg Identifier:{" "}
                <span className="text-[#B22222] font-semibold">{certificate.regNo}</span>
              </p>
            )}
            <p className="text-[11px] text-gray-500 font-body">
              {certificate.description}
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handleView}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-gray-300 hover:border-[#8B1A1A] hover:bg-gray-50 text-xs font-semibold text-gray-800 transition-colors cursor-pointer"
            >
              <span>Open in New Tab</span>
              <ExternalLink size={13} />
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-1.5 bg-[#B22222] hover:bg-[#8B1A1A] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              <Download size={14} />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
