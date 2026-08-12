import { useState } from "react";
import { PageHero } from "../components/PageHero";
import {
  Beaker,
  ChevronRight,
  ChevronDown,
  Download,
  FileText,
  Layers,
  BookOpen,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
            mo: "—",
            ti: "—",
            nb: "—",
          },
          {
            grade: "SS 304L",
            c: "0.03",
            mn: "2.00",
            si: "0.75",
            cr: "18.0-20.0",
            ni: "8.0-12.0",
            mo: "—",
            ti: "—",
            nb: "—",
          },
          {
            grade: "SS 316",
            c: "0.08",
            mn: "2.00",
            si: "0.75",
            cr: "16.0-18.0",
            ni: "10.0-14.0",
            mo: "2.0-3.0",
            ti: "—",
            nb: "—",
          },
          {
            grade: "SS 316L",
            c: "0.03",
            mn: "2.00",
            si: "0.75",
            cr: "16.0-18.0",
            ni: "10.0-14.0",
            mo: "2.0-3.0",
            ti: "—",
            nb: "—",
          },
          {
            grade: "SS 321",
            c: "0.08",
            mn: "2.00",
            si: "0.75",
            cr: "17.0-19.0",
            ni: "9.0-12.0",
            mo: "—",
            ti: "5(C+N)",
            nb: "—",
          },
          {
            grade: "SS 347",
            c: "0.08",
            mn: "2.00",
            si: "0.75",
            cr: "17.0-19.0",
            ni: "9.0-12.0",
            mo: "—",
            ti: "—",
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
            mn: "5.5-7.5",
            p: "0.06",
            s: "0.03",
            si: "1",
            cr: "16.00-18.00",
            ni: "3.50-5.50",
            n_ppm: "2500",
            others: "—",
          },
          {
            grade: "SS 201L",
            c: "0.03",
            mn: "5.5-7.5",
            p: "0.045",
            s: "0.03",
            si: "0.75",
            cr: "16.00-18.00",
            ni: "3.50-5.50",
            n_ppm: "2500",
            others: "—",
          },
          {
            grade: "SS 201LN",
            c: "0.03",
            mn: "6.4-7.5",
            p: "0.045",
            s: "0.015",
            si: "0.75",
            cr: "16.00-17.50",
            ni: "4.00-5.00",
            n_ppm: "1000-2500",
            others: "Cu = 1.0 Max",
          },
          {
            grade: "SS 202",
            c: "0.15",
            mn: "7.5-10.0",
            p: "0.06",
            s: "0.03",
            si: "1",
            cr: "17.00-19.00",
            ni: "4.00-6.00",
            n_ppm: "2500",
            others: "—",
          },
          {
            grade: "SS 204Cu",
            c: "0.1",
            mn: "6.5-9.0",
            p: "0.06",
            s: "0.01",
            si: "0.75",
            cr: "16.00-17.50",
            ni: "1.50-3.50",
            n_ppm: "1000-2000",
            others: "Cu – 2.0-4.0",
          },
          {
            grade: "JSLAUS (J1)",
            c: "0.08",
            mn: "6.0-8.0",
            p: "0.07",
            s: "0.01",
            si: "0.75",
            cr: "16.00-18.00",
            ni: "4.00-6.00",
            n_ppm: "1000",
            others: "Cu – 1.5-2.0",
          },
          {
            grade: "SS J4",
            c: "0.1",
            mn: "8.50-10.0",
            p: "0.08",
            s: "0.01",
            si: "0.75",
            cr: "15.00-16.00",
            ni: "1.00-2.00",
            n_ppm: "2000",
            others: "Cu = 1.5-2.0",
          },
          {
            grade: "JSL U DD",
            c: "0.15(max)",
            mn: "9.7 to 10.7",
            p: "0.10(max)",
            s: "0.03(max)",
            si: "0.75(max)",
            cr: "15.1 to 16.0",
            ni: "0.45 to 0.60",
            others: "Cu = 1.75-2.50 / N=0.2 Max",
          },
          {
            grade: "JSL U SD",
            c: "0.15(max)",
            mn: "9.7 to 10.30",
            p: "0.10(max)",
            s: "0.03(max)",
            si: "0.75(max)",
            cr: "13.25 to 14.25",
            ni: "0.40 to 0.50",
            others: "Cu = 1.00-1.50 / N=0.2 Max",
          },
          {
            grade: "SS JT",
            c: "0.1",
            mn: "9.0-10.0",
            p: "0.1",
            s: "0.01",
            si: "0.75",
            cr: "14.5-16.5",
            ni: "0.25-0.35",
            n_ppm: "2000",
            others: "Cu = .40-1.00",
          },
        ],
      },
      {
        id: "ss-400-series",
        title: "SS 400 Series (Martensitic & Ferritic)",
        data: [
          {
            grade: "SS410",
            c: "0.08-0.15",
            mn: "1.00",
            p: "0.040",
            s: "0.030",
            si: "1.00",
            cr: "11.50-13.50",
            ni: "0.75",
            mo: "—",
            n_ppm: "—",
            others: "—",
          },
          {
            grade: "SS415",
            c: "0.05",
            mn: "0.50-1.00",
            p: "0.030",
            s: "0.030",
            si: "0.60",
            cr: "11.50-14.00",
            ni: "3.50-5.50",
            mo: "0.50-1.00",
            n_ppm: "—",
            others: "—",
          },
          {
            grade: "SS420",
            c: "0.15 min",
            mn: "1.00",
            p: "0.040",
            s: "0.030",
            si: "1.00",
            cr: "12.00-14.00",
            ni: "0.75",
            mo: "0.50",
            n_ppm: "—",
            others: "—",
          },
          {
            grade: "SS420J1",
            c: "0.16-0.25",
            mn: "1.00",
            p: "0.040",
            s: "0.030",
            si: "1.00",
            cr: "12.00-14.00",
            ni: "0.60",
            mo: "—",
            n_ppm: "—",
            others: "—",
          },
          {
            grade: "SS420J2",
            c: "0.26-0.40",
            mn: "1.00",
            p: "0.040",
            s: "0.030",
            si: "1.00",
            cr: "12.00-14.00",
            ni: "0.60",
            mo: "—",
            n_ppm: "—",
            others: "—",
          },
          {
            grade: "SS420MoV",
            c: "0.45-0.55",
            mn: "1.00",
            p: "0.040",
            s: "0.015",
            si: "1.00",
            cr: "14.00-15.00",
            mo: "0.50-0.80",
            n_ppm: "—",
            others: "V=0.10-0.20",
          },
          {
            grade: "SS431",
            c: "0.20",
            mn: "1.00",
            p: "0.040",
            s: "0.030",
            si: "1.00",
            cr: "15.00-17.00",
            ni: "1.25-2.50",
            mo: "—",
            n_ppm: "—",
            others: "—",
          },
          {
            grade: "SS405",
            c: "0.08",
            mn: "1.00",
            p: "0.040",
            s: "0.030",
            si: "1.00",
            cr: "11.50-14.50",
            ni: "0.60",
            mo: "—",
            n_ppm: "—",
            others: "AI=0.10-0.30",
          },
          {
            grade: "SS409L",
            c: "0.03",
            mn: "1.00",
            p: "0.040",
            s: "0.020",
            si: "1.00",
            cr: "10.50-11.70",
            ni: "0.50",
            mo: "—",
            n_ppm: "300",
            others: "Ti=6X (C+N) Min, 0.75 Max",
          },
          {
            grade: "SS409Ni",
            c: "0.03",
            mn: "1.00",
            p: "0.040",
            s: "0.030",
            si: "1.00",
            cr: "10.50-11.70",
            ni: "0.50-1.00",
            mo: "—",
            n_ppm: "300",
            others: "Ti=6X(C+N) Min, 0.75 Max",
          },
          {
            grade: "SS410S",
            c: "0.08",
            mn: "1.00",
            p: "0.040",
            s: "0.030",
            si: "1.00",
            cr: "11.50-13.50",
            ni: "0.60",
            mo: "—",
            n_ppm: "—",
            others: "—",
          },
          {
            grade: "SS430",
            c: "0.12",
            mn: "1.00",
            p: "0.040",
            s: "0.030",
            si: "1.00",
            cr: "16.00-18.00",
            ni: "0.75",
            mo: "—",
            n_ppm: "—",
            others: "—",
          },
          {
            grade: "SS432",
            c: "0.025",
            mn: "1.00",
            p: "0.040",
            s: "0.030",
            si: "1.00",
            cr: "17.00-20.00",
            mo: "0.40-.80",
            n_ppm: "250",
            others: "Ti/Nb=8X(C+N) Min, 0.80 Max",
          },
          {
            grade: "SS436",
            c: "0.12",
            mn: "1.00",
            p: "0.040",
            s: "0.030",
            si: "1.00",
            cr: "16.00-18.00",
            mo: "0.75-1.25",
            n_ppm: "—",
            others: "Nb= 5XC Min., 0.70 Max.",
          },
          {
            grade: "SS436L",
            c: "0.025",
            mn: "1.00",
            p: "0.040",
            s: "0.030",
            si: "1.00",
            cr: "16.00-19.00",
            mo: "0.75-1.25",
            n_ppm: "250",
            others: "% Nb or & Ti or % combination = 8X (C+N) Min, 0.80 Max",
          },
          {
            grade: "SS439",
            c: "0.03",
            mn: "1.00",
            p: "0.040",
            s: "0.030",
            si: "1.00",
            cr: "17.00-19.00",
            ni: "0.50",
            mo: "—",
            n_ppm: "300",
            others: "Ti=0.20+4X (C+N)",
          },
          {
            grade: "SS441",
            c: "0.03",
            mn: "1.00",
            p: "0.040",
            s: "0.015",
            si: "1.00",
            cr: "17.50-18.50",
            mo: "—",
            n_ppm: "—",
            others: "Nb=3X% C+0.3 Min.",
          },
          {
            grade: "SS444",
            c: "0.025",
            mn: "1.00",
            p: "0.040",
            s: "0.030",
            si: "1.00",
            cr: "17.50-19.50",
            ni: "1.00",
            mo: "1.75-2.50",
            n_ppm: "350",
            others: "(Ti+Nb) 0.20+4(C+N)",
          },
          {
            grade: "SS446",
            c: "0.20",
            mn: "1.50",
            p: "0.040",
            s: "0.030",
            si: "1.00",
            cr: "23.00-27.00",
            ni: "0.75",
            mo: "—",
            n_ppm: "2500",
            others: "—",
          },
          {
            grade: "SS409M",
            c: "0.03",
            mn: "0.8-1.5",
            p: "0.040",
            s: "0.030",
            si: "1.00",
            cr: "10.50-12.50",
            ni: "1.50",
            mo: "—",
            n_ppm: "300",
            others: "Ti=0.75 Max",
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

  // PDF Download Function
  const downloadTechnicalData = () => {
    const doc = new jsPDF("landscape", "mm", "a4");

    // Add Company Header
    doc.setFontSize(18);
    doc.setTextColor(178, 34, 34); // brand-red
    doc.text("Nagraj Metal Industries", 14, 20);
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.text("Technical Data Sheets", 14, 28);
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(
      "www.nagrajmetal.com | sales@nagrajmetal.com | +91 7073875529",
      14,
      35,
    );
    doc.line(14, 38, 280, 38);

    let yPosition = 45;

    technicalSections.forEach((section) => {
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
        // Add header on new page
        doc.setFontSize(11);
        doc.setTextColor(178, 34, 34);
        doc.text("Nagraj Metal Industries - Technical Data Sheets", 14, 15);
        doc.line(14, 18, 280, 18);
        yPosition = 25;
      }

      // Section Title
      doc.setFontSize(14);
      doc.setTextColor(178, 34, 34);
      doc.text(section.title, 14, yPosition);
      yPosition += 8;

      section.subsections.forEach((subsection) => {
        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
          doc.setFontSize(11);
          doc.setTextColor(178, 34, 34);
          doc.text("Nagraj Metal Industries - Technical Data Sheets", 14, 15);
          doc.line(14, 18, 280, 18);
          yPosition = 25;
        }

        // Subsection Title
        doc.setFontSize(11);
        doc.setTextColor(50, 50, 50);
        doc.text(subsection.title, 14, yPosition);
        yPosition += 6;

        // Prepare table data
        const headers = Object.keys(subsection.data[0] || {});
        const rows = subsection.data.map((row) => Object.values(row));

        // Generate table
        autoTable(doc, {
          head: [headers.map((h) => h.replace(/_/g, " ").toUpperCase())],
          body: rows,
          startY: yPosition,
          theme: "striped",
          headStyles: {
            fillColor: [178, 34, 34],
            textColor: [255, 255, 255],
            fontSize: 7,
            halign: "center",
          },
          bodyStyles: {
            fontSize: 6.5,
            cellPadding: 1.5,
          },
          columnStyles: {
            0: { cellWidth: "auto" },
          },
          margin: { left: 14, right: 14 },
          styles: {
            overflow: "linebreak",
            cellPadding: 1.5,
          },
          didDrawPage: () => {
            // Add footer on each page
            const pageCount = doc.getNumberOfPages();
            const currentPage = pageCount;
            doc.setFontSize(7);
            doc.setTextColor(150, 150, 150);
            doc.text(
              `Page ${currentPage} of ${doc.getNumberOfPages()}`,
              doc.internal.pageSize.getWidth() / 2,
              doc.internal.pageSize.getHeight() - 10,
              { align: "center" },
            );
          },
        });

        // @ts-ignore - jspdf-autotable adds this property
        yPosition = doc.lastAutoTable.finalY + 8;
      });

      yPosition += 4;
    });

    // Add footer to last page
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" },
      );
    }

    // Save the PDF
    doc.save("Nagraj-Metal-Industries-Technical-Data.pdf");
  };

  return (
    <>
      <title>Technical Information | Nagraj Metal Industries</title>
      <meta
        name="description"
        content="Technical information including chemical composition, pipe specifications, and AMS standards from Nagraj Metal Industries."
      />

      <section
        id="technical-hero"
        className="relative min-h-[60vh] md:min-h-[110vh] flex items-center overflow-hidden bg-brand-red-dark"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/images/tech.jpg")' }}
        />
      </section>

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
          <div className="max-w-6xl mx-auto space-y-6">
            {technicalSections.map((section) => {
              const isOpen = openSections.includes(section.id);
              const Icon = section.icon;

              return (
                <div
                  key={section.id}
                  className="bg-white rounded-sm border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 hover:bg-gray-50 transition-colors duration-200 text-left"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 rounded-sm bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-brand-red" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-brand-charcoal text-base sm:text-lg">
                          {section.title}
                        </h3>
                        <p className="font-body text-gray-500 text-xs sm:text-sm">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronDown
                        size={20}
                        className="text-gray-400 flex-shrink-0"
                      />
                    ) : (
                      <ChevronRight
                        size={20}
                        className="text-gray-400 flex-shrink-0"
                      />
                    )}
                  </button>

                  {/* Section Content */}
                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-6 pt-4 border-t border-gray-200">
                      {section.subsections.map((subsection, idx) => (
                        <div
                          key={subsection.id}
                          className={idx > 0 ? "mt-8" : ""}
                        >
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
                                        className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-display font-bold text-[10px] sm:text-xs uppercase tracking-wider whitespace-nowrap"
                                      >
                                        {key === "n_ppm"
                                          ? "N (PPM)"
                                          : key === "cr"
                                            ? "Cr"
                                            : key.charAt(0).toUpperCase() +
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
                                          className="px-3 sm:px-4 py-2 sm:py-2.5 text-gray-700 text-[11px] sm:text-xs whitespace-nowrap"
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
          <div className="mt-16 bg-brand-red/5 border border-brand-red/20 rounded-sm p-6 sm:p-8 max-w-3xl mx-auto text-center">
            <FileText size={32} className="text-brand-red mx-auto mb-4" />
            <h3 className="font-display font-bold text-brand-charcoal text-lg sm:text-xl mb-2">
              Need Complete Technical Data?
            </h3>
            <p className="font-body text-gray-600 text-sm mb-6">
              Download our comprehensive technical data sheets or contact us for
              specific material specifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={downloadTechnicalData}
                className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-display font-bold px-6 py-2.5 rounded-sm transition-all duration-200 text-sm"
              >
                <Download size={16} />
                Download Data Sheets
              </button>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-display font-bold px-6 py-2.5 rounded-sm transition-all duration-200 text-sm"
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
