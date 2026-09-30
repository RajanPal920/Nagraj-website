// src/utils/catalogueGenerator.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Generates and downloads the Official Nagraj Metal Industries Product Catalogue (PDF)
 */
export function downloadProductCatalogue() {
  const doc = new jsPDF("portrait", "mm", "a4");

  // Cover / Header Banner
  doc.setFillColor(139, 26, 26); // Brand dark red #8B1A1A
  doc.rect(0, 0, 210, 36, "F");

  // Accent gold line
  doc.setFillColor(201, 168, 76); // Gold #C9A84C
  doc.rect(0, 36, 210, 2, "F");

  // Header Titles
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("NAGRAJ METAL INDUSTRIES", 14, 15);

  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.text("Manufacturers · Stockists · Suppliers · Exporters of Industrial Metals & Alloys", 14, 22);

  doc.setFontSize(8);
  doc.setTextColor(240, 220, 220);
  doc.text("ISO 9001:2015 Certified · MSME Udyam Registered · Pan-India & Global Supply", 14, 28);
  doc.text("Mumbai HQ & Pune Stockpoint | sales@nagrajmetal.com | +91 7073875529 | www.nagrajmetal.com", 14, 33);

  // Document Title
  let y = 47;
  doc.setTextColor(26, 26, 26);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("OFFICIAL PRODUCT CATALOGUE & MATERIAL GRADE MATRIX", 14, y);

  doc.setDrawColor(139, 26, 26);
  doc.setLineWidth(0.8);
  doc.line(14, y + 2, 85, y + 2);

  y += 9;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text(
    "Comprehensive range of high-performance piping, sheets, round bars, flanges, fittings, and fasteners with complete mill traceability (EN 10204 3.1 MTC) and ready third-party inspection.",
    14,
    y,
    { maxWidth: 182 }
  );

  y += 11;

  // Table 1: Primary Product Categories
  autoTable(doc, {
    startY: y,
    head: [["Category", "Forms & Types Available", "Standard Specifications / Dimensions"]],
    body: [
      ["Pipes & Tubes", "Seamless, ERW, Welded, EFW, LSAW, HSAW, Capillary, Instrumentation", "ASTM A312, A213, A269, A335, A106, A53 | 1/8\" NB to 48\" NB | Sch 5 to XXS"],
      ["Plates & Sheets", "Hot Rolled (HR), Cold Rolled (CR), Chequered, Shim Sheets, Coils", "ASTM A240, A516, A387, EN 10025, IS 2062 | 0.5mm to 150mm Thk"],
      ["Round Bars & Rods", "Black, Bright, Peeled, Ground, Forged, Hex, Square, Flat Bars", "ASTM A276, A479, A182, EN Series, AISI | Dia 3mm to 500mm"],
      ["Flanges", "Weld Neck, Blind, Slip-On, Threaded, Socket Weld, Lap Joint, RTJ, Spectacle", "ASTM A182, A105, A350 LF2, ASME B16.5, B16.47 | Class 150 to 2500#"],
      ["Fasteners", "Hex Bolts, Heavy Hex, Stud Bolts, Hex Nuts, Lock Nuts, Washers, Screws", "ASTM A193 B7/B8/B8M, A194 2H/8/8M, Grade 8.8/10.9/12.9, SS A2/A4"],
      ["Buttweld Fittings", "Equal/Reducing Tees, 90°/45° Elbows, Reducers (Conc/Ecc), Caps, Stub Ends", "ASTM A403, A234 WPB/WP11/WP22/WP91, ASME B16.9 | Sch 10 to XXS"],
      ["Forged Fittings", "Socket Weld & Threaded (NPT/BSPT) Elbows, Tees, Unions, Couplings, Nipples", "ASTM A182, A105, ASME B16.11 | 2000#, 3000#, 6000#, 9000#"],
      ["High Tensile / Wear", "Hardox 400/450/500, Abrex 400/500, Sailhard, S690QL, S355J2+N, Corten A/B", "High yield strength structural & abrasion resistant steel plates & profiles"],
      ["Specialized Products", "Galvanized Channels, Tata Structura 355, Welding Electrodes, Precision Pins", "IS 2062 E250/E350, AWS A5.4/A5.1, Hot Dip Galvanized coating 80-120 microns"]
    ],
    theme: "striped",
    headStyles: {
      fillColor: [139, 26, 26],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 7.2,
      textColor: [40, 40, 40],
      cellPadding: 2,
    },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 35 },
      1: { cellWidth: 70 },
      2: { cellWidth: 77 },
    },
  });

  // Table 2: Material Grades Matrix
  const finalY1 = (doc as any).lastAutoTable.finalY + 7;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(139, 26, 26);
  doc.text("MATERIAL GRADES & ALLOY SPECTRUM IN STOCK", 14, finalY1);

  autoTable(doc, {
    startY: finalY1 + 3,
    head: [["Material Family", "Grades & Specifications Supplied"]],
    body: [
      ["Stainless Steel", "ASTM 304, 304L, 304H, 316, 316L, 316Ti, 310S, 321, 347, 904L, 410, 420, 430, 446, 17-4PH (UNS S17400)"],
      ["Nickel Alloys", "Inconel 600, 601, 625, 718, 800, 825 | Monel 400, K500 | Hastelloy C276, C22, B2 | Nickel 200, 201"],
      ["Duplex & Super Duplex", "UNS S31803 / S32205 (F51 / 2205), UNS S32750 (F53 / 2507), UNS S32760 (F55 / Zeron 100)"],
      ["Alloy Steel", "ASTM A335 / A182 / A234: P1, P5, P9, P11, P12, P22, P91, P92 | AISI 4130, 4140, 4340, 8620, EN19, EN24, EN31"],
      ["Carbon Steel & Low Temp", "ASTM A106 Gr. B, A53, API 5L Gr. B/X42/X52/X65, ASTM A333 Grade 6 (LTCS), ASTM A105, A350 LF2, SA 516 Gr. 60/70"],
      ["Tool & Die Steel", "AISI D2, D3, H13, O1, Toolox 33, Toolox 44, DB6, 20MnCr5, EN36C, HCHCR round rods and flats"],
      ["Titanium & Non-Ferrous", "Titanium Grade 1, Grade 2, Grade 5 (Ti-6Al-4V) | Copper Nickel 90/10 (C70600), 70/30 (C71500) | Aluminium 6061, 6082, 7075"]
    ],
    theme: "striped",
    headStyles: {
      fillColor: [40, 40, 40],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 7.2,
      textColor: [40, 40, 40],
      cellPadding: 2,
    },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 45 },
      1: { cellWidth: 137 },
    },
  });

  // Page 2: Testing, Quality, Dispatch & Procurement
  doc.addPage();

  // Page 2 Header Banner
  doc.setFillColor(139, 26, 26);
  doc.rect(0, 0, 210, 20, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("NAGRAJ METAL INDUSTRIES — QUALITY ASSURANCE & SUPPLY CAPABILITIES", 14, 13);

  let p2Y = 30;

  // QA Policies
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(139, 26, 26);
  doc.text("QUALITY COMMITMENT & INSPECTION PROTOCOLS", 14, p2Y);

  p2Y += 5;
  autoTable(doc, {
    startY: p2Y,
    head: [["Quality Assurance Pillar", "Standard Testing & Verification Protocols Applied"]],
    body: [
      ["Mill Test Certificates (MTC)", "100% material supplied accompanied by original manufacturer test certificates complying with EN 10204 3.1 & 3.2 standards."],
      ["Chemical Composition", "Spectrochemical PMI (Positive Material Identification) testing to confirm precise elemental composition (Cr, Ni, Mo, C, Mn, etc.)."],
      ["Mechanical Property Tests", "Tensile testing, yield strength, percentage elongation, and Charpy V-notch impact testing at ambient and cryogenic temperatures."],
      ["Non-Destructive Testing (NDT)", "Ultrasonic testing (UT), Radiographic testing (RT), Hydrostatic pressure test, Magnetic Particle (MPI), and Dye Penetrant (DPI)."],
      ["Third-Party Inspection (TPI)", "Materials routinely inspected and accepted by Bureau Veritas (BV), DNV, TUV, Lloyds Register (LR), SGS, and Engineers India Limited (EIL)."],
      ["Packaging & Preservation", "Seaworthy wooden boxes, end plastic caps for pipes/tubes, rust-preventive oil coating, barcoding, and custom crate packaging."]
    ],
    theme: "striped",
    headStyles: {
      fillColor: [139, 26, 26],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 7.4,
      textColor: [40, 40, 40],
      cellPadding: 2.2,
    },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 50 },
      1: { cellWidth: 132 },
    },
  });

  const p2Y2 = (doc as any).lastAutoTable.finalY + 8;

  // Key Sectors Served
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(139, 26, 26);
  doc.text("INDUSTRIES SERVED ACROSS INDIA & GLOBALLY", 14, p2Y2);

  autoTable(doc, {
    startY: p2Y2 + 3,
    head: [["Industry Sector", "Typical Materials & Components Supplied"]],
    body: [
      ["Oil, Gas & Petrochemicals", "High-pressure alloy steel pipes (P11/P22/P91), A105/A182 flanges, Monel & Inconel piping, B7/2H fasteners."],
      ["Thermal & Nuclear Power Plants", "Superheater tubes, boiler quality plates (SA 516 Gr 70, SA 387), forged fittings, high-temperature fasteners."],
      ["Chemical & Fertilizer Plants", "Stainless steel 316L/904L piping, Hastelloy C276 reactors, PTFE lined components, titanium heat exchangers."],
      ["Heavy Engineering & Mining", "Hardox 400/500 wear plates, Abrex liners, S690QL high yield structural plates, high-tensile 10.9/12.9 fasteners."],
      ["Marine, Shipbuilding & Offshore", "Cupro-Nickel 90/10 & 70/30 pipes & fittings, Duplex 2205 / Super Duplex 2507 subsea flanges, fasteners."]
    ],
    theme: "striped",
    headStyles: {
      fillColor: [40, 40, 40],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 7.4,
      textColor: [40, 40, 40],
      cellPadding: 2.2,
    },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 55 },
      1: { cellWidth: 127 },
    },
  });

  // Corporate Contact Footer Box
  const p2Y3 = (doc as any).lastAutoTable.finalY + 8;
  doc.setFillColor(247, 247, 247);
  doc.setDrawColor(200, 200, 200);
  doc.roundedRect(14, p2Y3, 182, 36, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(139, 26, 26);
  doc.text("HOW TO REQUEST SAMPLES, QUOTATIONS & CUT-TO-SIZE STOCK", 18, p2Y3 + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(50, 50, 50);
  doc.text(
    "Contact our sales engineers with your required material grade, dimensions (OD, NB, Thickness, Length, Class), specifications (ASTM/ASME/EN), and quantity. Custom cut-lengths, profiling, and third-party inspection arranged on request.",
    18,
    p2Y3 + 13,
    { maxWidth: 174 }
  );

  doc.setFont("helvetica", "bold");
  doc.text("Registered Head Office (Mumbai):", 18, p2Y3 + 24);
  doc.setFont("helvetica", "normal");
  doc.text("Jalaram Niwas, Plot No. 2, 1st Floor, Office No. 1, 1st Kumbharwada, Mumbai – 400 004", 18, p2Y3 + 28);
  doc.text("Branch & Stockpoint (Pune): MIDC Bhosari Industrial Belt, Pune - 411026", 18, p2Y3 + 32);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(139, 26, 26);
  doc.text("Phone: +91 7073875529 / +91 22-66518595  |  Email: sales@nagrajmetal.com  |  Web: www.nagrajmetal.com", 18, p2Y3 + 35.5);

  doc.save("Nagraj-Metal-Industries-Product-Catalogue.pdf");
}

/**
 * Generates and downloads the Official Nagraj Metal Industries Corporate Profile & Company Catalogue (PDF)
 */
export function downloadCompanyCatalogue() {
  const doc = new jsPDF("portrait", "mm", "a4");

  // Cover Banner
  doc.setFillColor(139, 26, 26);
  doc.rect(0, 0, 210, 42, "F");

  doc.setFillColor(201, 168, 76);
  doc.rect(0, 42, 210, 2, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("NAGRAJ METAL INDUSTRIES", 14, 17);

  doc.setFontSize(10.5);
  doc.setFont("helvetica", "normal");
  doc.text("COMPANY PROFILE & CORPORATE CAPABILITIES BROCHURE", 14, 25);

  doc.setFontSize(8.5);
  doc.setTextColor(240, 220, 220);
  doc.text("B2B Raw Material Stockist · Manufacturer · Supplier · Exporter | Founded Over a Decade Ago", 14, 32);
  doc.text("Udyam Registration: UDYAM-MH-19-0027660 · ISO 9001:2015 Accredited Quality Management", 14, 38);

  let y = 53;
  doc.setTextColor(26, 26, 26);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("EXECUTIVE OVERVIEW & BUSINESS PROFILE", 14, y);

  doc.setDrawColor(139, 26, 26);
  doc.setLineWidth(0.8);
  doc.line(14, y + 2, 75, y + 2);

  y += 9;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(60, 60, 60);
  doc.text(
    "Nagraj Metal Industries was established over a decade ago with a vision to streamline the sourcing of critical industrial raw materials for engineering, petrochemical, power generation, and fabrication sectors across India and overseas markets. Under the executive leadership of Mr. Rajesh Padhiyar (CEO), Nagraj Metal Industries has grown into one of the most trusted names for prompt dispatch, competitive mill-direct pricing, and uncompromised metallurgical traceability.",
    14,
    y,
    { maxWidth: 182 }
  );

  y += 18;

  // Key Corporate Facts Table
  autoTable(doc, {
    startY: y,
    head: [["Corporate Aspect", "Organizational Details & Credentials"]],
    body: [
      ["Entity Name", "Nagraj Metal Industries"],
      ["Leadership", "Mr. Rajesh Padhiyar (Chief Executive Officer)"],
      ["Industry Registration", "ISO 9001:2015 Certified · Govt. of India MSME Udyam: UDYAM-MH-19-0027660"],
      ["Registered Head Office", "Jalaram Niwas, Plot No. 2, 1st Floor, Office No. 1, 1st Kumbharwada, Mumbai – 400 004, Maharashtra"],
      ["Branch & Regional Hub", "SA 3/3, 'S' Block, Near SB Canteen, MIDC, Bhosari, Pune - 411026, Maharashtra"],
      ["Core Operations", "Import, Stockholding, Processing, Domestic Distribution & Export of Ferrous & Non-Ferrous Alloys"],
      ["Product Categories", "Pipes, Tubes, Plates, Sheets, Round Bars, Flanges, Fasteners, Buttweld & Forged Fittings"],
      ["Material Spectrum", "Stainless Steel, Alloy Steel, Carbon Steel, Nickel Alloys, Duplex/Super Duplex, Titanium, Tool Steels"],
      ["Legal Standing", "Subject to Mumbai Jurisdiction · 100% Tax & GST Compliant with E-Way Bill Dispatch"]
    ],
    theme: "striped",
    headStyles: {
      fillColor: [139, 26, 26],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [40, 40, 40],
      cellPadding: 2.2,
    },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 50 },
      1: { cellWidth: 132 },
    },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 8;

  // Strategic Capabilities
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(139, 26, 26);
  doc.text("STRATEGIC INFRASTRUCTURE & VALUE PROPOSITIONS", 14, finalY);

  autoTable(doc, {
    startY: finalY + 3,
    head: [["Value Proposition", "How Nagraj Metal Industries Delivers"]],
    body: [
      ["Dual Logistics Hubs", "Facilities situated in Mumbai (proximity to Nhava Sheva JNPT port and metal trading districts) and Pune MIDC Bhosari industrial belt for same-day/next-day dispatch."],
      ["Full Metallurgical Traceability", "Every heat number is stamped and cross-referenced with manufacturers' Mill Test Certificates (MTC EN 10204 3.1). No non-certified lots."],
      ["Competitive Bulk Pricing", "Direct procurement arrangements with premier domestic and international steel mills ensure highly competitive pricing for project tenders and OEM annual contracts."],
      ["Value-Added Services", "Cut-to-size bandsaw cutting, plate plasma/waterjet profiling, chamfering, pipe threading, galvanizing, heat treatment, and custom wooden box packing."]
    ],
    theme: "striped",
    headStyles: {
      fillColor: [40, 40, 40],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [40, 40, 40],
      cellPadding: 2.2,
    },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 55 },
      1: { cellWidth: 127 },
    },
  });

  // Page 2: Client sectors, testing & corporate contact
  doc.addPage();

  doc.setFillColor(139, 26, 26);
  doc.rect(0, 0, 210, 20, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("NAGRAJ METAL INDUSTRIES — ACCREDITATIONS & CORPORATE CONTACT", 14, 13);

  let p2Y = 28;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(139, 26, 26);
  doc.text("CERTIFICATION & REGULATORY COMPLIANCE", 14, p2Y);

  autoTable(doc, {
    startY: p2Y + 4,
    head: [["Credential / Certificate", "Authority / Regulatory Scope", "Status & Validity"]],
    body: [
      ["ISO 9001:2015 Quality Management", "Certified Quality Management System for stockholding, supply and export of industrial steel & alloy materials.", "Active & Audited"],
      ["MSME Udyam Registration", "Ministry of Micro, Small and Medium Enterprises, Govt. of India (UDYAM-MH-19-0027660).", "Officially Registered"],
      ["Goods & Services Tax (GST)", "Central & Maharashtra State GST Registered with complete e-invoicing and e-way bill generation.", "Fully Compliant"],
      ["Govt. & PSU Vendor Registrations", "Approved supplier for public sector undertakings, municipal utilities, power corporations, and EPC contractors.", "Verified Vendor"]
    ],
    theme: "striped",
    headStyles: {
      fillColor: [139, 26, 26],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [40, 40, 40],
      cellPadding: 2.4,
    },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 50 },
      1: { cellWidth: 95 },
      2: { cellWidth: 37 },
    },
  });

  const p2Y2 = (doc as any).lastAutoTable.finalY + 10;

  // Contact & Inquiries Box
  doc.setFillColor(247, 247, 247);
  doc.setDrawColor(139, 26, 26);
  doc.setLineWidth(0.6);
  doc.roundedRect(14, p2Y2, 182, 54, 3, 3, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(139, 26, 26);
  doc.text("COMMERCIAL & TECHNICAL DESK CONTACT", 20, p2Y2 + 10);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(60, 60, 60);
  doc.text("For corporate tenders, rate contracts, export inquiries, or MTC verifications, contact:", 20, p2Y2 + 16);

  doc.setFont("helvetica", "bold");
  doc.text("Executive Contacts:", 20, p2Y2 + 23);
  doc.setFont("helvetica", "normal");
  doc.text("Mr. Rajesh Padhiyar (CEO): +91 7073875529  |  Sales Landline: +91 22-66518595", 20, p2Y2 + 28);
  doc.text("Email Desk: sales@nagrajmetal.com  |  Official Website: www.nagrajmetal.com", 20, p2Y2 + 33);

  doc.setFont("helvetica", "bold");
  doc.text("Office Locations:", 20, p2Y2 + 40);
  doc.setFont("helvetica", "normal");
  doc.text("• Mumbai HQ: Jalaram Niwas, Plot No. 2, 1st Floor, Office No. 1, 1st Kumbharwada, Mumbai – 400 004", 20, p2Y2 + 45);
  doc.text("• Pune Branch: SA 3/3, 'S' Block, Near SB Canteen, MIDC, Bhosari, Pune - 411026", 20, p2Y2 + 50);

  doc.save("Nagraj-Metal-Industries-Company-Catalogue.pdf");
}
