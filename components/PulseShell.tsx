'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DualTicker } from '@/components/DualTicker';
import { MasonryGrid } from '@/components/MasonryGrid';
import { NewsCard } from '@/components/NewsCard';
import { NewsModal } from '@/components/NewsModal';
import { categoryName, categoryAccent, type CategorySlug, type NewsItem } from '@/lib/types';

interface PulseShellProps {
  category: CategorySlug;
  initialItems: NewsItem[];
  meta?: {
    sourceCount: number;
    unavailable: string[];
    fromCache: boolean;
    total: number;
  };
}

export function PulseShell({ category, initialItems, meta }: PulseShellProps) {
  const [items, setItems] = useState<NewsItem[]>(initialItems);
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    setRefreshing(true);
    try {
      const r = await fetch(`/api/feed?category=${category}`, { cache: 'no-store' });
      const data = await r.json();
      if (data.items) setItems(data.items);
    } catch {}
    setRefreshing(false);
  };

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems, category]);

  const accent = categoryAccent[category];
  const [featured, ...rest] = items;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DualTicker onItemClick={setSelectedItem} />

        {/* Top header */}
        <header className="sticky top-0 z-30 border-b border-border-subtle bg-bg/85 backdrop-blur">
          <div className="px-5 sm:px-8 py-4 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 text-[11px] text-text-3 mb-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                <span className="uppercase tracking-[0.12em] font-medium">Kategori</span>
                {meta?.fromCache && <span className="text-text-4">· önbellek</span>}
                {meta?.unavailable && meta.unavailable.length > 0 && (
                  <span className="text-warn" title={meta.unavailable.join(', ')}>
                    · {meta.unavailable.length} kaynak çevrimdışı
                  </span>
                )}
              </div>
              <h1 className="text-display text-text text-[34px] sm:text-[44px] leading-[0.95]">
                {categoryName[category]}
              </h1>
              <p className="mt-1.5 text-[13px] text-text-3">
                {meta?.total || items.length} haber · {meta?.sourceCount || 0} kaynak · son 24 saat
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

          {items.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-2 text-[14px]">Bu kategoride henüz haber yok.</p>
              <p className="text-text-4 text-[12px] mt-1">Yenile düğmesine basarak tekrar deneyebilirsin.</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-border-subtle px-5 sm:px-8 py-5 text-[11px] text-text-4 flex flex-col sm:flex-row gap-2 sm:justify-between">
          <span>Pulse · Türkiye Haber Terminali · Canlı RSS</span>
          <span className="font-mono">Built with Next.js · Deployed on Vercel</span>
        </footer>
      </div>

      <NewsModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
