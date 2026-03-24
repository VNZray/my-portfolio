export function isPdf(url: string): boolean {
  try {
    const pathname = new URL(url).pathname;
    return pathname.toLowerCase().endsWith(".pdf");
  } catch {
    return url.toLowerCase().endsWith(".pdf");
  }
}

/** Returns a PDF URL with fragment params to hide toolbar and fit content in the viewer. */
export function pdfEmbedUrl(url: string): string {
  return `${url}#toolbar=0&navpanes=0&view=Fit`;
}
