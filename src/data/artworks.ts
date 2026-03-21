export type Locale = 'en-CA' | 'fr-CA';

export interface Artwork {
  id: string;
  slug: string;
  image: string;
  titleOriginal: string;
  titleTranslations: {
    'en-CA'?: string;
    'fr-CA'?: string;
  };
  year: number;
  size: string;
  medium: string;
  // Future-ready optional fields
  collection?: string;
  status?: 'available' | 'sold' | 'nfs';
  featured?: boolean;
  orientation?: 'landscape' | 'portrait' | 'square';
}

export const artworks: Artwork[] = [
  {
    id: '001',
    slug: 'trapped',
    image: 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1773790027/okan/Trapped_2024_a8o8ik.png',
    titleOriginal: 'Trapped',
    titleTranslations: { 'en-CA': 'Trapped', 'fr-CA': 'Trapped' },
    year: 2024,
    size: '12 × 15 in',
    medium: 'Acrylic on Linen',
    featured: true,
  },
  {
    id: '002',
    slug: 'pelu-afeafe',
    image: 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1773790026/okan/pe_%C3%BAlu_afe_%C3%BAfe_%C3%BA_2025_zqrq7i.png',
    titleOriginal: 'pẹlu afẹfẹ',
    titleTranslations: { 'en-CA': 'With Wind', 'fr-CA': 'Avec le vent' },
    year: 2025,
    size: '18 × 24 in',
    medium: 'Acrylic on Canvas',
    featured: true,
  },
  {
    id: '003',
    slug: 'moon-and-gun',
    image: 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1773790026/okan/Moon_and_Gun_2026_nykjhr.png',
    titleOriginal: 'Moon and Gun',
    titleTranslations: { 'en-CA': 'Moon and Gun', 'fr-CA': 'Moon and Gun' },
    year: 2026,
    size: '16 × 5 in',
    medium: 'Acrylic on Wood',
    featured: true,
  },
  {
    id: '004',
    slug: 'four-hills',
    image: 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1773790025/okan/Four_hills_2025_uwg63k.png',
    titleOriginal: 'Four Hills',
    titleTranslations: { 'en-CA': 'Four Hills', 'fr-CA': 'Four Hills' },
    year: 2025,
    size: '14 × 20 in',
    medium: 'Acrylic on Linen',
    featured: true,
  },
  {
    id: '005',
    slug: 'lonely',
    image: 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1773790025/okan/Lonely_2026_gfgjui.png',
    titleOriginal: 'Lonely',
    titleTranslations: { 'en-CA': 'Lonely', 'fr-CA': 'Lonely' },
    year: 2026,
    size: 'Large',
    medium: 'Mixed Media on Leather',
    featured: true,
  },
  {
    id: '006',
    slug: 'gaslight',
    image: 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1773790025/okan/Gaslight_2025_bsaswj.png',
    titleOriginal: 'Gaslight',
    titleTranslations: { 'en-CA': 'Gaslight', 'fr-CA': 'Gaslight' },
    year: 2025,
    size: '8 × 10 in',
    medium: 'Acrylic on Canvas',
  },
  {
    id: '007',
    slug: 'i-too-know',
    image: 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1773790025/okan/I_too_know_2025_h5skqj.png',
    titleOriginal: 'I too know',
    titleTranslations: { 'en-CA': 'I too know', 'fr-CA': 'I too know' },
    year: 2025,
    size: '12 × 16 in',
    medium: 'Acrylic on Canvas',
  },
  {
    id: '008',
    slug: 'avoiding-mirrors',
    image: 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1773790025/okan/Avoiding_mirrors_2025_p9pyhl.png',
    titleOriginal: 'Avoiding mirrors',
    titleTranslations: { 'en-CA': 'Avoiding mirrors', 'fr-CA': 'Avoiding mirrors' },
    year: 2025,
    size: '15 × 17 in',
    medium: 'Acrylic on Linen',
  },
  {
    id: '009',
    slug: 'crash-out',
    image: 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1773790025/okan/Crash_Out_2025_voohkk.png',
    titleOriginal: 'Crash Out',
    titleTranslations: { 'en-CA': 'Crash Out', 'fr-CA': 'Crash Out' },
    year: 2025,
    size: '12 × 10 in',
    medium: 'Acrylic on Canvas',
  },
  {
    id: '010',
    slug: 'brr',
    image: 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1773790025/okan/Brr_2026_vft12q.png',
    titleOriginal: 'Brr',
    titleTranslations: { 'en-CA': 'Brr', 'fr-CA': 'Brr' },
    year: 2026,
    size: '11 × 14 in',
    medium: 'Acrylic on Canvas Panel',
  },
  {
    id: '011',
    slug: 'at-the-door',
    image: 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1773790025/okan/At_the_door_2026_stjq5q.png',
    titleOriginal: 'At the door',
    titleTranslations: { 'en-CA': 'At the door', 'fr-CA': 'At the door' },
    year: 2026,
    size: '11 × 14 in',
    medium: 'Acrylic on Canvas Panel',
  },
  {
    id: '012',
    slug: 'whats-up',
    image: 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1773791934/okan/What_s_up_2024_kb4i8i.png',
    titleOriginal: "What's up",
    titleTranslations: { 'en-CA': "What's up", 'fr-CA': "What's up" },
    year: 2024,
    size: '30 × 21 in',
    medium: 'Acrylic on Linen',
  },
];

/** Dark-mode logo (dark silhouette, use on dark backgrounds) */
export const LOGO_URL = 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1774015374/light_logo_np9xoc.png'

/** Light-mode logo (light form, use on light backgrounds) */
export const LOGO_URL_LIGHT = 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1774015374/dark_logo_fzoidc.png'

/** Returns the best title for the given locale. Falls back to titleOriginal. */
export function getLocaleTitle(artwork: Artwork, locale: Locale): string {
  return artwork.titleTranslations[locale] ?? artwork.titleOriginal;
}

/**
 * Returns the original title only when it differs from the locale title,
 * so we can display it as a secondary label without duplication.
 */
export function getOriginalTitleIfDistinct(artwork: Artwork, locale: Locale): string | null {
  const localeTitle = artwork.titleTranslations[locale];
  if (!localeTitle) return null;
  return localeTitle !== artwork.titleOriginal ? artwork.titleOriginal : null;
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function getFeaturedArtworks(): Artwork[] {
  return artworks.filter((a) => a.featured === true);
}