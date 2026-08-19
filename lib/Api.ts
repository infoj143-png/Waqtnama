export async function getPrayerTimes(city: string, country: string) {
  const res = await fetch(`https://api.aladhan.com/v1/timesByCity?city=${city}&country=${country}&method=2`)
  const data = await res.json()
  return data.data
}
