export const ALL_CITY_SLUGS = [
  'karachi-pakistan',
  'lahore-pakistan',
  'islamabad-pakistan',
  'rawalpindi-pakistan',
  'peshawar-pakistan',
  'multan-pakistan',
  'faisalabad-pakistan',
  'gujranwala-pakistan',
  'sialkot-pakistan',
  'quetta-pakistan',
  'hyderabad-pakistan',
  'mecca-saudi-arabia',
  'medina-saudi-arabia',
  'riyadh-saudi-arabia',
  'jeddah-saudi-arabia',
  'dammam-saudi-arabia',
  'dubai-uae',
  'abu-dhabi-uae',
  'sharjah-uae',
  'doha-qatar',
  'kuwait-city-kuwait',
  'muscat-oman',
  'manama-bahrain',
  'istanbul-turkey',
  'ankara-turkey',
  'london-uk',
  'birmingham-uk',
  'manchester-uk',
  'new-york-usa',
  'chicago-usa',
  'los-angeles-usa',
  'houston-usa',
  'toronto-canada',
  'montreal-canada',
  'vancouver-canada',
  'sydney-australia',
  'melbourne-australia',
  'kuala-lumpur-malaysia',
  'jakarta-indonesia',
  'dhaka-bangladesh',
  'cairo-egypt',
  'casablanca-morocco',
] as const;

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
    faisalabad: 'Faisalabad, Pakistan',
    'faisalabad-pakistan': 'Faisalabad, Pakistan',
    gujranwala: 'Gujranwala, Pakistan',
    'gujranwala-pakistan': 'Gujranwala, Pakistan',
    sialkot: 'Sialkot, Pakistan',
    'sialkot-pakistan': 'Sialkot, Pakistan',
    quetta: 'Quetta, Pakistan',
    'quetta-pakistan': 'Quetta, Pakistan',
    hyderabad: 'Hyderabad, Pakistan',
    'hyderabad-pakistan': 'Hyderabad, Pakistan',
    london: 'London, UK',
    'london-uk': 'London, UK',
    birmingham: 'Birmingham, UK',
    'birmingham-uk': 'Birmingham, UK',
    manchester: 'Manchester, UK',
    'manchester-uk': 'Manchester, UK',
    'new-york': 'New York, USA',
    'new-york-usa': 'New York, USA',
    chicago: 'Chicago, USA',
    'chicago-usa': 'Chicago, USA',
    'los-angeles': 'Los Angeles, USA',
    'los-angeles-usa': 'Los Angeles, USA',
    houston: 'Houston, USA',
    'houston-usa': 'Houston, USA',
    mecca: 'Mecca, Saudi Arabia',
    'mecca-saudi-arabia': 'Mecca, Saudi Arabia',
    medina: 'Medina, Saudi Arabia',
    'medina-saudi-arabia': 'Medina, Saudi Arabia',
    riyadh: 'Riyadh, Saudi Arabia',
    'riyadh-saudi-arabia': 'Riyadh, Saudi Arabia',
    jeddah: 'Jeddah, Saudi Arabia',
    'jeddah-saudi-arabia': 'Jeddah, Saudi Arabia',
    dammam: 'Dammam, Saudi Arabia',
    'dammam-saudi-arabia': 'Dammam, Saudi Arabia',
    dubai: 'Dubai, UAE',
    'dubai-uae': 'Dubai, UAE',
    'abu-dhabi': 'Abu Dhabi, UAE',
    'abu-dhabi-uae': 'Abu Dhabi, UAE',
    sharjah: 'Sharjah, UAE',
    'sharjah-uae': 'Sharjah, UAE',
    doha: 'Doha, Qatar',
    'doha-qatar': 'Doha, Qatar',
    'kuwait-city': 'Kuwait City, Kuwait',
    'kuwait-city-kuwait': 'Kuwait City, Kuwait',
    muscat: 'Muscat, Oman',
    'muscat-oman': 'Muscat, Oman',
    manama: 'Manama, Bahrain',
    'manama-bahrain': 'Manama, Bahrain',
    istanbul: 'Istanbul, Turkey',
    'istanbul-turkey': 'Istanbul, Turkey',
    ankara: 'Ankara, Turkey',
    'ankara-turkey': 'Ankara, Turkey',
    toronto: 'Toronto, Canada',
    'toronto-canada': 'Toronto, Canada',
    montreal: 'Montreal, Canada',
    'montreal-canada': 'Montreal, Canada',
    vancouver: 'Vancouver, Canada',
    'vancouver-canada': 'Vancouver, Canada',
    sydney: 'Sydney, Australia',
    'sydney-australia': 'Sydney, Australia',
    melbourne: 'Melbourne, Australia',
    'melbourne-australia': 'Melbourne, Australia',
    'kuala-lumpur': 'Kuala Lumpur, Malaysia',
    'kuala-lumpur-malaysia': 'Kuala Lumpur, Malaysia',
    jakarta: 'Jakarta, Indonesia',
    'jakarta-indonesia': 'Jakarta, Indonesia',
    dhaka: 'Dhaka, Bangladesh',
    'dhaka-bangladesh': 'Dhaka, Bangladesh',
    cairo: 'Cairo, Egypt',
    'cairo-egypt': 'Cairo, Egypt',
    casablanca: 'Casablanca, Morocco',
    'casablanca-morocco': 'Casablanca, Morocco',
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
