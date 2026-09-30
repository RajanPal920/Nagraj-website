import {
  Award,
  Download,
  Eye,
  X,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Check,
  MapPin,
  FileCheck2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { downloadCompanyCatalogue } from "../utils/catalogueGenerator";

// Certificate data - Official Government Document
const certificates = [
  {
    id: "udyam",
    title: "Udyam Registration Certificate (MSME)",
    description: "Ministry of Micro, Small & Medium Enterprises (Govt. of India)",
    icon: ShieldCheck,
    image: "/certificates/udyam.jpg",
    registrationNumber: "UDYAM-MH-19-0231528",
    enterpriseName: "NAGRAJ METAL INDUSTRIES",
    enterpriseType: "Micro Enterprise",
    majorActivity: "Manufacturing & Supply of Metal Raw Materials",
    dateOfRegistration: "10/08/2023",
    registeredAddress:
      "Plot-2, Jalaram Niwas, Durgadevi Udyan, Office No. 1, 1st Floor, 1st Kumbharwada, Bhandari Street, Girgaon, Mumbai – 400 004, Maharashtra",
  },
];

export function CertificatesPage() {
  const [searchParams] = useSearchParams();
  const certParam = searchParams.get("cert");
  const [selectedCert, setSelectedCert] = useState<string | null>(
    certParam || null,
  );

  useEffect(() => {
    if (certParam) {
      setSelectedCert(certParam);
    }
  }, [certParam]);

  // Function to download certificate image
  const downloadCertificate = (imageUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${fileName}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <title>Official Udyam Certificate & Accreditation | Nagraj Metal Industries</title>
      <meta
        name="description"
        content="View Nagraj Metal Industries' official Udyam MSME Registration Certificate (UDYAM-MH-19-0231528) and quality compliance credentials."
      />

      {/* ─── Standardized Hero (Desktop: Full Width Clear Image + Floating Navy Glass Card | Mobile: Top Image Card + Clean Stacked Content) ─── */}
      <section
        id="certificates-hero"
        className="relative pt-24 overflow-hidden"
        aria-label="Certificates - Nagraj Metal Industries"
      >
        {/* DESKTOP HERO (hidden on mobile, block on lg+) */}
        <div className="hidden lg:block relative w-full h-[540px] xl:h-[580px] overflow-hidden select-none">
          {/* Crystal Clear Industrial Background Image */}
          <img
            src="/images/certificate.jpg"
            alt="Nagraj Metal Industries Official Accreditation"
            className="absolute inset-0 w-full h-full object-cover object-center select-none"
            loading="eager"
          />

          {/* Floating Navy/Slate Glassmorphic Card on Left */}
          <div className="relative max-w-7xl mx-auto h-full px-8 xl:px-12 flex items-center z-10">
            <div className="bg-gradient-to-br from-[#2a2a2a]/55 via-[#1f1f1f]/47 to-[#0f0f0f] backdrop-blur-xl rounded-3xl p-8 sm:p-10 lg:p-11 border border-white/20 shadow-2xl max-w-xl xl:max-w-2xl text-white transition-all duration-300">
              {/* Tag / Breadcrumb */}
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="w-6 h-[2px] bg-[#E63946]" />
                <span className="text-xs font-mono font-bold tracking-[0.25em] text-white/90 uppercase">
                  GOVT OF INDIA ACCREDITED • UDYAM MSME
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold text-white tracking-tight leading-[1.14] mb-4">
                Company Accreditations
                <span className="block text-[#E63946] mt-1">
                  100% Validated & Compliant.
                </span>
              </h1>

              {/* Description */}
              <p className="text-white/85 text-sm sm:text-[15px] leading-relaxed mb-6 font-body max-w-lg">
                Nagraj Metal Industries is officially registered with the Ministry of Micro, Small & Medium Enterprises (Government of India) with complete material traceability and 100% mill test certification.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3.5 mb-6">
                <a
                  href="#certificates-main"
                  className="inline-flex items-center justify-center gap-2 bg-[#B22222] hover:bg-[#8B1A1A] text-white font-display font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>View Official Document</span>
                  <span>→</span>
                </a>
                <button
                  onClick={() => downloadCompanyCatalogue()}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl border border-white/30 backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Download size={14} />
                  <span>Company Profile</span>
                </button>
              </div>

              {/* Feature Badges Row */}
              <div className="flex items-center gap-4 sm:gap-6 pt-4 border-t border-white/15 text-xs sm:text-sm text-white/95 font-medium flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                    ✓
                  </span>
                  <span>Udyam Registered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                    ✓
                  </span>
                  <span>100% MTC Backed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                    ✓
                  </span>
                  <span>Mumbai Operations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE HERO (block on mobile, hidden on lg+) */}
        <div className="block lg:hidden w-full bg-white pb-6">
          {/* Certificate Image at Top: Clean, Complete & Completely Visible */}
          <div className="px-4 pt-3 pb-3">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
              <img
                src="/images/certificate.jpg"
                alt="Nagraj Metal Industries Official Accreditation"
                className="w-full h-auto object-cover select-none"
                loading="eager"
              />
            </div>
          </div>

          {/* Content Below Photo */}
          <div className="px-5 pt-1">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#fdf0f0] border border-[#f5c6cb] px-3.5 py-1 rounded-full mb-3 text-gray-800">
              <Award size={13} className="text-[#B22222] shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-wider font-display">
                GOVT. OF INDIA MSME ACCREDITED
              </span>
            </div>

            {/* Subtitle Uppercase Tracker */}
            <p className="text-[#B22222] font-display font-bold text-[10px] uppercase tracking-wider mb-1.5">
              OFFICIAL REGISTRATION · COMPLETE TRACEABILITY
            </p>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold leading-[1.15] mb-3">
              <span className="text-[#B22222] block tracking-tight">OFFICIAL</span>
              <span className="text-gray-900 tracking-tight">Accreditation & Compliance</span>
            </h1>

            {/* Paragraph Text */}
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4 font-body">
              Nagraj Metal Industries is officially registered under the Udyam portal by the Ministry of MSME, Government of India, operating with verified GST documentation and complete material traceability.
            </p>

            {/* 2-Column Checkmarks Grid */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 mb-4 text-[11px] sm:text-xs text-gray-800 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">
                  ✓
                </span>
                <span>Udyam MSME Registered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">
                  ✓
                </span>
                <span>100% MTC Backed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">
                  ✓
                </span>
                <span>Govt. Approved Lab Tested</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">
                  ✓
                </span>
                <span>Mumbai Jurisdiction</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-4 text-xs text-gray-700 font-medium mb-5">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#B22222] shrink-0" />
                <span>UDYAM-MH-19-0231528</span>
              </div>
            </div>

            {/* Big Red Full-Width CTA */}
            <a
              href="#certificates-main"
              className="w-full bg-[#B22222] hover:bg-[#8B1A1A] text-white py-3.5 sm:py-4 px-6 rounded-2xl font-display font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>View Certificate</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <section id="certificates-main" className="section-padding bg-gray-50/70">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 mb-2 bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 px-3.5 py-1 rounded-full">
              <Award size={14} className="text-[#8B1A1A]" />
              <span className="text-[11px] font-bold text-[#8B1A1A] uppercase tracking-widest">
                Government Accreditation
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-950 mb-3 tracking-tight">
              Official <span className="text-[#8B1A1A]">Registration</span>
            </h2>
            <div className="w-16 h-1 bg-[#8B1A1A] mx-auto mb-4 rounded-full" />
            <p className="font-body text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Nagraj Metal Industries is officially registered under the Udyam portal, recognized as a Micro, Small & Medium Enterprise by the Ministry of MSME, Government of India.
            </p>
          </div>

          {/* Certificate Showcase Cards */}
          <div className="max-w-3xl mx-auto space-y-8">
            {certificates.map((cert) => {
              const Icon = cert.icon;
              return (
                <div
                  key={cert.id}
                  id={`cert-${cert.id}`}
                  className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-9 shadow-xl hover:shadow-2xl transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8B1A1A] via-[#B22222] to-[#6F1414]" />

                  {/* Header info */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 text-center sm:text-left">
                    <div className="w-16 h-16 rounded-2xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center group-hover:bg-[#8B1A1A] transition-all duration-300 shrink-0">
                      <Icon
                        size={32}
                        className="text-[#8B1A1A] group-hover:text-white transition-colors duration-300"
                        strokeWidth={1.8}
                      />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full text-green-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                        <Check size={11} strokeWidth={3} />
                        Active & Validated
                      </div>
                      <h3 className="font-display font-extrabold text-2xl text-gray-900 group-hover:text-[#8B1A1A] transition-colors">
                        {cert.title}
                      </h3>
                      <p className="font-body text-gray-500 text-sm mt-0.5">
                        {cert.description}
                      </p>
                    </div>
                  </div>

                  {/* Detailed Metadata Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <div className="bg-gray-50 rounded-xl border border-gray-200/80 p-3.5">
                      <p className="font-body text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        Registration Identifier
                      </p>
                      <p className="font-mono font-bold text-[#8B1A1A] text-base sm:text-lg break-all">
                        {cert.registrationNumber}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl border border-gray-200/80 p-3.5">
                      <p className="font-body text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        Enterprise Classification
                      </p>
                      <p className="font-display font-bold text-gray-900 text-sm sm:text-base">
                        {cert.enterpriseType} ({cert.majorActivity})
                      </p>
                    </div>
                  </div>

                  {/* Official Registered Address Card */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200/90 p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#8B1A1A]/10 flex items-center justify-center shrink-0 text-[#8B1A1A] mt-0.5">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <p className="font-body text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Official Certificate Registered Address
                        </p>
                        <p className="font-body text-gray-800 text-xs sm:text-sm leading-relaxed font-medium">
                          {cert.registeredAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visual Preview thumbnail */}
                  <div
                    onClick={() => setSelectedCert(cert.id)}
                    className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-100 mb-6 cursor-pointer group/thumb h-64 sm:h-80 flex items-center justify-center shadow-inner"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-contain p-2 group-hover/thumb:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-display font-bold text-xs uppercase tracking-wider backdrop-blur-[2px]">
                      <Eye size={18} />
                      Click to Enlarge Full Certificate
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setSelectedCert(cert.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#8B1A1A] hover:bg-[#6F1414] text-white font-display font-bold px-6 py-3.5 rounded-xl transition-all duration-300 text-xs uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <Eye size={16} />
                      View Certificate
                    </button>
                    <button
                      onClick={() =>
                        downloadCertificate(cert.image, `${cert.id}-Certificate`)
                      }
                      className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:border-[#8B1A1A] hover:bg-[#8B1A1A]/5 text-gray-800 font-display font-bold px-6 py-3.5 rounded-xl transition-all duration-300 text-xs uppercase tracking-wider hover:-translate-y-0.5"
                    >
                      <Download size={16} className="text-[#8B1A1A]" />
                      Download Document
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Certificate Modal */}
          {selectedCert && (
            <div
              className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300"
              onClick={() => setSelectedCert(null)}
            >
              <div
                className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-2.5">
                    <Award size={18} className="text-[#8B1A1A]" />
                    <h3 className="font-display font-extrabold text-base text-gray-900">
                      {certificates.find((c) => c.id === selectedCert)?.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg p-1.5 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="bg-gray-100 p-4 sm:p-6 overflow-auto flex items-center justify-center min-h-[350px] flex-1">
                  <img
                    src={certificates.find((c) => c.id === selectedCert)?.image}
                    alt={certificates.find((c) => c.id === selectedCert)?.title}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-md bg-white p-2"
                  />
                </div>
                <div className="p-4 sm:px-6 bg-white border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs text-gray-500 font-body">
                    {certificates.find((c) => c.id === selectedCert)?.description}
                  </p>
                  <button
                    onClick={() => {
                      const cert = certificates.find(
                        (c) => c.id === selectedCert,
                      );
                      if (cert) {
                        downloadCertificate(cert.image, `${cert.id}-Certificate`);
                      }
                    }}
                    className="bg-[#8B1A1A] hover:bg-[#6F1414] text-white font-display font-bold px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 text-xs uppercase tracking-wider shadow-md"
                  >
                    <Download size={15} />
                    Download File
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Compliance Assurance Grid */}
          <div className="mt-14 max-w-4xl mx-auto grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: FileCheck2,
                title: "Udyam Registered",
                desc: "Formally registered as an enterprise under the Ministry of MSME, Govt. of India.",
              },
              {
                icon: ShieldCheck,
                title: "Audit-Ready Records",
                desc: "Complete documentation with GST invoices and commercial records under Mumbai jurisdiction.",
              },
              {
                icon: CheckCircle2,
                title: "100% MTC Backed",
                desc: "Every dispatched batch includes authentic Mill Test Certificates & chemical heat analysis.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 hover:border-[#8B1A1A]/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#8B1A1A]" />
                </div>
                <h4 className="font-display font-bold text-gray-900 text-sm mb-2">
                  {title}
                </h4>
                <p className="font-body text-gray-500 text-xs leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Light Industrial Trust Strip ──────────────────────────────────── */}
      <section className="bg-white border-t border-gray-200 py-12 sm:py-16">
        <div className="container-xl px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div className="border-b sm:border-b-0 sm:border-r border-gray-200 pb-6 sm:pb-0">
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-gray-950 mb-1.5 tracking-tight">
                Udyam MSME
              </div>
              <p className="font-body text-gray-500 text-xs sm:text-sm font-medium">
                Registered Enterprise · Govt. of India
              </p>
            </div>
            <div className="border-b sm:border-b-0 sm:border-r border-gray-200 pb-6 sm:pb-0">
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-[#8B1A1A] mb-1.5 tracking-tight">
                100% Verified
              </div>
              <p className="font-body text-gray-500 text-xs sm:text-sm font-medium">
                Government Approved Status
              </p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-gray-950 mb-1.5 tracking-tight">
                ISO & MTC
              </div>
              <p className="font-body text-gray-500 text-xs sm:text-sm font-medium">
                Full Quality Compliance
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
