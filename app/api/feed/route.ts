import { fetchCategory, fetchAllCategories } from '@/lib/rss';
import { CATEGORY_SLUGS, type CategorySlug } from '@/lib/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const view = searchParams.get('view');

  try {
    // view=all → tüm kategorileri tek response'da döndür
    if (view === 'all') {
      const data = await fetchAllCategories();
      return Response.json(data, {
        headers: {
          'Cache-Control': 's-maxage=300, stale-while-revalidate=60',
        },
      });
    }

    const raw = searchParams.get('category') || 'gundem';
    const category: CategorySlug = (CATEGORY_SLUGS as string[]).includes(raw) ? (raw as CategorySlug) : 'gundem';

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
