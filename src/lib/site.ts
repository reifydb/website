export const SITE_ORIGIN = 'https://reifydb.com';
export const SITE_NAME = 'ReifyDB';
export const SITE_LOGO = '/assets/img/logo.png';
export const DEFAULT_OG_IMAGE = '/assets/img/og-default.png';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export function absoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${SITE_ORIGIN}${path}`;
}

export function canonicalUrl(pathname: string): string {
  if (pathname === '/') return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${pathname.replace(/\/+$/, '')}/`;
}
