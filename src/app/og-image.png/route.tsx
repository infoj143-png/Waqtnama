import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#047857',
          backgroundImage: 'linear-gradient(to bottom right, #047857, #065f46)',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            padding: '16px 24px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '9999px',
            border: '2px solid rgba(255, 255, 255, 0.25)',
          }}
        >
          <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#ecfdf5' }}>
            WaqtNama • وقت نامہ
          </span>
        </div>

        <h1
          style={{
            fontSize: '56px',
            fontWeight: '800',
            lineHeight: 1.2,
            margin: '0 0 20px 0',
            letterSpacing: '-0.02em',
          }}
        >
          Accurate Prayer Times & Qibla Direction
        </h1>

        <p
          style={{
            fontSize: '26px',
            color: '#a7f3d0',
            maxWidth: '900px',
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          Worldwide Fajr, Dhuhr, Asr, Maghrib, and Isha timings, live countdown, and Hijri dates.
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
