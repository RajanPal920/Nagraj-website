import { PageHero } from "../components/PageHero";
import { Award, Download, Eye, FileCheck2, X } from "lucide-react";
import { useState } from "react";

// Certificate data - Only Udyam Certificate
const certificates = [
  {
    id: "udyam",
    title: "Udyam Registration",
    description: "MSME Registration Certificate",
    icon: Award,
    image: "/images/certificates/udyam.png",
    file: "/certificates/udyam.pdf",
    registrationNumber: "UDYAM-MH-XX-00-0000000",
  },
];

export function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  return (
    <>
      <title>Certificates | Nagraj Metal Industries</title>
      <meta
        name="description"
        content="View Nagraj Metal Industries' Udyam Registration certificate for MSME."
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        id="certificates-hero"
        label="Our Certificate"
        title={
          <>
            Udyam <span className="text-brand-red">Registered</span>
          </>
        }
        description="Nagraj Metal Industries is registered under the Udyam Registration portal for Micro, Small & Medium Enterprises."
        bgImage="/images/certificate.jpg"
      />

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-xl px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="text-center mb-10 sm:mb-14">
            <p className="section-label text-brand-red text-xs sm:text-sm">
              Certificate
            </p>
            <h2 className="section-title text-brand-charcoal mx-auto text-2xl sm:text-3xl md:text-4xl">
              Our <span className="text-brand-red">Registration</span>
            </h2>
            <div className="section-divider mx-auto bg-brand-red w-12 sm:w-16" />
            <p className="font-body text-gray-500 text-sm sm:text-base max-w-xl mx-auto px-4">
              Nagraj Metal Industries is officially registered under the Udyam
              portal, recognized as a Micro, Small & Medium Enterprise.
            </p>
          </div>

          {/* Certificate Card */}
          <div className="max-w-2xl mx-auto px-4 sm:px-0">
            {certificates.map((cert) => {
              const Icon = cert.icon;
              return (
                <div
                  key={cert.id}
                  className="bg-gray-50 border border-gray-200 rounded-sm p-6 sm:p-8 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-sm bg-brand-red/10 flex items-center justify-center group-hover:bg-brand-red transition-colors duration-300 flex-shrink-0">
                      <Icon
                        size={32}
                        className="text-brand-red group-hover:text-white transition-colors duration-300"
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="font-display font-bold text-brand-charcoal text-xl sm:text-2xl">
                        {cert.title}
                      </h3>
                      <p className="font-body text-gray-500 text-sm">
                        {cert.description}
                      </p>
                    </div>
                  </div>

                  {/* Registration Number */}
                  <div className="bg-white rounded-sm border border-gray-200 p-4 mb-6">
                    <p className="font-body text-xs text-gray-400 uppercase tracking-wider mb-1">
                      Registration Number
                    </p>
                    <p className="font-display font-bold text-brand-charcoal text-base sm:text-lg break-all">
                      {cert.registrationNumber}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      onClick={() => setSelectedCert(cert.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-display font-bold px-6 py-3 rounded-sm transition-all duration-200 text-sm sm:text-base"
                    >
                      <Eye size={18} />
                      View Certificate
                    </button>
                    <a
                      href={cert.file}
                      download
                      className="flex-1 flex items-center justify-center gap-2 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-display font-bold px-6 py-3 rounded-sm transition-all duration-200 text-sm sm:text-base"
                    >
                      <Download size={18} />
                      Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Certificate Modal */}
          {selectedCert && (
            <div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCert(null)}
            >
              <div
                className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-auto p-4 sm:p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-brand-charcoal">
                    {certificates.find((c) => c.id === selectedCert)?.title}
                  </h3>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="bg-gray-100 rounded-sm p-4 flex items-center justify-center min-h-[250px] sm:min-h-[300px]">
                  <img
                    src={certificates.find((c) => c.id === selectedCert)?.image}
                    alt={certificates.find((c) => c.id === selectedCert)?.title}
                    className="max-w-full max-h-[400px] sm:max-h-[500px] object-contain"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Crect width='400' height='500' fill='%23f3f4f6'/%3E%3Ctext x='200' y='250' font-family='sans-serif' font-size='18' fill='%239ca3af' text-anchor='middle'%3EUdyam Certificate%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <a
                    href={certificates.find((c) => c.id === selectedCert)?.file}
                    download
                    className="bg-brand-red hover:bg-brand-red-dark text-white font-display font-bold px-4 sm:px-6 py-2 sm:py-2.5 rounded-sm transition-all duration-200 flex items-center gap-2 text-sm sm:text-base"
                  >
                    <Download size={16} />
                    Download Certificate
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="mt-12 sm:mt-16 bg-gray-50 rounded-sm border border-gray-200 p-6 sm:p-8 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <FileCheck2
                size={24}
                className="text-brand-red flex-shrink-0 mt-1"
              />
              <div>
                <h3 className="font-display font-bold text-brand-charcoal text-lg mb-2">
                  Udyam Registered MSME
                </h3>
                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  Nagraj Metal Industries is officially registered under the
                  Udyam Registration portal, recognized as a Micro, Small &
                  Medium Enterprise by the Government of India. This
                  registration validates our commitment to quality and
                  compliance with government regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Badge ──────────────────────────────────────────────────── */}
      <section className="bg-brand-red py-12 sm:py-16">
        <div className="container-xl px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
                Udyam
              </div>
              <p className="font-body text-white/70 text-xs sm:text-sm">
                Registered MSME
              </p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
                ✓
              </div>
              <p className="font-body text-white/70 text-xs sm:text-sm">
                Government Approved
              </p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
                ✓
              </div>
              <p className="font-body text-white/70 text-xs sm:text-sm">
                Quality Compliant
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
