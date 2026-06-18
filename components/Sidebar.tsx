'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CATEGORY_SLUGS, categoryName, categoryAccent, categoryIcon, type CategorySlug } from '@/lib/types';

interface SidebarProps {
  categoryCounts: Record<string, number>;
  totalAllItems: number;
}

export function Sidebar({ categoryCounts, totalAllItems }: SidebarProps) {
  const [now, setNow] = useState<string>('--:--');
  const [sourceCount, setSourceCount] = useState<{ ok: number; fail: number; total: number } | null>(null);
  const [sources, setSources] = useState<{ id: string; name: string; status: string; category: string }[]>([]);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, '0');
      const mm = d.getMinutes().toString().padStart(2, '0');
      setNow(`${hh}:${mm}`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch('/api/sources')
      .then(r => r.json())
      .then(data => {
        const ok = data.sources?.filter((s: any) => s.status === 'ok').length || 0;
        const fail = data.sources?.filter((s: any) => s.status === 'fail').length || 0;
        setSourceCount({ ok, fail, total: data.sources?.length || 0 });
        setSources(data.sources || []);
      })
      .catch(() => {});
  }, []);

  return (
    <aside className="hidden md:flex w-[240px] shrink-0 h-screen sticky top-0 flex-col border-r border-border bg-panel">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-border-subtle">
        <Link href="/" className="flex items-baseline gap-2 group">
          <span className="text-2xl font-semibold tracking-tight text-text">Pulse</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-text-3 group-hover:text-text-2 transition-colors">v2</span>
        </Link>
        <p className="mt-1 text-[11px] text-text-3 leading-snug">
          Türkiye + Dünya Haber Terminali
        </p>
      </div>

      {/* Search (placeholder) */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface border border-border-subtle text-text-3 text-[13px]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span>Haber ara…</span>
          <span className="ml-auto text-[10px] text-text-4 border border-border-subtle rounded px-1.5 py-0.5">⌘K</span>
        </div>
      </div>

      {/* Categories — sadece özet */}
      <nav className="flex-1 overflow-y-auto px-2 py-1">
        <div className="px-3 pt-2 pb-1.5 text-eyebrow text-text-4 flex items-center justify-between">
          <span>Kategoriler</span>
          <span className="text-text-4 font-mono tabular-nums">{totalAllItems}</span>
        </div>
        <ul className="space-y-0.5">
          {CATEGORY_SLUGS.map((slug) => {
            const count = categoryCounts[slug] || 0;
            return (
              <li
                key={slug}
                className="group flex items-center gap-3 px-3 py-1.5 rounded-md text-[12.5px] text-text-2"
              >
                <span
                  className="text-[13px] w-4 inline-flex items-center justify-center"
                  style={{ color: categoryAccent[slug] }}
                >
                  {categoryIcon[slug]}
                </span>
                <span className="flex-1">{categoryName[slug]}</span>
                <span className="text-[10px] text-text-4 font-mono tabular-nums">
                  {count}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Sources list */}
        <div className="px-3 pt-4 pb-1.5 text-eyebrow text-text-4">Kaynaklar</div>
        <ul className="space-y-0.5 pb-3">
          {sources.map((s) => (
            <li
              key={s.id}
              className="group flex items-center gap-2 px-3 py-1 rounded-md text-[11.5px] text-text-3 hover:text-text-2 transition-colors"
            >
              <span
                className={`w-1 h-1 rounded-full ${
                  s.status === 'ok' ? 'bg-success' : s.status === 'fail' ? 'bg-warn' : 'bg-text-4'
                }`}
              />
              <span className="flex-1 truncate">{s.name}</span>
              <span className="text-[9px] text-text-4 uppercase tracking-wider">
                {s.status === 'ok' ? 'live' : s.status === 'fail' ? 'down' : '...'}
              </span>
            </li>
          ))}
          {sources.length === 0 && (
            <li className="px-3 py-2 text-[11px] text-text-4">Yükleniyor…</li>
          )}
        </ul>
      </nav>

      {/* Footer status */}
      <div className="border-t border-border-subtle px-4 py-3 space-y-2 text-[11px] text-text-3">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${sourceCount && sourceCount.fail > 0 ? 'bg-warn' : 'bg-success'} breaking-pulse`} />
            <span>{sourceCount ? `${sourceCount.ok}/${sourceCount.total} kaynak canlı` : 'Bağlanıyor…'}</span>
          </span>
          <span className="text-text-4 font-mono tabular-nums">{now}</span>
        </div>
        <div className="text-text-4 leading-snug">
          30+ RSS · 5dk önbellek · gerçek zamanlı
        </div>
      </div>
    </aside>
  );
}
