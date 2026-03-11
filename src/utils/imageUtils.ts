/**
 * Detects the actual image MIME type from base64-encoded data using magic bytes.
 *
 * Fixes API errors like:
 *   "The image was specified using the image/png media type,
 *    but the image appears to be a image/jpeg image"
 */

type SupportedImageMediaType = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';

/**
 * Strips the data URL prefix (e.g. "data:image/png;base64,") if present,
 * returning only the raw base64 string.
 */
function stripDataUrlPrefix(base64: string): string {
  const commaIndex = base64.indexOf(',');
  return commaIndex !== -1 ? base64.slice(commaIndex + 1) : base64;
}

/**
 * Detects the image MIME type by inspecting the leading bytes of the
 * base64-encoded image data.
 *
 * @param base64 - Raw base64 string or a data URL (data:image/...;base64,...).
 * @returns The detected MIME type, or 'image/jpeg' as a safe fallback.
 */
export function detectImageMediaType(base64: string): SupportedImageMediaType {
  const raw = stripDataUrlPrefix(base64).trimStart();

  // Decode only the first few bytes — enough to read magic numbers.
  const prefix = raw.slice(0, 16);
  const bytes = atob(prefix);

  const b0 = bytes.charCodeAt(0);
  const b1 = bytes.charCodeAt(1);
  const b2 = bytes.charCodeAt(2);
  const b3 = bytes.charCodeAt(3);

  // JPEG: FF D8 FF
  if (b0 === 0xff && b1 === 0xd8 && b2 === 0xff) {
    return 'image/jpeg';
  }

  // PNG: 89 50 4E 47 (‌\x89PNG)
  if (b0 === 0x89 && b1 === 0x50 && b2 === 0x4e && b3 === 0x47) {
    return 'image/png';
  }

  // GIF: 47 49 46 38 (GIF8)
  if (b0 === 0x47 && b1 === 0x49 && b2 === 0x46 && b3 === 0x38) {
    return 'image/gif';
  }

  // WebP: 52 49 46 46 .... 57 45 42 50 (RIFF....WEBP)
  if (b0 === 0x52 && b1 === 0x49 && b2 === 0x46 && b3 === 0x46) {
    const ext = bytes.slice(8, 12);
    if (ext === 'WEBP') {
      return 'image/webp';
    }
  }

  // Fallback — assume JPEG, the most common format
  return 'image/jpeg';
}

/**
 * Builds the image source object required by the Claude Messages API,
 * automatically detecting the correct media type from the base64 data.
 *
 * Usage:
 *   const source = buildClaudeImageSource(base64Data);
 *   // { type: 'base64', media_type: 'image/jpeg', data: '...' }
 */
export function buildClaudeImageSource(base64: string): {
  type: 'base64';
  media_type: SupportedImageMediaType;
  data: string;
} {
  const data = stripDataUrlPrefix(base64);
  return {
    type: 'base64',
    media_type: detectImageMediaType(base64),
    data,
  };
}
