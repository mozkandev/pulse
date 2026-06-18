import { fetchBreaking } from '@/lib/rss';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  try {
    const items = await fetchBreaking(limit);
    return Response.json(
      { items, fetchedAt: Date.now() },
      {
        headers: {
          'Cache-Control': 's-maxage=120, stale-while-revalidate=60',
        },
      }
    );
  } catch (err: any) {
    return Response.json(
      { items: [], error: err?.message || String(err) },
      { status: 200 }
    );
  }
}
