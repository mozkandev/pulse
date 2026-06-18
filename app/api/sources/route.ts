import { getAllSourceHealth, ensureSourcesWarmedUp } from '@/lib/sources';

export async function GET() {
  // Cold start'ta tüm kaynakları probe et (5s timeout per source, paralel)
  ensureSourcesWarmedUp();

  const sources = getAllSourceHealth();
  return Response.json(
    { sources, lastUpdate: Date.now() },
    {
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=30',
      },
    }
  );
}
