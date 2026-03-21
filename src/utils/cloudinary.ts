/**
 * Cloudinary image optimization utilities.
 * Inserts transformation parameters into an existing Cloudinary upload URL.
 *
 * Base URL pattern:
 *   https://res.cloudinary.com/{cloud}/image/upload/{version}/{public_id}
 * Optimized URL pattern:
 *   https://res.cloudinary.com/{cloud}/image/upload/{transforms}/{version}/{public_id}
 */

export interface CloudinaryTransforms {
  width?: number;
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'avif';
  crop?: 'fill' | 'fit' | 'scale' | 'thumb';
  dpr?: number | 'auto';
}

function buildTransformString(opts: CloudinaryTransforms): string {
  const parts: string[] = [];
  if (opts.format !== undefined) parts.push(`f_${opts.format}`);
  if (opts.quality !== undefined) parts.push(`q_${opts.quality}`);
  if (opts.width !== undefined) parts.push(`w_${opts.width}`);
  if (opts.crop !== undefined) parts.push(`c_${opts.crop}`);
  if (opts.dpr !== undefined) parts.push(`dpr_${opts.dpr}`);
  return parts.join(',');
}

export function optimizeCloudinaryUrl(url: string, opts: CloudinaryTransforms): string {
  const transforms = buildTransformString(opts);
  if (!transforms) return url;
  return url.replace('/upload/', `/upload/${transforms}/`);
}

/** Thumbnail for gallery grid — fast, compact */
export function galleryThumb(url: string): string {
  return optimizeCloudinaryUrl(url, { format: 'auto', quality: 'auto', width: 800 });
}

/** Large image for detail / lightbox view */
export function detailImage(url: string): string {
  return optimizeCloudinaryUrl(url, { format: 'auto', quality: 'auto', width: 1400 });
}

/** Small thumbnail for navbar previews or related works */
export function microThumb(url: string): string {
  return optimizeCloudinaryUrl(url, { format: 'auto', quality: 'auto', width: 160 });
}

/** Logo — preserve clarity, keep small */
export function logoImage(url: string, width = 120): string {
  return optimizeCloudinaryUrl(url, { format: 'auto', quality: 'auto', width });
}