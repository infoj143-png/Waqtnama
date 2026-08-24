import { redirect } from 'next/navigation';
import { ALL_CITY_SLUGS, getCanonicalCitySlug } from '@/lib/citySlug';

interface Props {
  params: {
    city: string;
  };
}

export async function generateStaticParams() {
  return ALL_CITY_SLUGS.map((city) => ({
    city,
  }));
}

export default function LegacyCityRedirect({ params }: Props) {
  const canonicalSlug = getCanonicalCitySlug(params.city);
  redirect(`/prayer-times/${canonicalSlug}`);
}
