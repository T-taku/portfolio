const FAVICON_SOURCES: Record<string, string> = {
  sizu: "https://static.sizu.me/images/logo-favicon.png",
};

export function getFaviconSrc(hosted: string | undefined, href: string): string | null {
  if (hosted && FAVICON_SOURCES[hosted]) {
    return FAVICON_SOURCES[hosted];
  }

  try {
    return `https://www.google.com/s2/favicons?domain=${new URL(href).hostname}&sz=64`;
  } catch {
    return null;
  }
}

export function getHostname(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}
