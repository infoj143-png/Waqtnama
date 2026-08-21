import { AladhanApiResponseData } from '@/lib/prayerTimes';

const cache = new Map<string, AladhanApiResponseData>();

export async function getPrayerTimes(city: string, country: string): Promise<AladhanApiResponseData> {
  const cacheKey = `${city.toLowerCase().trim()}-${country.toLowerCase().trim()}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  let attempts = 0;
  while (attempts < 3) {
    try {
      const res = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=2`
      );

      if (res.status === 429) {
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, 500 * attempts));
        continue;
      }

      if (!res.ok) {
        throw new Error(`Failed to fetch prayer times: ${res.statusText}`);
      }

      const data = await res.json();
      if (data.code !== 200 || !data.data) {
        throw new Error(data.data || 'Failed to fetch prayer times from Aladhan API');
      }

      cache.set(cacheKey, data.data);
      return data.data;
    } catch (err) {
      attempts++;
      if (attempts >= 3) {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, 500 * attempts));
    }
  }

  throw new Error('Failed to fetch prayer times after multiple retries');
}

export async function getPrayerTimesByCoords(latitude: number, longitude: number): Promise<AladhanApiResponseData> {
  const res = await fetch(
    `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch prayer times: ${res.statusText}`);
  }
  const data = await res.json();
  if (data.code !== 200 || !data.data) {
    throw new Error(data.data || 'Failed to fetch prayer times from Aladhan API');
  }
  return data.data;
}
