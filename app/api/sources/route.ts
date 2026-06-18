import { getAllSourceHealth } from '@/lib/sources';

export async function GET() {
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
