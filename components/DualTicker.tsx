'use client';

import { useEffect, useState } from 'react';
import type { NewsItem } from '@/lib/types';

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'az önce';
  if (min < 60) return `${min}dk`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}sa`;
  const d = Math.floor(h / 24);
  return `${d}g`;
}

export function DualTicker({ onItemClick }: { onItemClick?: (item: NewsItem) => void }) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchBreaking = async () => {
      try {
        const r = await fetch('/api/breaking?limit=12', { cache: 'no-store' });
        const data = await r.json();
        if (!cancelled) {
          setItems(data.items || []);
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    };
    fetchBreaking();
    const id = setInterval(fetchBreaking, 90_000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  if (loading && items.length === 0) {
    return (
      <div className="border-b border-border-subtle bg-panel">
        <div className="h-7 flex items-center px-4 text-[11px] text-text-4 overflow-hidden">
          <span className="ticker-track inline-block whitespace-nowrap">
            Haber akışı yükleniyor · Türkiye'nin önde gelen kaynakları taranıyor
          </span>
        </div>
        <div className="h-7 flex items-center px-4 text-[11px] text-text-4 border-t border-border-subtle overflow-hidden">
          <span className="ticker-track inline-block whitespace-nowrap" style={{ animationDuration: '120s' }}>
            {`Yükleniyor`.repeat(30)}
          </span>
        </div>
      </div>
    );
  }

  if (items.length === 0) return null;

  // Duplicate for seamless loop
  const loop = [...items, ...items];

  return (
    <div className="border-b border-border-subtle bg-panel">
      {/* BREAKING row */}
      <div className="flex items-stretch h-7">
        <div className="flex items-center gap-1.5 px-3 bg-break text-white shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-white breaking-pulse" />
          <span className="text-[10px] font-semibold tracking-[0.12em] uppercase">Son Dakika</span>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="ticker-track flex gap-8 items-center h-full whitespace-nowrap absolute inset-0">
            {loop.map((item, i) => (
              <button
                key={`b-${item.id}-${i}`}
                onClick={() => onItemClick?.(item)}
                className="text-[12px] text-text-2 hover:text-text transition-colors flex items-center gap-2 shrink-0"
              >
                <span className="text-text-4 font-mono tabular-nums">{timeAgo(item.publishedTimestamp)}</span>
                <span className="text-text-4">·</span>
                <span className="max-w-[420px] truncate">{item.title}</span>
                <span className="text-text-4">·</span>
                <span className="text-text-3 text-[11px]">{item.source}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GÜNDEM row */}
      <div className="flex items-stretch h-7 border-t border-border-subtle">
        <div className="flex items-center gap-1.5 px-3 bg-accent text-white shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span className="text-[10px] font-semibold tracking-[0.12em] uppercase">Gündem Akışı</span>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div
            className="ticker-track flex gap-8 items-center h-full whitespace-nowrap absolute inset-0"
            style={{ animationDuration: '120s', animationDelay: '-30s' }}
          >
            {loop.map((item, i) => (
              <button
                key={`g-${item.id}-${i}`}
                onClick={() => onItemClick?.(item)}
                className="text-[12px] text-text-2 hover:text-text transition-colors flex items-center gap-2 shrink-0"
              >
                <span className="text-text-4 font-mono tabular-nums">{timeAgo(item.publishedTimestamp)}</span>
                <span className="text-text-4">·</span>
                <span className="max-w-[420px] truncate">{item.title}</span>
                <span className="text-text-4">·</span>
                <span className="text-text-3 text-[11px]">{item.source}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
