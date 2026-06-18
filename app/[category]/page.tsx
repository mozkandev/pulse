import { fetchCategory } from '@/lib/rss';
import { PulseShell } from '@/components/PulseShell';
import { CATEGORY_SLUGS, type CategorySlug, categoryName } from '@/lib/types';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 300;

export async function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({ category: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  if (!(CATEGORY_SLUGS as string[]).includes(category)) {
    return { title: 'Kategori bulunamadı · Pulse' };
  }
  const name = categoryName[category as CategorySlug];
  return {
    title: `${name} Haberleri · Pulse`,
    description: `${name} kategorisindeki en güncel haberler, canlı RSS akışı.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!(CATEGORY_SLUGS as string[]).includes(category)) {
    notFound();
  }
  const slug = category as CategorySlug;
  const data = await fetchCategory(slug);
  return (
    <PulseShell
      category={slug}
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
