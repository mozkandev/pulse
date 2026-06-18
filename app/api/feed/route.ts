import { fetchCategory } from '@/lib/rss';
import { CATEGORY_SLUGS, type CategorySlug } from '@/lib/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get('category') || 'gundem';
  const category: CategorySlug = (CATEGORY_SLUGS as string[]).includes(raw) ? (raw as CategorySlug) : 'gundem';

  try {
    const data = await fetchCategory(category);
    return Response.json(data, {
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate=60',
      },
    });
  } catch (err: any) {
    return Response.json(
      { error: 'Failed to fetch feed', message: err?.message || String(err) },
      { status: 500 }
    );
  }
}
