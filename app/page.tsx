import { fetchCategory } from '@/lib/rss';
import { PulseShell } from '@/components/PulseShell';

export const dynamic = 'force-dynamic';
export const revalidate = 300;

export default async function HomePage() {
  const data = await fetchCategory('gundem');
  return (
    <PulseShell
      category="gundem"
      initialItems={data.items}
      meta={{
        sourceCount: data.meta.sourceCount,
        unavailable: data.meta.unavailable,
        fromCache: data.meta.fromCache,
        total: data.meta.total,
      }}
    />
  );
}
