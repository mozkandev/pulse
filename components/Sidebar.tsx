'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORY_SLUGS, categoryName, categoryIcon, type CategorySlug } from '@/lib/types';

export function Sidebar() {
  const pathname = usePathname();
  const [now, setNow] = useState<string>('--:--');
  const [sourceCount, setSourceCount] = useState<{ ok: number; fail: number; total: number } | null>(null);

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
      })
      .catch(() => {});
  }, []);

  const isActive = (slug: CategorySlug) => {
    if (slug === 'gundem') return pathname === '/' || pathname === '/gundem';
    return pathname === `/${slug}`;
  };

  return (
    <aside className="hidden md:flex w-[240px] shrink-0 h-screen sticky top-0 flex-col border-r border-border bg-panel">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-border-subtle">
        <Link href="/" className="flex items-baseline gap-2 group">
          <span className="text-2xl font-semibold tracking-tight text-text">Pulse</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-text-3 group-hover:text-text-2 transition-colors">v1</span>
        </Link>
        <p className="mt-1 text-[11px] text-text-3 leading-snug">
          Türkiye Haber Terminali
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

      {/* Categories */}
      <nav className="flex-1 overflow-y-auto px-2 py-1">
        <div className="px-3 pt-2 pb-1.5 text-eyebrow text-text-4">Kategoriler</div>
        <ul className="space-y-0.5">
          {CATEGORY_SLUGS.map((slug) => {
            const active = isActive(slug);
            return (
              <li key={slug}>
                <Link
                  href={slug === 'gundem' ? '/' : `/${slug}`}
                  className={[
                    'group flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors',
                    active
                      ? 'bg-surface text-text'
                      : 'text-text-2 hover:bg-surface hover:text-text',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'text-[14px] w-4 inline-flex items-center justify-center transition-colors',
                      active ? 'text-accent-hi' : 'text-text-3 group-hover:text-text-2',
                    ].join(' ')}
                  >
                    {categoryIcon[slug]}
                  </span>
                  <span className="flex-1">{categoryName[slug]}</span>
                  {active && (
                    <span className="w-1 h-1 rounded-full bg-accent-hi" />
                  )}
                </Link>
              </li>
            );
          })}
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
          RSS kaynaklarından canlı. 5dk önbellek.
        </div>
      </div>
    </aside>
  );
}
