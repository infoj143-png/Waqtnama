export const KAABA_LAT = 21.422487;
export const KAABA_LNG = 39.826206;

/**
 * Calculates the initial Great Circle bearing towards Kaaba (Makkah) from given coordinates.
 * Returns bearing angle in degrees from True North (0° - 360°).
 */
export function calculateQiblaBearing(latitude: number, longitude: number): number {
  const phi1 = (latitude * Math.PI) / 180;
  const phi2 = (KAABA_LAT * Math.PI) / 180;
  const deltaLambda = ((KAABA_LNG - longitude) * Math.PI) / 180;

  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);

  let bearing = (Math.atan2(y, x) * 180) / Math.PI;
  bearing = (bearing + 360) % 360;

  return Math.round(bearing * 10) / 10;
}

/**
 * Calculates the great-circle distance between user location and Kaaba in kilometers.
 */
export function calculateDistanceToKaaba(latitude: number, longitude: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((KAABA_LAT - latitude) * Math.PI) / 180;
  const dLng = ((KAABA_LNG - longitude) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((latitude * Math.PI) / 180) *
      Math.cos((KAABA_LAT * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance);
}

/**
 * Helper to convert bearing degree into readable cardinal direction label.
 */
export function getCardinalDirection(bearing: number, lang: 'en' | 'ur' = 'en'): string {
  const directionsEn = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const directionsUr = ['شمال', 'شمال مشرقی', 'مشرق', 'جنوب مشرقی', 'جنوب', 'جنوب مغربی', 'مغرب', 'شمال مغربی'];

  const index = Math.round(bearing / 45) % 8;
  return lang === 'ur' ? directionsUr[index] : directionsEn[index];
}
