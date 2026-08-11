import { useState } from "react";
import { PageHero } from "../components/PageHero";
import {
  Beaker,
  Gauge,
  FileText,
  ChevronRight,
  ChevronDown,
  Download,
  Table,
  BookOpen,
  Flame,
  Layers,
} from "lucide-react";

// Technical Data Sections
const technicalSections = [
  {
    id: "chemical-composition",
    title: "Chemical Composition",
    icon: Beaker,
    description: "Chemical composition of various steel grades and alloys",
    subsections: [
      {
        id: "ss-300-series",
        title: "Stainless Steel 300 Series",
        data: [
          {
            grade: "SS 304",
            c: "0.08",
            mn: "2.00",
            si: "0.75",
            cr: "18.0-20.0",
            ni: "8.0-10.5",
          },
          {
            grade: "SS 304L",
            c: "0.03",
            mn: "2.00",
            si: "0.75",
            cr: "18.0-20.0",
            ni: "8.0-12.0",
          },
          {
            grade: "SS 316",
            c: "0.08",
            mn: "2.00",
            si: "0.75",
            cr: "16.0-18.0",
            ni: "10.0-14.0",
            mo: "2.0-3.0",
          },
          {
            grade: "SS 316L",
            c: "0.03",
            mn: "2.00",
            si: "0.75",
            cr: "16.0-18.0",
            ni: "10.0-14.0",
            mo: "2.0-3.0",
          },
          {
            grade: "SS 321",
            c: "0.08",
            mn: "2.00",
            si: "0.75",
            cr: "17.0-19.0",
            ni: "9.0-12.0",
            ti: "5(C+N)",
          },
          {
            grade: "SS 347",
            c: "0.08",
            mn: "2.00",
            si: "0.75",
            cr: "17.0-19.0",
            ni: "9.0-12.0",
            nb: "10(C+N)",
          },
        ],
      },
      {
        id: "ss-200-series",
        title: "Stainless Steel 200 Series",
        data: [
          {
            grade: "SS 201",
            c: "0.15",
            mn: "5.50-7.50",
            si: "0.75",
            cr: "16.0-18.0",
            ni: "3.5-5.5",
            n: "0.25",
          },
          {
            grade: "SS 202",
            c: "0.15",
            mn: "7.50-10.0",
            si: "0.75",
            cr: "17.0-19.0",
            ni: "4.0-6.0",
            n: "0.25",
          },
          {
            grade: "SS 205",
            c: "0.12-0.25",
            mn: "14.0-15.5",
            si: "0.75",
            cr: "16.5-18.0",
            ni: "1.0-1.7",
            n: "0.32-0.40",
          },
        ],
      },
      {
        id: "carbon-steel",
        title: "Carbon Steel Composition",
        data: [
          {
            grade: "AISI 1018",
            c: "0.15-0.20",
            mn: "0.60-0.90",
            si: "0.15-0.35",
            p: "0.04",
            s: "0.05",
          },
          {
            grade: "AISI 1020",
            c: "0.18-0.23",
            mn: "0.30-0.60",
            si: "0.15-0.35",
            p: "0.04",
            s: "0.05",
          },
          {
            grade: "AISI 1045",
            c: "0.43-0.50",
            mn: "0.60-0.90",
            si: "0.15-0.35",
            p: "0.04",
            s: "0.05",
          },
          {
            grade: "AISI 1060",
            c: "0.55-0.65",
            mn: "0.60-0.90",
            si: "0.15-0.35",
            p: "0.04",
            s: "0.05",
          },
        ],
      },
    ],
  },
  {
    id: "pipe-specifications",
    title: "Pipe Specifications",
    icon: Layers,
    description: "Stainless Steel & Carbon Steel Pipe Specifications",
    subsections: [
      {
        id: "ss-pipe-spec",
        title: "Stainless Steel Pipe Specifications",
        data: [
          {
            standard: "ASTM A312",
            description: "Seamless and Welded Stainless Steel Pipe",
            grades: "TP304, TP304L, TP316, TP316L",
          },
          {
            standard: "ASTM A213",
            description:
              "Seamless Ferritic and Austenitic Alloy-Steel Boiler Tubes",
            grades: "TP304, TP316, TP321",
          },
          {
            standard: "ASTM A269",
            description: "Seamless and Welded Stainless Steel Tubing",
            grades: "304, 304L, 316, 316L",
          },
          {
            standard: "ASTM A249",
            description: "Welded Austenitic Steel Boiler Tubes",
            grades: "304, 316",
          },
          {
            standard: "ASTM A358",
            description: "Electric-Fusion-Welded Austenitic Steel Pipe",
            grades: "304, 304L, 316, 316L",
          },
        ],
      },
      {
        id: "carbon-pipe-spec",
        title: "Carbon & Alloy Pipe Specifications",
        data: [
          {
            standard: "ASTM A53",
            description: "Seamless and Welded Black and Galvanized Pipe",
            grades: "A, B",
          },
          {
            standard: "ASTM A106",
            description:
              "Seamless Carbon Steel Pipe for High-Temperature Service",
            grades: "A, B, C",
          },
          {
            standard: "ASTM A333",
            description:
              "Seamless and Welded Steel Pipe for Low-Temperature Service",
            grades: "Grade 6, Grade 3",
          },
          {
            standard: "ASTM A335",
            description:
              "Seamless Ferritic Alloy-Steel Pipe for High-Temperature Service",
            grades: "P5, P9, P11, P22",
          },
          {
            standard: "ASTM A519",
            description: "Seamless Carbon and Alloy Steel Mechanical Tubing",
            grades: "1018, 1020, 4140",
          },
        ],
      },
    ],
  },
  {
    id: "ams-standards",
    title: "AMS Standard Materials",
    icon: BookOpen,
    description: "Aerospace Material Specifications (AMS) standards",
    subsections: [
      {
        id: "ams-standards-list",
        title: "AMS Standards List",
        data: [
          {
            standard: "AMS 5596",
            description: "Nickel Alloy Corrosion and Heat Resistant",
            material: "Inconel 625",
          },
          {
            standard: "AMS 5662",
            description: "Nickel Alloy Corrosion and Heat Resistant",
            material: "Inconel 718",
          },
          {
            standard: "AMS 5536",
            description: "Nickel Alloy Corrosion and Heat Resistant",
            material: "Hastelloy X",
          },
          {
            standard: "AMS 5750",
            description: "Cobalt Alloy Corrosion and Heat Resistant",
            material: "L-605",
          },
          {
            standard: "AMS 5643",
            description: "Stainless Steel Corrosion and Heat Resistant",
            material: "17-4PH",
          },
          {
            standard: "AMS 5659",
            description: "Stainless Steel Corrosion and Heat Resistant",
            material: "15-5PH",
          },
        ],
      },
    ],
  },
];

export function TechnicalInfoPage() {
  const [openSections, setOpenSections] = useState<string[]>([
    "chemical-composition",
  ]);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  return (
    <>
      <title>Technical Information | Nagraj Metal Industries</title>
      <meta
        name="description"
        content="Technical information including chemical composition, pipe specifications, and AMS standards from Nagraj Metal Industries."
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        id="technical-hero"
        label="Technical Info"
        title={
          <>
            Technical <span className="text-brand-red">Specifications</span>
          </>
        }
        description="Access detailed technical information including chemical composition, pipe specifications, and AMS standards for various materials."
        bgImage="/images/tech.jpg"
      />

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-14">
            <p className="section-label text-brand-red">Technical Data</p>
            <h2 className="section-title text-brand-charcoal mx-auto">
              Material <span className="text-brand-red">Specifications</span>
            </h2>
            <div className="section-divider mx-auto bg-brand-red" />
            <p className="font-body text-gray-500 text-base max-w-xl mx-auto">
              Browse through our comprehensive technical data including chemical
              compositions, pipe specifications, and AMS standards.
            </p>
          </div>

          {/* Technical Sections */}
          <div className="max-w-5xl mx-auto space-y-6">
            {technicalSections.map((section) => {
              const isOpen = openSections.includes(section.id);
              const Icon = section.icon;

              return (
                <div
                  key={section.id}
                  className="bg-gray-50 rounded-sm border border-gray-200 overflow-hidden"
                >
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-6 hover:bg-gray-100 transition-colors duration-200 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-sm bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-brand-red" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-brand-charcoal text-lg">
                          {section.title}
                        </h3>
                        <p className="font-body text-gray-500 text-sm">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronDown size={20} className="text-gray-400" />
                    ) : (
                      <ChevronRight size={20} className="text-gray-400" />
                    )}
                  </button>

                  {/* Section Content */}
                  {isOpen && (
                    <div className="p-6 pt-0 border-t border-gray-200">
                      {section.subsections.map((subsection) => (
                        <div key={subsection.id} className="mb-8 last:mb-0">
                          <h4 className="font-display font-bold text-brand-red text-sm uppercase tracking-wider mb-4">
                            {subsection.title}
                          </h4>
                          <div className="overflow-x-auto rounded-sm border border-gray-200">
                            <table className="w-full text-sm font-body">
                              <thead className="bg-brand-red text-white">
                                <tr>
                                  {Object.keys(subsection.data[0] || {}).map(
                                    (key) => (
                                      <th
                                        key={key}
                                        className="px-4 py-3 text-left font-display font-bold text-xs uppercase tracking-wider"
                                      >
                                        {key.charAt(0).toUpperCase() +
                                          key.slice(1)}
                                      </th>
                                    ),
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                {subsection.data.map((row, index) => (
                                  <tr
                                    key={index}
                                    className={
                                      index % 2 === 0
                                        ? "bg-white"
                                        : "bg-gray-50"
                                    }
                                  >
                                    {Object.values(row).map(
                                      (value, colIndex) => (
                                        <td
                                          key={colIndex}
                                          className="px-4 py-2.5 text-gray-700 text-xs"
                                        >
                                          {value}
                                        </td>
                                      ),
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Download Section */}
          <div className="mt-16 bg-brand-red/5 border border-brand-red/20 rounded-sm p-8 max-w-3xl mx-auto text-center">
            <FileText size={32} className="text-brand-red mx-auto mb-4" />
            <h3 className="font-display font-bold text-brand-charcoal text-xl mb-2">
              Need Complete Technical Data?
            </h3>
            <p className="font-body text-gray-600 text-sm mb-6">
              Download our comprehensive technical data sheets or contact us for
              specific material specifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/technical-data-sheets.pdf"
                download
                className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-display font-bold px-6 py-2.5 rounded-sm transition-all duration-200"
              >
                <Download size={16} />
                Download Data Sheets
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-display font-bold px-6 py-2.5 rounded-sm transition-all duration-200"
              >
                Contact for More Info
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
