// src/utils/catalogueGenerator.ts

export const CATALOGUE_FILES = {
  product: {
    title: "Nagraj Metal Industries Product Catalogue",
    viewUrl: "/catalogue/product.pdf",
    downloadUrl: "/catalogue/product.pdf",
    filename: "Nagraj-Metal-Industries-Product-Catalogue.pdf",
  },
  company: {
    title: "Nagraj Metal Industries Corporate Profile",
    viewUrl: "/catalogue/Nagraj-metal-profile.pdf",
    downloadUrl: "/catalogue/Nagraj-metal-profile.pdf",
    filename: "Nagraj-Metal-Industries-Corporate-Profile.pdf",
  },
};

/**
 * Safe PDF opener — falls back to same-tab navigation if popup is blocked.
 */
function openPdf(url: string) {
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) {
    // Popup blocker ne rok diya — same tab me khol do
    window.location.href = url;
  }
}

/**
 * Opens the Official Nagraj Metal Industries Product Catalogue (PDF)
 * in a new browser tab/viewer.
 */
export function viewProductCatalogue() {
  openPdf(CATALOGUE_FILES.product.viewUrl);
}

/**
 * Opens the Official Nagraj Metal Industries Product Catalogue (PDF)
 * (Retains the browser's native PDF viewer and download functionality.)
 */
export function downloadProductCatalogue() {
  openPdf(CATALOGUE_FILES.product.downloadUrl);
}

/**
 * Opens the Official Nagraj Metal Industries Corporate Profile (PDF)
 * in a new browser tab/viewer.
 */
export function viewCompanyCatalogue() {
  openPdf(CATALOGUE_FILES.company.viewUrl);
}

/**
 * Opens the Official Nagraj Metal Industries Corporate Profile (PDF)
 * (Retains the browser's native PDF viewer and download functionality.)
 */
export function downloadCompanyCatalogue() {
  openPdf(CATALOGUE_FILES.company.downloadUrl);
}