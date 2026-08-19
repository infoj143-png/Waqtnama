export function slugToLocationName(slug: string): string {
  const decoded = decodeURIComponent(slug).toLowerCase().trim();

  const knownMappings: Record<string, string> = {
    karachi: 'Karachi, Pakistan',
    'karachi-pakistan': 'Karachi, Pakistan',
    lahore: 'Lahore, Pakistan',
    'lahore-pakistan': 'Lahore, Pakistan',
    islamabad: 'Islamabad, Pakistan',
    'islamabad-pakistan': 'Islamabad, Pakistan',
    rawalpindi: 'Rawalpindi, Pakistan',
    'rawalpindi-pakistan': 'Rawalpindi, Pakistan',
    peshawar: 'Peshawar, Pakistan',
    'peshawar-pakistan': 'Peshawar, Pakistan',
    multan: 'Multan, Pakistan',
    'multan-pakistan': 'Multan, Pakistan',
    quetta: 'Quetta, Pakistan',
    'quetta-pakistan': 'Quetta, Pakistan',
    london: 'London, UK',
    'london-uk': 'London, UK',
    'new-york': 'New York, USA',
    'new-york-usa': 'New York, USA',
    mecca: 'Mecca, Saudi Arabia',
    'mecca-saudi-arabia': 'Mecca, Saudi Arabia',
    medina: 'Medina, Saudi Arabia',
    'medina-saudi-arabia': 'Medina, Saudi Arabia',
    riyadh: 'Riyadh, Saudi Arabia',
    'riyadh-saudi-arabia': 'Riyadh, Saudi Arabia',
    dubai: 'Dubai, UAE',
    'dubai-uae': 'Dubai, UAE',
    istanbul: 'Istanbul, Turkey',
    'istanbul-turkey': 'Istanbul, Turkey',
    toronto: 'Toronto, Canada',
    'toronto-canada': 'Toronto, Canada',
    sydney: 'Sydney, Australia',
    'sydney-australia': 'Sydney, Australia',
  };

  if (knownMappings[decoded]) {
    return knownMappings[decoded];
  }

  // Fallback slug parser e.g., "san-francisco-usa" -> "San Francisco, Usa"
  const parts = decoded.split('-');
  if (parts.length > 1) {
    const countryPart = parts[parts.length - 1];
    const cityPart = parts.slice(0, parts.length - 1).join(' ');
    const capitalize = (str: string) =>
      str.replace(/\b\w/g, (char) => char.toUpperCase());

    const formattedCountry = countryPart.length <= 3 ? countryPart.toUpperCase() : capitalize(countryPart);
    return `${capitalize(cityPart)}, ${formattedCountry}`;
  }

  return decoded.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function locationNameToSlug(location: string): string {
  return location
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}
