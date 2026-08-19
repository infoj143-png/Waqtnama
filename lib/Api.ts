export async function getPrayerTimes(city: string, country: string) {
  const res = await fetch(
    `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=2`
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

export async function getPrayerTimesByCoords(latitude: number, longitude: number) {
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
