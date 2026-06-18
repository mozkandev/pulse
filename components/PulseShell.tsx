'use client';

import { useState, useEffect, useMemo } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DualTicker } from '@/components/DualTicker';
import { MasonryGrid } from '@/components/MasonryGrid';
import { NewsCard } from '@/components/NewsCard';
import { NewsModal } from '@/components/NewsModal';
import { categoryName, categoryAccent, CATEGORY_SLUGS, type CategorySlug, type NewsItem } from '@/lib/types';

export type FilterCategory = CategorySlug | 'all';

interface PulseShellProps {
  initialAllItems: NewsItem[];
  initialByCategory: Record<string, NewsItem[]>;
  meta?: {
    sourceCount: number;
    unavailable: string[];
    fromCache: boolean;
    total: number;
    categoryCounts: Record<string, number>;
  };
}

const CATEGORY_FILTERS: FilterCategory[] = ['all', ...CATEGORY_SLUGS];

export function PulseShell({ initialAllItems, initialByCategory, meta }: PulseShellProps) {
  const [byCategory, setByCategory] = useState<Record<string, NewsItem[]>>(initialByCategory);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    setRefreshing(true);
    try {
      const r = await fetch('/api/feed?view=all', { cache: 'no-store' });
      const data = await r.json();
      if (data.byCategory) setByCategory(data.byCategory);
    } catch {}
    setRefreshing(false);
  };

  // Aktif kategoriye göre items
  const activeItems = useMemo(() => {
    if (activeCategory === 'all') {
      return Object.values(byCategory).flat().sort((a, b) => b.publishedTimestamp - a.publishedTimestamp);
    }
    return (byCategory[activeCategory] || []).slice().sort((a, b) => b.publishedTimestamp - a.publishedTimestamp);
  }, [activeCategory, byCategory]);

  const [featured, ...rest] = activeItems;
  const activeAccent = activeCategory === 'all' ? '#5e6ad2' : categoryAccent[activeCategory as CategorySlug];
  const activeName = activeCategory === 'all' ? 'Tümü' : categoryName[activeCategory as CategorySlug];
  const activeCount = activeItems.length;

  // Tüm kategorilerden toplam haber sayısı (sidebar için)
  const totalAllItems = useMemo(
    () => Object.values(byCategory).reduce((sum, items) => sum + items.length, 0),
    [byCategory]
  );

  return (
    <div className="min-h-screen flex">
      <Sidebar
        categoryCounts={meta?.categoryCounts || {}}
        totalAllItems={totalAllItems}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <DualTicker onItemClick={setSelectedItem} />

        {/* Top header */}
        <header className="sticky top-0 z-30 border-b border-border-subtle bg-bg/85 backdrop-blur">
          <div className="px-5 sm:px-8 py-4 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5 text-[11px] text-text-3 mb-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: activeAccent }} />
                <span className="uppercase tracking-[0.12em] font-medium">Pulse Dashboard</span>
                {meta?.fromCache && <span className="text-text-4">· önbellek</span>}
                {meta?.unavailable && meta.unavailable.length > 0 && (
                  <span className="text-warn" title={meta.unavailable.join(', ')}>
                    · {meta.unavailable.length} kaynak çevrimdışı
                  </span>
                )}
              </div>
              <h1 className="text-display text-text text-[34px] sm:text-[44px] leading-[0.95] truncate">
                {activeName}
              </h1>
              <p className="mt-1.5 text-[13px] text-text-3">
                {activeCount} haber · {meta?.sourceCount || 0} kaynak · anlık
              </p>
            </div>
            <button
              onClick={refresh}
              disabled={refreshing}
              className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-panel text-text-2 hover:bg-surface hover:text-text text-[12px] disabled:opacity-50 transition-colors"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={refreshing ? 'animate-spin' : ''}
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              {refreshing ? 'Yenileniyor' : 'Yenile'}
            </button>
          </div>

          {/* Category tabs */}
          <div className="px-5 sm:px-8 pb-3 -mt-1 overflow-x-auto">
            <div className="flex items-center gap-1.5 min-w-max">
              {CATEGORY_FILTERS.map((slug) => {
                const active = activeCategory === slug;
                const count = slug === 'all'
                  ? totalAllItems
                  : (meta?.categoryCounts?.[slug] || byCategory[slug]?.length || 0);
                const label = slug === 'all' ? 'Tümü' : categoryName[slug as CategorySlug];
                const accent = slug === 'all' ? '#5e6ad2' : categoryAccent[slug as CategorySlug];
                return (
                  <button
                    key={slug}
                    onClick={() => setActiveCategory(slug)}
                    className={[
                      'group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] transition-all border',
                      active
                        ? 'border-transparent text-bg font-medium'
                        : 'border-border-subtle text-text-2 hover:text-text hover:border-border',
                    ].join(' ')}
                    style={active ? { background: accent } : undefined}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: active ? 'rgba(0,0,0,0.4)' : accent }}
                    />
                    {label}
                    <span
                      className={[
                        'text-[10px] tabular-nums px-1.5 py-0.5 rounded-full',
                        active ? 'bg-black/20' : 'bg-surface text-text-3',
                      ].join(' ')}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 px-5 sm:px-8 py-6 sm:py-8">
          {featured ? (
            <div className="mb-6 sm:mb-8">
              <NewsCard item={featured} variant="featured" onClick={setSelectedItem} />
            </div>
          ) : null}

          {rest.length > 0 && (
            <div>
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="text-eyebrow text-text-2">Daha fazla haber</h2>
                <span className="text-[11px] text-text-4 font-mono tabular-nums">{rest.length} öğe</span>
              </div>
              <MasonryGrid items={rest} onItemClick={setSelectedItem} />
            </div>
          )}

          {activeItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-2 text-[14px]">Bu kategoride henüz haber yok.</p>
              <p className="text-text-4 text-[12px] mt-1">Yenile düğmesine basarak tekrar deneyebilirsin.</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-border-subtle px-5 sm:px-8 py-5 text-[11px] text-text-4 flex flex-col sm:flex-row gap-2 sm:justify-between">
          <span>Pulse · Türkiye + Dünya Haber Terminali · 30+ RSS kaynağı · Canlı</span>
          <span className="font-mono">Built with Next.js · Deployed on Vercel</span>
        </footer>
      </div>

      <NewsModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
